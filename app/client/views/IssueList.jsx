import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import IssueStore from 'client/stores/IssueStore.js';
import IssueActions from 'client/actions/IssueActions.js';
import { Link } from 'react-router';
import markdown from 'client/utils/markdown.js';

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
              __html: markdown.formatBody(issue.body, 140) 
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
