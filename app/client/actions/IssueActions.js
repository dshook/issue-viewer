import alt from 'client/alt.js';

class IssueActions {
  updateIssues(page){
    return { page };
  }
}

export default alt.createActions(IssueActions);
