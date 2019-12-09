import 'phaser';
import Prefab from "../Prefab";
import MessageBox from "../HUD/MessageBox";
import Emote from "../HUD/Emote";

export default class PNJ extends Prefab {
  constructor (scene, name, position, properties) {
    super(scene, name, position, properties);
      this.properties = properties;
      this.messages = this.scene.cache.json.get(properties.message);
      this.body.immovable = true;

      this.scene.physics.add.collider(this, this.scene.groups.players, this.collide, null, this);

      this.chapitre = this.properties.chapitre;
      this.message = this.messages[this.chapitre].first_talk;
    }

    collide(npc, player) {
      // .setVisible(true);
      this.emote_bubble_position = {x: this.x, y: this.y - 28},
      this.scene.emoteBubble = new Emote (this.scene, this.name+"emote_bubble", this.emote_bubble_position, {texture: this.properties.emote, group:"hud", scale:{x:0.7,y:0.7}})
      // this.anims.play('action');
    }

    talk(npc, player) {
      player.stop();

      this.scene.witch_pnj_i_m_talking_to = this.name;

      this.message_box_position = {x: this.scene.cameras.main.midPoint.x-320, y: this.scene.cameras.main._scrollY+this.scene.cameras.main._height-120};

      this.scene.currentMessageBox = new MessageBox(this.scene, this.name + "message_box", this.message_box_position,
        {texture: "message_box_image", group: "hud", message: this.message});

      this.scene.user_input.setInput(this.scene.user_inputs.talking_user_input);

      if (this.messages[this.chapitre].default) {
        this.message = this.messages[this.chapitre].default;
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
      this.scene.user_input.setInput(this.scene.user_inputs.world_user_input);
    }

    stopCollide(){
      this.scene.emoteBubble.destroy();
    }
}
