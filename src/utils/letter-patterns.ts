interface LetterPattern {
  [key: string]: number[][];
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

const LetterPatterns: LetterPattern = {};

// Generate letter patterns for each character
for (let i = 0; i < alphabet.length; i++) {
  const char = alphabet[i];
  LetterPatterns[char] = generateLetterPattern(char);
}

// Generate number patterns for each digit
for (let i = 0; i < numbers.length; i++) {
  const digit = numbers[i];
  LetterPatterns[digit] = generateLetterPattern(digit);
}

function generateLetterPattern(): LetterPattern {
  const letterPatterns: LetterPattern = {};

  // Generate patterns for letters
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    letterPatterns[letter] = letterData[letter];
  }

  // Generate patterns for digits
  for (let i = 0; i <= 9; i++) {
    letterPatterns[i.toString()] = letterData[i.toString()];
  }

  return letterPatterns;
}

export default LetterPatterns;
