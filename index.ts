const DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class Gamaloka {
  static generateJobId(codePrefix: string, num: number): string {
    if (num < 1) throw new Error("Number must be at least 1");
    
    num--;
    
    const suffixValue = num % 1000;
    const prefixValue = Math.floor(num / 1000);
    
    const suffix = suffixValue.toString().padStart(3, "0");
    const prefix = Gamaloka.numberToBase36(prefixValue).padStart(2, "0");
    
    return `${codePrefix}${prefix}${suffix}`;
  };

  static encodeJobId(codePrefix: string, code: string): number {
    if (!code.startsWith(codePrefix)) {
      throw new Error("Invalid code format. Expected format: CODEXXXXXX");
    }
    const prefixLength = codePrefix.length;
    const codeP1Length = prefixLength + 2;

    const prefixPart = code.substring(prefixLength, codeP1Length);
    const suffixPart = code.substring(codeP1Length);
    
    const prefixValue = Gamaloka.base36ToNumber(prefixPart);
    const suffixValue = parseInt(suffixPart, 10);
    
    if (isNaN(suffixValue)) throw new Error("Invalid suffix");
    
    return prefixValue * 1000 + suffixValue + 1;
  };

  private static numberToBase36(num: number): string {
    if (num === 0) return "00";
    
    let result = "";
    const base = DIGITS.length;
    
    while (num > 0) {
      const remainder = num % base;
      result = DIGITS[remainder] + result;
      num = Math.floor(num / base);
    }
    
    return result.length === 1 ? "0" + result : result;
  };

  private static base36ToNumber(str: string): number {
    const base = DIGITS.length;
    let result = 0;
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i].toUpperCase();
      const value = DIGITS.indexOf(char);
      
      if (value === -1) throw new Error(`Invalid character in code: ${char}`);
      
      result = result * base + value;
    }
    
    return result;
  };
};

export default Gamaloka;

module.exports = Gamaloka;
module.exports.default = Gamaloka;