import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import IssueStore from 'client/stores/IssueStore.js';
import issueActions from 'client/actions/IssueActions.js';
import markdown from 'client/utils/markdown.js';

class Issue extends React.Component {
  constructor(){
    super();
  }
  static propTypes = {
    params: React.PropTypes.object,
    issue: React.PropTypes.object,
    repo: React.PropTypes.string
  }

  static getStores(){
    return [IssueStore];
  }

  static getPropsFromStores(){
    return IssueStore.getState();
  }

  componentDidMount() {
    let repo = this.props.params.repo.replace('-', '/');
    let number = this.props.params.number;
    this.setState({ number: number, repo: repo});
    issueActions.updateIssue(repo, number);
  }

  renderComment(comment, index){
    return (
      <div key={comment.id} className="comment">
        <div key={comment.id} className="issue" >
          <div className="left-panel">
            <div className="date">{new Date(comment.updated_at).toLocaleString('en-US')}</div>
            <div className="user">
              <img src={comment.user.avatar_url} />
              <div className="name">{comment.user.login}</div>
            </div>
          </div>
          <div className="right-panel">
            <div className="body" 
              dangerouslySetInnerHTML={{
                __html: markdown.formatBody(comment.body)
              }}
            />
          </div>
        </div>

      </div>
    );
  }

  renderIssue(issue){
    if(!issue) return '';
    return (
      <div key={issue.id} className="issue" >
        <div className="left-panel">
          <a href={issue.html_url} className="num">{issue.number}</a>
          <div className="user">
            <img src={issue.user.avatar_url} />
            <div className="name">{issue.user.login}</div>
          </div>
          <div className="labels">
            {issue.labels.map((label) => {
              let style = {backgroundColor: '#' + label.color};
              return (<div key={label.url} style={style} className="label">{label.name}</div>);
            }
            )}
          </div>
        </div>
        <div className="right-panel">
          <span className="title">{issue.title}</span>
          <div className="body" 
            dangerouslySetInnerHTML={{
              __html: markdown.formatBody(issue.body)
            }}
          />
          <div className="comments">
            {issue.comments.map((c, i) => this.renderComment(c, i) )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="issue-list">
        {this.renderIssue(this.props.issue)}
      </div>
    );
  }
}

export default connectToStores(Issue);
