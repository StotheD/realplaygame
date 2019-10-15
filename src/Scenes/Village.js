import 'phaser';

import JSONLevelScene from './JSONLevelScene';
import Prefab from "../Prefabs/Prefab";
import TextPrefab from "../Prefabs/TextPrefab";

export default class VillageScene extends JSONLevelScene {
  constructor (key) {
    super(key);

    this.prefab_classes = {
      player: Prefab.prototype.constructor
    }
  }

  create(){
    console.log("where is the map ?");
    // création de la map
    this.map = this.add.tilemap(this.file_data.map.key);

    // ajout des tilsets à la map suivant le json indiqué
    let tileset_index = 0;
    this.tilesets = {};
    console.log(this.map.tilesets);
    this.map.tilesets.forEach(function (tileset){
      let map_tileset = this.map.addTilesetImage(tileset.name, this.file_data.map.tilesets[tileset_index]);
      this.tilesets[this.file_data.map.tilesets[tileset_index]] = map_tileset;
      tileset_index += 1;
    }, this);

    // ajout des calques à la map
    this.layers = {};
    console.log(this.map.layers);
    this.map.layers.forEach(function(layer){
      this.layers[layer.name] = this.map.createStaticLayer(layer.name, this.tilesets[layer.properties.tileset], 0, 0);
      if (layer.properties.collison) {
        // rend le calque sensible aux collision
        // si la propriété collision est vraie dans les propriétés du calque
        this.map.setCollisionByExclusion([-1], true, layer.name);
      }
    }, this);

    super.create();

    console.log(this.map.objects);
    this.map.objects.forEach(function(object_layer){
      // object_layer.objects.forEach(this.createObject, this);
    }, this);
  }

  createObject(object){
    let position = {x: object.x + (object.width / 2), y: object.y + (object.height / 2)};
    if (this.prefab_classes.hasOwnProperty(object.type)) {
      let prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
    }
  }
};
