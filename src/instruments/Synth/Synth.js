import Tone from 'tone';

let polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

export default {
  attack: note => {
    polySynth.triggerAttack(note);
  },
  release: note => {
    polySynth.triggerRelease([note]);
  }
};
