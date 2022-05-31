  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  // ░█████░█░░░█░█████░█████░█████░██░██░░░
  // ░█░░░░░█░░░█░█░░░░░░░█░░░█░░░█░█░█░█░░░
  // ░█░░░░░█░░░█░█████░░░█░░░█░░░█░█░░░█░░░
  // ░█████░█████░▄▄▄▄█░░░█░░░█████░█░░░█░░░
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  // ░████░░░███░░█████░░███░░░░░░░░░░░░░░░░
  // ░█░░░█░█░░░█░░░█░░░█░░░█░░▄▄░░░███░░░░░
  // ░█░░░█░█▀▀▀█░░░█░░░█▀▀▀█░░▄█░░░█░█░░░░░
  // ░████░░█░░░█░░░█░░░█░░░█░░█▄░▄░███░░░░░
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  // ░█░░░░█░░█░░░░░█░████░█░▄▀░████░
  // ░████░████░░░░░█░█░░░░█▄▀░░█░░█░
  // ░█░░█░░░░█░░░░░█░████░█░█░░████░
  // ░████░████░░████░█▄▄▄░█░░█░█░░█░
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

  module.exports = {
    name: 'Store Custom Data 2.0',
    section: 'Custom Data',
    fields: [
      'filePath',
      'jsonPath',
      'task',
      'text',
      'from',
      'index',
      'varName',
      'storage'
    ],
  
    meta: {
      version: '3.0.0',
      preciseCheck: false,
      author: 'JMODS',
      authorUrl: 'https://github.com/ContentJeka/JMODS',
      downloadURL: 'https://github.com/ContentJeka/JMODS/blob/main/actions/store_custom_data.js',
    },
  
    subtitle(data) {
      const file = data.filePath.split("/")[data.filePath.split("/").length - 1];
      const path = data.jsonPath
      switch(data.task) {
        case "0":
          switch(data.from) {
            case "0":
              text = `<b>Получить значение</b> из <b>${path}</b>`
              break;
            case "1":
              text = `<b>Получить значение</b> из массива <b>${path}</b> под индексом <b>${data.index == undefined ? 0 : data.index}</b>`
          }
          break;
        case "1":
          text = `<b>Выполнить цикл по массиву ${path}</b> с текстом <span style="padding: 2px;background: rgba(0, 0, 0, 0.4)">${data.text}</b>`
          break;
      }
      return text
    },
  
    variableStorage(data, varType) {
        if (parseInt(data.storage, 10) !== varType) return;
        switch(data.task) {
          case "0":
            switch(data.from) {
              case "0":
                return [data.varName, 'Custom Data Value from Object'];
                break;
              case "1":
                return [data.varName, 'Custom Data Value from Array'];
                break;
            }
            break; 
          case "1":
            return [data.varName, 'Custom Data Array'];
            break;
        }
    },
  
    html() {
      return `
      <img id="top" src="https://images-ext-2.discordapp.net/external/hIgwudQ09P-w9CZQbcFoNyoKvGwgL8f1q5ycPF9Xg_Y/https/i.imgur.com/x5ikLRe.png" style="filter: opacity(0.025);left: 50%;top: 190px; position:absolute;">
      <div id="catSS" style="display: none;
      background-color: rgba(0, 0, 0, 0.8);
      width: 100vw;
      height: 100vh;
      position: absolute;
      left: 0;
      z-index: 100;
      top: 0;">
        <div style="position:absolute; z-index: 101; margin: calc(50vh - 242px) calc(50vw - 100px) calc(50vh - 100px) calc(50vw - 242px)">
          <img src="https://images-ext-1.discordapp.net/external/S93CpkCNSuBUMr5kKJBUeh3RFcrfD-I3Yxw30A6LLjg/https/i.imgur.com/69Kg9mB.png"/>
          <span style="position: absolute;
          margin-left: 200px;
          font-size: 20px;
          width: 100vw;
          top: 25px;">Мяу, тебе нужна помощь по Custom Data?</span>
          <a href="https://github.com/ContentJeka/JMODS/wiki" style="width: 190%;
          height: 40px;
          border-radius: 15px;
          color: #000;
          font-weight: 600;
          border: none;
          background: #fff;
          position: absolute;
          top: 54px;
          margin-left: 200px;
          box-shadow: 0px 0px 49px 6px rgb(255 255 255 / 20%);
          text-align: center;
          padding: 10px;">Да!</a>
          <button onclick="glob.onnoclicked()" style="width: 190%;
          height: 40px;
          border-radius: 15px;
          color: #fff;
          font-weight: 600;
          border: solid #fff 1px;
          background: rgba(256, 256, 256, 0.1);
          position: absolute;
          top: 112px;
          margin-left: 200px;
          box-shadow: 0px 0px 49px 6px rgb(255 255 255 / 20%);">Нет</button>
        </div>
      </div>
      <div id="blcbg" style="display: none;position: absolute; background-color: rgba(0, 0, 0, 0.7); left: 0; top: 0; z-index: 100; width: 100vw; height: 100vh"></div>
      <div id="selectpath" style="
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #fff;
          width: calc(100vw - 50px);
          height: calc(100vh - 110px);
          /* padding: 25px; */
          margin: 25px;
          z-index: 1002;
          border-radius: 15px
      ">
          <img id="closepath" onclick="document.getElementById('blcbg').style.display = 'none'; document.getElementById('selectpath').style.display = 'none';document.getElementById('closepath').style.display = 'none'" style="display:none;position:absolute; right: 0; padding: 15px; filter: opacity(0.3)" src="https://images-ext-1.discordapp.net/external/AohVSagpV1CiV7kOUU_omxMk079tnPjn3L4Cz1r5by8/https/i.imgur.com/XHQFG7Q.png?width=10&height=10"/>
          <div id="files" style="padding:25px"></div>
      </div>
      <span class="dbminputlabel">Путь к файлу</span><br>
      <input id="filePath" class="round" type="text" onchange="glob.fileext()" value="./data/" placeholder="./data/top.json">
      <img onclick="document.getElementById('blcbg').style.display = null; document.getElementById('selectpath').style.display = null;document.getElementById('closepath').style.display = null" style="cursor: pointer;right: 0; margin-top: -25px;margin-right: 4%;position: absolute;filter: invert(1) opacity(0.5)" src="https://images-ext-1.discordapp.net/external/kI1YG6DhcpzESJ5OQo4WaqQIxhuva2VKC8Q84mz3S88/https/i.imgur.com/wSvljNY.png?width=20&height=20"/><br>
      <span class="dbminputlabel">JSON путь*</span><br>
      <input id="jsonPath" onchange="glob.onJSONpath(this)" class="round" type="text" placeholder="\${tempVars('serverID')}/economy"><br>
      <style>
            .si {
                padding: 3px 5px 3px 5px;
                background-color: var(--label-background-color);
                border: solid 1px var(--label-border);
                border-radius: 4px;
                box-shadow: 3px 0px 2px var(--label-shadow-color);
            }
      </style>
      <span class="si">Я хочу</span>
      <select id="task" class="si" style="margin-left:2px" onchange="glob.onValue(this)">
        <option value="0" selected>Получить значение</option>
        <option value="1">Цикл по массиву</option>
      </select>
      <select id="from" class="si" style="margin-left:2px" onchange="glob.froms(this)">
        <option value="0" selected>Из объекта</option>
        <option value="1">Из массива</option>
      </select>
      <span id="indextitle" style="position: absolute;
      margin-top: -24px;" class="dbminputlabel">Индекс</span><br>
      <input id="index" style="width: 30%;margin-top: -26px;margin-left: 333px;" value="0" class="round" type="text" placeholder="^ - последний, 0 - первый"><br><br>
      <div class="11" style="display: none;background-repeat: repeat;width: 100%; padding:10px; border:1px solid #fff; border-radius: 4px">
        <span class="dbminputlabel">Вывод JS (\${item} если массив без объектов)</span><br>
        <input id="text" class="round" type="text" onchange="" value="" placeholder="\${player} - \${bank} в банке, \${cash} на руках.\\n">
      </div><br>
      <store-in-variable dropdownLabel="Сохранить в" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
      <div id="cat1" style="position:absolute;bottom: -120px;cursor:pointer">
         <img id="catimg" onclick="glob.catclick(this)" style="transition: 3s" src="https://images-ext-1.discordapp.net/external/LhQujrHiACY_jl0ijETfnSiUk1TzkOW-hoa--e4dTyk/https/i.imgur.com/upzrNFx.png"/> 
        </div>
      `;
    },
  
    async init() {
        const { glob, document } = this;
        
        async function design() {
          document.getElementById("top").setAttribute("src", "https://images-ext-2.discordapp.net/external/grnsw2CY3L057fxnUPVTnPaD0-abVirbCLvsKN_pMpY/https/i.imgur.com/VPJLfxT.png")
          document.getElementsByClassName("pusher")[0].style.background = "#0d1117"
          document.getElementById("theHead").style.background = "#161b22"
          document.getElementsByClassName("action-footer")[0].style.background = "#161b22"
          document.getElementById("action-label").style.background = "#21262d"
          document.getElementById("action-label").style.border = "1px solid #31363d"
          document.getElementById("action-label").style.color = "#dce0db"
          document.getElementById("createAction").style.background = "#21262d"
          document.getElementById("createAction").style.border = "1px solid #31363d"
          document.getElementById("createAction").style.color = "#dce0db"
          for(let i = 0; i < document.getElementsByClassName("round").length; i++) {
            document.getElementsByClassName("round")[i].style.background = "#0d1117"
            document.getElementsByClassName("round")[i].style.border = "1px solid #31363d"
            document.getElementsByClassName("round")[i].style.color = "#dce0db"
          }
          for(let i = 0; i < document.getElementsByClassName("dbminputlabel").length; i++) {
            document.getElementsByClassName("dbminputlabel")[i].style.background = "#21262d"
            document.getElementsByClassName("dbminputlabel")[i].style.border = "1px solid #31363d"
            document.getElementsByClassName("dbminputlabel")[i].style.color = "#dce0db"
          }
          for(let i = 0; i < document.getElementsByClassName("si").length; i++) {
            document.getElementsByClassName("si")[i].style.background = "#21262d"
            document.getElementsByClassName("si")[i].style.border = "1px solid #31363d"
            document.getElementsByClassName("si")[i].style.color = "#dce0db"
          }
          document.getElementsByClassName("11")[0].style.border = "1px solid #31363d"
          document.getElementById("storage").style.background = "#21262d"
          document.getElementById("storage").style.border = "1px solid #31363d"
          document.getElementById("storage").style.color = "#dce0db"
          document.getElementById("catimg").style.filter = "opacity(0.3)"
        }
  
        glob.onJSONpath = async function (event) {
          if(event.value == "JMODS Топ") {
            localStorage.setItem(design, true)
            design()
          } else if (event.value == "JMODS Не топ") {
            localStorage.setItem(design, false)
            window.location.reload()
          }
        }
  
        if(localStorage.getItem(design) == "true") {
          design()
        }
  
  
        document.getElementsByClassName("dbminputlabel")[document.getElementsByClassName("dbminputlabel").length - 1].innerHTML = "Имя переменной"
  
        let clicked = 0;
        let expert = 0;
        const fetch = require("node-fetch")
        const fs = require("fs-extra")
        let project2 = await JSON.parse(fs.readFileSync("./settings.json"))["current-project"]
        let files = fs.readdirSync(`${project2}/data`)
        document.getElementById("files").innerHTML = `<style>
        #maindiv {
          cursor: pointer;
          margin: 0 0 0 0;
          padding: 0;
          color: #000;
          display:inline-flex;
          width:100%;
          height: 20px;
          border: solid #fff 1px;
          align-items: center;
        }
        
        #maindiv:hover {
          margin: 0 0 0 0;
          display:inline-flex;
          padding: 0;
          width:100%;
          height: 20px;
          background-color: #E5F3FF;
          align-items: center;
        }
        </style>`
        for(let i = 0; i < files.length; i++) {
            html = document.getElementById("files").innerHTML;
            html += `
              <div id="maindiv" onclick="document.getElementById('filePath').value = './data/${files[i]}'; document.getElementById('blcbg').style.display = 'none'; document.getElementById('selectpath').style.display = 'none';document.getElementById('closepath').style.display = 'none'">
                  <img style="width:20px;"src="https://images-ext-2.discordapp.net/external/hcsToQtHWkfgzBF1P1Ru4Nvwv1xkFgVrmEOqnKrB8GI/https/i.imgur.com/VYTZlqS.png"/>
                  <p style="font-size: 12px; font-weight: 500; margin-left: 2px">${files[i]}</p>
              </div>
            `
            document.getElementById("files").innerHTML = html
        }
  
        glob.onValue = async function (event)  {
          if(event.value == "1") {
            glob.froms(document.getElementById("from"))
            document.getElementsByClassName("11")[0].style.display = null;
            document.getElementById("from").style.display = 'none';
            document.getElementById("indextitle").style.display = 'none';
            document.getElementById("index").style.display = 'none';
          } else {
            glob.froms(document.getElementById("from"))
            document.getElementsByClassName("11")[0].style.display = "none";
            document.getElementById("from").style.display = null;
            document.getElementById("indextitle").style.display = null;
            document.getElementById("index").style.display = null;
          }
        }
  
        glob.froms = async function (event) {
          if(event.value == "0") {
            document.getElementById("indextitle").style.display = 'none';
            document.getElementById("index").style.display = 'none';
          } else {
            document.getElementById("indextitle").style.display = null;
            document.getElementById("index").style.display = null;
          }
        }
  
        glob.catclick = async function () {
          document.getElementById("catSS").style.display = null
        }
  
        glob.onnoclicked = async function (event) {
          document.getElementById("catSS").style.display = "none";
          clicked += 1;
          if(clicked > 2) {
              document.getElementById("catimg").style.transform = "translate(0px, 50%)"
          }
        }
  
        glob.onyesclicked = async function () {
          document.getElementById("catSL").style.display = "none";
        }
  
        glob.onValue(document.getElementById("task"))
        glob.froms(document.getElementById("from"))
    },
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const fs = require("fs-extra");
  
      const filePath = this.evalMessage(data.filePath, cache);
      let json = JSON.parse(fs.readFileSync(filePath))
      const jsonPath = `json["${this.evalMessage(data.jsonPath, cache).replaceAll("/", `"]["`)}"]`
      const task = this.evalMessage(data.task, cache);
      const from = this.evalMessage(data.from, cache);
      const index = !this.evalMessage(data.index, cache) ? "0" : this.evalMessage(data.index, cache);
      let result = undefined;
      if (data.text) {
        text = `${data.text.replaceAll("${", `\${`)}`;
      } else {
        text = undefined
      }
  
      if(task == "0") {
        switch(from) {
          case "0":
            result = eval(jsonPath);
            break;
          case "1":
            result = eval(`${jsonPath}[${index}]`)
            break;
        }
      } else {
        if(Object.keys(eval(jsonPath)?.[0]).toString() !== "0") {
          result = '';
          evals = '';
          for(let i = 0; i < eval(jsonPath).length; i++) {
            for(let a = 0; a < Object.keys(eval(jsonPath)[i]).length; a++) {
              evals += `${Object.keys(eval(jsonPath)[i])[a]} = "${eval(jsonPath)[i][Object.keys(eval(jsonPath)[i])[a]]}";\n`
            }
            evals += `result += this.evalMessage(text, cache);\n`;
          }
          result = eval(evals)
        } else {
          result = '';
          for(let i = 0; i < eval(jsonPath).length; i++) {
            item = eval(jsonPath)[i];
            result += this.evalMessage(`${text}`, cache)
          }
        }
      }
  
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
      this.callNextAction(cache);
    },
  
    mod() {},
  };