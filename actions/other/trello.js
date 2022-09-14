module.exports = {
  name: 'Trello',
  section: 'Other Stuff',
  meta: {
    version: '2.1.6',
    preciseCheck: false,
    author: 'KailHet',
    authorUrl: 'https://github.com/KailHet',
    downloadURL: 'https://github.com/ContentJeka/JMODS/blob/main/actions/other/trello.js',
  },

  subtitle(data) {
    if (data.title) return `${data.title}`;
    return `${data.file ? `External File: ${data.file}` : data.code}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Unknown Type'];
  },

  fields: [
    'apiKey', 
    'oauthToken', 
    'title', 
    'description', 
    'listid',
    'members',
    'url',
    'file',
    'storage', 
    'varName', 
  ],

  html(_isEvent, data) {
    return `
  <div>
    <div id="" style="float: left; width: 47%;">
      <span class="dbminputlabel">API ключ</span><br>
      <input id="apiKey" class="round" type="text" placeholder="Обязательно поле">
    </div>
    <div style="width: 53%; padding-left: 3%; float: left;">
      <span class="dbminputlabel">Токен авторизации</span><br>
      <input id="oauthToken" class="round" type="text" placeholder="Обязательно поле">
    </div>
  </div><br><br><br>

  <div>
    <div style="float: left; width: 47%;">
      <span class="dbminputlabel">Действие</span><br>
      <select id="action" class="round">
        <option value="0"selected>Создать карточку</option>
      </select>
    </div>
    <div style="padding-left: 3%; float: left; width: 53%;">
      <span class="dbminputlabel">ID Списка</span><br>
      <input id="listid" class="round" placeholder="Обязательное поле" type="text">
    </div>
  </div><br><br><br>

  <div>
    <div id="" style="float: left; width: 47%;">
      <span class="dbminputlabel">Название</span><br>
      <input id="title" class="round" type="text">
    </div>
    <div style="width: 53%; padding-left: 3%; float: left;">
      <span class="dbminputlabel">Описание</span><br>
      <input id="description" class="round" type="text">
    </div>
  </div><br><br><br>

  <div>
    <div id="" style="float: left; width: 47%;">
      <span class="dbminputlabel">Ссылка</span><br>
      <input id="url" class="round" type="text">
    </div>
    <div id="fileinput" style="display:none; width: 53%; padding-left: 3%; float: left;">
      <span class="dbminputlabel">Файл</span><br>
      <input id="file" class="round" type="text">
    </div>
  </div><br><br><br>

  <div>
    <div id="" style="float: left; width: 100%;">
      <span class="dbminputlabel">Пользователи</span><br>
      <input id="members" class="round" type="text" placeholder="ID пользователей, через запятую">
    </div>
  </div><br><br><br>

  <div>
    <div style="float: left; width: 47%;">
      <span class="dbminputlabel">Сохранить в</span><br>
      <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
      ${data.variables[1]}
      </select>
    </div>
    <div id="varNameContainer" style="padding-left: 3%; float: left; width: 53%;">
      <span class="dbminputlabel">Название переменной</span><br>
      <input id="varName" class="round" type="text">
    </div>
  </div><br><br><br><br>

  <div style="text-align: center">
    <span style="text-align: center">Чтобы узнать ID элементов доски, добавьте <b>.json</b> в адресную строку</span>
  </div>
`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];

    const apiKey = this.evalMessage(data.apiKey, cache);
    const oauthToken = this.evalMessage(data.oauthToken, cache);
    const title = this.evalMessage(data.title, cache);
    const description = this.evalMessage(data.description, cache);
    const listid = this.evalMessage(data.listid, cache);
    const members = this.evalMessage(data.members, cache);
    const url = this.evalMessage(data.url, cache);
    const file = this.evalMessage(data.file, cache)

    const Trello = require('trello-node-api')(apiKey, oauthToken);
        
    let result = {}

    if (title.length > 0) {
      result.name = title
    }
    if (description.length > 0) {
      result.desc = description
    }
    if (listid.length > 0) {
      result.idList = listid
    }
    if (members.length > 0) {
      result.idMembers = members
    }
    if (url.length > 0) {
      result.urlSource = url
    }
    if (file.length > 0) {
      result.fileSource = file
    }

    function newCard() {
      const info = result

      Trello.card.create(info).then(function (response) {
        // console.log(response)
      }).catch(function (error) {
        console.error(`[Trello] ${error}`);
      });
    };
    
    newCard() 
    this.callNextAction(cache);
  },

  mod() {},
};
