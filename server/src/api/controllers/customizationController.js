const asyncHandler = require('express-async-handler');
const CustomDesign = require('../models/CustomDesign');

// @desc    Save a custom design
// @route   POST /api/customizations
// @access  Private
const saveCustomDesign = asyncHandler(async (req, res) => {
  const { name, designData, imageUrl } = req.body;

  const createdDesign = await CustomDesign.create({
    user_id: req.user.id,
    name,
    designData,
    imageUrl,
  });
  res.status(201).json(createdDesign);
});

// @desc    Get a custom design by ID
// @route   GET /api/customizations/:id
// @access  Public (can be shared)
const getCustomDesignById = asyncHandler(async (req, res) => {
  const design = await CustomDesign.findById(req.params.id);

  if (design) {
    const user = await db('users').select('name', 'email').where({ id: design.user_id }).first();
    design.user = user;
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
  const designs = await CustomDesign.findByUserId(req.user.id);
  res.json(designs);
});

// @desc    Delete a custom design
// @route   DELETE /api/customizations/:id
// @access  Private
const deleteCustomDesign = asyncHandler(async (req, res) => {
  const design = await CustomDesign.findById(req.params.id);

  if (design) {
    if (design.user_id !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to delete this design');
    }
    await CustomDesign.destroy(req.params.id);
    res.json({ message: 'Custom design removed' });
  } else {
    res.status(404);
    throw new Error('Custom design not found');
  }
});

module.exports = { saveCustomDesign, getCustomDesignById, getMyCustomDesigns, deleteCustomDesign };
