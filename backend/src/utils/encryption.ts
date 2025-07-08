import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { privateKey } from "../utils/environment"

const encryptionAlgorithm = 'aes-256-gcm';

export function EncryptString(valueToEncrypt: string) {
  const iv = randomBytes(12).toString('base64');
  const cipher = createCipheriv(encryptionAlgorithm, Buffer.from(privateKey, 'base64'), Buffer.from(iv, 'base64'));
  let cipherText = cipher.update(valueToEncrypt, 'utf8', 'base64');
  cipherText += cipher.final('base64');
  const tag = cipher.getAuthTag();

  return { cipherText, iv, tag };
}

export function DecryptString(valueToDecrypt: string, iv: string, tag: Buffer<ArrayBuffer>) {
  try {
    const decipher = createDecipheriv(encryptionAlgorithm, Buffer.from(privateKey, 'base64'), Buffer.from(iv, 'base64'));
    decipher.setAuthTag(Buffer.from(tag));
    let decipherText = decipher.update(valueToDecrypt, 'base64', 'utf8');
    decipherText += decipher.final('utf8');

    return decipherText;
  } catch (error) {
    throw new Error('Found an issue while decrypting the string: ', error);
  }
}
