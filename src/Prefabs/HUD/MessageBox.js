import 'phaser';
import Prefab from "../Prefab";
import TextPrefab from "../TextPrefab";

export default class MessageBox extends Prefab {
  constructor (scene, name, position, properties) {
    super(scene, name, position, properties);
      this.messageText = new TextPrefab(this.scene, this.name + "_message",
        {x: this.x + 40, y: this.y + 20},
        {group: "hud", text: properties.message, style: this.scene.TEXT_STYLE}
      );

      // VARIABLES
      this.writtingSpeed = 20;
      this.maxLines = 4;

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
      this.parceMessage();
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
    }
}
