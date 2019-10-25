import Phaser from "phaser";
import config from "./config";
import BootScene from './Scenes/Boot';
import WorldScene from './Scenes/World';
import TitleScene from './Scenes/Title';
import LoadingScene from './Scenes/Loading';
// import GameScene from './Scenes/Game';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Loading', LoadingScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('World', WorldScene);
    this.scene.add('Title', TitleScene);
    // this.scene.add('Game', GameScene);
    this.scene.start('Boot', {scene : "Title"});
  }
}

window.game = new Game();
window.addEventListener('resize', (event) => {
  window.game.scale.resize(window.innerWidth, window.innerHeight);
});
