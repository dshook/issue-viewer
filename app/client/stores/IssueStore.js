import alt from 'client/alt.js';
import IssueActions from 'client/actions/IssueActions.js';

class IssueStore{
  constructor(){
    this.bindListeners({
      updateIssues: IssueActions.updateIssues
    });

    this.state = {
      issues: []
    };
  }

  updateIssues(page){
    this.setState({
      issues: ['issue 1', 'issue 2']
    });
  }
}

export default alt.createStore(IssueStore, 'IssueStore');
