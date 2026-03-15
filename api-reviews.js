/**
 * Google Reviews API Proxy (Node.js/Express)
 * This file fetches reviews from Google Places API
 * 
 * Setup Instructions:
 * 1. Install dependencies: npm install express axios cors dotenv
 * 2. Get a Google Places API key from: https://console.cloud.google.com/
 * 3. Enable Places API in your Google Cloud Console
 * 4. Create a .env file with: GOOGLE_API_KEY=your_api_key_here
 * 5. Run: node api-reviews.js
 */

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuration
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'YOUR_API_KEY_HERE';
const PLACE_ID = 'ChIJV2j8fGqbOToR4AITExPm87U'; // Dr. N Manna's Place ID

// Endpoint to fetch reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${GOOGLE_API_KEY}`;
        
        const response = await axios.get(url);
        const data = response.data;
        
        if (data.result && data.result.reviews) {
            const formattedReviews = data.result.reviews.map(review => ({
                author: review.author_name,
                rating: review.rating,
                text: review.text,
                time: new Date(review.time * 1000).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                }),
                profilePhoto: review.profile_photo_url || null,
                relativeTime: review.relative_time_description
            }));
            
            res.json({
                success: true,
                rating: data.result.rating,
                totalReviews: data.result.user_ratings_total,
                reviews: formattedReviews
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'No reviews found'
            });
        }
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch reviews',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is running' });
});

app.listen(PORT, () => {
    console.log(`Reviews API server running on port ${PORT}`);
    console.log(`Access reviews at: http://localhost:${PORT}/api/reviews`);
});

module.exports = app;
