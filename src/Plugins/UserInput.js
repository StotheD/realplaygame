export default class UserInput {
  constructor(scene) {
    this.scene = scene;

    this.enabled = false;
  }

  setInput(user_input_data){
    this.scene.input.keyboard.removeAllListeners("keydown");
    this.scene.input.keyboard.removeAllListeners("keyup");

    this.scene.input.keyboard.on("keydown", this.processInput, this);
    this.scene.input.keyboard.on("keyup", this.processInput, this);

    this.user_inputs = user_input_data;

    this.enabled = true;
  }

  processInput (event) {
    if (this.enabled) {
      let user_input = this.user_inputs[event.type][event.key];
      if (user_input) {
        let context = undefined;
        let callback_data = user_input.callback.split(".");
        if (callback_data[0] === "scene") {
          context = this.scene;
        } else if (callback_data[0] === "pnj") {
          context = this.scene.prefabs[this.scene.witch_pnj_i_m_talking_to];
        } else {
          context = this.scene.prefabs[callback_data[0]];
        }
        let method = context[callback_data[1]];
        method.apply(context, user_input.args);
      }
    }
  }
}
