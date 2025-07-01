const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./api/routes/userRoutes');
const productRoutes = require('./api/routes/productRoutes');
const orderRoutes = require('./api/routes/orderRoutes');
const customizationRoutes = require('./api/routes/customizationRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customizations', customizationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});