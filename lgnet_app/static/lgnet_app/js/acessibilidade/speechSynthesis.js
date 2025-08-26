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
  speaker("Teste Murilinho está funcionando neste momento.")
}

export function addSpeechSynthesisNormalMode() {
  speaker("Leitor ativado!");
}

export function addSpeechSynthesisFastMode() {
  rate = 1.6;
  speaker("Leitor modo rápido ativado!");
}

export function addSpeechSynthesisSlowMode() {
  rate = 0.4;
  speaker("Leitor modo lento ativado!");
}

export function removeSpeechSynthesis() {
  rate = 1;
  speaker("Leitor desativado!", true);
}
