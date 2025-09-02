import {state} from "./values.js";

function pauseSounds(audios, videos) {
  audios.forEach((audio) => {
    if (audio instanceof HTMLAudioElement) {
      audio.muted = true;
    }
  });

  videos.forEach((video) => {
    if (video instanceof HTMLVideoElement) {
      video.muted = true;
    }
  });
}

function playSounds(audios, videos) {
  audios.forEach((audio) => {
    if (audio instanceof HTMLAudioElement) {
      audio.muted = false;
    }
  });

  videos.forEach((video) => {
    if (video instanceof HTMLVideoElement) {
      video.muted = false;
    }
  });
}

export default function stopSoundsButton() {
  const allAudios = document.querySelectorAll("audio");
  const allVideos = document.querySelectorAll("video");

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
