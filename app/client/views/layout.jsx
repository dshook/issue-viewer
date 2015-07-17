import React from 'react';
import IssueList from './IssueList.jsx';
import IssueActions from 'client/actions/IssueActions.js';
import { Router, Route, Link, Navigation } from 'react-router';
import reactMixin from 'react-mixin';

export default class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.object
  }

  constructor(){
    super();

    this.state = {
      repo: 'rails/rails'
    };

    this.onRepoChange = this.onRepoChange.bind(this);
    this.updateIssues = this.updateIssues.bind(this);

    IssueActions.updateIssues(this.state.repo);
  }

  onRepoChange(e){
    this.setState({repo: e.target.value});
  }

  updateIssues(){
    IssueActions.updateIssues(this.state.repo);
    this.context.router.transitionTo('/');
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

reactMixin.onClass(Layout, Navigation);
