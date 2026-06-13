const Validator = require('../../src/utils/validator');

describe('Validator - Unit Tests', () => {
  test('should validate correct email', () => {
    expect(Validator.validateEmail('test@example.com')).toBe(true);
    expect(Validator.validateEmail('user.name@domain.co')).toBe(true);
    expect(Validator.validateEmail('user+tag@example.com')).toBe(true);
  });

  test('should reject invalid email', () => {
    expect(Validator.validateEmail('invalid')).toBe(false);
    expect(Validator.validateEmail('missing@domain')).toBe(false);
    expect(Validator.validateEmail('@missing.com')).toBe(false);
    expect(Validator.validateEmail('space@example.com ')).toBe(false);
  });

  test('should validate correct name', () => {
    expect(Validator.validateName('John Doe')).toBe(true);
    expect(Validator.validateName('A'.repeat(100))).toBe(true);
    expect(Validator.validateName('  Valid Name  ')).toBe(true);
  });

  test('should reject invalid name', () => {
    expect(Validator.validateName('')).toBe(false);
    expect(Validator.validateName('A')).toBe(false);
    expect(Validator.validateName('A'.repeat(101))).toBe(false);
    expect(Validator.validateName(null)).toBe(false);
    expect(Validator.validateName(undefined)).toBe(false);
    expect(Validator.validateName('   ')).toBe(false);
  });

  test('should validate user object', () => {
    const validUser = { name: 'John Doe', email: 'john@example.com' };
    expect(Validator.validateUser(validUser).isValid).toBe(true);
    
    const invalidUser = { name: 'J', email: 'invalid' };
    const result = Validator.validateUser(invalidUser);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(2);
    expect(result.errors).toContain('Name must be between 3 and 100 characters');
    expect(result.errors).toContain('Invalid email format');
  });

  test('should sanitize input', () => {
    expect(Validator.sanitizeInput('  hello  ')).toBe('hello');
    expect(Validator.sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
    expect(Validator.sanitizeInput(123)).toBe(123);
    expect(Validator.sanitizeInput(null)).toBe(null);
  });
});