import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import IssueStore from 'client/stores/IssueStore.js';
import marked from 'marked';

class IssueList extends React.Component {
  static propTypes = {
    issues: React.PropTypes.array
  }

  static getStores(){
    return [IssueStore];
  }

  static getPropsFromStores(){
    return IssueStore.getState();
  }

  renderIssue(issue){
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
          <span className="title">{issue.title}</span>
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
          {this.props.issues.map((issue) => this.renderIssue(issue))}
        </ul>
      </div>
    );
  }
}

export default connectToStores(IssueList);
