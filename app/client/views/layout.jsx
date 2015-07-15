import React from 'react';
//import AppActions from 'client/actions/AppActions.js';

export default class Layout extends React.Component {
  startJob(){
    console.log('start');
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
              <button onClick={this.startJob} className="button button--action" >
                <i className="fa fa-play"></i>
                Start Job
              </button>
            </div>
          </div>
        </div>
        <div className="main">
        </div>
        <div className="footer">
        </div>
      </div>
    );
  }
}
