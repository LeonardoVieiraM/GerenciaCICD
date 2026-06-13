const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/users', (req, res) => UserController.createUser(req, res));
router.get('/users', (req, res) => UserController.getAllUsers(req, res));
router.get('/users/:id', (req, res) => UserController.getUserById(req, res));
router.put('/users/:id', (req, res) => UserController.updateUser(req, res));
router.delete('/users/:id', (req, res) => UserController.deleteUser(req, res));
router.get('/stats', (req, res) => UserController.getStats(req, res));

module.exports = router;