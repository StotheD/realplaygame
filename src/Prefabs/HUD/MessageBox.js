import 'phaser';
import Prefab from "../Prefab";
import TextPrefab from "../TextPrefab";

export default class MessageBox extends Prefab {
  constructor (scene, name, position, properties) {
    super(scene, name, position, properties);
      this.messageText = new TextPrefab(this.scene, this.name + "_message", {x: this.x + (this.width/2), y: this.y + 50});
    }
}
