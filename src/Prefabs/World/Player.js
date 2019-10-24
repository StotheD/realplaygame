import 'phaser';
import Prefab from "../Prefab";

export default class Player extends Prefab {
  constructor (scene, name, position, properties) {
    super(scene, name, position, properties);

    // récupère la valeur du JSON, avec un + pour assurer un Int
    this.walkingSpeed = +properties.walking_speed;
    this.crossSpeed = +properties.cross_speed;

    this.scene.cameras.main.startFollow(this);

    // Colliders
    this.scene.physics.add.collider(this, this.scene.layers.Blocked);

    this.moving = {"left": false, "right": false, "up": false, "down": false}

    this.createAnimations(this.scene);
    // this.move_left = this.scene.imput.keyboard.addKey.(Phaser.Input.Keyboard.KeyCodes.LEFT);
    // this.move_right = this.scene.imput.keyboard.addKey.(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    // this.move_down = this.scene.imput.keyboard.addKey.(Phaser.Input.Keyboard.KeyCodes.DOWN);
    // this.move_up = this.scene.imput.keyboard.addKey.(Phaser.Input.Keyboard.KeyCodes.UP);
  }

  update () {
    if (this.body) {
      this.updateDirection();
    }
  }

  updateDirection(){

    if (this.moving.left && this.body.velocity.x <= 0 ){ // can't press on opposit key
      if (this.body.velocity.y === 0) { // if player don't move, start the anim
        this.body.velocity.x = -this.walkingSpeed;
        this.anims.play('walking_left', true);
      } else if (this.body.velocity.y === this.walkingSpeed || this.body.velocity.y === -this.walkingSpeed) {
        // if player already moving in an other crossing direction, velocity is lower
        this.body.velocity.x = -this.crossSpeed;
      }
    } else if (this.moving.right && this.body.velocity.x >= 0) {
      if (this.body.velocity.y === 0) {
        this.body.velocity.x = this.walkingSpeed;
        this.anims.play('walking_right', true);
      } else if (this.body.velocity.y === this.walkingSpeed || this.body.velocity.y === -this.walkingSpeed) {
        this.body.velocity.x = this.crossSpeed;
      }
    } else {
      this.body.velocity.x = 0;
    }

    if (this.moving.up && this.body.velocity.y <= 0 ){
      if (this.body.velocity.x === 0) {
        this.body.velocity.y = -this.walkingSpeed;
        this.anims.play('walking_up', true);
      } else if (this.body.velocity.x === this.walkingSpeed || this.body.velocity.x === -this.walkingSpeed) {
        this.body.velocity.y = -this.crossSpeed;
      }
    } else if (this.moving.down && this.body.velocity.y >= 0) {
      if (this.body.velocity.x === 0) {
        this.body.velocity.y = this.walkingSpeed;
        this.anims.play('walking_down', true);
      } else if (this.body.velocity.x === this.walkingSpeed || this.body.velocity.x === -this.walkingSpeed) {
        this.body.velocity.y = this.crossSpeed;
      }
    } else {
      this.body.velocity.y = 0;
    }

    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.anims.play('stop');
    }
  }

  createAnimations(scene){
    scene.anims.create({
        key: 'walking_up',
        frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 9, end: 11 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'walking_down',
        frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 0, end: 2 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'walking_left',
        frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 3, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'walking_right',
        frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 6, end: 8 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'stop',
        frames: [ { key: this.texture.key, frame: 1 } ],
        frameRate: 20
    });
  }

  changeMovement(direction, move) {
    this.moving[direction] = move;
  }
}
