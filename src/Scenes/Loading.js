import 'phaser';

export default class LoadingScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  init (data) {
    this.file_data = data.file_data;
    let loadingMessage = this.add.text(30, 30, "Chargement...", {font:"34px", fill:"#ffffff"});
  }

  preload () {
    let assets = this.file_data.assets;
    for (let asset_key in assets) {
      let asset = assets[asset_key];
      // chargement des assets en fonction de leur type dans le fichier json
      switch (asset.type) {
        case "image" :
          this.load.image(asset_key, asset.source);
          break;
        case "spritesheet" :
          this.load.spritesheet(asset_key, asset.source, {frameWidth: asset.frame_width, frameHeight: asset.frame_height});
          break;
        case "tilemap" :
          this.load.tilemapTiledJSON(asset_key, asset.source);
          break;
      }
    }

    this.load.json(this.file_data.user_input.key, this.file_data.user_input.path);
  }

  create (data) {
    // charge la scène indiqué dans l'object "scene" depuis la scene de boot
    this.scene.start(data.scene, {file_data : this.file_data});
  }

};
