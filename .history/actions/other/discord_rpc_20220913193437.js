module.exports = {
  name: 'Discord RPC',
  section: 'Other Stuff',
  meta: {
    version: '3.0.0',
    preciseCheck: false,
    author: 'KailHet',
    authorUrl: 'https://github.com/KailHet/',
    downloadURL: 'https://github.com/ContentJeka/JMODS/blob/main/actions/other/discord_rpc.js',
  },

  subtitle(data) {
    if (data.title) return `${data.title}`;
    return `Discord Rich Presence Builder`;
  },

  fields: [
    'clientIDType',
    'state',
    'details', 
    'largeImage', 
    'largeImageText',
    'smallImage', 
    'smallImageText',
    'buttonTitle1', 
    'buttonURL1', 
    'buttonTitle2', 
    'buttonURL2', 
    'customClientID',
    'customclid',
    'startTimestamp'
  ],
  size() {
    return { width: 600, height: 650 };
  },
  html(_isEvent, data) {
    return `  
  <div>
    <div style="float: left; width: 50%;">
      <span class="dbminputlabel">Основная надпись</span><br>
      <div style="float: left; width: 98%;">
        <input type="text" id="details" class="round" style="float: left;"/>
      </div>
    </div>
    <div style="padding-left: 2%; float: left; width: 50%;">
      <span class="dbminputlabel">Детали (под основным текстом)</span><br>
      <div style="float: left; width: 98%;">
        <input type="text" id="state" class="round" style="float: left;"/>
      </div>
    </div>
  </div><br><br><br>
  <div id="" style="float: left; width: 50%;padding-top: 3px;">
    <span class="dbminputlabel">Большая картинка</span><br>
      <div style="float: left; width: 98%;">
        <input type="text" id="largeImage" class="round" placeholder="Должна быть на Developer Portal" style="float: left;"/>
      </div>  
    </div>
    <div id="" style="padding-left: 2%;float: left; width: 50%;padding-top: 3px;">
    <span class="dbminputlabel">Текст при наведении</span><br>
      <div style="float: left; width: 98%;">
        <input type="text" id="largeImageText" class="round" style="float: left;"/>
      </div>  
    </div>
  <div><br><br><br>
  <div id="" style="float: left; width: 50%;padding-top: 3px;">
    <span class="dbminputlabel">Маленькая картинка</span><br>
      <div style="float: left; width: 98%;">
        <input type="text" id="smallImage" class="round" placeholder="Должна быть на Developer Portal" style="float: left;"/>
      </div>  
    </div>
    <div id="" style="padding-left: 2%;float: left; width: 50%;padding-top: 3px;">
    <span class="dbminputlabel">Текст при наведении</span><br>
      <div style="float: left; width: 98%;">
        <input type="text" id="smallImageText" class="round" style="float: left;"/>
      </div>  
    </div>
  <div><br><br><br>
  <div id="" style="float: left; width: 50%;padding-top: 3px;">
    <span class="dbminputlabel">Название кнопки</span><br>
      <div style="float: left; width: 98%;">
        <input type="text" id="buttonTitle1" class="round" placeholder="" style="float: left;"/>
      </div>  
    </div>
    <div id="" style="padding-left: 2%;float: left; width: 50%;padding-top: 3px;">
    <span class="dbminputlabel">Ссылка</span><br>
      <div style="float: left; width: 98%;">
        <input type="text" id="buttonURL1" class="round" placeholder="" style="float: left;"/>
      </div>  
  </div><br><br><br>
  <div id="" style="float: left; width: 50%;padding-top: 3px;">
    <span class="dbminputlabel">Название кнопки</span><br>
      <div style="float: left; width: 98%;">
        <input type="text" id="buttonTitle2" class="round" placeholder="" style="float: left;"/>
      </div>  
    </div>
    <div id="" style="padding-left: 2%;float: left; width: 50%;padding-top: 3px;">
    <span class="dbminputlabel">Ссылка</span><br>
      <div style="float: left; width: 98%;">
        <input type="text" id="buttonURL2" class="round" placeholder="" style="float: left;"/>
      </div>  
    </div>
  <div><br><br><br>
<div id="" style="float: left; width: 50%;padding-top: 3px;">
  <span class="dbminputlabel">Client ID</span><br>
    <div style="float: left; width: 98%;">
      <select id="clientIDType" class="round" onchange="glob.onChangeClient(this)">
        <option value="0">Текущего бота</option>
        <option value="1">Другой</option>
      </select>
    </div>  
  </div>
  <div id="customclid" style="padding-left: 2%;float: left; width: 50%;padding-top: 3px;">
    <span class="dbminputlabel">Кастомный Client ID</span><br>
    <div style="float: left; width: 98%;">
      <input type="text" name="customClientID" id="customClientID" class="round" style="float: left;"/>
    </div>  
  </div><br>
  <span class="dbminputlabel">Время</span><br>
  <select id="startTimestamp" class="round">
    <option value="0">Показывать</option>
    <option value="1" selected>Скрывать</option>
  </select>
  </div><br><br><br><br>
  <div id="" style="text-align: center">
    <span>Заголовок активности это название приложения на <b>Discord Developer Portal</b></span>
    <br>
    <span>Картинки нужно загружать в <b>Application -> Rich Presence -> Art Assets</b></span>
  </div>
`;
  },

  init() {
    const { glob, document } = this;

    glob.onChangeClient = function onChangeClient(clientIDType) {
      switch (parseInt(clientIDType.value, 10)) {
        case 0:
          document.getElementById('customclid').style.display = 'none';
          break;
        case 1:
          document.getElementById('customclid').style.display = null;
          break;
      }
    };

    glob.onChangeClient(document.getElementById('clientIDType'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const fs = require('fs')

    const details = this.evalMessage(data.details, cache)
    const state = this.evalMessage(data.state, cache)
    const largeImage = this.evalMessage(data.largeImage, cache)
    const smallImage = this.evalMessage(data.smallImage, cache)
    const largeImageText = this.evalMessage(data.largeImageText, cache)
    const smallImageText = this.evalMessage(data.smallImageText, cache)
    const buttonTitle1 = this.evalMessage(data.buttonTitle1, cache)
    const buttonTitle2 = this.evalMessage(data.buttonTitle2, cache)
    const buttonURL1 = this.evalMessage(data.buttonURL1, cache)
    const buttonURL2 = this.evalMessage(data.buttonURL2, cache)
    const clientIDType = data.clientIDType
    const startTimestamp = data.startTimestamp

    let clID = ``
    switch (clientIDType) {
      case `0`:
        const json = await JSON.parse(fs.readFileSync('./data/settings.json'))
        clID = json.client
        break;
      case `1`:
        clID = this.evalMessage(data.customClientID, cache)
        break;
    }
    
    const RPC = require("discord-rpc")
    const rpc = new RPC.Client ({
      transport: "ipc"
    })

    let result = {}

    if (details !== `` && details.length >= 2) {
      result.details = details
    }
    if (state !== `` && state.length >= 2) {
      result.state = state
    }
    if (largeImage !== `` && largeImage.length >= 2) {
      result.largeImageKey = largeImage
    }
    if (smallImage !== `` && smallImage.length >= 2) {
      result.smallImageKey = smallImage
    }
    if (largeImageText !== `` && largeImageText.length >= 2) {
      result.largeImageText = largeImageText
    }
    if (smallImageText !== `` && smallImageText.length >= 2) {
      result.smallImageText = smallImageText
    }
    if (startTimestamp == "0") {
      result.startTimestamp = Date.now()
    }

    let buttons = []
    if (buttonTitle1 !== `` || buttonTitle2 !== ``) {
      if (buttonTitle1 !== `` && buttonURL1 !== `` && buttonTitle1.length >= 2 && buttonURL1.length >= 2) {
        buttons.push({
          label: buttonTitle1,
          url: buttonURL1
        })
      }
      if (buttonTitle2 !== `` && buttonURL2 !== `` && buttonTitle2.length >= 2 && buttonURL2.length >= 2) {
        buttons.push({
          label: buttonTitle2,
          url: buttonURL2
        })
      }
      result.buttons = buttons
    }
    
    rpc.on("ready", () => {
        rpc.setActivity(result)
    })
    
    rpc.login({
      clientId: clID
    }).catch(e => {
      if (e.message == `connection closed`) {
        console.error(`[RPC] Подключение разорвано. Перезапустите Discord`)
      } else if (e.message == `RPC_CONNECTION_TIMEOUT`) {
        console.error(`[RPC] Discord временно ограничил доступ к RPC`)
      } else console.error(`[RPC]${e}`)
    })

    this.callNextAction(cache)

  },

  mod() {},
};
