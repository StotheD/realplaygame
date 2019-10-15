import 'phaser';
import Prefab from "../Prefabs/Prefab";
import TextPrefab from "../Prefabs/TextPrefab";

export default class JSONLevelScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }


  init (data) {
    this.file_data = data.file_data;
  }

  create () {
    this.groups = {};
    this.file_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.add.group();
    }, this);

    this.prefabs = {};
    for (let prefab_name in this.file_data.sprites) {
        let prefab_data = this.file_data.sprites[prefab_name];
        let prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
    }
  }
};
