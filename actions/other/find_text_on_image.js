
  module.exports = {
      // Название
      name: 'Get Text From Image',
      // Группа
      section: 'Other Staff',
      // Поля
      fields: [
          "image",
          "langs",
          "storage",
          "debug",
          "varName"
      ],
    
      // Мета данные (useless)
      meta: {
        version: '3.0.0',
        preciseCheck: false,
        author: 'JMODS',
        authorUrl: 'https://github.com/ContentJeka/JMODS',
        downloadURL: 'https://github.com/ContentJeka/JMODS/blob/main/actions/other/find_text_on_image.js',
      },
    
      // субтайтлы
      subtitle(data) {
        return `Взять текст из <b>${data.image}</b> и сохранить в <b>${data.varName}</b>` 
      },
    
      // Переменные (useless)
      variableStorage(data, varType) {
          if (parseInt(data.storage, 10) !== varType) return;
          return [data.varName, 'Text from image'];
      },
    
      // HTML - внешний вид
      html(data, isEvent) {
        return `
          <span class="dbminputlabel">Ссылка на изображение / Путь к файлу</span><br>
          <input id="image" class="round" type="text" ><br>
          <span class="dbminputlabel">Языки</span><br>
          <input id="langs" class="round" placeholder="eng+rus" type="text" ><br>
          <span class="dbminputlabel">Отображать прогресс</span><br>
          <select id="debug" class="round" style="">
            <option value="0">Да</option>
            <option value="1" selected>Нет</option>
          </select><br>
          <store-in-variable id="strvar" dropdownLabel="Сохранить в" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
          `;
      },
  
      // Инит (useless)
      async init() {},
    
      // Действие
    async action(cache) {
        const data = cache.actions[cache.index];
        const image = this.evalMessage(data.image, cache)
        const langs = this.evalMessage(data.langs, cache)

        const { createWorker } = require('tesseract.js');

        const worker = createWorker({
          logger: m => {
            if(data.debug == "0") {
              console.log(`${m.status}: ${m.progress}`)
            }
          }, // Add logger here
        });

        (async () => {
          await worker.load();
          await worker.loadLanguage(langs);
          await worker.initialize(langs);
          await worker.recognize(image).then(text => {this.storeValue(text.data.text,  parseInt(data.storage, 10), data.varName, cache); this.callNextAction(cache)});
          await worker.terminate();
        })();
    },
    
      // (useless)
      mod() {},
    };