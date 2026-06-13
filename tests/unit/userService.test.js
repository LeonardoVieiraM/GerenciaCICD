const UserService = require('../../src/services/userService');
const UserModel = require('../../src/models/userModel');

describe('UserService - Unit Tests', () => {
  beforeEach(() => {
    // Clean users before each test - método mais robusto
    const users = UserModel.findAll();
    users.forEach(user => {
      UserModel.delete(user.id);
    });
  });

  test('should create a valid user', () => {
    const result = UserService.createUser({
      name: 'John Doe',
      email: 'john@example.com'
    });
    
    expect(result.success).toBe(true);
    expect(result.user).toHaveProperty('id');
    expect(result.user.name).toBe('John Doe');
    expect(result.user.email).toBe('john@example.com');
  });

  test('should reject user with invalid email', () => {
    const result = UserService.createUser({
      name: 'John Doe',
      email: 'invalid-email'
    });
    
    expect(result.success).toBe(false);
    expect(result.errors).toContain('Invalid email format');
  });

  test('should reject user with short name', () => {
    const result = UserService.createUser({
      name: 'Jo',
      email: 'jo@example.com'
    });
    
    expect(result.success).toBe(false);
    expect(result.errors).toContain('Name must be between 3 and 100 characters');
  });

  test('should reject duplicate email', () => {
    UserService.createUser({ name: 'First', email: 'same@example.com' });
    
    const result = UserService.createUser({ name: 'Second', email: 'same@example.com' });
    expect(result.success).toBe(false);
    expect(result.errors).toContain('Email already exists');
  });

  test('should get all users', () => {
    UserService.createUser({ name: 'User1', email: 'user1@test.com' });
    UserService.createUser({ name: 'User2', email: 'user2@test.com' });
    
    const users = UserService.getAllUsers();
    expect(users).toHaveLength(2);
  });

  test('should get user by id', () => {
    const { user } = UserService.createUser({ name: 'Find Me', email: 'find@test.com' });
    
    const found = UserService.getUserById(user.id);
    expect(found).toBeDefined();
    expect(found.name).toBe('Find Me');
  });

  test('should return undefined for non-existent user', () => {
    const found = UserService.getUserById(99999);
    expect(found).toBeUndefined();
  });

  test('should update user', () => {
    const { user } = UserService.createUser({ name: 'Old Name', email: 'old@test.com' });
    
    const result = UserService.updateUser(user.id, { name: 'New Name' });
    expect(result.success).toBe(true);
    expect(result.user.name).toBe('New Name');
  });

  test('should return error when updating non-existent user', () => {
    const result = UserService.updateUser(99999, { name: 'New Name' });
    expect(result.success).toBe(false);
    expect(result.errors).toContain('User not found');
  });

  test('should delete user', () => {
    const { user } = UserService.createUser({ name: 'To Delete', email: 'delete@test.com' });
    
    const result = UserService.deleteUser(user.id);
    expect(result.success).toBe(true);
    expect(UserService.getUserById(user.id)).toBeUndefined();
  });

  test('should return error when deleting non-existent user', () => {
    const result = UserService.deleteUser(99999);
    expect(result.success).toBe(false);
    expect(result.errors).toContain('User not found');
  });

  test('should return stats', () => {
    // Clear existing users first
    const existingUsers = UserService.getAllUsers();
    existingUsers.forEach(user => {
      UserService.deleteUser(user.id);
    });
    
    UserService.createUser({ name: 'Stats1', email: 'stats1@test.com' });
    UserService.createUser({ name: 'Stats2', email: 'stats2@test.com' });
    
    const stats = UserService.getStats();
    expect(stats.totalUsers).toBe(2);
    expect(stats.timestamp).toBeInstanceOf(Date);
  });
});