const { db } = require('../../config/db');

const Product = {
  async create(productData) {
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      metalOptions,
      diamondShapeOptions,
    } = productData;

    const [id] = await db('products')
      .insert({
        name,
        description,
        price,
        imageUrl,
        category,
        metalOptions: JSON.stringify(metalOptions),
        diamondShapeOptions: JSON.stringify(diamondShapeOptions),
      })
      .returning('id');
    return this.findById(id);
  },

  async findAll() {
    return db('products').select('*');
  },

  async findById(id) {
    return db('products').where({ id }).first();
  },

  async update(id, productData) {
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      metalOptions,
      diamondShapeOptions,
    } = productData;

    await db('products')
      .where({ id })
      .update({
        name,
        description,
        price,
        imageUrl,
        category,
        metalOptions: JSON.stringify(metalOptions),
        diamondShapeOptions: JSON.stringify(diamondShapeOptions),
        updated_at: db.fn.now(),
      });
    return this.findById(id);
  },

  async destroy(id) {
    return db('products').where({ id }).del();
  },
};

module.exports = Product;