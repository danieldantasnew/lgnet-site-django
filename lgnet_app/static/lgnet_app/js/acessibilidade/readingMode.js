import svgToPng from "../svgToPng.js";
import { highlightActive, state } from "./acessibilidade.js";
import { icons } from "./icons.js";

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

function addSpeechSynthesisNormalMode() {
  speaker("Leitor ativado!");
}

function addSpeechSynthesisFastMode() {
  rate = 1.8;
  speaker("Leitor modo rápido ativado!");
}

function addSpeechSynthesisSlowMode() {
  rate = 0.5;
  speaker("Leitor modo lento ativado!");
}

function removeSpeechSynthesis() {
  rate = 1;
  speaker("Leitor desativado!", true);
}

export function readerModeActionButton() {
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
  highlightActive({
    attr: "data-acessibilidade-leitor",
    numberOfIndicators: 3,
    stateItem: state.readerMode,
  });
}
