import alt from 'client/alt.js';

class IssueActions {
  updateIssues(repo, page){
    return { repo, page };
  }

  updateIssue(repo, number){
    return { repo, number };
  }
}

export default alt.createActions(IssueActions);
