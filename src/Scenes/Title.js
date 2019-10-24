import 'phaser';

import JSONLevelScene from './JSONLevelScene';
import Prefab from "../Prefabs/Prefab";
import TextPrefab from "../Prefabs/TextPrefab";

export default class TitleScene extends JSONLevelScene {
  constructor () {
    super('Title');

    this.prefab_classes = {
      background: Prefab.prototype.constructor,
      text: TextPrefab.prototype.constructor,
    }
  }

  update() {
    if (this.input.activePointer.isDown) {
      this.startGame();
    }
  }

  // create(){
  //   // delet when we want the title to show
  //   this.scene.start('Game', {map: 'village', newGame: true, layers:[]});
  // }

  startGame() {
    this.scene.start('Boot', {scene: 'Village'});
    // this.scene.start('Game', {map: 'village', newGame: true, layers:[]});
  }
};
