const express = require('express');
const router = express.Router();
const { saveCustomDesign, getCustomDesignById, getMyCustomDesigns, deleteCustomDesign } = require('../controllers/customizationController');
const { protect } = require('../../middleware/authMiddleware');

router.route('/').post(protect, saveCustomDesign);
router.route('/my-designs').get(protect, getMyCustomDesigns);
router.route('/:id').get(getCustomDesignById).delete(protect, deleteCustomDesign);

module.exports = router;
