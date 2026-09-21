/**
 * EnglishPage - Speech Synthesis & Native Pronunciation Engine
 * Garantiza pronunciación 100% nativa en inglés eliminando acentos de voces
 * del sistema en otros idiomas mediante selección estricta y fallback de alta fidelidad.
 */

let synth = null;
let currentAudio = null;

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
  // Precargar lista de voces del navegador
  if (synth.onvoiceschanged !== undefined) {
    synth.addEventListener('voiceschanged', () => {
      // Evento de recarga de voces completado
    });
  }
}

/**
 * Obtiene únicamente las voces instaladas que corresponden al idioma inglés.
 * @returns {SpeechSynthesisVoice[]}
 */
function getEnglishVoices() {
  if (!synth) return [];
  const allVoices = synth.getVoices() || [];
  return allVoices.filter(v => {
    const lang = (v.lang || '').toLowerCase();
    const name = (v.name || '').toLowerCase();
    return (
      lang.startsWith('en') ||
      name.includes('english') ||
      name.includes('united states') ||
      name.includes('united kingdom')
    );
  });
}

/**
 * Selecciona la voz en inglés de mayor calidad disponible en el sistema.
 * Prioriza voces "Natural", "Neural", "Online" o de motores reconocidos (Google, Apple, Microsoft).
 * @param {SpeechSynthesisVoice[]} englishVoices
 * @param {string} preferredLang
 * @returns {SpeechSynthesisVoice|null}
 */
function selectBestEnglishVoice(englishVoices, preferredLang = 'en-US') {
  if (!englishVoices || englishVoices.length === 0) return null;

  // 1. Voces naturales / neurales / online
  const naturalVoice = englishVoices.find(v => {
    const name = v.name.toLowerCase();
    return (
      (name.includes('natural') || name.includes('neural') || name.includes('online') || name.includes('google')) &&
      v.lang.toLowerCase().startsWith('en')
    );
  });
  if (naturalVoice) return naturalVoice;

  // 2. Coincidencia exacta con el dialecto preferido (ej. en-US o en-GB)
  const exactMatch = englishVoices.find(v => v.lang.toLowerCase() === preferredLang.toLowerCase());
  if (exactMatch) return exactMatch;

  // 3. Voces nativas estándar reconocidas
  const standardVoice = englishVoices.find(v => {
    const name = v.name.toLowerCase();
    return (
      name.includes('zira') ||
      name.includes('david') ||
      name.includes('jenny') ||
      name.includes('guy') ||
      name.includes('samantha') ||
      name.includes('daniel') ||
      name.includes('karen') ||
      name.includes('george')
    );
  });
  if (standardVoice) return standardVoice;

  // 4. Cualquier voz en-US o en-GB
  const usGbVoice = englishVoices.find(v => {
    const l = v.lang.toLowerCase();
    return l.startsWith('en-us') || l.startsWith('en-gb');
  });
  if (usGbVoice) return usGbVoice;

  // 5. Primera voz en inglés disponible
  return englishVoices[0];
}

/**
 * Reproduce audio nativo mediante el servicio de pronunciación de alta fidelidad.
 * Utilizado cuando el sistema operativo no cuenta con voces en inglés instaladas.
 * @param {string} text
 * @param {string} lang
 */
function playAudioFallback(text, lang = 'en-US') {
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }

    const ttsLang = lang.toLowerCase().startsWith('en-gb') ? 'en-GB' : 'en-US';
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(ttsLang)}&q=${encodeURIComponent(text)}`;
    
    const audio = new Audio(audioUrl);
    currentAudio = audio;
    audio.playbackRate = 0.95;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Fallback de audio no pudo reproducirse:', err);
      });
    }
  } catch (err) {
    console.error('Error en servicio de pronunciación alternativa:', err);
  }
}

/**
 * Pronuncia un texto con acento y fonética 100% en inglés nativo.
 * @param {string} text - Texto o frase a pronunciar.
 * @param {string} [lang='en-US'] - Código de idioma ('en-US' o 'en-GB').
 */
export function speakText(text, lang = 'en-US') {
  if (!text) return;

  // Limpiar texto de paréntesis o anotaciones para pronunciar solo la frase en inglés
  const cleanText = text.replace(/\(.*?\)/g, '').replace(/[\/\\#]/g, '').trim();
  if (!cleanText) return;

  // Detener audio previo de cualquier fuente
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  if (synth) {
    synth.cancel();
  }

  // Buscar voces en inglés disponibles en el navegador en este instante
  const englishVoices = getEnglishVoices();

  // Si el navegador NO tiene ninguna voz en inglés instalada (común en PCs con Windows en español puro),
  // recurrir directamente al reproductor de audio nativo para no usar la voz en español.
  if (!synth || englishVoices.length === 0) {
    playAudioFallback(cleanText, lang);
    return;
  }

  const selectedVoice = selectBestEnglishVoice(englishVoices, lang);

  // Si por alguna razón la voz seleccionada no es en inglés, usar fallback
  if (!selectedVoice || !selectedVoice.lang.toLowerCase().startsWith('en')) {
    playAudioFallback(cleanText, lang);
    return;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang || lang;
    utterance.rate = 0.88; // Velocidad óptima de estudio y dicción clara
    utterance.pitch = 1.0;

    // En caso de que Web Speech falle en emitir sonido, disparar el fallback
    utterance.onerror = (e) => {
      console.warn('Web Speech falló, usando audio nativo:', e);
      playAudioFallback(cleanText, lang);
    };

    synth.speak(utterance);
  } catch (err) {
    console.warn('Error al iniciar Web Speech, usando fallback:', err);
    playAudioFallback(cleanText, lang);
  }
}
