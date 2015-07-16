import alt from 'client/alt.js';
import httpinvoke from 'httpinvoke';
import IssueActions from 'client/actions/IssueActions.js';
import converters from './converters.js';

class IssueStore{
  constructor(){
    this.bindListeners({
      updateIssues: IssueActions.updateIssues,
      updateIssue: IssueActions.updateIssue
    });

    this.state = {
      issues: [],
      pages: 0,
      issue: null,
      repo: ''
    };
  }


  async updateIssues(params){
    try{
      let page = params.page || 0;
      let issuesResponse = await httpinvoke(
        `https://api.github.com/repos/${params.repo}/issues?page=${page}`
        , 'GET'
        , {outputType: 'json', converters: converters}
        );

      //little brittle way to get the total pages
      let pages = 0;
      if(issuesResponse.headers.link){
        let matches = issuesResponse.headers.link.match(/page=(\d+)>; rel="last"/);
        if(matches.length){
          pages = matches[0];
        }
      }

      this.setState({
        issues: issuesResponse.body,
        pages: pages,
        repo: params.repo
      });
    }catch(e){
      console.log('Error updating issues', e);
    }
  }

  async updateIssue(params){
    try{
      let issueResponse = await httpinvoke(
        `https://api.github.com/repos/${params.repo}/issues/${params.number}`
        , 'GET'
        , {outputType: 'json', converters: converters}
        );
      let issue = issueResponse.body;

      let commentsResponse = await httpinvoke(
        issue.comments_url
        , 'GET'
        , {outputType: 'json', converters: converters}
        );

      issue.comments = commentsResponse.body;

      this.setState({
        issue: issue,
        repo: params.repo
      });
    }catch(e){
      console.log('Error updating issue', e);
    }
  }
}

export default alt.createStore(IssueStore, 'IssueStore');
