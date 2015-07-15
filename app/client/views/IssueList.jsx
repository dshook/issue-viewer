import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import IssueStore from 'client/stores/IssueStore.js';

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

  render() {
    return (
      <div className="issue-list">
        <p>Issue List</p>
        <ul>
          {this.props.issues.map((issue) => {
            return (
              <li >{issue}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connectToStores(IssueList);
