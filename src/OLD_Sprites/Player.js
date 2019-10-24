import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y){
    super(scene, x, y, 'Player', 1);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    // this.setCollideWorldBounds(true);
    this.scene.add.existing(this);
    // velocity of the player
    this.speed = 180;
    // velocity adding to an other direction when second direction input is down
    this.crossSpeed = 70;
  }

  update(cursors){
    this.updateDirection(cursors);
  }

  createAnimations(scene){
    scene.anims.create({
        key: 'up',
        frames: scene.anims.generateFrameNumbers('Player', { start: 9, end: 11 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'down',
        frames: scene.anims.generateFrameNumbers('Player', { start: 0, end: 2 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers('Player', { start: 3, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers('Player', { start: 6, end: 8 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'stop',
        frames: [ { key: 'Player', frame: 1 } ],
        frameRate: 20
    });
  }

  updateDirection(cursors){

    if (cursors.left.isDown && this.body.velocity.x <= 0 ){ // can't press on opposit key
      if (this.body.velocity.y === 0) { // if player don't move, start the anim
        this.setVelocityX(-this.speed);
        this.anims.play('left', true);
      } else if (this.body.velocity.y === this.speed || this.body.velocity.y === -this.speed) {
        // if player already moving in an other crossing direction, velocity is lower
        this.setVelocityX(-this.crossSpeed);
      }
    } else if (cursors.right.isDown && this.body.velocity.x >= 0) {
      if (this.body.velocity.y === 0) {
        this.setVelocityX(this.speed);
        this.anims.play('right', true);
      } else if (this.body.velocity.y === this.speed || this.body.velocity.y === -this.speed) {
        this.setVelocityX(this.crossSpeed);
      }
    } else {
      this.body.velocity.x = 0;
    }

    if (cursors.up.isDown && this.body.velocity.y <= 0 ){
      if (this.body.velocity.x === 0) {
        this.setVelocityY(-this.speed);
        this.anims.play('up', true);
      } else if (this.body.velocity.x === this.speed || this.body.velocity.x === -this.speed) {
        this.setVelocityY(-this.crossSpeed);
      }
    } else if (cursors.down.isDown && this.body.velocity.y >= 0) {
      if (this.body.velocity.x === 0) {
        this.setVelocityY(this.speed);
        this.anims.play('down', true);
      } else if (this.body.velocity.x === this.speed || this.body.velocity.x === -this.speed) {
        this.setVelocityY(this.crossSpeed);
      }
    } else {
      this.body.velocity.y = 0;
    }

    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      this.setVelocity(0);
      this.anims.play('stop');
    }
    // else if (cursors.right.isDown)
    // {
    //     this.setVelocityX(180);
    //     this.anims.play('right', true);
    // }
    // else if (cursors.down.isDown)
    // {
    //     this.setVelocityY(180);
    //     this.anims.play('down', true);
    // }
    // else if (cursors.up.isDown)
    // {
    //     this.setVelocityY(-180);
    //     this.anims.play('up', true);
    // }
    // else {
    //   this.anims.play('stop');
    // }
  }
}
