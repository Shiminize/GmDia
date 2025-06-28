const { db } = require('../../config/db');

const Order = {
  async create(orderData) {
    const {
      user_id,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = orderData;

    const [id] = await db('orders')
      .insert({
        user_id,
        orderItems: JSON.stringify(orderItems),
        shippingAddress: JSON.stringify(shippingAddress),
        paymentMethod,
        paymentResult: paymentResult ? JSON.stringify(paymentResult) : null,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
      .returning('id');
    return this.findById(id);
  },

  async findById(id) {
    return db('orders').where({ id }).first();
  },

  async findByUserId(userId) {
    return db('orders').where({ user_id: userId });
  },

  async updateToPaid(id, paymentResult) {
    await db('orders')
      .where({ id })
      .update({
        isPaid: true,
        paidAt: db.fn.now(),
        paymentResult: JSON.stringify(paymentResult),
      });
    return this.findById(id);
  },

  async updateToDelivered(id) {
    await db('orders')
      .where({ id })
      .update({
        isDelivered: true,
        deliveredAt: db.fn.now(),
      });
    return this.findById(id);
  },
};

module.exports = Order;