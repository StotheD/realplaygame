import 'phaser';
import Prefab from "../Prefab";
import MessageBox from "../HUD/MessageBox";

export default class PNJ extends Prefab {
  constructor (scene, name, position, properties) {
    super(scene, name, position, properties);
      this.properties = properties;
      this.messages = this.scene.cache.json.get(properties.message);
      this.body.immovable = true;

      this.scene.physics.add.collider(this, this.scene.groups.players, this.talk, null, this);

      this.CHAPITRE = "village-0";
      this.message = this.messages[this.CHAPITRE].first_talk;
    }

    talk(npc, player) {
      player.stop();

      this.scene.witch_pnj_i_m_talking_to = this.name;

      this.message_box_position = {x: this.scene.cameras.main.midPoint.x-320, y: this.scene.cameras.main._scrollY+this.scene.cameras.main._height-120};

      this.scene.currentMessageBox = new MessageBox(this.scene, this.name + "message_box", this.message_box_position,
        {texture: "message_box_image", group: "hud", message: this.message});

      this.scene.user_input.setInput(this.scene.user_inputs.talking_user_input);

      if (this.messages[this.CHAPITRE].default) {
        this.message = this.messages[this.CHAPITRE].default;
      }
    }

    nextTalk(){
      // si le message change on l'affiche, sinon on sort de la conversation
      if (this.scene.currentMessageBox.still_have_something_to_say || this.scene.currentMessageBox.writting) {
        // change le message du pnj selon le json associé
        this.scene.currentMessageBox.nextLines();
        // this.scene.currentMessageBox.messageText.runWordWrap(this.messages[this.MESSAGE]);
      } else if (this.scene.currentMessageBox.multiText) {
        this.scene.currentMessageBox.nextTalker();      
      } else {
        this.endTalk();
      }
    }
    endTalk(){
      this.scene.currentMessageBox.destroy();
      this.scene.user_input.setInput(this.scene.user_inputs.village_user_input);
    }
}
