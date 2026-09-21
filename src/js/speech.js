/**
 * EnglishPage - Speech Synthesis Utility
 * Permite reproducir la pronunciación nativa en inglés usando la Web Speech API del navegador.
 */

let synth = null;
let voices = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
  const loadVoices = () => {
    voices = synth.getVoices().filter(v => v.lang.startsWith('en'));
  };
  loadVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }
}

/**
 * Pronuncia un texto en inglés.
 * @param {string} text - Frase o palabra a pronunciar.
 * @param {string} [lang='en-US'] - Código de idioma preferido ('en-US' o 'en-GB').
 */
export function speakText(text, lang = 'en-US') {
  if (!synth) {
    console.warn('Web Speech API no está soportada en este navegador.');
    return;
  }

  // Cancelar locuciones previas para evitar superposiciones
  synth.cancel();

  const cleanText = text.replace(/\(.*?\)/g, '').trim(); // Omitir texto entre paréntesis en la pronunciación
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang;
  utterance.rate = 0.9; // Velocidad ligeramente pausada para aprendizaje
  utterance.pitch = 1.0;

  // Seleccionar la mejor voz en inglés disponible
  if (voices.length > 0) {
    const preferredVoice = voices.find(v => v.lang === lang) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;
  }

  synth.speak(utterance);
}
