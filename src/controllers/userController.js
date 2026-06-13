const UserService = require('../services/userService');
const Logger = require('../utils/logger');

class UserController {
  async createUser(req, res) {
    try {
      const result = await UserService.createUser(req.body);
      
      if (!result.success) {
        return res.status(400).json({ errors: result.errors });
      }
      
      res.status(201).json(result.user);
    } catch (error) {
      Logger.error('Controller error - createUser', { error: error.message });
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      Logger.error('Controller error - getAllUsers', { error: error.message });
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = UserService.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      Logger.error('Controller error - getUserById', { error: error.message });
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      const result = UserService.updateUser(id, req.body);
      
      if (!result.success) {
        return res.status(400).json({ errors: result.errors });
      }
      
      res.json(result.user);
    } catch (error) {
      Logger.error('Controller error - updateUser', { error: error.message });
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      const result = UserService.deleteUser(id);
      
      if (!result.success) {
        return res.status(404).json({ errors: result.errors });
      }
      
      res.status(204).send();
    } catch (error) {
      Logger.error('Controller error - deleteUser', { error: error.message });
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getStats(req, res) {
    try {
      const stats = UserService.getStats();
      res.json(stats);
    } catch (error) {
      Logger.error('Controller error - getStats', { error: error.message });
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserController();