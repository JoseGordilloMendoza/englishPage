/**
 * EnglishPage - Speech Synthesis & Native Pronunciation Engine
 * Garantiza pronunciación 100% nativa en inglés eliminando el bug de cancelación
 * silenciosa de Chromium, desfreezando el hilo de audio y reteniendo el objeto en memoria.
 */

let activeUtterance = null; // Retención global contra el recolector de basura de V8 (Chromium Bug #338302)

/**
 * Obtiene las voces disponibles en inglés en el navegador.
 * @returns {SpeechSynthesisVoice[]}
 */
function getEnglishVoices() {
  if (!('speechSynthesis' in window)) return [];
  const allVoices = window.speechSynthesis.getVoices() || [];
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
 * Selecciona la voz en inglés más confiable y nativa.
 * Prioriza voces locales de alta compatibilidad (Zira, David, Jenny, Guy, Google US English).
 * @param {SpeechSynthesisVoice[]} englishVoices
 * @param {string} preferredLang
 * @returns {SpeechSynthesisVoice|null}
 */
function selectBestEnglishVoice(englishVoices, preferredLang = 'en-US') {
  if (!englishVoices || englishVoices.length === 0) return null;

  // 1. Voces locales de Windows altamente confiables y sin latencia de red
  const localHighQuality = englishVoices.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('zira') || name.includes('david') || name.includes('jenny') || name.includes('guy');
  });
  if (localHighQuality) return localHighQuality;

  // 2. Voces Google English de Chrome
  const googleVoice = englishVoices.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('google') && v.lang.toLowerCase().startsWith('en');
  });
  if (googleVoice) return googleVoice;

  // 3. Voces de Apple o estándar (Samantha, Daniel, Karen)
  const standardVoice = englishVoices.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('samantha') || name.includes('daniel') || name.includes('karen');
  });
  if (standardVoice) return standardVoice;

  // 4. Coincidencia por dialecto (en-US o en-GB)
  const langMatch = englishVoices.find(v => v.lang.toLowerCase() === preferredLang.toLowerCase());
  if (langMatch) return langMatch;

  const anyUsGb = englishVoices.find(v => {
    const l = v.lang.toLowerCase();
    return l.startsWith('en-us') || l.startsWith('en-gb');
  });
  if (anyUsGb) return anyUsGb;

  return englishVoices[0];
}

/**
 * Pronuncia un texto con acento y fonética 100% en inglés nativo.
 * @param {string} text - Texto o frase a pronunciar en inglés.
 * @param {string} [lang='en-US'] - Dialecto preferido ('en-US' o 'en-GB').
 * @param {HTMLElement} [triggerBtn=null] - Botón opcional para animación visual de reproducción.
 */
export function speakText(text, lang = 'en-US', triggerBtn = null) {
  if (!text) return;
  if (!('speechSynthesis' in window)) {
    console.warn('[Audio] Web Speech API no soportada en este navegador.');
    return;
  }

  // Limpiar texto de paréntesis o anotaciones para pronunciar únicamente la frase en inglés
  const cleanText = text.replace(/\(.*?\)/g, '').replace(/[\/\\#]/g, '').trim();
  if (!cleanText) return;

  const synth = window.speechSynthesis;

  // Feedback visual en el botón pulsado
  if (triggerBtn) {
    triggerBtn.classList.add('playing-audio');
  }

  // Despertar el hilo de síntesis de voz si Chromium lo suspendió
  if (synth.paused) {
    synth.resume();
  }

  // Cancelar audio en curso antes de lanzar la nueva frase
  synth.cancel();

  // Esperar 30ms para que la cancelación se procese en Chromium y no mate a la nueva locución
  setTimeout(() => {
    try {
      const englishVoices = getEnglishVoices();
      const selectedVoice = selectBestEnglishVoice(englishVoices, lang);

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Retener referencia en variable global para que el Garbage Collector de V8 no lo elimine
      activeUtterance = utterance;
      window._activeSpeechUtterance = utterance;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang || lang;
      } else {
        utterance.lang = lang;
      }

      utterance.volume = 1.0;
      utterance.rate = 0.88; // Velocidad óptima para aprendizaje auditivo
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        if (triggerBtn) triggerBtn.classList.add('playing-audio');
      };

      utterance.onend = () => {
        if (triggerBtn) triggerBtn.classList.remove('playing-audio');
        activeUtterance = null;
        window._activeSpeechUtterance = null;
      };

      utterance.onerror = (e) => {
        console.warn('[Audio] Error en SpeechSynthesisUtterance:', e);
        if (triggerBtn) triggerBtn.classList.remove('playing-audio');
        activeUtterance = null;
        window._activeSpeechUtterance = null;
      };

      synth.resume();
      synth.speak(utterance);
    } catch (err) {
      console.error('[Audio] Error al reproducir audio:', err);
      if (triggerBtn) triggerBtn.classList.remove('playing-audio');
      activeUtterance = null;
    }
  }, 30);
}
