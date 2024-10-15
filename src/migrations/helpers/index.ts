export function stringToValidMongoHex(str: string) {
    const hex = Buffer.from(str).toString('hex');
    return hex.substring(0, 24);
  }
