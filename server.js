// // Load environment variables
// require('dotenv').config();

// // Import dependencies
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const Booking = require('./models/bookingModel');

// // Initialize Express app
// const app = express();

// // Middleware setup
// app.use(cors());
// app.use(express.json());  // Parse JSON bodies from incoming requests
// app.use(express.static(path.join(__dirname, 'public')));  // Serve static files
// app.set('view engine', 'ejs');  // Set EJS as the template engine

// // MongoDB URI from environment variables
// const MONGODB_URI = process.env.MONGODB_URI;

// // Connect to MongoDB Atlas
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Route to fetch bookings and render them in a table
// app.get('/', async (req, res) => {
//   try {
//     const bookings = await Booking.find();  // Fetch all bookings from MongoDB
//     res.render('index', { bookings });  // Pass bookings to the EJS template
//   } catch (err) {
//     console.error('Error fetching bookings:', err);
//     res.status(500).json({ error: 'Error fetching bookings' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// require('dotenv').config();  // Load environment variables

// // Import dependencies
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const Booking = require('./models/bookingModel');  // Assuming your Booking model is in models/bookingModel.js

// // Initialize Express app
// const app = express();

// // Middleware setup
// app.use(cors());
// app.use(express.json());  // Parse JSON bodies from incoming requests
// app.use(express.static(path.join(__dirname, 'public')));  // Serve static files like CSS, JS
// app.set('view engine', 'ejs');  // Set EJS as the template engine

// // MongoDB URI from environment variables
// const MONGODB_URI = process.env.MONGODB_URI;

// // Connect to MongoDB Atlas
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Route to render the bookings page with initial data
// app.get('/', async (req, res) => {
//   try {
//     const bookings = await Booking.find();  // Fetch all bookings from MongoDB
//     res.render('index', { bookings });  // Pass bookings data to the EJS template
//   } catch (err) {
//     console.error('Error fetching bookings:', err);
//     res.status(500).json({ error: 'Error fetching bookings' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Booking = require('./models/bookingModel');

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Route to render the bookings page
app.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.render('index', { bookings });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Route to handle status update (Confirm or Not Confirmed)
// Assuming you have already set up the necessary models and imports.

app.post('/update-status/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Find the booking by ID and update its status
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Update the status to 'confirmed'
        booking.confirmed = status === 'confirmed'; // Set it to confirmed

        // Save the updated booking
        await booking.save();

        res.json({ success: true, message: 'Booking status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
