const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const sellRoutes = require('./routes/sell');
const repairRoutes = require('./routes/repair');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/exporterpro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sell', sellRoutes);
app.use('/api/repair', repairRoutes);
app.use('/api/user', require('./routes/user'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
