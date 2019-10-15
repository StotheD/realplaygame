import 'phaser';

export default class Portal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y){
    super(scene, x, y, 'BaseChip_pipo_2', 5);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }
}
