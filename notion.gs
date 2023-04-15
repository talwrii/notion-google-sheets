
class NotionConnection {
  constructor (token){
    this.token = token;
  }

  call (method, url, payload) {
  /* adapted from  https://max-brawer.medium.com/update-notion-databases-from-a-google-sheet-with-apps-script-c9a95df74c97 */
    let options = {
      "method": method,
      headers: {
      "Content-Type": "application/json",
      "Notion-Version": "2022-02-22",
      "Authorization": "Bearer " + this.token
    },
    "payload": JSON.stringify(payload),
    "redirect": "follow"
    };
    UrlFetchApp.fetch(url, options);
  }

  patch (url, payload) {
    this.call("patch", url, payload);
  }
}

class NotionDatabase {
  constructor (id){
    this.id = id;
  }

  listPages() {


  }



}


class NotionPage {
  constructor (connection, id){
    this.connection = connection;
    this.pageId = id;
  }

  setProp(prop, value) {
  
  let props = {
    "properties": {
    [prop]: {
     //in the case of a text field:
      "rich_text": [{
        "text": {
          "content": value
  }}]}}};

  let url = 'https://api.notion.com/v1/pages/'+this.pageId;
  this.connection.patch(url, props);
}


}

(new NotionPage(new NotionConnection(NOTION_TOKEN), "6518ff1e-be67-4415-9159-76c8fb7f4a7f")).setProp("cats", "cat")


