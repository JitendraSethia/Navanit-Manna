<?php
/**
 * Google Reviews API Proxy
 * This file fetches reviews from Google Places API
 * 
 * Setup Instructions:
 * 1. Get a Google Places API key from: https://console.cloud.google.com/
 * 2. Enable Places API in your Google Cloud Console
 * 3. Replace 'YOUR_API_KEY_HERE' with your actual API key
 * 4. Upload this file to your web server
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Configuration
$apiKey = 'YOUR_API_KEY_HERE'; // Replace with your Google API key
$placeId = 'ChIJV2j8fGqbOToR4AITExPm87U'; // Dr. N Manna's Place ID

// Fetch reviews from Google Places API
$url = "https://maps.googleapis.com/maps/api/place/details/json?place_id={$placeId}&fields=name,rating,reviews,user_ratings_total&key={$apiKey}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $data = json_decode($response, true);
    
    if (isset($data['result']['reviews'])) {
        $reviews = $data['result']['reviews'];
        
        // Format reviews for frontend
        $formattedReviews = array_map(function($review) {
            return [
                'author' => $review['author_name'],
                'rating' => $review['rating'],
                'text' => $review['text'],
                'time' => date('F Y', $review['time']),
                'profile_photo' => $review['profile_photo_url'] ?? null
            ];
        }, $reviews);
        
        echo json_encode([
            'success' => true,
            'rating' => $data['result']['rating'],
            'total_reviews' => $data['result']['user_ratings_total'],
            'reviews' => $formattedReviews
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'No reviews found'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Failed to fetch reviews'
    ]);
}
?>
