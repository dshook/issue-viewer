import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import IssueStore from 'client/stores/IssueStore.js';
import IssueActions from 'client/actions/IssueActions.js';
import { Link } from 'react-router';
import marked from 'marked';

class IssueList extends React.Component {
  constructor(){
    super();

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.renderIssue = this.renderIssue.bind(this);
    this.render = this.render.bind(this);
  }
  static propTypes = {
    issues: React.PropTypes.array,
    page: React.PropTypes.number,
    pages: React.PropTypes.number,
    repo: React.PropTypes.string
  }

  static getStores(){
    return [IssueStore];
  }

  static getPropsFromStores(){
    return IssueStore.getState();
  }

  trimStringClean(str, len){
    var trimmedString = str.substr(0, len);

    //re-trim if we are in the middle of a word
    return trimmedString.substr(0, 
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
  }

  formatBody(str){
    if(!str) return '';
    var tokens = marked.lexer(str, {sanatize: true});
    var maxLen = 140;
    var seenLen = 0;
    var finishedTokens = [];
    //get the first maxLen characters of the parsed markdown
    for(let token of tokens){
      if(seenLen + token.text.length < maxLen){
        finishedTokens.push(token);
        seenLen += token.text.length;
      }else{
        token.text = this.trimStringClean(token.text, maxLen - seenLen);
        finishedTokens.push(token);
        break;
      }
    }
    finishedTokens.links = tokens.links;
    return marked.parser(finishedTokens);
  }

  nextPage(e){
    if(this.props.page + 1 <= this.props.pages){
      IssueActions.updateIssues(this.props.repo, this.props.page + 1);
    }
  }

  prevPage(e){
    if(this.props.page > 1){
      IssueActions.updateIssues(this.props.repo, this.props.page - 1);
    }
  }

  renderIssue(repo, issue){

    return (
      <div key={issue.id} className="issue" >
        <div className="left-panel">
          <a href={issue.html_url} className="num">{issue.number}</a>
          <div className="user">
            <img src={issue.user.avatar_url} />
            <div className="name">{issue.user.login}</div>
          </div>
        </div>
        <div className="right-panel">
          <Link to={`/issue/${repo.replace('/', '-')}/${issue.number}` } className="title">{issue.title}</Link>
          <div className="body" 
            dangerouslySetInnerHTML={{
              __html: this.formatBody(issue.body) 
            }}
          />
          <div className="labels">
            {issue.labels.map((label) => {
              let style = {backgroundColor: '#' + label.color};
              return (<div key={label.url} style={style} className="label">{label.name}</div>);
            }
            )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="issue-list">
        <div className="header">
          <h2>Issues</h2>
          <div className="nav">
            <button className="button button--action" onClick={this.prevPage}><i className="fa fa-arrow-left"></i> Back</button>
            <span>Page {this.props.page} of {this.props.pages}</span>
            <button className="button button--action" onClick={this.nextPage}>Forward <i className="fa fa-arrow-right right"></i></button>
          </div>
        </div>
        <ul>
          {this.props.issues.map((issue) => this.renderIssue(this.props.repo, issue))}
        </ul>
      </div>
    );
  }
}

export default connectToStores(IssueList);
