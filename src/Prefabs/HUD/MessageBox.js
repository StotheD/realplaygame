import 'phaser';
import Prefab from "../Prefab";
import TextPrefab from "../TextPrefab";

export default class MessageBox extends Prefab {
  constructor (scene, name, position, properties) {
    super(scene, name, position, properties);
      this.scene = scene;
      this.name = name;
      this.position = position;
      this.properties = properties;

      this.multiText = true;
      this.dialogStatut = 0;
      this.talkers = [];
      this.dialogs = [];

      for (let key in properties.message) {
        this.talkers.push(properties.message[key][0]);
        this.dialogs.push(properties.message[key][1]);
      }
      console.log(this.talkers);
      console.log(this.dialogs);
      // properties.message.forEach(function(key){
      //   this.talkers.push(key);
      //   this.dialogs.push(array[1]);
      // }, this);

      // VARIABLES FIXES
      this.writtingSpeed = 20;
      this.maxLines = 4;

      this.creatMessage();
    }

    creatMessage() {
      let witch_one_is_talking = this.talkers[this.dialogStatut];
      let what_is_saying = this.dialogs[this.dialogStatut]

      this.messageText = new TextPrefab(this.scene, this.name + "_message",
        {x: this.x + 80, y: this.y + 20},
        {group: "hud", text: what_is_saying, style: this.scene.TEXT_STYLE}
      );
      this.messageImage = new Prefab(this.scene, this.name + "_image",
        {x: this.x + 10, y: this.y + 20},
        {group: "hud", texture: witch_one_is_talking+"_spritesheet", frame: 1, scale: {x: 1.8, y: 1.8}}
      );

      // NEEDED
      this.wrappedMessage = this.messageText.getWrappedText();
      this.messageText.setText("");
      this.linesBreak = 0;
      this.still_have_something_to_say = true;
      this.writting = false;
      this.messageParced = "";
      this.waitHandler=[];

      this.setOrigin(0);
      this.messageText.setOrigin(0);
      this.messageImage.setOrigin(0);
      this.parceMessage();

      console.log(this.dialogStatut);
      console.log(this.dialogs.length);

      if (this.dialogStatut === this.dialogs.length - 1) {
        this.multiText = false;
      }
    }

    nextTalker () {
      this.dialogStatut += 1;

      this.messageText.destroy();
      this.messageImage.destroy();

      this.creatMessage();
    }

    nextLines() {
      // if the text message is more than maxLines, show only maxLines in a time
      if (this.writting) {
        this.writeStop();
      } else {
        this.parceMessage();
      }
    }

    parceMessage(){
      if (this.wrappedMessage.length < this.maxLines) {
        this.still_have_something_to_say = false;
        this.writeText(this.messageText, this.wrappedMessage);
      } else {
        let minLinesBreak = this.linesBreak;
        this.linesBreak += this.maxLines;
        let messageLines = this.wrappedMessage.slice(minLinesBreak, this.linesBreak)
        this.writeText(this.messageText, messageLines);
        if (this.wrappedMessage.length < this.linesBreak) {
          this.still_have_something_to_say = false;
        }
      }
    }

    writeText(context, text){
      // text must be an array of sting texts
      // context must be a Text object like Textprefabs
      this.messageParced = "";
      this.writting = true;

      var lastLine = text.length;
      var t = 0;

      for (let line in text) {
        for (let letter in text[line]) {
          this.messageParced = this.messageParced + text[line][letter];
          this.waitHandler.push(setTimeout(this.writeSteps.bind(this), t, context, this.messageParced));
          t += this.writtingSpeed;
        }
        lastLine -= 1;
        if (lastLine > 0) this.messageParced = this.messageParced+"\n";
      }
      this.waitHandler.push(setTimeout(this.writeStop.bind(this), t));
    }

    writeSteps(context, message){
      context.setText(message);
    }

    writeStop(){
      this.writting = false;
      this.waitHandler.forEach(clearTimeout);
      this.messageText.setText(this.messageParced);
    }

    destroy(){
      super.destroy();
      this.messageText.destroy();
      this.messageImage.destroy();
    }
}
