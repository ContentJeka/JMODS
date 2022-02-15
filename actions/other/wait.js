module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Wait",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Other Stuff",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    const measurements = ["Milliseconds", "Seconds", "Minutes", "Hours", "Days"];
	  const type1 = ["Real time", "Fixed time"];
    const debug = ["Disabled", "Console"];
	  return `${data.time} ${measurements[parseInt(data.measurement, 10)]}, ${type1[parseInt(data.type1, 10)]}`;
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //
  // Stores the relevant variable info for the editor.
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
	let dataType = 'Wait Variable';
    return [data.varName, dataType];
  },
  
  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: { version: "2.1.1", preciseCheck: false, author: "PIKACHU", authorUrl: null, downloadUrl: null },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["time", "measurement", "type1", "debug", "storage", "varName"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
<br>Modified by PIKACHU</br>
<br>
<div>
	<div style="float: left; width: 45%;">
		<span class="dbminputlabel">Measurement</span><br>
		<select id="measurement" class="round">
			<option value="0">Milliseconds</option>
			<option value="1" selected>Seconds</option>
			<option value="2">Minutes</option>
			<option value="3">Hours</option>
			<option value="4">Days</option>
		</select>
	</div>
	<div style="float: right; width: 50%;">
		<span class="dbminputlabel">Amount</span><br>
		<input id="time" class="round" type="text">
	</div>
  <br><br><br><br>
	  <div style="float: left; width: 45%;">
	  <span class="dbminputlabel">Type</span><br>
	  <select id="type1" class="round">
		  <option value="0" selected>Real time</option>
		  <option value="1">Fixed time</option>
	  </select>
  </div>
  <br><br><br><br>
	  <div style="float: left; width: 45%;">
	  <span class="dbminputlabel">Debug</span><br>
	  <select id="debug" class="round">
		  <option value="0" selected>Disabled</option>
		  <option value="1">Console</option>
	  </select>
  </div>
</div>;
<br><br><br><br>
<store-in-variable allowNone selectId="storage" variableInputId="varName" variableContainerId="varNameContainer"></store-in-variable>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  action(cache) {
    const data = cache.actions[cache.index];
    const Mods = this.getMods();
    let result = '';
    let time = parseInt(this.evalMessage(data.time, cache), 10);
    const type = parseInt(data.measurement, 10);
    const type1 = parseInt(data.type1, 10);
    const debug = parseInt(data.debug, 10);
    switch (type) {
      case 1:
        time *= 1e3;
		result = time;
        break;
      case 2:
        time *= 1e3 * 60;
		result = time;
        break;
      case 3:
        time *= 1e3 * 60 * 60;
		result = time;
        break;
	  case 4:
        time *= 1e3 * 24 * 60 * 60;
		result = time;
        break;
      default:
        return this.callNextAction(cache);
    }
    const varName = this.evalMessage(data.varName, cache);
    const storage = parseInt(data.storage, 10);
	  switch (type1) {
		  case 1:
      setTimeout(() => this.callNextAction(cache), time).unref();
			break
		  default:
      setTimeout(() => this.callNextAction(cache), time).unref();
      switch (debug) {
				case 1:
					setInterval(() => {
						if (time > 0) {
						  time = time-1000
						  result = time
						  this.storeValue(result, storage, varName, cache);
						  console.log(time)
						}
					  }, 1000).unref();
            break
				default:
					setInterval(() => {
						if (time > 0) {
						  time = time-1000
						  result = time
						  this.storeValue(result, storage, varName, cache);
						}
					  }, 1000).unref();
            break
			  }
      break
	  }
    
	  /*if (time > 0) {
	  time = time-1000
	  result = time
    this.storeValue(result, storage, varName, cache);
    console.log(time)
	  }*/
  },


  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() {},
};
