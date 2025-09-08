import svgToPng from "../svgToPng.js";
import { state, icons } from "./values.js";

let rate = 1;

async function cursorTooltip(stateReader, svg) {
  if (stateReader) {
    if (svg) {
      const pngUrl = await svgToPng(svg);
      document.body.style.cursor = `url(${pngUrl}) 32 16, auto`;
      return;
    }
  }

  return (document.body.style.cursor = "auto");
}

const insertUnderline = (e) => {
  if (e.target && !e.target.closest('[data-dropdown="acessibilidade-modal"]')) {
    const el = e.target;
    const content = el.innerText || el.textContent;
    if (content) {
      cursorTooltip(state.readerMode, icons.readerTooltip);
      el.classList.add("!underline");
    } else {
      cursorTooltip(state.readerMode, icons.readerFailTooltip);
    }
  } else {
    cursorTooltip(state.readerMode);
  }
};

const removeUnderline = (e) => {
  if (e.target) {
    const el = e.target;
    el.classList.remove("!underline");
  }
};

function decorationWhenReaderOn(state) {
  if (state.readerMode) {
    document.addEventListener("mouseover", insertUnderline);
    document.addEventListener("mouseout", removeUnderline);
  } else {
    cursorTooltip(state.readerMode);
    document.removeEventListener("mouseover", insertUnderline);
    document.removeEventListener("mouseout", removeUnderline);
  }
}

function speaker(message, desactivateSpeech = false) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  const language = "pt-BR";

  synth.cancel();
  utterance.lang = language;
  utterance.rate = rate;

  if (desactivateSpeech) {
    utterance.onend = () => synth.cancel();
  }

  synth.speak(utterance);
}

export function speakMessageClicked(event) {
  if (event.target) {
    const content = event.target.innerText || event.target.textContent;
    if (content) speaker(content);
  }
}

function addSpeechSynthesisNormalMode(alreadyActived) {
  if (alreadyActived) {
    speaker("");
    return;
  }
  speaker("Leitor ativado!");
}

function addSpeechSynthesisFastMode(alreadyActived) {
  rate = 1.8;
  if (alreadyActived) {
    speaker("");
    return;
  }
  speaker("Leitor modo rápido ativado!");
}

function addSpeechSynthesisSlowMode(alreadyActived) {
  rate = 0.5;
  if (alreadyActived) {
    speaker("");
    return;
  }
  speaker("Leitor modo lento ativado!");
}

export function removeSpeechSynthesis(reset = false) {
  rate = 1;
  if (!reset) speaker("Leitor desativado!", true);
}

export function applyInitStateOfReadingMode() {
  switch (state.readerMode) {
    case 1:
      addSpeechSynthesisNormalMode(true);
      break;
    case 2:
      addSpeechSynthesisFastMode(true);
      break;
    default:
      addSpeechSynthesisSlowMode(true);
      break;
  }

  decorationWhenReaderOn(state);
}

export function readerModeActionButton(e) {
  switch (state.readerMode) {
    case null:
      addSpeechSynthesisNormalMode();
      state.readerMode = 1;
      break;
    case 1:
      addSpeechSynthesisFastMode();
      state.readerMode++;
      break;
    case 2:
      addSpeechSynthesisSlowMode();
      state.readerMode++;
      break;
    default:
      removeSpeechSynthesis();
      state.readerMode = null;
      break;
  }

  decorationWhenReaderOn(state);
}
