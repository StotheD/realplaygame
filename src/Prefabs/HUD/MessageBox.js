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

      this.wrappedMessage = this.messageText.getWrappedText();
      this.maxLines = 4;
      this.linesBreak = 0;
      this.still_have_something_to_say = true;
      this.writting = false;
      this.timedEvent;

      this.setOrigin(0);
      this.messageText.setOrigin(0);
      this.nextLines();
    }

    nextLines() {
      // if the text message is more than maxLines, show only maxLines in a time
      if (this.wrappedMessage.length < this.maxLines) {
        this.still_have_something_to_say = false;
        this.writeText(this.wrappedMessage, this.messageText);
      } else {
        let minLinesBreak = this.linesBreak;
        this.linesBreak += this.maxLines;
        let messageLines = this.wrappedMessage.slice(minLinesBreak, this.linesBreak)
        this.writeText(messageLines, this.messageText);
        if (this.wrappedMessage.length < this.linesBreak) {
          this.still_have_something_to_say = false;
        }
      }
    }

    writeText(text, context){
      // text must be an array of sting texts
      // context must be a Text object like Textprefabs
      var lastLine = text.length
      var previewsLines = "";
      var t = 0;

      for (let line in text) {
        var lineLength = text[line].length;
        while (lineLength > 0) {
          var messageParced = text[line].slice(0,-lineLength);
          messageParced = previewsLines + messageParced;
          setTimeout(this.writeSteps, t, context, messageParced);
          lineLength -= 1;
          t += 20;
        }
        lastLine -= 1;
        if (lastLine > 0) {
          messageParced = messageParced+"\n";
          setTimeout(this.writeSteps, t, context, messageParced);
        }
        previewsLines = messageParced
      }
    }

    writeSteps(context, message){
      console.log("write");
      context.setText(message);
    }

    destroy(){
      super.destroy();
      this.messageText.destroy();
    }
}
