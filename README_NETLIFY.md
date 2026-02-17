# 🎵 Spotify Clone - Netlify Ready

A modern, responsive Spotify-like music player built with vanilla HTML, CSS, and JavaScript. Perfect for hosting on Netlify!

## ✨ Features

- **Beautiful Dark UI** - Spotify-inspired design
- **Folder-Based Music Organization** - Organize songs by genre/mood
- **Full Playback Controls** - Play, pause, next, previous
- **Seekbar** - Jump to any point in the song
- **Volume Control** - Adjust volume with slider
- **Responsive Design** - Works on desktop, tablet, and mobile
- **No Build Required** - Pure static site, deploy anywhere

## 🎯 What's Fixed

### CSS/Styling Issues
- ✅ No more enlarged fonts on deployment
- ✅ Playbar no longer overflows out of screen
- ✅ No element overlap in controls
- ✅ Proper responsive design on all devices
- ✅ Fixed bottom player bar that doesn't move

### Project Setup
- ✅ Removed external hosting complications
- ✅ Local file loading from `/songs/` directory
- ✅ Clean, optimized for Netlify
- ✅ Netlify configuration files included

## 📁 Project Structure

```
Spotify-Clone/
├── index.html              # Main HTML page
├── style.css              # Main styles (FIXED)
├── reset.css              # CSS reset (FIXED)
├── utility.css            # Utility classes
├── script.js              # JavaScript player logic
├── music-data.json        # Song metadata
├── netlify.toml           # Netlify config
├── _redirects             # URL routing
├── img/                   # Images and icons
│   ├── spotify.svg
│   ├── play.svg
│   ├── pause.svg
│   ├── next.svg
│   ├── previous.svg
│   └── ... (other icons)
├── songs/                 # Your music files
│   ├── Party/
│   │   ├── song1.mp3
│   │   └── info.json
│   ├── Chill/
│   │   ├── song2.mp3
│   │   └── info.json
│   └── ... (other genres)
└── README.md              # This file
```

## 🚀 Quick Start

### Local Development
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: Open directly in browser
# Just double-click index.html
```

Then open `http://localhost:8000` in your browser.

### Deploy to Netlify

#### Method 1: GitHub + Netlify (Automatic)
1. Push your repo to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Deploy! (No build command needed)

#### Method 2: CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Method 3: Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `Spotify-Clone` folder
3. Done!

## 📝 Adding Your Own Songs

### Step 1: Organize Your Files
```
songs/
├── My Playlist/
│   ├── song1.mp3
│   ├── song2.mp3
│   └── info.json
└── Another Playlist/
    ├── track1.mp3
    └── info.json
```

### Step 2: Create `info.json`
```json
{
  "title": "My Playlist Name",
  "description": "Description of this playlist",
  "cover": "cover.jpg"
}
```

### Step 3: Update `music-data.json`
Generate it automatically or edit manually. Each folder needs an entry:
```json
{
  "folders": [
    {
      "name": "My Playlist",
      "title": "My Playlist Name",
      "description": "Description",
      "cover": "URL or path to cover",
      "songs": [
        {
          "file": "song1.mp3",
          "url": "/songs/My Playlist/song1.mp3"
        }
      ]
    }
  ]
}
```

## 🎨 Customization

### Colors
Edit `style.css`:
```css
/* Main theme color */
background-color: rgb(45 45 101);

/* Change to your preference */
background-color: rgb(10 20 30);
```

### Typography
```css
body {
    font-family: "Lato", sans-serif;
    color: white;
}
```

### Layout
All responsive breakpoints are in `style.css` with `@media` queries.

## 🔧 Browser Support

- Chrome/Chromium 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers

## ⚠️ Important Notes

### File Paths
- All songs must be in `/songs/` directory
- Use relative paths in `music-data.json`
- Keep folder names consistent

### Audio Format
- MP3 (recommended)
- WAV, OGG, FLAC work too
- Ensure files are optimized for web

### Performance
- Large MP3 files (>10MB) may load slowly
- Use bitrate 128-192kbps for web
- Consider audio optimization tools

## 🐛 Troubleshooting

### Songs Not Playing
```javascript
// Check browser console (F12)
// Look for fetch errors or CORS issues
```

**Solution:**
- Verify file path in music-data.json
- Check that MP3 files exist in correct folder
- Try hard refresh (Ctrl+Shift+R)

### Styling Issues After Deployment
- Hard refresh browser cache
- Check that all CSS files are loaded
- Verify viewport meta tag in HTML

### Mobile Display Problems
- Test in DevTools (F12 → Toggle device toolbar)
- Check media queries in CSS
- Verify touch controls are accessible

## 📱 Mobile Optimization

The site is fully responsive:
- **Mobile** (< 480px): Single column, optimized playbar
- **Tablet** (480-1024px): Two column layout
- **Desktop** (> 1024px): Full sidebar + main area

## 🔐 Security

- No backend required
- No user accounts
- No data collection
- No external API calls
- Fully static site

## 📄 License

This project is open source and free to use.

## 🤝 Contributing

Found a bug? Have suggestions?
1. Fork the repository
2. Make your changes
3. Submit a pull request

## 📞 Support

For Netlify deployment help:
- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Support](https://support.netlify.com/)

For web audio API issues:
- [MDN Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

**Made with ❤️ for music lovers**

Ready to deploy? Push your code and let the music play! 🎶
