const asyncHandler = require('express-async-handler');
const CustomDesign = require('../models/CustomDesign');

// @desc    Save a custom design
// @route   POST /api/customizations
// @access  Private
const saveCustomDesign = asyncHandler(async (req, res) => {
  const { name, designData, imageUrl } = req.body;

  const customDesign = new CustomDesign({
    user: req.user._id,
    name,
    designData,
    imageUrl,
  });

  const createdDesign = await customDesign.save();
  res.status(201).json(createdDesign);
});

// @desc    Get a custom design by ID
// @route   GET /api/customizations/:id
// @access  Public (can be shared)
const getCustomDesignById = asyncHandler(async (req, res) => {
  const design = await CustomDesign.findById(req.params.id).populate('user', 'name email');

  if (design) {
    res.json(design);
  } else {
    res.status(404);
    throw new Error('Custom design not found');
  }
});

// @desc    Get logged in user's custom designs
// @route   GET /api/customizations/my-designs
// @access  Private
const getMyCustomDesigns = asyncHandler(async (req, res) => {
  const designs = await CustomDesign.find({ user: req.user._id });
  res.json(designs);
});

// @desc    Delete a custom design
// @route   DELETE /api/customizations/:id
// @access  Private
const deleteCustomDesign = asyncHandler(async (req, res) => {
  const design = await CustomDesign.findById(req.params.id);

  if (design) {
    if (design.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this design');
    }
    await design.deleteOne();
    res.json({ message: 'Custom design removed' });
  } else {
    res.status(404);
    throw new Error('Custom design not found');
  }
});

module.exports = { saveCustomDesign, getCustomDesignById, getMyCustomDesigns, deleteCustomDesign };
