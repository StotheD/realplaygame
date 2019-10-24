import 'phaser';
import Prefab from "../Prefab";

export default class Door extends Prefab {
  constructor (scene, name, position, properties) {
    super(scene, name, position, properties);
      this.nextLevel = properties.next_level;
      this.body.immovable = true;

      this.scene.physics.add.collider(this, this.scene.groups.players, this.enter, null, this);
    }

    enter() {
      this.scene.scene.start('Boot', {scene: this.nextLevel});
    }
}
