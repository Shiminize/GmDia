const { db } = require('../../config/db');

const CustomDesign = {
  async create(designData) {
    const {
      user_id,
      name,
      designData: designJson,
      imageUrl,
    } = designData;

    const [id] = await db('custom_designs')
      .insert({
        user_id,
        name,
        designData: JSON.stringify(designJson),
        imageUrl,
      })
      .returning('id');
    return this.findById(id);
  },

  async findById(id) {
    return db('custom_designs').where({ id }).first();
  },

  async findByUserId(userId) {
    return db('custom_designs').where({ user_id: userId });
  },

  async destroy(id) {
    return db('custom_designs').where({ id }).del();
  },
};

module.exports = CustomDesign;