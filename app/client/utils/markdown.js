import marked from 'marked';

export default class Markdown{
  static linkUsers(text){
    var replacedText = text.replace(/\B(@(\w+)\b)/g, `<a href="https://github.com/$2">$1</a>`);
   
    return `<p>${replacedText}</p>`;
  }

  static formatBody(str, maxLen){
    if(!str) return '';
    var renderer = new marked.Renderer();
    renderer.paragraph = Markdown.linkUsers;

    var tokens = marked.lexer(str, {sanatize: true});
    if(!maxLen){
      return marked.parser(tokens, {renderer: renderer});
    }
    var seenLen = 0;
    var finishedTokens = [];
    //get the first maxLen characters of the parsed markdown
    for(let token of tokens){
      if(seenLen + token.text.length < maxLen){
        finishedTokens.push(token);
        seenLen += token.text.length;
      }else{
        token.text = Markdown.trimStringClean(token.text, maxLen - seenLen) + '...';
        finishedTokens.push(token);
        break;
      }
    }
    finishedTokens.links = tokens.links;
    return marked.parser(finishedTokens, {renderer: renderer});
  }

  static trimStringClean(str, len){
    var trimmedString = str.substr(0, len);

    //re-trim if we are in the middle of a word
    return trimmedString.substr(0, 
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
  }
}
