import alt from 'client/alt.js';

class IssueActions {
  updateIssues(repo, page){
    return { repo, page };
  }
}

export default alt.createActions(IssueActions);
