import alt from 'client/alt.js';
import httpinvoke from 'httpinvoke';
import IssueActions from 'client/actions/IssueActions.js';
import converters from './converters.js';

class IssueStore{
  constructor(){
    this.bindListeners({
      updateIssues: IssueActions.updateIssues
    });

    this.state = {
      issues: []
    };
  }


  async updateIssues(params){
    try{
      var page = params.page || 0;
      var issues = await httpinvoke(
        `https://api.github.com/repos/${params.repo}/issues?page=${page}`
        , 'GET'
        , {outputType: 'json', converters: converters}
        );

      this.setState({
        issues: issues.body
      });
    }catch(e){
      console.log('Error updating issues', e);
    }
  }
}

export default alt.createStore(IssueStore, 'IssueStore');
