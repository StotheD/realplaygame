import 'phaser';
import Player from '../Sprites/Player';
import Portal from '../Sprites/Portal';

export default class GameScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  init (data) {
    this._MAP = data.map;
    this._NEWGAME = data.newGame;
    this._LAYERS = data.layers;
    this.loadingNextScene = false;
  }

  create () {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.createMap();
    this.createPortal();
    this.createPlayer();
    this.createFrontLayer();
    this.addCollisions();

    this.cameras.main.startFollow(this.player);

  }

  update() {
    this.player.update(this.cursors);
  }

  addCollisions(){
    this.physics.add.collider(this.player, this.layerBlocked);
    this.physics.add.overlap(this.player, this.portal, this.changeScene, null, this);
  }

  changeScene(){
    if (!this.loadingNextScene) {
      this.cameras.main.fade(500, 0, 0, 0);
      this.cameras.main.on('camerafadeoutcomplete', () => {
        if (this._MAP === "village") {
          this.scene.restart({map:"wild", newGame: false, layers: this._LAYERS});
        } else {
          this.scene.restart({map:"village", newGame: false, layers: this._LAYERS});
        }
      });
      this.loadingNextScene = true;
    }
  }

  createPortal(){
    this.map.findObject('Portal', (obj) => {
        this.portal = new Portal(this, obj.x, obj.y);
    });
  }

  createPlayer() {
    this.map.findObject('Player', (obj) => {
      if (this._NEWGAME) {
        if (obj.type === "startingPosition") {
          this.player = new Player(this, obj.x, obj.y);
          if (this.player) {
              this.player.createAnimations(this);
          }
        }
      } else {
        if (obj.type === "startingPositionPortal") {
          this.player = new Player(this, obj.x, obj.y);
          if (this.player) {
              this.player.createAnimations(this);
          }
        }
      }
    });
  }

  createMap() {
    // background
    this.add.tileSprite(800, 800, 3000, 3000, 'Water2_pipo', 32);
    // creat the tilemaps
    this.map = this.make.tilemap({ key: this._MAP});
    this.tiles = this.map.addTilesetImage('BaseChip_pipo_2');
    this.layerBackground = this.map.createStaticLayer('Background', this.tiles, 0, 0);
    this.layerBlocked = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
    this.layerBlockedSoftBack = this.map.createStaticLayer('Blocked-Soft-Back', this.tiles, 0, 0);
    this.layerDecoration = this.map.createStaticLayer('Decoration', this.tiles, 0, 0);
    // this.layerInteraction = this.map.createDynamicLayer('Interaction', this.tiles, 0, 0);
    // exclude collision for a type of layer and ad it for the rest
    this.layerBlocked.setCollisionByExclusion([-1]);
  }
  createFrontLayer(){
    this.layerBlockedSoftFront = this.map.createStaticLayer('Blocked-Soft-Front', this.tiles, 0, 0);
  }
};
