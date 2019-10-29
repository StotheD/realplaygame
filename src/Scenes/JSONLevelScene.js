import 'phaser';
import Prefab from "../Prefabs/Prefab";
import TextPrefab from "../Prefabs/TextPrefab";
import UserInput from "../Plugins/UserInput";

export default class JSONLevelScene extends Phaser.Scene {
  constructor(key) {
    super({key : key});
  }


  init (data) {
    this.file_data = data.file_data;
  }

  create () {
    this.groups = {};
    this.file_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.physics.add.group();
    }, this);

    this.prefabs = {};
    for (let prefab_name in this.file_data.sprites) {
        let prefab_data = this.file_data.sprites[prefab_name];
        let prefab = new this.prefab_classes[prefab_data.type](this,
          prefab_name, prefab_data.position, prefab_data.properties);
    }

    this.user_inputs = {};
    for (let user_input_key in this.file_data.user_input) {
      this.user_inputs[user_input_key] = this.cache.json.get(user_input_key);
    }

    this.user_input = new UserInput(this);
    this.user_input_data = this.cache.json.get(this.file_data.initial_user_input);
    this.user_input.setInput(this.user_input_data);
  }

  update () {
    for (let prefabName in this.prefabs) {
      this.prefabs[prefabName].update();
    }
  }
};
