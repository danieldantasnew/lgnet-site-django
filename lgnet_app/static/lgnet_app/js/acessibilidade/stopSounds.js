import { highlightActive, state } from "./acessibilidade.js";

function pauseSounds(audios,videos) {
    if(audios) {
        audios.forEach((audio)=> {
            if(audio instanceof HTMLAudioElement) {
                audio.muted = true;
            }
        });
    }
    
    if(videos) {
        videos.forEach((video)=> {
            if(video instanceof HTMLVideoElement) {
                video.muted = true;
            }
        });
    }
}

function playSounds(audios,videos) {
    if(audios) {
        audios.forEach((audio)=> {
            if(audio instanceof HTMLAudioElement) {
                audio.muted = false;
            }
        });
    }
    
    if(videos) {
        videos.forEach((video)=> {
            if(video instanceof HTMLVideoElement) {
                video.muted = false;
            }
        });
    }
}

export default function stopSoundsButton() {
    const allAudios = document.querySelectorAll("audio");
    const allVideos = document.querySelectorAll("video");

    if(!state.stopSounds) {
        state.stopSounds = true;
        pauseSounds(allAudios,allVideos);
    }
    else {
        state.stopSounds = false;
        playSounds(allAudios,allVideos);
    }

    highlightActive({
        attr: "data-acessibilidade-sem_som",
        numberOfIndicators: 1,
        stateItem: state.stopSounds,
    });
}