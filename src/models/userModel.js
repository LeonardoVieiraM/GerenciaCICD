class UserModel {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  create(userData) {
    const user = {
      id: this.nextId++,
      name: userData.name,
      email: userData.email,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return [...this.users];
  }

  findById(id) {
    return this.users.find(user => user.id === id);
  }

  update(id, userData) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    this.users[index] = {
      ...this.users[index],
      name: userData.name || this.users[index].name,
      email: userData.email || this.users[index].email
    };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    return true;
  }

  existsByEmail(email, excludeId = null) {
    return this.users.some(user => 
      user.email === email && user.id !== excludeId
    );
  }

  count() {
    return this.users.length;
  }
}

module.exports = new UserModel();