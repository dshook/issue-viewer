import React from 'react';
import IssueList from './IssueList.jsx';
import issueActions from 'client/actions/IssueActions.js';

export default class Layout extends React.Component {
  updateIssues(){
    issueActions.updateIssues();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <div className="header-container">
            <div className="title">
              <h1><i className="fa fa-github"></i>Github Issue Tracker</h1>
            </div>
            <div className="actions">
              <button onClick={this.updateIssues} className="button button--action" >
                <i className="fa fa-play"></i>
                Update Issues
              </button>
            </div>
          </div>
        </div>
        <div className="main">
          <IssueList />
        </div>
        <div className="footer">
        </div>
      </div>
    );
  }
}
