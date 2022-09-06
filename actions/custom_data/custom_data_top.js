module.exports = {
  name: 'Custom Data Top',
  section: 'Custom Data',
  meta: {
    version: '3.0.0', 
    preciseCheck: false,
    author: 'KailHet',
    authorUrl: 'https://github.com/KailHet',
    downloadURL: 'https://github.com/ContentJeka/JMODS/tree/main/actions/custom_data/custom_data_top.js',
  },

  subtitle(data) {
    return `Custom Data Top - <b>${data.jsonPath}</b>`;
  },

  fields: ['filePath', 'jsonPath', 'varName', 'storage'],

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    let dataType = `Top by ${data.jsonPath}`;
    return [data.varName, dataType];
  },

  html(_isEvent, data) {
    return `
  <div style="position:absolute;bottom:0px;border: 0px solid #222;background:#363636;color:#5539cc;padding:3px;left:24px;z-index:999999">KailHet</div>
  <img id="top" src="https://cdn.discordapp.com/avatars/344482543632121856/31fbc74b572df17923427862ede875b7.png?width=115&height=115" style="width:29px;height:29px;position:absolute;bottom:-2px;padding:3px;left:-2px;z-index:999999;">
  <a href="https://github.com/ContentJeka/JMODS/wiki#custom-data-top" style="position: absolute; top:5px; left: 5px; font-size: 10px; color: rgba(256, 256, 256, 0.3)">Документация</a>

<div style="width: 545px; height: 385px;">

  <span class="dbminputlabel">Путь к файлу</span><br>
  <input id="filePath" class="round" type="text" value="./data/" style="width: 97%"><br>

  <span class="dbminputlabel">JSON путь</span><br>
  <input class='round' id='jsonPath' placeholder="profile/money" style="width: 97%" /><br>

  <span class="dbminputlabel">Формат вывода</span><br>
  <input id="response" class="round" type="text" placeholder="UserObject' имеет - 'DataValue' рублей'" style="width: 97%"><br>

  <div style="float: left; width: 40%;">
    <span class="dbminputlabel">Сохранить в</span><br>
    <select id="storage" class="round">
      ${data.variables[1].replace(`Temp Variable`, `Временную переменную`).replace(`Server Variable`, `Серверную переменную`).replace(`Global Variable`, `Глобальную переменную`)}
    </select>
  </div>

  <div style="float: left; width: 57%; padding-left:20px">
    <span class="dbminputlabel">Название переменной</span><br>
    <input id="varName" class="round" type="text">
  </div>
</div>
  `;
  },
  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const fs = require('fs');
    const { sort } = require('fast-sort');
    const filePath = this.evalMessage(data.filePath, cache);
    const json = JSON.parse(fs.readFileSync(filePath))
    const jsonPath = `["${this.evalMessage(data.jsonPath, cache).replaceAll("/", `"]["`)}"]`
    const response = this.evalMessage(data.response, cache);

    let obj = [];
    let result = [];
    let top = ``;

    for(let i = 0; i < Object.keys(json).length; i++) {
      obj.push({id:Object.keys(json)[i], value: eval(`json[Object.keys(json)[i]]${jsonPath}`)})
      result.push(eval(`json[Object.keys(json)[i]]${jsonPath}`))
    }

    const sort1 = sort(result).by({
      desc: true,
      comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: 'base'}).compare,
    })

    let res = []


    for (let i = 0; i < sort1.length; i++) {
      const j = obj.filter(o => o.value == sort1[i]) // [{id: 344482543632121856, value: 1000}]
      for (a = 0; a < j.length; a++) {
        let ex = res.filter(o => o.id == j[a].id)?.[0]    
        if (ex == undefined) res.push(j[a])
        
      }
    }
    for (b = 0; b < res.length; b++) {
      if(res?.[b]?.id !== undefined) {
        let us = await this.findMemberOrUserFromID(res[b].id, cache.server);
        let member;
        if (!response) {
          top += `<@${res?.[b]?.id}> - ${res?.[b]?.value}\n`
        }
        
        if (response.includes(`UserObject`)) {
          member = `<@${us.id}>`
        } else if (response.includes(`UserName`)) {
          member = us.username
        } else if (response.includes(`UserTag`)) {
          member = `${us.username}#${us.discriminator}`
        }
      }
    }
    // console.log(res)

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(top, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
