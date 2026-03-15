# Dr. N Manna Specialty Clinic Website

Modern, Gen Z-style website for Dr. N Manna's dermatology clinic in Rishra, West Bengal.

## Features
- Dark theme with vibrant gradients
- Fully responsive design
- Smooth scroll animations
- Patient reviews showcase
- Embedded Google Maps
- Click-to-call functionality

## Adding Images

### 1. Doctor's Photo
- Create an `images` folder in the root directory
- Add doctor's photo as `images/doctor.jpg`
- The website will automatically use it

### 2. Clinic Photos
- Add clinic photos to `images/` folder
- Name them: `clinic-1.jpg`, `clinic-2.jpg`, etc.

### 3. Before/After Transformation Images
Add transformation images in pairs:
- `images/transformation-1-before.jpg` and `images/transformation-1-after.jpg`
- `images/transformation-2-before.jpg` and `images/transformation-2-after.jpg`
- `images/transformation-3-before.jpg` and `images/transformation-3-after.jpg`

### 4. Video Review Thumbnails
- `images/video-thumb-1.jpg`
- `images/video-thumb-2.jpg`
- `images/video-thumb-3.jpg`

### 5. Update Image Paths
Once you add images, update these sections in `index.html`:
- Line with `<div class="image-placeholder">` - replace with `<img src="images/doctor.jpg" alt="Dr. N Manna">`

## Google Reviews Integration

The website includes a system to fetch reviews from Google Maps automatically.

### Option 1: PHP Backend (for shared hosting)
1. Get a Google Places API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Places API
3. Edit `api-reviews.php` and add your API key
4. Upload to your web server
5. Update `script.js` to fetch from your PHP endpoint

### Option 2: Node.js Backend (recommended)
1. Install Node.js on your server
2. Run: `npm install`
3. Copy `.env.example` to `.env`
4. Add your Google API key to `.env`
5. Run: `npm start`
6. Update `script.js` to fetch from `http://localhost:3000/api/reviews`

### Video Reviews
To add video reviews:
1. Upload videos to YouTube or host them
2. Update the `data-video-src` attribute in video cards in `index.html`
3. Add video thumbnail images to the `images/` folder

## Quick Start
1. Open `index.html` in any web browser
2. All files (HTML, CSS, JS) are ready to use
3. No build process needed

## Customization
- Colors: Edit CSS variables in `styles.css` (lines 10-20)
- Content: Edit text directly in `index.html`
- Animations: Modify `script.js`

## Contact Info
- Phone: 094331 27706
- Address: 1st Floor, Rittika Tower 5, Rishra, West Bengal 712250
- Rating: 4.7★ (183 reviews)

## Browser Support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile responsive
