module.exports = {
  name: 'Custom Data Top',
  section: 'Custom Data',
  meta: {
    version: '3.0.1', 
    preciseCheck: false,
    author: 'KailHet',
    authorUrl: 'https://github.com/KailHet',
    downloadURL: 'https://github.com/ContentJeka/JMODS/tree/main/actions/custom_data/custom_data_top.js',
  },

  subtitle(data) {
    return `Custom Data Top by <b>${data.jsonPath}</b>`;
  },

  fields: [
    'filePath',
    'jsonPath',
    'sorting',
    'length',
    'response',
    'varName',
    'storage'
  ],

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;

    let dataType = `Top by ${data.jsonPath}`;
    return [data.varName, dataType];
  },

  html(_isEvent, data) {
    var sorting = {"0": "", "1": ""};

    if(data.sorting == "1") sorting[1] = "selected";
    else sorting[0] = "selected";

    return `
  <div style="width: 545px; height: 435px;">
    <div style="float: left; width: 45%;">
      <span class="dbminputlabel">Путь к файлу</span><br>
      <input id="filePath" class="round" type="text" value="./data/" style="width: 97%"><br>
    </div>

    <div style="float: right; width: 55%;">
      <span class="dbminputlabel">JSON путь</span><br>
      <input class='round' id='jsonPath' placeholder="profile/money" style="width: 97%"><br>
    </div>

    <div style="float: left; width: 45%;">
      <span class="dbminputlabel">Сортировка</span><br>
      <select id="sorting" class="round" style="width: 97%">
        <option value="0" ${sorting[0]}>от Большого к Маленькому</option>
        <option value="1" ${sorting[1]}>от Маленького к Большому</option>
      </select><br>
    </div>

    <div style="float: right; width: 55%;">
      <span class="dbminputlabel">Кол-во записей</span><br>
      <input id="length" class="round" type="text" placeholder="0 - Вывод всех записей" style="width: 97%"><br>
    </div>

    <div style="width: 99.3%;">
      <span class="dbminputlabel">Формат вывода</span><br>
      <textarea id="response" style="min-width: 99.3%;max-width: 99%;" rows="3" cols="4" class="round" type="text" placeholder="NumBefore. UserObject имеет DataValue"></textarea><br>
    </div>

    <div style="float: left; width: 45%;">
      <span class="dbminputlabel">Сохранить в</span><br>
      <select id="storage" class="round" style="width: 97%">
        ${data.variables[1].replace(`Temp Variable`, `Временную переменную`).replace(`Server Variable`, `Серверную переменную`).replace(`Global Variable`, `Глобальную переменную`)}
      </select>
    </div>

    <div style="float: right; width: 55%;">
      <span class="dbminputlabel">Название переменной</span><br>
      <input id="varName" class="round" type="text" style="width: 97%"><br>
    </div>
    
    <p style="font-size: 12px;">
      <a style="color: rgba(256, 256, 256, 0.3);" href="#disclaimer">Форматы</a> |
      <a style="color: rgba(256, 256, 256, 0.3);" href="https://github.com/ContentJeka/JMODS/wiki#custom-data-top" target="_blank">Документация</a>
    </p>

    <div class="modal-container" id="disclaimer">
      <section class="modal">
        <header class="modal-header">
          <h2 class="modal-title">Форматы вывода</h2>
          <a href="#" class="modal-close"></a>
        </header>
        <div class="modal-content">
          <span><b>NumBefore</b> - порядок в топе</span><br>
          <span><b>DataValue</b> - значение из массива</span><br><br>
          <span><b>UserObject</b> - объект пользователя (@Котяра)</span><br>
          <span><b>UserName</b> - никнейм пользователя (Котяра)</span><br>
          <span><b>UserTag</b> - тэг пользователя (Котяра#8396)</span>
        </div>
      </section>
    </div>

    <style>.modal-container{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1000;background-color:rgba(0,0,0,.75);display:flex;pointer-events:none;opacity:0;transition:opacity 250ms}.modal-container:target{pointer-events:all;opacity:1}.modal{margin:auto;width:90%;max-width:40rem;background:linear-gradient(135deg,#837b83,#373337);border-radius:1.5rem}.modal-content,.modal-header{padding:1.5rem}.modal-header{display:flex;justify-content:space-between;background-color:hsla(300,1%,50%);border-radius:1.5rem 1.5rem 0 0;border:4px solid #000;border-bottom:none}.modal-title{margin:0;color:#fff}.modal-close{color:transparent;display:block;height:1.5rem;width:1.5rem;overflow:hidden;background-image:linear-gradient(to top right,transparent 48%,#fff 48%,#fff 52%,transparent 52%),linear-gradient(to top left,transparent 48%,#fff 48%,#fff 52%,transparent 52%)}.modal-close:focus,.modal-close:hover{background-image:linear-gradient(to top right,transparent 46%,#fff 46%,#fff 54%,transparent 54%),linear-gradient(to top left,transparent 46%,#fff 46%,#fff 54%,transparent 54%)}.modal-content{color:#fff;border-radius:0 0 1.5rem 1.5rem;border:4px solid #000;border-top:none}</style>
  </div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const fs = require('fs');
    const { sort } = require('fast-sort');
    const filePath = this.evalMessage(data.filePath, cache);
    const json = JSON.parse(fs.readFileSync(filePath));
    const sorting = this.evalMessage(data.sorting, cache);
    const length = this.evalMessage(data.length, cache);
    const response = this.evalMessage(data.response, cache);

    let jsonPath = `["${this.evalMessage(data.jsonPath, cache).replaceAll("/", `"]["`)}"]`;
    let top = ``;

    let obj = [];
    let result = [];
    let res = [];


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
      for (a = 0; a < j.length; a++) {
        let ex = res.filter(o => o.id == j[a].id)?.[0]    
        if (ex == undefined) res.push(j[a])
      }
    }

    var limits;
    if(length && length != "0") limits = length;
    else limits = res.length;

    for (b = (sorting == "1") ? limits : 0; (sorting == "1") ? (b >= 0) : (b < limits); (sorting == "1") ? b-- : b++) {
      if(res?.[b]?.id !== undefined) {
        let us = await this.findMemberOrUserFromID(res[b].id, cache.server);

        top += response
          .replace(`UserTag`, `${us.username}#${us.discriminator}`)
          .replace(`UserName`, us.username)
          .replace(`UserObject`, `<@${us.id}>`)
          .replace(`NumBefore`, b+1)
          .replace(`DataValue`, res?.[b]?.value) + `\n`
        
      }
    }

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(top, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
