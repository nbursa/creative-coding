interface LetterPattern {
  [key: string]: number[][];
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

const LetterPatterns: LetterPattern = {};

// Generate letter patterns for each character
for (let i = 0; i < alphabet.length; i++) {
  const char = alphabet[i];
  LetterPatterns[char] = generateLetterPattern();
}

// Generate number patterns for each digit
for (let i = 0; i < numbers.length; i++) {
  const digit = numbers[i];
  LetterPatterns[digit] = generateLetterPattern();
}

function generateLetterPattern(): number[][] {
  const letterPattern: number[][] = [];
  for (let i = 0; i < 7; i++) {
    letterPattern[i] = [];
    for (let j = 0; j < 5; j++) {
      letterPattern[i][j] = 0;
    }
  }
  return letterPattern;
}

export default LetterPatterns;
