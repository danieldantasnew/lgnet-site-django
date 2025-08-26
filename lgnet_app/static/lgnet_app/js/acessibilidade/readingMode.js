let rate = 1;

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
  if(event.target) {
    const content = event.target.innerText || event.target.textContent;
    if(content) speaker(content);
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
  rate = 0.3;
  speaker("Leitor modo lento ativado!");
}

function removeSpeechSynthesis() {
  rate = 1;
  speaker("Leitor desativado!", true);
}

export function readerWebSite(state) {
  const buttonReader = document.querySelector("[data-acessibilidade-leitor]");
  if (buttonReader instanceof HTMLButtonElement) {
    buttonReader.addEventListener("click", () => {
      switch (state.readerMode) {
        case null:
          addSpeechSynthesisNormalMode();
          state.readerMode = 1;
          break;
        case 1:
          addSpeechSynthesisFastMode();
          state.readerMode += 1;
          break;
        case 2:
          addSpeechSynthesisSlowMode();
          state.readerMode += 1;
          break;
        case 3:
          removeSpeechSynthesis();
          state.readerMode = null;
          break;

        default:
          state.readerMode = null;
          break;
      }
    });
    
  }
}