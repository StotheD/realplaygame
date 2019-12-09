import 'phaser';
import Prefab from "../Prefab";

export default class Emote extends Prefab {
  constructor (scene, name, position, properties) {
    super(scene, name, position, properties);
      this.scene = scene;
      this.name = name;
      this.position = position;
      this.properties = properties;

      scene.anims.create({
          key: 'bubble',
          frames: scene.anims.generateFrameNumbers(this.properties.texture, { start: 0, end: 3 }),
          frameRate: 8,
          repeat: -1
      });

      this.anims.play('bubble');

    }
}
