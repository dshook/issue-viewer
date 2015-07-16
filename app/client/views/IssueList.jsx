import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import IssueStore from 'client/stores/IssueStore.js';
import { Link } from 'react-router';
import marked from 'marked';

class IssueList extends React.Component {
  static propTypes = {
    issues: React.PropTypes.array,
    repo: React.PropTypes.string
  }

  static getStores(){
    return [IssueStore];
  }

  static getPropsFromStores(){
    return IssueStore.getState();
  }

  renderIssue(repo, issue){
    return (
      <li key={issue.id} className="issue" >
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
              __html: issue.body ? marked(issue.body, {sanitize: true}) : ''
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
      </li>
    );
  }

  render() {
    return (
      <div className="issue-list">
        <h3>Issues</h3>
        <ul>
          {this.props.issues.map((issue) => this.renderIssue(this.props.repo, issue))}
        </ul>
      </div>
    );
  }
}

export default connectToStores(IssueList);
