import 'phaser';
import Prefab from "../Prefab";
import MessageBox from "../HUD/MessageBox";

export default class PNJ extends Prefab {
  constructor (scene, name, position, properties) {
    super(scene, name, position, properties);
      this.message = this.scene.cache.text.get(properties.message);
      this.body.immovable = true;

      this.scene.physics.add.collider(this, this.scene.groups.players, this.talk, null, this);
      this.MESSAGE_BOX_POSITION = {x: 0, y: 320};
    }

    talk(npc, player) {
      player.stop();

      this.scene.currentMessageBox = new MessageBox(this.scene, this.name + "message_box", this.MESSAGE_BOX_POSITION,
        {texture: "message_box_image", group: "hud", message: this.message});

      this.scene.user_input.setInput(this.scene.user_inputs.talking_user_input);
    }
}
