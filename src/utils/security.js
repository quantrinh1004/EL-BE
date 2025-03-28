const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { PEPPER } = require('../configs');

const IV_LENGTH = 16; // AES block size
const KEY = Buffer.from(PEPPER.padEnd(32, '\0')); // Đảm bảo độ dài key là 32 bytes

// AES256 encryption
const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-ctr', KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
};

// AES256 decoding
const decrypt = (text) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  
  const decipher = crypto.createDecipheriv('aes-256-ctr', KEY, iv);
  
  let decrypted = decipher.update(encryptedText);
  decrypted += decipher.final();

  return decrypted.toString();
};

// Hash SHA512
const hashSHA512 = (text) =>
  crypto.createHash('sha512').update(text).digest('hex');

// Hash by bcrypt
const hashBcrypt = async (text, salt) => {
  return await bcrypt.hash(text, salt);
};

// Compare bcrypt
const compareBcrypt = async (data, hashed) => {
  return await bcrypt.compare(data, hashed);
};

// Create salt
const generateSalt = () => bcrypt.genSaltSync(10);

// Encrypt password
const encryptPassword = async (password, salt) => {
  try {
    const hashedSHA512 = hashSHA512(password);
    const hashedBcrypt = await hashBcrypt(hashedSHA512, salt);
    const encryptedPassword = encrypt(hashedBcrypt);

    return encryptedPassword;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt password");
  }
};

// Comprare password
const comparePassword = async (newPassWord, oldPassword) => {
  try {
    const hashedInput = hashSHA512(newPassWord);
    const encryptedInput = encrypt(hashedInput);

    return encryptedInput === oldPassword;
  } catch (error) {
    console.error("Password comparison error:", error);
    return false;
  }
};

module.exports = {
  generateSalt,
  encryptPassword,
  comparePassword,
};
