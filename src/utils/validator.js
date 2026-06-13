class Validator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateName(name) {
    // Retorna boolean, não string
    if (!name || typeof name !== 'string') return false;
    const trimmed = name.trim();
    return trimmed.length >= 3 && trimmed.length <= 100;
  }

  static validateUser(userData) {
    const errors = [];
    
    if (!this.validateName(userData.name)) {
      errors.push('Name must be between 3 and 100 characters');
    }
    
    if (!userData.email || !this.validateEmail(userData.email)) {
      errors.push('Invalid email format');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
  }
}

module.exports = Validator;