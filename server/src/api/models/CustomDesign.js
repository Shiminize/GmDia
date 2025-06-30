const mongoose = require('mongoose');

const CustomDesignSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    designData: {
      type: Object,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const CustomDesign = mongoose.model('CustomDesign', CustomDesignSchema);

module.exports = CustomDesign;