module.exports = {
  name: "Set Server Banner",
  section: "Server Control",

  subtitle(data, presets) {
    const storeTypes = presets.variables;
    let varName = ``
    if (presets.getServerText(data.server, data.server) !== `Current Server`) varName = ` (${data.varName})`
    return `${presets.getServerText(data.server).replace(` (undefined)`, ``)}${varName} - ${data.link}`},

  meta: { 
    version: "2.1.6", 
    preciseCheck: true, 
    author: "KailHet", 
    authorUrl: "https://github.com/KailHet", 
    downloadUrl: "https://github.com/ContentJeka/JMODS/blob/main/actions/other/set_server_banner.js" 
  },


  fields: [
    "server", 
    "varName", 
    "link"
  ],

  html(isEvent, data) {
    return `
<server-input dropdownLabel="Сервер" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Локальный путь/Ссылка на изображение</span><br>
	<input id="link" class="round" type="text" placeholder="'https://' или './resources/'" value="./resources/"><br>
</div>
`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const server = await this.getServerFromData(data.server, data.varName, cache);
    if (!Array.isArray(server) && !server?.setBanner) return this.callNextAction(cache);
    const image = this.evalMessage(data.link, cache);
    await server.setBanner(image)
  },

  mod() {},
};
