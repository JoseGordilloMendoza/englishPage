/**
 * EnglishPage - LocalStorage Manager
 * Maneja la persistencia de tarjetas marcadas como dominadas y el progreso de estudio.
 */

const STORAGE_KEY = 'english_page_mastered_cards';

export function getMasteredCards() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Error accediendo a localStorage', e);
    return [];
  }
}

export function isCardMastered(cardId) {
  const mastered = getMasteredCards();
  return mastered.includes(cardId);
}

export function toggleCardMastered(cardId) {
  try {
    let mastered = getMasteredCards();
    if (mastered.includes(cardId)) {
      mastered = mastered.filter(id => id !== cardId);
    } else {
      mastered.push(cardId);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mastered));
    return mastered.includes(cardId);
  } catch (e) {
    console.warn('Error guardando en localStorage', e);
    return false;
  }
}

export function getStudyStats(totalVocab, totalVerbs, totalGrammar) {
  const mastered = getMasteredCards();
  const masteredCount = mastered.length;
  const progressPercent = totalVocab > 0 ? Math.round((masteredCount / totalVocab) * 100) : 0;

  return {
    totalVocab,
    totalVerbs,
    totalGrammar,
    masteredCount,
    progressPercent
  };
}
