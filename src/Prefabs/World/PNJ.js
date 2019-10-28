import 'phaser';
import Prefab from "../Prefab";
import MessageBox from "../HUD/MessageBox";

export default class PNJ extends Prefab {
  constructor (scene, name, position, properties) {
    super(scene, name, position, properties);
      this.messages = this.scene.cache.json.get(properties.message);
      this.body.immovable = true;

      this.scene.physics.add.collider(this, this.scene.groups.players, this.talk, null, this);
      this.MESSAGE = 0;
    }

    talk(npc, player) {
      player.stop();

      this.scene.witch_pnj_i_m_talking_to = this.name;

      this.message_box_position = {x: this.scene.cameras.main.midPoint.x-320, y: this.scene.cameras.main._scrollY+this.scene.cameras.main._height-120};

      this.scene.currentMessageBox = new MessageBox(this.scene, this.name + "message_box", this.message_box_position,
        {texture: "message_box_image", group: "hud", message: this.messages[this.MESSAGE]});

      this.scene.user_input.setInput(this.scene.user_inputs.talking_user_input);
    }

    nextTalk(){
      this.MESSAGE += 1;

      // si le message change on l'affiche, sinon on sort de la conversation
      if (this.messages[this.MESSAGE]) {
        // change le message du pnj selon le json associé
        this.scene.currentMessageBox.messageText.setText(this.messages[this.MESSAGE]);
      } else {
        this.endTalk();
      }
    }

    endTalk(){
      this.MESSAGE = 0;
      this.scene.currentMessageBox.destroy();
      this.scene.user_input.setInput(this.scene.user_inputs.village_user_input);
    }
}
