// Utilize crypto for better randomness  
const crypto = require('crypto');

// Cache previously generated strings
const previousStrings = []; 

function generateRandomString(length, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {

  // Input validation
  if(length < 1) throw new Error('Length must be > 0');

  let result = '';
  const charsLength = characters.length;

  // Loop length times
  for(let i = 0; i < length; i++) {

    // Get random character in chars string
    result += characters[crypto.randomInt(0, charsLength - 1)];

  }

  // Ensure uniqueness  
  while(previousStrings.includes(result)) {
    result = generateRandomString(length, characters); 
  }

  // Store generated string  
  previousStrings.push(result);

  return result;

}

// Export the function
module.exports = generateRandomString;