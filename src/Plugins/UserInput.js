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
      let user_input = this.user_inputs[event.type];
    }
  }
}
