import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import IssueStore from 'client/stores/IssueStore.js';
import issueActions from 'client/actions/IssueActions.js';
import marked from 'marked';

class Issue extends React.Component {
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

  renderIssue(issue){
    if(!issue) return '';
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
        {this.renderIssue(this.props.issue)}
      </div>
    );
  }
}

export default connectToStores(Issue);
