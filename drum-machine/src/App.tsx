import React, { useEffect } from 'react';
import './App.css';

interface AudioClip {
  keyTrigger: string;
  url: string;
  description: string;
}

const audioClips: AudioClip[] = [
  {
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater-1",
  },
  {
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater-2",
  },
  {
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater-3",
  },
  {
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater-4",
  },
  {
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap",
  },
  {
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open-HH",
  },
  {
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick-n'-Hat",
  },
  {
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick",
  },
  {
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed-HH",
  },
];

interface DrumProps {
  audioClip: AudioClip;
}

function Drum({ audioClip }: DrumProps) {
  const playSound = () => {
    const audioElement = document.getElementById(
      audioClip.keyTrigger
    ) as HTMLAudioElement;
    if (audioElement) {
      audioElement.play().catch((err) => console.log(err));
    }
    const display = document.getElementById("display");
    if (display) display.innerText = audioClip.description;
  };

  return (
    <button
      className="drum-pad"
      id={`drum-${audioClip.keyTrigger}`}
      onClick={playSound}
    >
      <audio
        className="clip"
        id={audioClip.keyTrigger}
        src={audioClip.url}
      ></audio>
      {audioClip.keyTrigger}
    </button>
  );
}

function App() {
  const playAudio = (e: KeyboardEvent) => {
    const clip = audioClips.find(
      (clip) => clip.keyTrigger === e.key.toUpperCase()
    );

    if (!clip) return;

    const audioElement = document.getElementById(
      clip.keyTrigger
    ) as HTMLAudioElement;
    if (audioElement) {
      audioElement.play().catch((err) => console.log(err));
    }

    const drumPad = document.getElementById("drum-" + clip.keyTrigger);
    if (drumPad) drumPad.focus();

    const display = document.getElementById("display");
    if (display) display.innerText = clip.description;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      playAudio(e);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container" id="drum-machine" tabIndex={0}>
      <h1>Drum Machine</h1>
      <div className="whole-drum">
        {audioClips.map((clip) => (
          <Drum audioClip={clip} key={clip.keyTrigger} />
        ))}
      </div>
      <div id="display"></div>
    </div>
  );
}

export default App;
