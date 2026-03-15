# Setup Guide - Dr. N Manna Clinic Website

## Quick Start (No Backend)

1. Create an `images` folder
2. Add your images (see image naming below)
3. Open `index.html` in a browser
4. Done! ✅

## Image Naming Convention

```
images/
├── doctor.jpg                      # Dr. Manna's photo
├── transformation-1-before.jpg     # Before treatment
├── transformation-1-after.jpg      # After treatment
├── transformation-2-before.jpg
├── transformation-2-after.jpg
├── transformation-3-before.jpg
├── transformation-3-after.jpg
├── video-thumb-1.jpg              # Video review thumbnails
├── video-thumb-2.jpg
└── video-thumb-3.jpg
```

## Features Included

✅ Before/After slider (drag to compare)
✅ Written reviews section
✅ Video reviews section with tabs
✅ Responsive mobile design
✅ Smooth animations
✅ Google Maps integration
✅ Click-to-call buttons

## Google Reviews Auto-Fetch (Optional)

### Why You Need This
Currently, reviews are hardcoded in HTML. To automatically fetch new reviews from Google Maps, you need a backend.

### Setup Steps

#### For PHP Hosting (GoDaddy, Bluehost, etc.)

1. **Get Google API Key**
   - Go to: https://console.cloud.google.com/
   - Create a new project
   - Enable "Places API"
   - Create credentials → API Key
   - Copy your API key

2. **Configure PHP File**
   - Open `api-reviews.php`
   - Replace `YOUR_API_KEY_HERE` with your actual API key
   - Upload to your web server

3. **Update Frontend**
   - Open `script.js`
   - Find the `loadGoogleReviews()` function
   - Uncomment and update:
   ```javascript
   const response = await fetch('https://yourwebsite.com/api-reviews.php');
   const data = await response.json();
   displayReviews(data.reviews);
   ```

#### For Node.js Hosting (Heroku, Vercel, DigitalOcean)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Google API key

3. **Start Server**
   ```bash
   npm start
   ```

4. **Update Frontend**
   - Open `script.js`
   - Update the fetch URL to your server:
   ```javascript
   const response = await fetch('http://your-server.com:3000/api/reviews');
   ```

## Video Reviews Setup

1. **Upload Videos**
   - Upload to YouTube (recommended)
   - Or host on your server

2. **Update HTML**
   - Open `index.html`
   - Find video cards
   - Add `data-video-src` attribute:
   ```html
   <div class="video-card" data-video-src="https://youtube.com/watch?v=YOUR_VIDEO_ID">
   ```

3. **Add Thumbnails**
   - Save video thumbnails as `images/video-thumb-1.jpg`, etc.

## Customization

### Change Colors
Edit `styles.css` lines 10-20:
```css
:root {
    --primary: #6366f1;        /* Main color */
    --secondary: #ec4899;      /* Accent color */
    --accent: #8b5cf6;         /* Highlight color */
}
```

### Add More Transformations
Copy a transformation card in `index.html` and update:
- Image paths
- Treatment name
- Duration text

### Add More Services
Copy a service card in `index.html` and update:
- Icon emoji
- Service name
- Description

## Deployment

### Static Hosting (No Backend)
Upload these files to any web host:
- `index.html`
- `styles.css`
- `script.js`
- `images/` folder

Recommended hosts:
- Netlify (free)
- Vercel (free)
- GitHub Pages (free)
- Any shared hosting

### With Backend
If using Google Reviews API:
- PHP: Upload all files including `api-reviews.php`
- Node.js: Deploy to Heroku, Vercel, or DigitalOcean

## Troubleshooting

### Images Not Showing
- Check file names match exactly (case-sensitive)
- Ensure `images/` folder is in the same directory as `index.html`
- Check browser console for errors (F12)

### Before/After Slider Not Working
- Make sure both before and after images exist
- Check that image paths are correct
- Try refreshing the page

### Reviews Not Loading
- Check API key is valid
- Ensure Places API is enabled in Google Cloud
- Check browser console for errors
- Verify backend is running (if using Node.js)

## Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify all file paths are correct
3. Ensure images are properly named
4. Test in different browsers

## Next Steps

1. ✅ Add all images to `images/` folder
2. ✅ Test the website locally
3. ✅ (Optional) Set up Google Reviews API
4. ✅ Deploy to web hosting
5. ✅ Share the link!

---

Need help? Check the README.md for more details.
