
import {AudioClip} from "./types";

interface DrumProps {
    audioClip: AudioClip;
}

const Drum = ({audioClip}: DrumProps) => {
    const playSound = (clip: AudioClip) => {
        (document.getElementById(clip.keyTrigger) as HTMLAudioElement)
        .play()
        .catch((err) => console.log(err));
        document.getElementById("display")!.innerText = clip.description;
    };
    return (
        <button
        className="drum-pad"
        id={`Drum-${audioClip.keyTrigger}`}
        onClick={() => playSound(audioClip)}
        >
            <audio src={audioClip.url} id={audioClip.keyTrigger} className="clip"></audio>
            {audioClip.keyTrigger}
        </button>
    );
};

export default Drum;