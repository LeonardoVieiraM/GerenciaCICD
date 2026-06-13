const UserModel = require('../models/userModel');
const Validator = require('../utils/validator');
const Logger = require('../utils/logger');

class UserService {
  createUser(userData) {
    Logger.info('Attempting to create user', { email: userData.email });
    
    const validation = Validator.validateUser(userData);
    if (!validation.isValid) {
      Logger.warn('User creation failed - validation error', { errors: validation.errors });
      return { success: false, errors: validation.errors };
    }

    if (UserModel.existsByEmail(userData.email)) {
      Logger.warn('User creation failed - email already exists', { email: userData.email });
      return { success: false, errors: ['Email already exists'] };
    }

    const user = UserModel.create({
      name: Validator.sanitizeInput(userData.name),
      email: userData.email.toLowerCase()
    });
    
    Logger.info('User created successfully', { userId: user.id });
    return { success: true, user };
  }

  getAllUsers() {
    Logger.info('Fetching all users');
    return UserModel.findAll();
  }

  getUserById(id) {
    Logger.debug('Fetching user by id', { userId: id });
    const user = UserModel.findById(id);
    if (!user) {
      Logger.warn('User not found', { userId: id });
    }
    return user;
  }

  updateUser(id, userData) {
    Logger.info('Updating user', { userId: id });
    
    const user = UserModel.findById(id);
    if (!user) {
      return { success: false, errors: ['User not found'] };
    }

    if (userData.email && UserModel.existsByEmail(userData.email, id)) {
      return { success: false, errors: ['Email already exists'] };
    }

    const updatedUser = UserModel.update(id, {
      name: userData.name ? Validator.sanitizeInput(userData.name) : undefined,
      email: userData.email ? userData.email.toLowerCase() : undefined
    });
    
    Logger.info('User updated successfully', { userId: id });
    return { success: true, user: updatedUser };
  }

  deleteUser(id) {
    Logger.info('Deleting user', { userId: id });
    
    const user = UserModel.findById(id);
    if (!user) {
      return { success: false, errors: ['User not found'] };
    }

    UserModel.delete(id);
    Logger.info('User deleted successfully', { userId: id });
    return { success: true };
  }

  getStats() {
    return {
      totalUsers: UserModel.count(),
      timestamp: new Date()
    };
  }
}

module.exports = new UserService();