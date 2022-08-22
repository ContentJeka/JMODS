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
    return `Custom Data Top by <b>${data.jsonPath}</b>`;
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
  
  <span class="dbminputlabel">Путь к файлу</span><br>
  <input id="filePath" class="round" type="text" value="./data/"><br>
    <span class="dbminputlabel">JSON путь</span><br>
    <input class='round' id='jsonPath' placeholder="profile/money" /><br>
    <store-in-variable dropdownLabel="Сохранить в" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
    <br><br><br>
  `;
  },
  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const fs = require('fs');
    const { sort } = require('fast-sort');
    const filePath = this.evalMessage(data.filePath, cache);
    let json = JSON.parse(fs.readFileSync(filePath))
    const jsonPath = `["${this.evalMessage(data.jsonPath, cache).replaceAll("/", `"]["`)}"]`

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
  
    for (let i = 0; i < sort1.length; i++) {
      const j = obj.filter(o => o.value == sort1[i])
      if(j?.[0]?.id !== undefined) {
        top += `<@${j[0].id}> - ${j[0].value}\n`
      }
    }

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(top, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
