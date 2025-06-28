const bcrypt = require('bcryptjs');
const { db } = require('../../config/db');

const User = {
  async create(userData) {
    const { name, email, password, isAdmin } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [id] = await db('users').insert({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    }).returning('id');
    return this.findById(id);
  },

  async findByEmail(email) {
    return db('users').where({ email }).first();
  },

  async findById(id) {
    return db('users').where({ id }).first();
  },

  async comparePassword(enteredPassword, hashedPassword) {
    return bcrypt.compare(enteredPassword, hashedPassword);
  },
};

module.exports = User;