import KEY_CODES from '../../key-codes.json';
import KEY_NOTES from '../../key-notes.json';

// Computer keyboard input controller

class ComputerKeyboard {
  constructor() {
    // Initialize array that will track which keys on the keyboard are
    // currently being pressed.
    this.keysdown = [];

    // Set initial keyboard position to 3
    this.position = 3;

    // Initialize instruments as an empty array, forcing the user to add
    // instruments using the connect method.
    this.instruments = [];

    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));

    // Bind methods
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp   = this.onKeyUp.bind(this);
  }

  handleKeyDown(e) {
    let key = KEY_CODES[e.which];
    let note = this.getNoteFromKeyboardInput(key, window.keyboardPosition);

    if (note) {
      // If the keydown represents a note to be played, check if it's already
      // being played, and if not, send it to all instruments.

      if (this.keysdown.indexOf(key) === -1) {
        // Since this key is down we add it to the keysdown array to make sure
        // the instrument's attack isn't called more than once.
        this.keysdown.push(key);

        if (typeof this._onKeyDown === 'function') {
          this._onKeyDown(key);
        }

        this.instruments.forEach((instrument, index) => {
          instrument.attack(note);
        });
      }
    } else {
      // If the keydown does not represent a note, check to see if it serves
      // a special function and react accordingly
      switch (key) {
        case 'z':
          if (this.position > 0) {
            this.position--;
          }
          break;
        case 'x':
          if (this.position < 8) {
            this.position++;
          }
          break;
        default:
          return true;
      }

      // If the onKeyDown property sent into the contructor
      if (typeof this._onKeyDown === 'function') {
        this._onKeyDown(key);
      }
    }
  }

  handleKeyUp(e) {
    let key = KEY_CODES[e.which];
    let note = this.getNoteFromKeyboardInput(key);

    if (note) {
      // If the keyup represents a note to be released, send it to all instruments

      // Remove key from this.keysdown since it's not down anymore
      this.keysdown = this.keysdown.filter(keydown => { return key !== keydown });

      if (typeof this._onKeyUp === 'function') {
        this._onKeyUp(key);
      }

      this.instruments.forEach((instrument, index) => {
        instrument.release(note);
      });
    }
  }

  getNoteFromKeyboardInput(key) {
    if (typeof KEY_NOTES[key] !== 'undefined') {
      return `${KEY_NOTES[key].note}${this.position + KEY_NOTES[key].posModifier}`;
    } else {
      return false;
    }
  }

  connect(instrument) {
    this.instruments.push(instrument);
  }

  // Add _onKeyDown function to the class to be called in the handleKeyDown method
  onKeyDown(keydownHandler) {
    if (typeof keydownHandler === 'function') {
      this._onKeyDown = keydownHandler;
    } else {
      console.error(`The method onKeyDown expects a function as a parameter, instead received a ${typeof keydownHandler}`);
    }
  }

  // Add _onKeyUp function to the class to be called in the handleKeyUp method
  onKeyUp(keyupHandler) {
    if (typeof keyupHandler === 'function') {
      this._onKeyUp = keyupHandler;
    } else {
      console.error(`The method onKeyUp expects a function as a parameter, instead received a ${typeof keyupHandler}`);
    }
  }
}

export default ComputerKeyboard;
