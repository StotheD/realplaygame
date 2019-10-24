import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);

    this.files = {
      Title : {key: "Title", path: "assets/files/title_screen.json"},
      Village : {key: "World", path: "assets/files/village.json"},
      Wild : {key: "World", path: "assets/files/wild.json"}
    }
  }

  preload () {
    //load the title screen
    for (let file_name in this.files) {
      let file = this.files[file_name];
      this.load.json(file_name, file.path);
    };
    // // load in the tilemap
    // this.load.tilemapTiledJSON('village', 'assets/tilemaps/village.json');
    // this.load.tilemapTiledJSON('wild', 'assets/tilemaps/wild.json');
    // // load in the spritsheet
    // this.load.spritesheet('BaseChip_pipo_2', 'assets/images/BaseChip_pipo_2.png', {frameWidth: 32, frameHeight: 32});
    // this.load.spritesheet('Water2_pipo', 'assets/images/Water2_pipo.png', {frameWidth: 32, frameHeight: 32});
    // // load in the player
    // this.load.spritesheet('Player', 'assets/images/player.png', {frameWidth: 32, frameHeight: 32});
  }

  create (data) {
    // charge le fichier json de la prochaine scene
    let file_data = this.cache.json.get(data.scene);
    // change la sscene de chargement avec comme object la prochaine scene à lancer après le chargement
    this.scene.start('Loading', {file_data : file_data, scene : this.files[data.scene].key});
  }

};
