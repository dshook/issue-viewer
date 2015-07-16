import React from 'react';
import IssueList from './IssueList.jsx';
import issueActions from 'client/actions/IssueActions.js';
import { Router, Route, Link } from 'react-router';

export default class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.object
  }

  constructor(){
    super();

    this.state = {
      repo: 'rails/rails',
      route: window.location.hash.substr(1)
    };

    this.onRepoChange = this.onRepoChange.bind(this);
    this.updateIssues = this.updateIssues.bind(this);

    this.updateIssues();
  }

  onRepoChange(e){
    this.setState({repo: e.target.value});
  }

  updateIssues(){
    issueActions.updateIssues(this.state.repo);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <div className="header-container">
            <div className="title">
              <a href="/"><h1><i className="fa fa-github"></i> Issue Tracker</h1></a>
            </div>
            <div className="actions">
              <div className="repository">
                <span>Repository: </span>
                <input onChange={this.onRepoChange} value={this.state.repo} />
              </div>
              <button onClick={this.updateIssues} className="button button--action" >
                <i className="fa fa-play"></i>
                Update Issues
              </button>
            </div>
          </div>
        </div>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
