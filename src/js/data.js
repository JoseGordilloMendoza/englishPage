/**
 * EnglishPage - Local Data Model
 * Contiene el dataset inicial de reglas gramaticales, tarjetas de vocabulario y verbos irregulares.
 */

export const grammarRules = [
  {
    id: 'rule-1',
    topic: 'Wish Clauses (Present Wishes)',
    rule: 'Usamos "wish + Past Simple" para expresar deseos de cambiar una situación presente o futura que es contraria a la realidad.',
    example: 'I wish I had more free time to travel. (Ojalá tuviera más tiempo libre para viajar).',
    formula: 'Subject + wish + Subject + Past Simple',
    level: 'B1 - Intermediate'
  },
  {
    id: 'rule-2',
    topic: 'Wish Clauses (Past Regrets)',
    rule: 'Usamos "wish + Past Perfect" para expresar arrepentimiento sobre algo que ocurrió o no ocurrió en el pasado.',
    example: 'She wishes she had studied harder for the test. (Ella desearía haber estudiado más para el examen).',
    formula: 'Subject + wish + Subject + had + Past Participle',
    level: 'B2 - Upper Intermediate'
  },
  {
    id: 'rule-3',
    topic: 'Reported Speech (Indirect Speech)',
    rule: 'Al relatar lo que alguien dijo, los tiempos verbales generalmente retroceden un tiempo hacia el pasado (backshift).',
    example: '"I am working late" → He said that he was working late.',
    formula: 'Present Simple → Past Simple | Present Continuous → Past Continuous',
    level: 'B1 - Intermediate'
  },
  {
    id: 'rule-4',
    topic: 'Second Conditional (Hypothetical Situations)',
    rule: 'Se utiliza para hablar de situaciones hipotéticas o imaginarias en el presente o futuro y sus consecuencias.',
    example: 'If I won the lottery, I would buy a house by the sea. (Si ganara la lotería, compraría una casa junto al mar).',
    formula: 'If + Past Simple, ... would + infinitive',
    level: 'B1 - Intermediate'
  },
  {
    id: 'rule-5',
    topic: 'Third Conditional (Unreal Past)',
    rule: 'Describe una situación pasada que no sucedió y las consecuencias imaginarias que habría tenido.',
    example: 'If they had left earlier, they would have caught the flight. (Si hubieran salido antes, habrían alcanzado el vuelo).',
    formula: 'If + Past Perfect, ... would have + Past Participle',
    level: 'B2 - Upper Intermediate'
  },
  {
    id: 'rule-6',
    topic: 'Passive Voice (Present & Past)',
    rule: 'Se usa cuando el objeto de la acción o el resultado es más importante que la persona o cosa que la realiza.',
    example: 'The bridge was designed in 1890 by a Scottish engineer. (El puente fue diseñado en 1890 por un ingeniero escocés).',
    formula: 'Subject + Verb to be + Past Participle (+ by agent)',
    level: 'B1 - Intermediate'
  },
  {
    id: 'rule-7',
    topic: 'Used to vs. Be Used to',
    rule: '"Used to + infinitive" describe hábitos pasados concluidos. "Be used to + -ing" indica estar acostumbrado a algo.',
    example: 'I used to live in London, but now I am used to living in Madrid.',
    formula: 'used to + base verb  VS  be used to + noun / -ing',
    level: 'B2 - Upper Intermediate'
  },
  {
    id: 'rule-8',
    topic: 'Relative Clauses (Defining vs. Non-Defining)',
    rule: 'Las oraciones especificativas (defining) no llevan comas y son esenciales. Las explicativas (non-defining) van entre comas y añaden datos extra.',
    example: 'My brother, who lives in Canada, is coming tomorrow. (Non-defining)',
    formula: 'who (personas) / which (cosas) / that (ambos en defining)',
    level: 'B1 - Intermediate'
  }
];

export const flashcardsVocab = [
  {
    id: 'card-1',
    en: 'Piece of cake',
    es: 'Pan comido / Muy fácil',
    category: 'Idiom',
    example: 'The English exam was a piece of cake!',
    phonetic: '/piːs əv keɪk/'
  },
  {
    id: 'card-2',
    en: 'Bite the bullet',
    es: 'Hacer de tripas corazón / Afrontar lo inevitable',
    category: 'Idiom',
    example: 'I decided to bite the bullet and talk to my boss about a raise.',
    phonetic: '/baɪt ðə ˈbʊlɪt/'
  },
  {
    id: 'card-3',
    en: 'Break a leg',
    es: '¡Buena suerte! (en artes escénicas)',
    category: 'Idiom',
    example: 'Break a leg tonight! You are going to do amazing on stage.',
    phonetic: '/breɪk ə leɡ/'
  },
  {
    id: 'card-4',
    en: 'Call it a day',
    es: 'Dar por terminado el trabajo por hoy',
    category: 'Collocation',
    example: 'We have been coding for ten hours; let\'s call it a day.',
    phonetic: '/kɔːl ɪt ə deɪ/'
  },
  {
    id: 'card-5',
    en: 'Hit the nail on the head',
    es: 'Dar en el clavo / Acertar por completo',
    category: 'Idiom',
    example: 'Your analysis of the problem really hit the nail on the head.',
    phonetic: '/hɪt ðə neɪl ɒn ðə hed/'
  },
  {
    id: 'card-6',
    en: 'Under the weather',
    es: 'Sentirse indispuesto / Algo enfermo',
    category: 'Common Phrase',
    example: 'I am feeling a bit under the weather today, so I will stay home.',
    phonetic: '/ˈʌndə ðə ˈweðə/'
  },
  {
    id: 'card-7',
    en: 'Burn the midnight oil',
    es: 'Quemarse las pestañas / Trasnochar estudiando o trabajando',
    category: 'Idiom',
    example: 'He is burning the midnight oil preparing for his final exams.',
    phonetic: '/bɜːn ðə ˈmɪdnaɪt ɔɪl/'
  },
  {
    id: 'card-8',
    en: 'Spill the beans',
    es: 'Soltar la sopa / Revelar un secreto',
    category: 'Idiom',
    example: 'Don\'t spill the beans about the surprise birthday party!',
    phonetic: '/spɪl ðə biːnz/'
  },
  {
    id: 'card-9',
    en: 'See eye to eye',
    es: 'Estar completamente de acuerdo',
    category: 'Phrase',
    example: 'My colleague and I don\'t always see eye to eye, but we respect each other.',
    phonetic: '/siː aɪ tuː aɪ/'
  },
  {
    id: 'card-10',
    en: 'Cost an arm and a leg',
    es: 'Costar un ojo de la cara / Ser carísimo',
    category: 'Idiom',
    example: 'That new flagship smartphone costs an arm and a leg.',
    phonetic: '/kɒst ən ɑːm ənd ə leɡ/'
  },
  {
    id: 'card-11',
    en: 'Once in a blue moon',
    es: 'Muy de vez en cuando / Rara vez',
    category: 'Phrase',
    example: 'I only eat fast food once in a blue moon.',
    phonetic: '/wʌns ɪn ə bluː muːn/'
  },
  {
    id: 'card-12',
    en: 'Cutting corners',
    es: 'Tomar atajos / Escatimar en calidad',
    category: 'Business Idiom',
    example: 'Cutting corners on software security can lead to massive breaches.',
    phonetic: '/ˈkʌtɪŋ ˈkɔːnəz/'
  }
];

export const verbList = [
  { inf: 'be', past: 'was / were', part: 'been', es: 'ser / estar' },
  { inf: 'become', past: 'became', part: 'become', es: 'convertirse / llegar a ser' },
  { inf: 'begin', past: 'began', part: 'begun', es: 'empezar / comenzar' },
  { inf: 'break', past: 'broke', part: 'broken', es: 'romper' },
  { inf: 'bring', past: 'brought', part: 'brought', es: 'traer' },
  { inf: 'build', past: 'built', part: 'built', es: 'construir' },
  { inf: 'buy', past: 'bought', part: 'bought', es: 'comprar' },
  { inf: 'catch', past: 'caught', part: 'caught', es: 'atrapar / tomar (transporte)' },
  { inf: 'choose', past: 'chose', part: 'chosen', es: 'elegir / escoger' },
  { inf: 'come', past: 'came', part: 'come', es: 'venir' },
  { inf: 'do', past: 'did', part: 'done', es: 'hacer' },
  { inf: 'draw', past: 'drew', part: 'drawn', es: 'dibujar' },
  { inf: 'drink', past: 'drank', part: 'drunk', es: 'beber' },
  { inf: 'drive', past: 'drove', part: 'driven', es: 'conducir / manejar' },
  { inf: 'eat', past: 'ate', part: 'eaten', es: 'comer' },
  { inf: 'fall', past: 'fell', part: 'fallen', es: 'caer' },
  { inf: 'feel', past: 'felt', part: 'felt', es: 'sentir' },
  { inf: 'find', past: 'found', part: 'found', es: 'encontrar' },
  { inf: 'fly', past: 'flew', part: 'flown', es: 'volar' },
  { inf: 'forget', past: 'forgot', part: 'forgotten', es: 'olvidar' },
  { inf: 'get', past: 'got', part: 'gotten / got', es: 'conseguir / obtener' },
  { inf: 'give', past: 'gave', part: 'given', es: 'dar' },
  { inf: 'go', past: 'went', part: 'gone', es: 'ir' },
  { inf: 'grow', past: 'grew', part: 'grown', es: 'crecer' },
  { inf: 'have', past: 'had', part: 'had', es: 'tener / haber' },
  { inf: 'hear', past: 'heard', part: 'heard', es: 'oír / escuchar' },
  { inf: 'hide', past: 'hid', part: 'hidden', es: 'esconder' },
  { inf: 'know', past: 'knew', part: 'known', es: 'saber / conocer' },
  { inf: 'leave', past: 'left', part: 'left', es: 'salir / dejar / marcharse' },
  { inf: 'lose', past: 'lost', part: 'lost', es: 'perder' },
  { inf: 'make', past: 'made', part: 'made', es: 'hacer / fabricar' },
  { inf: 'meet', past: 'met', part: 'met', es: 'conocer / reunirse' },
  { inf: 'pay', past: 'paid', part: 'paid', es: 'pagar' },
  { inf: 'read', past: 'read (/red/)', part: 'read (/red/)', es: 'leer' },
  { inf: 'run', past: 'ran', part: 'run', es: 'correr' },
  { inf: 'say', past: 'said', part: 'said', es: 'decir' },
  { inf: 'see', past: 'saw', part: 'seen', es: 'ver' },
  { inf: 'sell', past: 'sold', part: 'sold', es: 'vender' },
  { inf: 'send', past: 'sent', part: 'sent', es: 'enviar' },
  { inf: 'sing', past: 'sang', part: 'sung', es: 'cantar' },
  { inf: 'speak', past: 'spoke', part: 'spoken', es: 'hablar' },
  { inf: 'spend', past: 'spent', part: 'spent', es: 'gastar / pasar tiempo' },
  { inf: 'stand', past: 'stood', part: 'stood', es: 'estar de pie / soportar' },
  { inf: 'swim', past: 'swam', part: 'swum', es: 'nadar' },
  { inf: 'take', past: 'took', part: 'taken', es: 'tomar / llevar' },
  { inf: 'teach', past: 'taught', part: 'taught', es: 'enseñar' },
  { inf: 'tell', past: 'told', part: 'told', es: 'decir / contar' },
  { inf: 'think', past: 'thought', part: 'thought', es: 'pensar' },
  { inf: 'understand', past: 'understood', part: 'understood', es: 'entender / comprender' },
  { inf: 'wear', past: 'wore', part: 'worn', es: 'vestir / llevar puesto' },
  { inf: 'win', past: 'won', part: 'won', es: 'ganar' },
  { inf: 'write', past: 'wrote', part: 'written', es: 'escribir' }
];

export const quizQuestions = [
  {
    id: 'q1',
    category: 'Idioms & Vocabulario',
    question: '¿Qué significa realmente la expresión "Piece of cake"?',
    options: [
      'Una porción de tarta de cumpleaños',
      'Algo sumamente fácil de hacer',
      'Una situación difícil o amarga',
      'Un regalo sorpresa'
    ],
    answer: 1,
    explanation: '"Piece of cake" es un modismo muy común que equivale a nuestro "pan comido" o "facilísimo".'
  },
  {
    id: 'q2',
    category: 'Verbos Irregulares',
    question: '¿Cuál es la forma correcta del Past Simple del verbo "choose"?',
    options: [
      'choosed',
      'chosen',
      'chose',
      'chosing'
    ],
    answer: 2,
    explanation: 'El verbo "choose" es irregular: Infinitive: choose, Past Simple: chose, Past Participle: chosen.'
  },
  {
    id: 'q3',
    category: 'Gramática: Wish Clauses',
    question: 'Completa la oración de arrepentimiento pasado: "She wishes she ______ harder for the final exam."',
    options: [
      'had studied',
      'would study',
      'studied',
      'has studied'
    ],
    answer: 0,
    explanation: 'Para expresar arrepentimientos sobre hechos del pasado (Past Regrets) usamos "wish + Past Perfect (had + participio)".'
  },
  {
    id: 'q4',
    category: 'Idioms & Vocabulario',
    question: 'Si alguien te dice "Break a leg!" antes de subirte al escenario, te está deseando:',
    options: [
      'Que tengas cuidado de no caerte',
      '¡Mucho éxito y buena suerte!',
      'Que te tomes un descanso',
      'Que canceles la presentación'
    ],
    answer: 1,
    explanation: '"Break a leg" es una expresión teatral tradicional en inglés que se utiliza para desear buena suerte.'
  },
  {
    id: 'q5',
    category: 'Verbos Irregulares',
    question: 'Completa con el Past Participle: "They have ______ all the bridge blueprints."',
    options: [
      'drawed',
      'drew',
      'drawn',
      'drawing'
    ],
    answer: 2,
    explanation: 'Las formas de este verbo son: draw (infinitivo) ➔ drew (pasado) ➔ drawn (participio pasado).'
  },
  {
    id: 'q6',
    category: 'Gramática: Conditionals',
    question: 'En el Second Conditional (situaciones hipotéticas presentes): "If I ______ a car, I would drive to the coast."',
    options: [
      'have',
      'had',
      'would have',
      'had had'
    ],
    answer: 1,
    explanation: 'La estructura del Second Conditional es: If + Past Simple, ... would + infinitivo.'
  },
  {
    id: 'q7',
    category: 'Idioms & Vocabulario',
    question: '¿Qué significa la expresión "Cost an arm and a leg"?',
    options: [
      'Causar una lesión física',
      'Ser extraordinariamente costoso o caro',
      'Hacer un esfuerzo físico agotador',
      'Comprar algo en rebaja'
    ],
    answer: 1,
    explanation: 'Equivale a la frase en español "costar un ojo de la cara".'
  },
  {
    id: 'q8',
    category: 'Verbos Irregulares',
    question: '¿Cuál es el significado en español del verbo irregular "hide / hid / hidden"?',
    options: [
      'Golpear',
      'Montar / cabalgar',
      'Esconder / ocultar',
      'Sostener'
    ],
    answer: 2,
    explanation: '"Hide" significa esconder u ocultar. En pasado es "hid" y en participio "hidden".'
  }
];

