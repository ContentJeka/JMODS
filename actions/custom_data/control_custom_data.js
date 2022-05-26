var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░█████░█░░░█░█████░█████░█████░██░██░░░
// ░█░░░░░█░░░█░█░░░░░░░█░░░█░░░█░█░█░█░░░
// ░█░░░░░█░░░█░█████░░░█░░░█░░░█░█░░░█░░░
// ░█████░█████░▄▄▄▄█░░░█░░░█████░█░░░█░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░████░░░███░░█████░░███░░░░░░░░░░░░░░░░
// ░█░░░█░█░░░█░░░█░░░█░░░█░░▄▄░░░▄▄▄░░░▄░
// ░█░░░█░█▀▀▀█░░░█░░░█▀▀▀█░░▄█░░░█░█░░░█░
// ░████░░█░░░█░░░█░░░█░░░█░░█▄░▄░█▄█░▄░█░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░█░░░░█░░█░░░░░█░████░█░▄▀░████░
// ░████░████░░░░░█░█░░░░█▄▀░░█░░█░
// ░█░░█░░░░█░░░░░█░████░█░█░░████░
// ░████░████░░████░█▄▄▄░█░░█░█░░█░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

module.exports = {
    // Название
    name: 'Control Custom Data 2.0',
    // Группа
    section: 'Custom Data',
    // Поля
    fields: [
        "filePath",
        "jsonPath",
        "type",
        "title",
        "val",
        "task",
        "index",
    ],
  
    // Мета данные (useless)
    meta: {
      version: '2.0.1',
      preciseCheck: false,
      author: 'JMODS',
      authorUrl: 'https://github.com/ContentJeka/JMODS',
      downloadURL: 'https://github.com/ContentJeka/JMODS/blob/main/actions/control_custom_data.js',
    },
  
    // субтайтлы
    subtitle(data) {
      let type;
      let text;
      let title = data.title;
      let path = `<b>${data.filePath.split("/")[data.filePath.split("/").length - 1]}</b>`
      let value = data.value;
      switch (data.type) {
        case "0":
          type = "<b>Объект</b>";
          text = `под названием <b>"${title}"</b>`;
          break;
        case "1":
          type = "<b>Массив</b>";
          text = `под названием <b>"${title}"</b>`;
          break;
        case "2":
          type = "<b>Значение</b>"
          text = `под названием <b>"${title}"</b>, со значением <b>${value}</b>`;
          break;
      };

      let task;
      switch (data.task) {
        case "0":
          task = "<b>Создать</b>";
          break;
        case "1":
          task = "<b>Удалить</b>";
          return `${task} ${type} в ${path}`
          break;
      };
      
      return `${task} ${type} ${text} в ${path}`

    },
  
    // Переменные (useless)
    variableStorage(data, varType) {
        if (parseInt(data.storage, 10) !== varType) return;
        return [data.varName, 'Custom Data JSON'];
    },
  
    // HTML - внешний вид
    html(data, isEvent) {
      return `
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
      <div id="info" version="2.0.1"></div>
      <!-- CHECK FOR UPDATES -->
      <style>
        .cfu {
            padding: 2px 3px 2px 3px;
            background-color: var(--label-background-color);
            border: solid 1px var(--label-border);
            border-radius: 4px;
            box-shadow: 3px 0px 2px var(--label-shadow-color);
            font-size: 16px;
        }

        p {
          margin: 0em 0em 0.5em
        }
      </style>
      <div id="upds" style="text-align: center; width: 100%; padding:6px; border:1px solid #fff; border-radius: 4px">
        <p id="jackallox">Обнаружено обновление!</p>
        <p id="kailtop">Установленная версия: <span id="current" class="cfu"></span>, доступная версия: <span id="serv" class="cfu"></span></p>
        <button onclick="glob.update()" class="cfu" id="jekatop" style="font-weight: bold; width: 80%; font-size: 15px">Обновить!</button>
      </div><br>
      <!-- -->
      <span class="dbminputlabel">Путь к файлу</span><br>
      <input id="filePath" class="round" type="text" onchange="glob.fileext()" placeholder="./data/top.json">
      <span id="ext"style="position:absolute;font-size: 12px; color: red">Файла не существует, создадим! 😇</span><br>

      <div style="width:75%;float:left;">
        <span class="dbminputlabel">JSON путь</span><br>
        <input id="jsonPath" class="round" type="text" placeholder="Оставь пустым если здесь впервые">
      </div>
      <div style="float:left;padding-left: 5%;width:20%">
        <span style="position:absolute;font-size: 8px; color: #ffffff; margin-top: -5px">0 - первый, ^ - последний</span><br>
        <span class="dbminputlabel">Индекс</span><br>
        <input id="index" class="round" onchange="glob.index(this)" type="text" value="N" placeholder="N - нету">
        <span id="invalidIndex" style="position:absolute;font-size: 12px; color: red">Индекс только из чисел!</span>
      </div><br><br><br><br>

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
      <select id="task" class="si" style="margin-left:2px" onchange="glob.onDelete(this)">
        <option value="0" selected>Создать / Добавить</option>
        <option value="1">Удалить</option>
      </select>
      <select id="type" class="si" style="margin-left:2px" onchange="glob.onValue2(this)">
        <option value="0" selected>Объект</option>
        <option value="1">Массив</option>
        <option value="2">Значение</option>
     </select><br><br>

     <div class="11" style="width: 100%; padding:10px; border:1px solid #fff; border-radius: 4px">
     <style>
     .hide {
         display: none !important
     }
  </style>
        <div class="12">
            <span class="dbminputlabel">Название (используется в "JSON путь")</span><br>
            <input id="title" class="round" onchange="glob.text(this)" type="text" placeholder=""><br>
        </div>
        <div class="13">
            <span class="dbminputlabel">Значение (текст: "Я использую Custom Data!")</span>
            <input id="val" class="round" onchange="glob.text(this)" type="text" placeholder="">
        </div>
        </div>
    </div><br>
    <div id="prew"style="color:rgb(171, 178, 191); font-weight:400;background-color:rgb(40, 44, 52);background:rgb(40, 44, 52);display:block;padding: .5em;border-radius:4px">
     <div id="preview"></div>
    </div>
     </div>

    <div id="cat1" style="position:absolute;bottom: -120px;cursor:pointer">
     <img  onclick="glob.catclick()" src="https://images-ext-1.discordapp.net/external/LhQujrHiACY_jl0ijETfnSiUk1TzkOW-hoa--e4dTyk/https/i.imgur.com/upzrNFx.png"/> 
    </div>
     `;
    },

    // Инит (useless)
    async init() {

        const { glob, document } = this;

        const fetch = require("node-fetch")

        let csversion = document.getElementById("info").getAttribute("version")
        document.getElementById("current").innerHTML = csversion
        let cfg;
        cfg = await fetch("https://cdn.jsdelivr.net/gh/ContentJeka/JMODS@latest/config.json", requestOptions)
          .then(res => res.json())
          .then(data => cfg = data)
        let serversion = cfg.versions.customData.control
        document.getElementById("serv").innerHTML = serversion
        if(csversion !== serversion) {
          document.getElementById("upds").style.display = null;
        } else {
          document.getElementById("upds").style.display = "none";
        }

        glob.catclick = async function () {
          document.getElementById("catSS").style.display = null
        }

        glob.onnoclicked = async function () {
          document.getElementById("catSS").style.display = "none";
        }

        glob.onyesclicked = async function () {
          document.getElementById("catSL").style.display = "none";
        }

        glob.update = async function () {
          let file;
          file = await fetch("https://cdn.jsdelivr.net/gh/ContentJeka/JMODS@main/actions/custom_data/control_custom_data.js", requestOptions)
            .then(res => res.text())
            .then(data => file = data)
          const fs = require("fs-extra")
          fs.writeFileSync("./actions/control_custom_data.js", file)
          document.getElementById("jackallox").innerHTML = `Нажмите <span class="cfu">CTRL + SHIFT + U</span> для обновления`
          document.getElementById("kailtop").innerHTML = null
          document.getElementById("jekatop").style.display = "none"
        }

        glob.fileext = async function () {
          const fs = require("fs-extra")
          let project2 = await JSON.parse(fs.readFileSync("./settings.json"))["current-project"]
          let path = document.getElementById("filePath").value
          if(!fs.existsSync(`${project2}/${path.slice(2)}`)) {
            document.getElementById("ext").style.display = null;
          } else {
            document.getElementById("ext").style.display = "none";
          }
        }

          glob.onValue2 = function (event2) {
            if (event2.value === "2") {
              document.getElementsByClassName("13")[0].style.display = null;
            } else {
              document.getElementsByClassName("13")[0].style.display = "none";
            }
          };

          glob.index = function (event) {
            if(/^([\d])+$/.test(event.value) || event.value == "N" || event.value == "^") {
              document.getElementById("invalidIndex").style.display = "none";
            } else {
              document.getElementById("invalidIndex").style.display = null;
            }
          };

        glob.onDelete = function (event) {
          if (event.value === "1") {
            document.getElementsByClassName("11")[0].style.display = "none";
            document.getElementById("prew").style.display = "none";
          } else {
            document.getElementsByClassName("11")[0].style.display = null;
            document.getElementById("prew").style.display = null;
          }
        };

        glob.text = function (event) {
            let name = document.getElementById("title").value
            let value = document.getElementById("val").value
            let select = document.getElementById("type").value
            if(select == "2") {
                document.getElementById("preview").innerHTML = `<span style="color:rgb(152, 195, 121); font-weight:400;">"${name}"</span>: <span style="color:rgb(152, 195, 121); font-weight:400;">${value}</span>`
            } else if (select == "1") {document.getElementById("preview").innerHTML = `<span style="color:rgb(152, 195, 121); font-weight:400;">"${name}"</span>: []`} else document.getElementById("preview").innerHTML = `<span style="color:rgb(152, 195, 121); font-weight:400;">"${name}"</span>: {}`
          };

        glob.onDelete(document.getElementById("task"))
        glob.text()
        glob.index(document.getElementById("index"))
        glob.fileext()
        glob.onValue2(document.getElementById("type"))
    },
  
    // Действие
    async action(cache) {
        const data = cache.actions[cache.index];
        const Mods = this.getMods();

        const fs = Mods.require("fs-extra");

        const filePath = this.evalMessage(data.filePath, cache);
        let jsonPath = this.evalMessage(data.jsonPath, cache).replaceAll("/",`"]["`)
        const select = this.evalMessage(data.type, cache);
        const title = this.evalMessage(data.title, cache);
        let value = this.evalMessage(data.val, cache);
        const task = this.evalMessage(data.task, cache);
        const index = this.evalMessage(data.index, cache);
        let type = "object";
        let file = '';

        if(fs.existsSync(filePath)) {
            file = JSON.parse(fs.readFileSync(filePath))
        } else {
            console.error("Файл не найден, я создам новый для вас (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")
            fs.writeFileSync(filePath, "{}")
            console.error(`Файл создан в ${filePath}`)
            file = JSON.parse(fs.readFileSync(filePath))
        };

        if(jsonPath !== "") {
          jsonPath = `["${jsonPath}"]`
        } else {
          jsonPath = ``
        }

        // let arr = index !== "N" ? `[${index}]` : ""
        let arr = ``;
        if(index !== "N" && index !== "^") {
          arr = `[${index}]`;
        } else if (index == "N") {
          arr = ``;
        } else if (index == "^") {
          arr = `[${eval(`file${jsonPath}`).length - 1}]`
        } else if (!/^([\d])+$/g.test(index)) {
          arr = ``
          return
        };

        if(task == "0") {
            if(Array.isArray(eval(`file${jsonPath}`))) {
                type = "array"
            }

            if (type !== "array" && index !== "N" && index !== "^") {
                if(select == 0) {
                    eval(`file${jsonPath}["${title}"]${arr} = {}`)
                    fs.writeFileSync(filePath, JSON.stringify(file,undefined,4))    
                } else if (select == 1) {
                    eval(`file${jsonPath}["${title}"]${arr} = []`)
                    fs.writeFileSync(filePath, JSON.stringify(file,undefined,4))      
                } else {
                    if(/(\+|\-|\/|\*)/g.test(value)) {
                      value = eval(`file${jsonPath}["${title}"]${arr} ${value.match(/(\+|\-|\/|\*)/g)[0]} ${value.slice(1)}`)
                    }
                    eval(`file${jsonPath}["${title}"]${arr} = ${value}`)
                    fs.writeFileSync(filePath, JSON.stringify(file,undefined,4))    
                }
            } else if (type == "array" && index == "N") {
                if(select == 0) {
                    eval(`file${jsonPath}${arr}.push({})`)
                    fs.writeFileSync(filePath, JSON.stringify(file,undefined,4))    
                } else if (select == 1) {
                    eval(`file${jsonPath}${arr}.push([])`)
                    fs.writeFileSync(filePath, JSON.stringify(file,undefined,4))    
                } else {   
                    eval(`file${jsonPath}${arr}.push(${value})`)
                    fs.writeFileSync(filePath, JSON.stringify(file,undefined,4))    
                }
            } else if (index !== "N") {
              if(select == 0) {
                  eval(`file${jsonPath}${arr} = {}`)
                  fs.writeFileSync(filePath, JSON.stringify(file,undefined,4))    
              } else if (select == 1) {
                  eval(`file${jsonPath}${arr} = []`)
                  fs.writeFileSync(filePath, JSON.stringify(file,undefined,4))    
              } else {   
                  eval(`file${jsonPath}${arr} = ${value}`)
                  fs.writeFileSync(filePath, JSON.stringify(file,undefined,4))    
            }

        }

        this.callNextAction(cache);
    }},
  
    // (useless)
    mod() {},
  };