

class NotionConnection {
  constructor (token){
    this.token = token;
  }

  call (method, url, payload) {
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
    return JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
  }

  patch (url, payload) {
    return this.call("patch", url, payload);
  }

  post (url, payload) {
    return this.call("post", url, payload);
  }
}

class NotionDatabase {
  constructor (connection, id){
    this.connection = connection;
    this.id = id;
  }

  getPages() {
    let url = `https://api.notion.com/v1/databases/${this.id}/query`;
    let result = this.connection.post(url, {});
    return result["results"];
  }
}


class NotionPage {
  constructor (connection, id){
    this.connection = connection;
    this.pageId = id;
  }

  setProp(prop, value) {
  /* adapted from  https://max-brawer.medium.com/update-notion-databases-from-a-google-sheet-with-apps-script-c9a95df74c97 */
   let props = {
      "properties": {
     [prop]: {
      //in the case of a text field:
       "rich_text": [{
          "text": {
            "content": value
      }}]}}};

    let url = 'https://api.notion.com/v1/pages/'+this.pageId;
    return this.connection.patch(url, props);
  }


}

class NotionPageInfo {
  constructor(data) {
    this.data = data;
  }

  created_time() {
    return this.data["created_time"];
  }
}
