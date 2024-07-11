const input = require('readline-sync');

// Original Scrabble scoring structure
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'S', 'T', 'R'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// Function to convert oldPointStructure to new structure
function transform(oldPointStructure) {
  let newPointStructure = {};
  for (let pointValue in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
      newPointStructure[oldPointStructure[pointValue][i].toLowerCase()] = Number(pointValue);
    }
  }
  return newPointStructure;
}

// Simple scorer function
function simpleScorer(word) {
  return word.length;
}

// Vowel bonus scorer function
function vowelBonusScorer(word) {
  word = word.toLowerCase();
  let score = 0;
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
}

// Scrabble scorer function
function scrabbleScorer(word) {
  word = word.toLowerCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }
  return score;
}

// Convert old structure to new
const newPointStructure = transform(oldPointStructure);

// Scoring algorithms array
const scoringAlgorithms = [
  { name: 'Simple Score', description: 'Each letter is worth 1 point.', scoringFunction: simpleScorer },
  { name: 'Bonus Vowels', description: 'Vowels are worth 3 points, consonants are worth 1 point.', scoringFunction: vowelBonusScorer },
  { name: 'Scrabble', description: 'The traditional scoring algorithm.', scoringFunction: scrabbleScorer }
];

function initialPrompt() {
  console.log("Let's play some Scrabble!");
  const word = input.question("Enter a word to score: ");
  return word;
}

function scorerPrompt(word) {
  console.log("Which scoring algorithm would you like to use?\n");
  console.log("0 - Simple: One point per character");
  console.log("1 - Bonus Vowels: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");
  let choice = parseInt(input.question("Enter 0, 1, or 2: "), 10);

  if (choice < 0 || choice > 2) {
    console.error("Invalid choice. Please enter 0, 1, or 2.");
    return;
  }

  const score = scoringAlgorithms[choice].scoringFunction(word);
  console.log(`Score for '${word}': ${score}`);
}

function runProgram() {
  const word = initialPrompt();
  scorerPrompt(word);
}

// Run the program
runProgram();


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};

 





























 
