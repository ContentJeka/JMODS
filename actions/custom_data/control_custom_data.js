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
// ░█░░░█░█░░░█░░░█░░░█░░░█░░▄▄░░░▄▄░░░░░░
// ░█░░░█░█▀▀▀█░░░█░░░█▀▀▀█░░▄█░░░██░░░░░░
// ░████░░█░░░█░░░█░░░█░░░█░░█▄░▄░░█░░░░░░
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
        "expert?",
        "filePath",
        "jsonPath",
        "filePathExpert",
        "type",
        "title",
        "val",
        "task",
        "index",
        "indexcomparison",
        "ifindexmorethan1",
        "indexval",
        "indexkey",
        "indexstorage",
        "indexvarName",
        "valuesExpert"
    ],
  
    // Мета данные (useless)
    meta: {
      version: '3.0.0',
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
          if(title !== "") {
              text = `под названием <b>"${title}"</b>`;
          } else {
              text = ""
          }
          break;
        case "1":
          type = "<b>Массив</b>";
          if(title !== "") {
              text = `под названием <b>"${title}"</b>`;
          } else {
              text = ""
          }
          break;
        case "2":
          type = "<b>Значение</b>"
          if(title !== "" && value !== undefined) {
              text = `под названием <b>"${title}"</b>, со значением <b>${value}</b>`;
          } else {
              text = ""
          }
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
        if (parseInt(data.indexstorage, 10) !== varType) return;
        return [data.indexvarName, 'Custom Data Array Index'];
    },
  
    // HTML - внешний вид
    html(data, isEvent) {
      return `
      <input style="display: none" id="expert?" value="false"/>
      <button id="expertbtn"onclick="glob.expert(this)" style="padding: 10px;position:absolute; top: 0px; right: 0px;background: none; border: none; color: rgba(256, 256, 256, 0.6); font-size: 12px">Режим Эксперта</button>
      <style>.hide {display: none;}</style>
      <div id="expert" class="hide">
        <br>
        <span class="dbminputlabel">Путь к файлу</span><br>
        <input id="filePathExpert" class="round" type="text" onchange="glob.fileext()" value="./data/" placeholder="./data/top.json"><br>
        <tab label="Ключ" icon="list">
              <div style="padding: 8px">
                <dialog-list id="valuesExpert" fields='["key", "task2", "value", "jsonPath2"]' dialogTitle="Управление Ключём" dialogWidth="540" dialogHeight="270" listLabel="Ключи" listStyle="height: 35vh;" itemName="key" itemCols="1" itemHeight="30px;" itemTextFunction="\`<span style='padding: 3px; letter-spacing: 1px; background-color: rgba(0, 0, 0, 0.3);border-radius: 5px'>\`+data.task2+\`</span> - Путь: <span style='padding: 3px; letter-spacing: 1px; background-color: rgba(0, 0, 0, 0.3);border-radius: 5px'>\`+data.jsonPath2+\`</span> - <span style='padding: 3px; letter-spacing: 1px; background-color: rgba(0, 0, 0, 0.3);border-radius: 5px'>&quot;\`+data.key+\`&quot;: \`+data.value+\`</span>\`" itemStyle="text-align: left; line-height: 30px;">
                  <div style="padding: 16px;">
                    <div style="width: 80%;float:left;">
                      <span class="dbminputlabel">JSON путь</span><br>
                      <input id="jsonPath2" class="round" type="text" value="json?. (...)" placeholder="Крутой чел умеет этим пользоваться (вместо '/' - '?.' вместо 'Индекс' - '[индекс]')"><br>
                    </div>
                    <div style="padding-left: 2.5%;width: 17.5%;float:left;">
                      <span class="dbminputlabel">Тип</span><br>
                      <select id="task2" class="round" onchange="if(this.value == '[+]') {   document.getElementById('expertval').style.width = '100%';document.getElementById('expertval').style['padding-left'] = '0';  document.getElementById('expertkey').style.display = 'none';} else {  document.getElementById('expertval').style.width = '50%';  document.getElementById('expertkey').style.display = null;document.getElementById('expertval').style['padding-left'] = '5%';}">
                        <option value="{+}" selected>Объект</option>
                        <option value="[+]">Добавить в массив</option>
                      </select><br>
                      <script>
                      if(document.getElementById('task2').value == '[+]') {
                        document.getElementById('expertval').style.width = '100%';
                        document.getElementById('expertval').style['padding-left'] = '0';
                        document.getElementById('expertkey').style.display = 'none';
                      } else {
                        document.getElementById('expertval').style.width = '50%';
                        document.getElementById('expertkey').style.display = null;document.getElementById('expertval').style['padding-left'] = '5%';
                      }
                      </script>
                    </div>
                    <div id="expertkey"style="width: 47.5%;float:left;">
                      <span class="dbminputlabel">Ключ</span><br>
                      <input id="key" class="round" type="text" onchange="" value="money" placeholder="key"><br>
                    </div>
                    <div id="expertval" style="float:left;width: 50%; padding-left: 5%">
                      <span class="dbminputlabel">Значение</span><br>
                      <input id="value" class="round" type="text" onchange="" value="{}" placeholder="{}, а может [] или всё же 'value'?"><br>
                    </div>
                  </div>
                </dialog-list>
              </div>
            </tab>
      </div>
      <div id="def">
      <div id="indexfinder" class="si" style="transition:1s;display:none;z-index: 1000;position:absolute;/* padding:25px; */top: 0;margin: 25px;left: 0;width: calc(100vw - 50px);height: calc(100vh - 50px );padding: 25px;background-color: var(--label-background-color);border: solid 1px var(--label-border);border-radius: 4px;box-shadow: 3px 0px 2px var(--label-shadow-color);">
        <style>
          .si {
            padding: 3px 5px 3px 5px;
            background-color: var(--label-background-color);
            border: solid 1px var(--label-border);
            border-radius: 4px;
            box-shadow: 3px 0px 2px var(--label-shadow-color);
          }
        </style>  
        <span class="dbminputlabel">Условие</span><br>
        <select id="indexcomparison" class="round" style="" onchange="glob.indexcomp(this)">
          <option value="-1" selected>Не искать</option>
          <option value="0">Имеет ключ под названием</option>
          <option value="!0">Не имеет ключ под названием</option>
          <option value="1">Значение равно</option>
          <option value="!1">Значение не равно</option>
          <option value="2">Ключ = значение</option>
          <option value="!2">Ключ не = значение</option>
          <option value="3">Предмет под названием</option>
        </select><br>
        <div id="indexkeyd">
          <span class="dbminputlabel">Ключ</span><br>
          <input id="indexkey" class="round" onchange="" type="text" value="" placeholder=""><br>
        </div>
        <span class="dbminputlabel">Значение</span><br>
        <input id="indexval" class="round" onchange="" type="text" value="" placeholder=""><br>
        <span class="si">Если совпадений больше одного:</span>
        <select id="ifindexmorethan1" class="si" style="" onchange="glob.strvar(this)">
          <option value="0" selected>Использовать первый сверху</option>
          <option value="1">Использовать первый снизу</option>
          <option value="2">Использовать все</option>
        </select><br><br>
        <store-in-variable id="strvar" dropdownLabel="Сохранить в" selectId="indexstorage" variableContainerId="varNameContainer" variableInputId="indexvarName"></store-in-variable>
        <button onclick="document.getElementById('indexfinder').style.display = 'none';document.getElementById('blcbg').style.display = 'none';" class="tiny ui labeled icon button" style="bottom: 20px;position: absolute;width: 50vw;margin: 0 17vw 0 17vw;left: 0;" onclick=""><i class="search icon"></i><span id="createactionlabel">Найти</span></button>
      </div>
      <img id="dsntwrk" style="transition: 1s;width: 100vw; height: 100vh; position: absolute; left: 0; top: -100vh; z-index: 100000" src="https://images-ext-1.discordapp.net/external/NdDdsDjVGvuFgQNYOel_OKRVDnADx0FMGheHj0D1I7g/https/i.imgur.com/paJHIT7.png?width=993&amp;height=1292" />
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
              "> <img id="closepath" onclick="document.getElementById('blcbg').style.display = 'none'; document.getElementById('selectpath').style.display = 'none';document.getElementById('closepath').style.display = 'none'" style="display:none;position:absolute; right: 0; padding: 15px; filter: opacity(0.3)" src="https://images-ext-1.discordapp.net/external/AohVSagpV1CiV7kOUU_omxMk079tnPjn3L4Cz1r5by8/https/i.imgur.com/XHQFG7Q.png?width=10&amp;height=10" />
        <div id="files" style="padding:25px"></div>
      </div>
      <div id="catSS" style="display: none;
              background-color: rgba(0, 0, 0, 0.8);
              width: 100vw;
              height: 100vh;
              position: absolute;
              left: 0;
              z-index: 100;
              top: 0;">
        <div style="position:absolute; z-index: 101; margin: calc(50vh - 242px) calc(50vw - 100px) calc(50vh - 100px) calc(50vw - 242px)"> <img src="https://images-ext-1.discordapp.net/external/S93CpkCNSuBUMr5kKJBUeh3RFcrfD-I3Yxw30A6LLjg/https/i.imgur.com/69Kg9mB.png" /> <span style="position: absolute;
                  margin-left: 200px;
                  font-size: 20px;
                  width: 100vw;
                  top: 25px;">Мяу, тебе нужна помощь по Custom Data?</span> <a href="https://github.com/ContentJeka/JMODS/wiki" style="width: 190%;
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
      <div id="info" version="2.4"></div>
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
      </div>
      <br>
      <span class="dbminputlabel">Путь к файлу</span><br>
      <input id="filePath" class="round" type="text" onchange="glob.fileext()" value="./data/" placeholder="./data/top.json"> <img onclick="document.getElementById('blcbg').style.display = null; document.getElementById('selectpath').style.display = null;document.getElementById('closepath').style.display = null" style="cursor: pointer;right: 0; margin-top: -25px;margin-right: 4%;position: absolute;filter: invert(1) opacity(0.5)" src="https://images-ext-1.discordapp.net/external/kI1YG6DhcpzESJ5OQo4WaqQIxhuva2VKC8Q84mz3S88/https/i.imgur.com/wSvljNY.png?width=20&amp;height=20" /> <span id="ext" style="position:absolute;font-size: 12px; color: red">Файла не существует, создадим! 😇</span>
      <br>
      <div style="width:75%;float:left;">
        <span class="dbminputlabel">JSON путь</span><br>
        <input id="jsonPath" class="round" type="text" placeholder="Оставь пустым если здесь впервые"> </div>
      <div style="float:left;padding-left: 2.5%;width: 25%;">
        <span class="dbminputlabel">Индекс</span><br>
        <input id="index" class="round" onchange="glob.index(this)" type="text" value="N" placeholder="N - нету">
        <img onclick="document.getElementById('indexfinder').style.display = null;document.getElementById('blcbg').style.display = null;" style="cursor: pointer;right: 0; margin-top: -25px;margin-right: 4%;position: absolute;filter: invert(1) opacity(0.5)" src="https://images-ext-1.discordapp.net/external/kI1YG6DhcpzESJ5OQo4WaqQIxhuva2VKC8Q84mz3S88/https/i.imgur.com/wSvljNY.png?width=20&amp;height=20" />
        <span id="invalidIndex" style="position:absolute;font-size: 12px; color: red">Индекс только из чисел!</span> </div>
      <br>
      <br>
      <br>
      <br>
      <style>
      .si {
        padding: 3px 5px 3px 5px;
        background-color: var(--label-background-color);
        border: solid 1px var(--label-border);
        border-radius: 4px;
        box-shadow: 3px 0px 2px var(--label-shadow-color);
      }
      </style> <span class="si">Я хочу</span>
      <select id="task" class="si" style="margin-left:2px" onchange="glob.onDelete(this)">
        <option value="0" selected>Создать / Добавить</option>
        <option value="1">Удалить</option>
      </select>
      <select id="type" class="si" style="margin-left:2px" onchange="glob.onValue2(this)">
        <option value="0" selected>Объект</option>
        <option value="1">Массив</option>
        <option value="2">Значение</option>
      </select>
      <br>
      <br>
      <div class="11" style="background-repeat: repeat;width: 100%; padding:10px; border:1px solid #fff; border-radius: 4px">
        <style>
        .hide {
          display: none !important
        }
        </style>
        <div class="12"> <span class="dbminputlabel">Название (используется в "JSON путь")</span>
          <br>
          <input id="title" class="round" onchange="glob.text(this)" type="text" placeholder="">
          <br> </div>
        <div class="13"> <span class="dbminputlabel">Значение (текст: "Я использую Custom Data!")</span>
          <input id="val" class="round" onchange="glob.text(this)" type="text" placeholder=""> </div>
      </div>
      <br>
      <div id="prew" style="color:rgb(171, 178, 191); font-weight:400;background-color:rgb(40, 44, 52);background:rgb(40, 44, 52);display:block;padding: .5em;border-radius:4px">
        <div id="preview"></div>
      </div>
      <div id="cat1" style="position:absolute;bottom: -120px;cursor:pointer"> <img id="catimg" onclick="glob.catclick(this)" style="transition: 3s" src="https://images-ext-1.discordapp.net/external/LhQujrHiACY_jl0ijETfnSiUk1TzkOW-hoa--e4dTyk/https/i.imgur.com/upzrNFx.png" /> </div></div>
      `;
    
    },

    // Инит (useless)
    async init() {

        const { glob, document } = this;

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

        let csversion = document.getElementById("info").getAttribute("version")
        document.getElementById("current").innerHTML = csversion
        let cfg;
        cfg = await fetch("https://raw.githubusercontent.com/ContentJeka/JMODS/main/config.json", requestOptions)
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

        glob.onnoclicked = async function (event) {
          document.getElementById("catSS").style.display = "none";
          clicked += 1;
          if(clicked > 2) {
              document.getElementById("catimg").style.transform = "translate(0px, 50%)"
          }
        }

        glob.expert = async function (event) {
            document.getElementById("def").classList.toggle("hide")
            document.getElementById("expert").classList.toggle("hide")
            if(document.getElementById("def").classList?.[0]) {
              event.innerHTML = "Стандартный режим"
              document.getElementById("expert?").value = "true"
            } else {
              event.innerHTML = "Режим Эксперта"
              document.getElementById("expert?").value = "false"
            }
        }

        checkexpert = async function() {
          if(document.getElementById("expert?").value == "true") {
            document.getElementById("expertbtn").innerHTML = "Стандартный режим"
            document.getElementById("def").classList.add("hide")
            document.getElementById("expert").classList.remove("hide")
          } else {
            document.getElementById("expertbtn").innerHTML = "Режим Эксперта"
            document.getElementById("def").classList.remove("hide")
            document.getElementById("expert").classList.add("hide")
          }
        }

        glob.onyesclicked = async function () {
          document.getElementById("catSL").style.display = "none";
        }

        glob.indexcomp = async function (event) {
          if(event.value !== "-1") {
            document.getElementById("index").value = "\"Поиск\"";
            document.getElementById("invalidIndex").style.display = "none";
            document.getElementById("type").value = "2"
            document.getElementById("type").disabled = true
            document.getElementById("index").value = "N"
            document.getElementById("index").disabled = true
            glob.onValue2(document.getElementById("type"))
          } else {
            document.getElementById("type").disabled = false
            document.getElementById("index").disabled = false
          }
          if(event.value == "2" || event.value == "!2") {
            document.getElementById("indexkeyd").style.display = null;
          } else {
            document.getElementById("indexkeyd").style.display = "none";
          }
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

          glob.strvar = function (event) {
            if(event.value == "2") {
              document.getElementById("strvar").style.display = "none";
            } else {
              document.getElementById("strvar").style.display = null;
            }
          }

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
            if(name == "minecraft" || name == "Minecraft") {
                document.getElementsByClassName("11")[0].style["background-image"] = "url(https://images-ext-1.discordapp.net/external/BFKgskkBzULfP084CKKZWOJPJfZ1Sfxh7r3VhdUwNaI/https/i.imgur.com/x1c2YJ9.jpg) "
                document.getElementsByClassName("11")[0].style["background-size"] = "200px";
                document.getElementsByClassName("11")[0].style["border"] = "3px solid #542d07"
            }
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
        glob.indexcomp(document.getElementById("indexcomparison"))
        glob.strvar(document.getElementById("ifindexmorethan1"))
        checkexpert()
    },
  
    // Действие
  async action(cache) {
      const data = cache.actions[cache.index];

      const fs = require("fs-extra");

      if(data["expert?"] !== "true") { 

        const filePath = this.evalMessage(data.filePath, cache);

        if(!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "{}");
        }

        let arrQ = "";
        let jsonPath;
        let json = JSON.parse(fs.readFileSync(filePath))
        if(this.evalMessage(data.jsonPath, cache) == ``) {
            jsonPath = eval(`json`)
        } else {
            jsonPath = eval(`json?.["${this.evalMessage(data.jsonPath, cache).replaceAll("/",`"]?.["`)}"]`)
            const index = this.evalMessage(data.index, cache);

            switch (index) {
                case "N":
                    arrQ = "";
                    break;
                case "^":
                    arrQ = `[${jsonPath.length - 1}]`;
                    jsonPath = eval(`json?.["${this.evalMessage(data.jsonPath, cache).replaceAll("/",`"]?.["`)}"]${arrQ}`)
                    break;
                default:
                    arrQ = `[${index}]`
                    jsonPath = eval(`json?.["${this.evalMessage(data.jsonPath, cache).replaceAll("/",`"]?.["`)}"]${arrQ}`)
                    break;
            }
        }   

        const select = this.evalMessage(data.type, cache);
        const title = this.evalMessage(data.title, cache);
        let value = this.evalMessage(data.val, cache);
        const task = this.evalMessage(data.task, cache);

        if (/^(\*|\+|\-|\/)/gi.test(value)) {
            value = eval(`${Number(jsonPath[title])}${value.match(/^(\*|\+|\-|\/)/gi)[0]}${value.slice(1)}`)
        }

        // "indexcomparison",
        // "ifindexmorethan1",
        // "indexval",
        // "indexkey"

        let comp = data.indexcomparison
        let indexval = this.evalMessage(data.indexval, cache)
        let indexkey = this.evalMessage(data.indexkey, cache)
        let times = data.ifindexmorethan1
        if (task == 0) {
            if(comp !== "-1") {
                result = []
                indexQ = []
                switch(comp) {
                  case "0":
                    for(let i = 0; i < jsonPath.length; i++) {
                      for(let a = 0; a < Object.keys(jsonPath[i]).length;a++) {
                        if(Object.keys(jsonPath[i])[a] == indexval) {
                          result.push(jsonPath[i])
                          indexQ.push(i)
                        }
                      }
                    }
                    break;
                  case "!0":
                    for(let i = 0; i < jsonPath.length; i++) {
                      for(let a = 0; a < Object.keys(jsonPath[i]).length;a++) {
                        if(Object.keys(jsonPath[i])[a] !== indexval) {
                          result.push(jsonPath[i])
                          indexQ.push(i)
                        }
                      }
                    }
                    break;
                  case "1":
                    for(let i = 0; i < jsonPath.length; i++) {
                      for(let a = 0; a < Object.keys(jsonPath[i]).length; a++) {
                        if(jsonPath[i][Object.keys(jsonPath[i])[a]] == indexval) {
                          result.push(jsonPath[i])
                          indexQ.push(i)
                        }
                      }
                    }
                    break;
                  case "!1":
                    for(let i = 0; i < jsonPath.length; i++) {
                      for(let a = 0; a < Object.keys(jsonPath[i]).length; a++) {
                        if(jsonPath[i][Object.keys(jsonPath[i])[a]] !== indexval) {
                          result.push(jsonPath[i])
                          indexQ.push(i)
                        }
                      }
                    }
                    break;
                  case "2":
                    for(let i = 0; i < jsonPath.length; i++) {
                      for(let a = 0; a < Object.keys(jsonPath[i]).length; a++) {
                        if(jsonPath[i][Object.keys(jsonPath[i])[a]] == indexval && Object.keys(jsonPath[i])[a] == indexkey) {
                          result.push(jsonPath[i])
                          indexQ.push(i)
                        }
                      }
                    }
                    break;
                  case "!2":
                    for(let i = 0; i < jsonPath.length; i++) {
                      for(let a = 0; a < Object.keys(jsonPath[i]).length; a++) {
                        if(jsonPath[i][Object.keys(jsonPath[i])[a]] == indexval && Object.keys(jsonPath[i])[a] == indexkey) {
                          result.push(jsonPath[i])
                          indexQ.push(i)
                        }
                      }
                    }
                    break;
                  case "3":
                    for(let i = 0; i < jsonPath.length; i++) {
                      if (jsonPath[i] == indexval) {
                        result.push(i)
                        indexQ.push(i)
                      }
                    }
                }
                
                storage = parseInt(data.indexstorage, 10);
                varName = this.evalMessage(data.indexvarName, cache);

                try {
                switch(times) {
                  case "0":
                    indexQ = indexQ[0]
                    jsonPath[indexQ][title] = value
                    this.storeValue(indexQ, storage, varName, cache);
                    break;
                  case "1":
                    indexQ = indexQ[indexQ.length - 1]
                    jsonPath[indexQ][title] = value
                    this.storeValue(indexQ, storage, varName, cache);
                    break;
                  case "2":
                    for(let i = 0; i < indexQ.length; i++) {
                      jsonPath[indexQ[i]][title] = value 
                    }
                    break;
                }
                fs.writeFileSync(filePath, JSON.stringify(json, undefined, 4))
                } catch(e) {
                  console.error(`Произошла ошибка при записи данных '${title}' = ${value} (поиск в массиве)\nПолная ошибка: ${e}`)
                  return;
                }
            } else {
              try {
              if(!Array.isArray(jsonPath)) {
                  switch (select) {
                      case "0":
                          jsonPath[title] = {};
                          break;
                      case "1":
                          jsonPath[title] = [];
                          break;
                      case "2":
                          jsonPath[title] = value;
                          break;
                  }
              } else {
                  if(arrQ == "") {
                      switch (select) {
                          case "0":
                              jsonPath.push({});
                              break;
                          case "1":
                              jsonPath.push([]);
                              break;
                          case "2":
                              jsonPath.push(value);
                              break;
                      }
                  } else {
                      switch (select) {
                          case "0":
                              jsonPath = {};
                              break;
                          case "1":
                              jsonPath = [];
                              break;
                          case "2":
                              jsonPath = value;
                              break;
                      }
                  }
              }
            } catch(e) {
              console.error(`Произошла ошибка при записи данных '${title}' = ${value}\nПолная ошибка: ${e}`)
            }
            if(arrQ == "") {
                try {
                  eval(`delete ${jsonPath}`);
                  fs.writeFileSync(filePath, JSON.stringify(json, undefined, 4))
                } catch(e) {console.error(`Ошибка при удалении ${jsonPath}\nПолная ошибка: ${e}`)}
            } else {
                try{
                  jsonPath.splice(index, 1)
                } catch(e) {console.error(`Ошибка при удалении ${jsonPath}\nПолная ошибка: ${e}`)}
            }
        }
        }
        fs.writeFileSync(filePath, JSON.stringify(json, undefined, 4))
      } else {
      //   fields: [
      //     "expert?",
      //     "filePath",
      //     "jsonPath",
      //     "filePathExpert",
      //     "type",
      //     "title",
      //     "val",
      //     "task",
      //     "index",
      //     "indexcomparison",
      //     "ifindexmorethan1",
      //     "indexval",
      //     "indexkey",
      //     "indexstorage",
      //     "indexvarName",
      //     "valuesExpert"
      // ],
        let json;
        const filePath = this.evalMessage(data.filePathExpert, cache);
        if(!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, "{}")
          json = JSON.parse(fs.readFileSync(filePath))
        } else {
          json = JSON.parse(fs.readFileSync(filePath))
        }

        for(let i = 0; i < data.valuesExpert.length; i++) {
          key = this.evalMessage(data.valuesExpert[i].key, cache);
          value = this.evalMessage(data.valuesExpert[i].value, cache);
          task = this.evalMessage(data.valuesExpert[i].task2, cache)
          jsonPath2 = eval(this.evalMessage(data.valuesExpert[i].jsonPath2, cache));
          if(task == "{+}") {
            if (value == "{}") {
              jsonPath2[key] = {}
            } else if (value == "[]") {
              jsonPath2[key] = []
            } else {
              jsonPath2[key] = value
            }
          } else {
            if (value == "{}") {
              jsonPath2.push({})
            } else if (value == "[]") {
              jsonPath2.push([])
            } else {
              jsonPath2.push(value)
            }
          }
          fs.writeFileSync(filePath, JSON.stringify(json, undefined, 4))
        }
      }
      this.callNextAction(cache)
  },
  
    // (useless)
    mod() {},
  };
