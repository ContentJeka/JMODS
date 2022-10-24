module.exports = {

  name: "RU Send Message",

  section: "Messaging",

  subtitle(data, presets) {
    let text = "";
    if (data.message) {
      text = `"${data.message.replace(/[\n\r]+/, " ↲ ")}"`;
    } else if (data.embeds?.length > 0) {
      text = `Эмбеды: ${data.embeds.length}`;
    } else if (data.attachments?.length > 0) {
      text = `Вложения: ${data.attachments.length}`;
    } else if (data.buttons?.length > 0 || data.selectMenus?.length > 0) {
      text = `${data.buttons.length} кнопок и ${data.selectMenus.length} меню`;
    } else if (data.editMessage && data.editMessage !== "0") {
      text = `Настройки сообщения - ${presets.getVariableText(data.editMessage, data.editMessageVarName)}`;
    } else {
      text = `Ничего (Могут возникать ошибки)`;
    }
    if (data.dontSend) {
      return `Сохранить данные: ${text}`;
    }
    return `${presets.getSendReplyTargetText(data.channel, data.varName)}: ${text}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, data.dontSend ? "Message Options" : "Message"];
  },

  meta: { version: "2.1.6", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },

  fields: [
    "channel",
    "varName",
    "message",
    "buttons",
    "selectMenus",
    "attachments",
    "embeds",
    "reply",
    "ephemeral",
    "tts",
    "overwrite",
    "dontSend",
    "editMessage",
    "editMessageVarName",
    "storage",
    "varName2",
  ],

  html(isEvent, data) {
    return `
<send-reply-target-input selectId="channel" variableInputId="varName"></send-reply-target-input>

<br><br><br>

<tab-system style="margin-top: 20px;">


  <tab label="Сообщение" icon="align left">
    <div style="padding: 8px;">
      <textarea id="message" class="dbm_monospace" rows="10" placeholder="Введите сообщение..." style="height: calc(100vh - 309px); white-space: nowrap; resize: none;"></textarea>
    </div>
  </tab>


  <tab label="Эмбеды" icon="book image">
    <div style="padding: 8px;">

      <dialog-list id="embeds" fields='["title", "url", "color", "timestamp", "imageUrl1", "imageUrl2", "imageUrl3", "imageUrl4", "thumbUrl", "description", "fields", "author", "authorUrl", "authorIcon", "footerText", "footerIconUrl"]' dialogTitle="Настройки эмбеда" dialogWidth="540" dialogHeight="650" listLabel="Эмбеды" listStyle="height: calc(100vh - 350px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="data.title + ' - ' + data.description" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px 16px 0px 16px;">

          <tab-system>

            <tab label="Основное" icon="certificate">
              <div style="padding: 8px">
                <div style="float: left; width: calc(50% - 12px);">
                  <span class="dbminputlabel">Заголовок</span><br>
                  <input id="title" class="round" type="text">

                  <br>

                  <span class="dbminputlabel">Цвет</span><br>
                  <input id="color" class="round" type="text">
                </div>

                <div style="float: right; width: calc(50% - 12px);">
                  <span class="dbminputlabel">URL</span><br>
                  <input id="url" class="round" type="text">

                  <br>

                  <span class="dbminputlabel">Использовать Timestamp?</span><br>
                  <select id="timestamp" class="round">
                    <option value="true">Да</option>
                    <option value="false" selected>Нет</option>
                  </select>
                </div>

                <br><br><br><br><br><br><br>

                <hr class="subtlebar">

                <br>

                <span class="dbminputlabel">URL картинки 1</span><br>
                <input id="imageUrl1" class="round" type="text">

                <br>

                <span class="dbminputlabel">URL картинки 2</span><br>
                <input id="imageUrl2" class="round" type="text" placeholder="Впишите URL для использования">

                <br>

                <span class="dbminputlabel">URL картинки 3</span><br>
                <input id="imageUrl3" class="round" type="text" placeholder="Впишите URL для использования">

                <br>

                <span class="dbminputlabel">URL картинки 4</span><br>
                <input id="imageUrl4" class="round" type="text" placeholder="Впишите URL для использования">

                <br>

                <span class="dbminputlabel">URL миниатюры</span><br>
                <input id="thumbUrl" class="round" type="text">
              </div>
            </tab>

            <tab label="Описание" icon="file image">
              <div style="padding: 8px">
                <textarea id="description" class="dbm_monospace" rows="10" placeholder="Введите описание..." style="height: calc(100vh - 149px); white-space: nowrap; resize: none;"></textarea>
              </div>
            </tab>

            <tab label="Поля" icon="list">
              <div style="padding: 8px">
                <dialog-list id="fields" fields='["name", "value", "inline"]' dialogTitle="Field Info" dialogWidth="540" dialogHeight="300" listLabel="Поля" listStyle="height: calc(100vh - 190px);" itemName="Field" itemCols="1" itemHeight="30px;" itemTextFunction="data.name + '<br>' + data.value" itemStyle="text-align: left; line-height: 30px;">
                  <div style="padding: 16px;">
                    <div style="float: left; width: calc(50% - 12px);">
                      <span class="dbminputlabel">Заголовок поля</span><br>
                      <input id="name" class="round" type="text">
                    </div>

                    <div style="float: right; width: calc(50% - 12px);">
                      <span class="dbminputlabel">В строку?</span><br>
                      <select id="inline" class="round">
                        <option value="true">Да</option>
                        <option value="false" selected>Нет</option>
                      </select>
                    </div>

                    <br><br><br><br>

                    <span class="dbminputlabel">Описание поля</span><br>
                    <textarea id="value" class="dbm_monospace" rows="10" placeholder="Введите текст..." style="height: calc(100vh - 190px); white-space: nowrap; resize: none;"></textarea>

                  </div>
                </dialog-list>
              </div>
            </tab>

            <tab label="Author" icon="user circle">
              <div style="padding: 8px">
                <span class="dbminputlabel">Автор</span><br>
                <input id="author" class="round" type="text">

                <br>

                <span class="dbminputlabel">URL автора</span><br>
                <input id="authorUrl" class="round" type="text">

                <br>

                <span class="dbminputlabel">URL иконки автора</span><br>
                <input id="authorIcon" class="round" type="text">
              </div>
            </tab>

            <tab label="Колонтитул" icon="map outline">
              <div style="padding: 8px;">
                <span class="dbminputlabel">URL иконки колонтитула</span><br>
                <input id="footerIconUrl" class="round" type="text">

                <br>

                <span class="dbminputlabel">Текст колонтитула</span><br>
                <textarea id="footerText" class="dbm_monospace" rows="10" style="height: calc(100vh - 234px); white-space: nowrap; resize: none;"></textarea>
              </div>
            </tab>

          </tab-system>

        </div>
      </dialog-list>

    </div>
  </tab>


  <tab label="Кнопки" icon="clone">
    <div style="padding: 8px;">

      <dialog-list id="buttons" fields='["name", "type", "id", "row", "url", "emoji", "disabled", "mode", "time", "actions"]' dialogTitle="Настройки кнопки" dialogWidth="600" dialogHeight="700" listLabel="Кнопки" listStyle="height: calc(100vh - 350px);" itemName="Button" itemCols="4" itemHeight="40px;" itemTextFunction="data.name" itemStyle="text-align: center; line-height: 40px;">
        <div style="padding: 16px;">
          <div style="width: calc(50% - 12px); float: left;">
            <span class="dbminputlabel">Название</span>
            <input id="name" class="round" type="text">

            <br>

            <span class="dbminputlabel">Тип</span><br>
            <select id="type" class="round">
              <option value="PRIMARY" selected>Основная (Blurple)</option>
              <option value="SECONDARY">Вторичная (Серая)</option>
              <option value="SUCCESS">Положительная (Зеленая)</option>
              <option value="DANGER">Отрицательная (Красная)</option>
              <option value="LINK">Ссылка (Серая)</option>
            </select>

            <br>

            <span class="dbminputlabel">URL</span>
            <input id="url" class="round" type="text">

            <br>

            <span class="dbminputlabel">
              Режим реакции на нажатие
              <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
            </span><br>
            <select id="mode" class="round">
              <option value="PERSONAL">Один раз, Автор команды</option>
              <option value="PUBLIC">Один раз, Кто угодно</option>
              <option value="MULTIPERSONAL">Много раз, Автор команды</option>
              <option value="MULTI" selected>Много раз, Кто угодно</option>
              <option value="PERSISTENT">Бесконечная</option>
            </select>
          </div>
          <div style="width: calc(50% - 12px); float: right;">
            <span class="dbminputlabel">Уникальный ID</span>
            <input id="id" placeholder="Генерируется автоматически" class="round" type="text">

            <br>

            <span class="dbminputlabel">Ряд (1 - 5)</span>
            <input id="row" class="round" type="text">

            <br>

            <span class="dbminputlabel">Эмодзи</span>
            <input id="emoji" class="round" type="text">

            <br>

            <span class="dbminputlabel">Время действия (в миллисекундах)</span>
            <input id="time" placeholder="60000" class="round" type="text">
          </div>

          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

          <action-list-input mode="BUTTON" id="actions" height="calc(100vh - 460px)"></action-list-input>

        </div>
      </dialog-list>

    </div>
  </tab>


  <tab label="Меню" icon="list alternate">
    <div style="padding: 8px;">

      <dialog-list id="selectMenus" fields='["placeholder", "id", "tempVarName", "row", "min", "max", "mode", "time", "options", "actions"]' dialogTitle="Настройки меню" dialogWidth="800" dialogHeight="700" listLabel="Select Menus" listStyle="height: calc(100vh - 350px);" itemName="Select Menu" itemCols="1" itemHeight="40px;" itemTextFunction="data.placeholder + '<br>' + data.options" itemStyle="text-align: left; line-height: 40px;">
        <div style="padding: 16px;">
          <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
            <span class="dbminputlabel">Placeholder</span>
            <input id="placeholder" class="round" type="text">

            <br>

            <span class="dbminputlabel">Temp Variable Name</span>
            <input id="tempVarName" placeholder="Stores selected value for actions..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Minimum Select Number</span>
            <input id="min" class="round" type="text" value="1">

            <br>

            <span class="dbminputlabel">
              Action Response Mode
              <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
            </span><br>
            <select id="mode" class="round">
              <option value="PERSONAL">Once, Command User Only</option>
              <option value="PUBLIC">Once, Anyone Can Use</option>
              <option value="MULTIPERSONAL">Multi, Command User Only</option>
              <option value="MULTI" selected>Multi, Anyone Can Use</option>
              <option value="PERSISTENT">Persistent</option>
            </select>
          </div>
          <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
            <span class="dbminputlabel">Unique ID</span>
            <input id="id" placeholder="Leave blank to auto-generate..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Action Row (1 - 5)</span>
            <input id="row" placeholder="Leave blank for default..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Maximum Select Number</span>
            <input id="max" class="round" type="text" value="1">

            <br>

            <span class="dbminputlabel">Temporary Time-Limit (Miliseconds)</span>
            <input id="time" placeholder="60000" class="round" type="text">
          </div>
          <div style="width: calc(34% - 8px); height: 300px; float: left; margin-left: 8px;">

            <dialog-list id="options" fields='["label", "description", "value", "emoji", "default"]' dialogTitle="Select Menu Option Info" dialogWidth="360" dialogHeight="440" listLabel="Options" listStyle="height: 210px;" itemName="Option" itemCols="1" itemHeight="20px;" itemTextFunction="data.label" itemStyle="text-align: left; line-height: 20px;">
              <div style="padding: 16px;">
                <span class="dbminputlabel">Name</span>
                <input id="label" class="round" type="text">

                <br>

                <span class="dbminputlabel">Description</span>
                <input id="description" class="round" type="text">

                <br>

                <span class="dbminputlabel">Value</span>
                <input id="value" placeholder="The text passed to the temp variable..." class="round" type="text">

                <br>

                <span class="dbminputlabel">Emoji</span>
                <input id="emoji" placeholder="Leave blank for none..." class="round" type="text">

                <br>

                <span class="dbminputlabel">Default Selected</span><br>
                <select id="default" class="round">
                  <option value="true">Yes</option>
                  <option value="false" selected>No</option>
                </select>
              </div>
            </dialog-list>

          </div>

          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

          <action-list-input mode="SELECT" id="actions" height="calc(100vh - 460px)">
            <script class="setupTempVars">
              const elem = document.getElementById("tempVarName");
              if(elem?.value) {
                tempVars.push([elem.value, "Text"]);
              }
            </script>
          </action-list-input>

        </div>
      </dialog-list>

    </div>
  </tab>


  <tab label="Files" icon="file image">
    <div style="padding: 8px;">

      <dialog-list id="attachments" fields='["url", "name", "spoiler"]' dialogTitle="Attachment Info" dialogWidth="400" dialogHeight="280" listLabel="Files" listStyle="height: calc(100vh - 350px);" itemName="File" itemCols="1" itemHeight="30px;" itemTextFunction="data.url" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;">
          <span class="dbminputlabel">Attachment Local/Web URL</span>
          <input id="url" class="round" type="text" value="resources/">

          <br>

          <span class="dbminputlabel">Attachment Name</span>
          <input id="name" class="round" type="text" placeholder="Leave blank for default...">

          <br>

          <div style="text-align: center; padding-top: 4px;">
            <dbm-checkbox id="spoiler" label="Make Attachment Spoiler"></dbm-checkbox>
          </div>
        </div>
      </dialog-list>
    </div>
  </tab>


  <tab label="Settings" icon="cogs">
    <div style="padding: 8px;">
      <dbm-checkbox style="float: left;" id="reply" label="Reply to Interaction if Possible" checked></dbm-checkbox>

      <dbm-checkbox style="float: right;" id="ephemeral" label="Make Reply Private (Ephemeral)"></dbm-checkbox>

      <br><br>

      <div style="display: flex; justify-content: space-between;">
        <dbm-checkbox id="tts" label="Text-to-Speech"></dbm-checkbox>

        <dbm-checkbox id="overwrite" label="Overwrite Changes"></dbm-checkbox>

        <dbm-checkbox id="dontSend" label="Don't Send Message"></dbm-checkbox>
      </div>

      <br>

      <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px;">

      <br>

      <div style="padding-bottom: 12px;">
        <retrieve-from-variable allowNone dropdownLabel="Message/Options to Edit" selectId="editMessage" variableInputId="editMessageVarName" variableContainerId="editMessageVarNameContainer">
          <option value="intUpdate">Interaction Update</option>
        </retrieve-from-variable>
      </div>

      <br><br><br>

      <div style="padding-bottom: 12px;">
        <store-in-variable allowNone selectId="storage" variableInputId="varName2" variableContainerId="varNameContainer2"></store-in-variable>
      </div>

      <br><br>

      <div></div>
    </div>
  </tab>
</tab-system>`;
  },

  init() {},

  onSave(data, helpers) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        if (!data.buttons[i].id) {
          data.buttons[i].id = "msg-button-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        if (!data.selectMenus[i].id) {
          data.selectMenus[i].id = "msg-select-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    return data;
  },

  onPaste(data, helpers) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const id = data.buttons[i].id;
        if (!id || id.startsWith("msg-button-")) {
          data.buttons[i].id = "msg-button-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const id = data.selectMenus[i].id;
        if (!id || id.startsWith("msg-select-")) {
          data.selectMenus[i].id = "msg-select-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    return data;
  },

  async action(cache) {
    const data = cache.actions[cache.index];

    const channel = parseInt(data.channel, 10);
    const message = data.message;
    if (data.channel === undefined || message === undefined) {
      return;
    }

    let target = await this.getSendReplyTarget(channel, this.evalMessage(data.varName, cache), cache);

    let messageOptions = {};

    const overwrite = data.overwrite;

    let isEdit = 0;
    if(data.editMessage === "intUpdate") {
      isEdit = 2;
    } else {
      const editMessage = parseInt(data.editMessage, 10);
      if (typeof editMessage === "number" && editMessage >= 0) {
        const editVarName = this.evalMessage(data.editMessageVarName, cache);
        const editObject = this.getVariable(editMessage, editVarName, cache);
        const { Message } = this.getDBM().DiscordJS;
        if (editObject) {
          if (editObject instanceof Message) {
            target = editObject;
            isEdit = 1;
          } else {
            messageOptions = editObject;
          }
        }
      }
    }


    const content = this.evalMessage(message, cache);
    if (content) {
      if (messageOptions.content && !overwrite) {
        messageOptions.content += content;
      } else {
        messageOptions.content = content;
      }
    }

    if (data.embeds?.length > 0) {
      const { MessageEmbed } = this.getDBM().DiscordJS;

      if (!Array.isArray(messageOptions.embeds) || overwrite) {
        messageOptions.embeds = [];
      }

      const embedDatas = data.embeds;
      for (let i = 0; i < embedDatas.length; i++) {
        const embedData = embedDatas[i];
        const embed1 = new MessageEmbed();
        const embed2 = new MessageEmbed();
        const embed3 = new MessageEmbed();
        const embed4 = new MessageEmbed();

        if (embedData.title) embed1.setTitle(this.evalMessage(embedData.title, cache));
        if (embedData.url) {
          embed1.setURL(this.evalMessage(embedData.url, cache));
          embed2.setURL(this.evalMessage(embedData.url, cache));
          embed3.setURL(this.evalMessage(embedData.url, cache));
          embed4.setURL(this.evalMessage(embedData.url, cache));
        }
        if (embedData.color) embed1.setColor(this.evalMessage(embedData.color, cache));
        if (embedData.timestamp === "true") embed1.setTimestamp();

        if (embedData.imageUrl1) embed1.setImage(this.evalMessage(embedData.imageUrl1, cache));
        
        if (embedData.imageUrl2 && embedData.url) {
          embed2.setImage(this.evalMessage(embedData.imageUrl2, cache));
          messageOptions.embeds.push(embed2)
        }
        if (embedData.imageUrl3 && embedData.url) {
          embed3.setImage(this.evalMessage(embedData.imageUrl3, cache));
          messageOptions.embeds.push(embed3)
        }
        if (embedData.imageUrl4 && embedData.url) {
          embed4.setImage(this.evalMessage(embedData.imageUrl4, cache));
          messageOptions.embeds.push(embed4)
        }

        if (embedData.thumbUrl) embed1.setThumbnail(this.evalMessage(embedData.thumbUrl, cache));

        if (embedData.description) embed1.setDescription(this.evalMessage(embedData.description, cache));

        if (embedData.fields?.length > 0) {
          const fields = embedData.fields;
          for (let i = 0; i < fields.length; i++) {
            const f = fields[i];
            embed1.addField(this.evalMessage(f.name, cache), this.evalMessage(f.value, cache), f.inline === "true");
          }
        }

        if (embedData.author) {
          embed1.setAuthor({
            name: this.evalMessage(embedData.author, cache),
            iconURL: embedData.authorIcon ? this.evalMessage(embedData.authorIcon, cache) : null,
            url: embedData.authorUrl ? this.evalMessage(embedData.authorUrl, cache) : null,
          });
        }

        if (embedData.footerText) {
          embed1.setFooter({
            text: this.evalMessage(embedData.footerText, cache),
            iconURL: embedData.footerIconUrl ? this.evalMessage(embedData.footerIconUrl, cache) : null,
          });
        }
        messageOptions.embeds.splice(0, 0, embed1);
      }
    }

    let componentsArr = [];
    let awaitResponses = [];

    if (!overwrite && messageOptions.components?.length > 0) {
      componentsArr = messageOptions.components.map(function (comps) {
        return comps.components;
      });
    }

    const defaultTime = 60000;

    if (Array.isArray(data.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const button = data.buttons[i];
        const buttonData = this.generateButton(button, cache);
        this.addButtonToActionRowArray(componentsArr, this.evalMessage(button.row, cache), buttonData, cache);

        if (button.mode !== "PERSISTENT") {
          awaitResponses.push({
            type: "BUTTON",
            time: button.time ? parseInt(this.evalMessage(button.time, cache)) || defaultTime : defaultTime,
            id: this.evalMessage(button.id, cache),
            user: button.mode.endsWith("PERSONAL") ? cache.getUser()?.id : null,
            multi: button.mode.startsWith("MULTI"),
            data: button,
          });
        }
      }
    }

    if (Array.isArray(data.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const select = data.selectMenus[i];
        const selectData = this.generateSelectMenu(select, cache);
        this.addSelectToActionRowArray(componentsArr, this.evalMessage(select.row, cache), selectData, cache);

        if (select.mode !== "PERSISTENT") {
          awaitResponses.push({
            type: "SELECT",
            time: select.time ? parseInt(this.evalMessage(select.time, cache)) || defaultTime : defaultTime,
            id: this.evalMessage(select.id, cache),
            user: select.mode.endsWith("PERSONAL") ? cache.getUser()?.id : null,
            multi: select.mode.startsWith("MULTI"),
            data: select,
          });
        }
      }
    }

    if (messageOptions._awaitResponses?.length > 0) {
      if (overwrite && awaitResponses.length > 0) {
        messageOptions._awaitResponses = [];
      } else {
        awaitResponses = messageOptions._awaitResponses.concat(awaitResponses);
      }
    }

    if (componentsArr.length > 0) {
      const newComponents = componentsArr
        .filter((comps) => comps.length > 0)
        .map(function (comps) {
          return {
            type: "ACTION_ROW",
            components: comps,
          };
        });

      messageOptions.components = newComponents;
    }

    if (data.tts) {
      messageOptions.tts = true;
    }

    if (data.attachments?.length > 0) {
      const { Util, MessageAttachment } = this.getDBM().DiscordJS;
      if (!Array.isArray(messageOptions.files) || overwrite) {
        messageOptions.files = [];
      }
      for (let i = 0; i < data.attachments.length; i++) {
        const attachment = data.attachments[i];
        const url = this.evalMessage(attachment?.url, cache);
        if (url) {
          const spoiler = !!attachment?.spoiler;
          const name = attachment?.name || (spoiler ? Util.basename(url) : undefined);
          const msgAttachment = new MessageAttachment(url, name);
          if (spoiler) {
            msgAttachment.setSpoiler(true);
          }
          messageOptions.files.push(msgAttachment);
        }
      }
    }

    let defaultResultMsg = null;
    const onComplete = (resultMsg) => {
      if (defaultResultMsg) {
        resultMsg ??= defaultResultMsg;
      }

      if (resultMsg) {
        const varName2 = this.evalMessage(data.varName2, cache);
        const storage = parseInt(data.storage, 10);
        this.storeValue(resultMsg, storage, varName2, cache);
        this.callNextAction(cache);

        for (let i = 0; i < awaitResponses.length; i++) {
          const response = awaitResponses[i];
          const originalInteraction = cache.interaction?.__originalInteraction ?? cache.interaction;
          const tempVariables = cache.temp || {};
          this.registerTemporaryInteraction(resultMsg.id, response.time, response.id, response.user, response.multi, (interaction) => {
            if (response.data) {
              interaction.__originalInteraction = originalInteraction;
              if (response.type === "BUTTON") {
                this.preformActionsFromInteraction(interaction, response.data, cache.meta, tempVariables);
              } else {
                this.preformActionsFromSelectInteraction(interaction, response.data, cache.meta, tempVariables);
              }
            }
          });
        }
      } else {
        this.callNextAction(cache);
      }
    };

    const isMessageTarget = target instanceof this.getDBM().DiscordJS.Message;

    const sameId = target?.id?.length > 0 && (target?.id ?? "") === cache?.interaction?.channel?.id;
    const sameChannel = channel === 0 || sameId;
    const canReply = !isMessageTarget && cache?.interaction?.replied === false && sameChannel;

    if (data.dontSend) {
      const varName2 = this.evalMessage(data.varName2, cache);
      const storage = parseInt(data.storage, 10);
      messageOptions._awaitResponses = awaitResponses;
      this.storeValue(messageOptions, storage, varName2, cache);
      this.callNextAction(cache);
    }

    else if (Array.isArray(target)) {
      this.callListFunc(target, "send", [messageOptions]).then(onComplete);
    }

    else if (isEdit === 2) {
      let promise = null;

      defaultResultMsg = cache.interaction?.message;

      if (cache.interaction?.replied && cache.interaction?.editReply) {
        promise = cache.interaction.editReply(messageOptions);
      } else if(cache?.interaction?.update) {
        promise = cache.interaction.update(messageOptions);
      } else {
        this.displayError(data, cache, "Send Message -> Message/Options to Edit -> Interaction Update / Could not find interaction to edit");
      }
      
      if (promise) {
        promise
          .then(onComplete)
          .catch((err) => this.displayError(data, cache, err));
      }
    }

    else if (isEdit === 1 && target?.edit) {
      target
        .edit(messageOptions)
        .then(onComplete)
        .catch((err) => this.displayError(data, cache, err));
    }

    else if (isMessageTarget && target?.reply) {
      target
        .reply(messageOptions)
        .then(onComplete)
        .catch((err) => this.displayError(data, cache, err));
    }

    else if (data.reply === true && canReply) {
      messageOptions.fetchReply = true;
      if (data.ephemeral === true) {
        messageOptions.ephemeral = true;
      }
      let promise = null;
      if (cache.interaction.deferred) {
        promise = cache.interaction.editReply(messageOptions);
      } else {
        promise = cache.interaction.reply(messageOptions);
      }
      promise.then(onComplete).catch((err) => this.displayError(data, cache, err));
    }

    else if (target?.send) {
      target
        .send(messageOptions)
        .then(onComplete)
        .catch((err) => this.displayError(data, cache, err));
    }

    else {
      this.callNextAction(cache);
    }
  },

  modInit(data) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const button = data.buttons[i];
        if (button.mode === "PERSISTENT") {
          this.registerButtonInteraction(button.id, button);
        }
        this.prepareActions(button.actions);
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const select = data.selectMenus[i];
        if (select.mode === "PERSISTENT") {
          this.registerSelectMenuInteraction(select.id, select);
        }
        this.prepareActions(select.actions);
      }
    }
  },

  mod() {},
};
