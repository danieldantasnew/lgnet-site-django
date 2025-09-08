import {state} from "./values.js";
const allAudios = document.querySelectorAll("audio");
const allVideos = document.querySelectorAll("video");

export function pauseSounds() {
  allAudios.forEach((audio) => {
    if (audio instanceof HTMLAudioElement) {
      audio.muted = true;
    }
  });

  allVideos.forEach((video) => {
    if (video instanceof HTMLVideoElement) {
      video.muted = true;
    }
  });
}

export function playSounds() {
  allAudios.forEach((audio) => {
    if (audio instanceof HTMLAudioElement) {
      audio.muted = false;
    }
  });

  allVideos.forEach((video) => {
    if (video instanceof HTMLVideoElement) {
      video.muted = false;
    }
  });
}

export default function stopSoundsButton() {
  if (allAudios && allVideos) {
    if (!state.stopSounds) {
      state.stopSounds = true;
      pauseSounds(allAudios, allVideos);
    } else {
      state.stopSounds = false;
      playSounds(allAudios, allVideos);
    }
  }
}
