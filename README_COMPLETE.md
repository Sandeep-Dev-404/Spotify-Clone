# Spotify Clone - Complete Music Player

A fully functional Spotify-like music player built with vanilla HTML, CSS, and JavaScript. Stream music directly from archive.org or host your own MP3 files.

## Features

### 🎵 Music Playback
- ✅ Play, pause, next, previous controls
- ✅ Volume control with mute toggle
- ✅ Seekbar for scrubbing through songs
- ✅ Real-time playback duration display
- ✅ Auto-advance to next song
- ✅ Support for archive.org streaming URLs
- ✅ Support for local MP3 files

### 📁 Playlist Management
- ✅ Browse multiple folders/playlists
- ✅ Dynamic playlist loading from JSON
- ✅ Song list with clickable tracks
- ✅ Currently playing indicator
- ✅ Folder metadata (title, description, cover art)

### 🎨 User Interface
- ✅ Dark theme inspired by Spotify
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Smooth animations and transitions
- ✅ Play button overlay on playlist cards
- ✅ Real-time progress bar
- ✅ Mobile hamburger menu

### 🌐 Deployment Ready
- ✅ Netlify-ready configuration
- ✅ Static site (no build process needed)
- ✅ CORS enabled for streaming
- ✅ Optimized caching headers
- ✅ Single-page app routing

---

## Project Structure

```
Spotify-Clone/
├── 📄 index.html                    # Main HTML page
├── 🎨 CSS Files
│   ├── style.css                    # Main styling
│   ├── reset.css                    # Browser normalization
│   └── utility.css                  # Utility classes
├── 📜 JavaScript
│   └── script.js                    # Audio player logic
├── 🎵 Data
│   └── music-data.json              # Playlist metadata
├── 🖼️ Assets
│   ├── img/                         # Icons (SVG/PNG)
│   └── songs/                       # Optional local MP3 files
├── ⚙️ Configuration
│   ├── netlify.toml                 # Netlify build config
│   ├── _redirects                   # URL routing rules
│   └── web.config                   # IIS configuration
├── 📚 Documentation
│   ├── README.md                    # This file
│   ├── STYLES_GUIDE.md              # CSS documentation
│   ├── NETLIFY_DEPLOYMENT.md        # Deployment guide
│   └── DOCUMENTATION.md             # Full documentation
└── 📋 Other
    ├── CHANGES_LOG.md               # Version history
    ├── QUICK_START.md               # Quick reference
    └── PROJECT_STRUCTURE.md         # Detailed structure
```

---

## Audio Playback Architecture

### Song Data Format (music-data.json)

```json
{
  "folders": [
    {
      "name": "Party",
      "title": "Party Songs",
      "description": "High energy party tracks",
      "cover": "/img/party-cover.jpg",
      "songs": [
        {
          "file": "song1.mp3",
          "url": "https://archive.org/download/collection/song1.mp3"
        },
        {
          "file": "song2.mp3",
          "url": "https://archive.org/download/collection/song2.mp3"
        }
      ]
    }
  ]
}
```

### Playback Priority
1. **Archive.org URL** (if available) → Streams directly
2. **Local File** → Falls back to `/songs/[folder]/[filename].mp3`

### CORS Configuration
The app is configured to work with:
- ✅ archive.org (with CORS headers enabled)
- ✅ Local files served from same domain
- ✅ External HTTPS streams

---

## Installation & Setup

### Option 1: Quick Start (No Installation)

Simply clone and open in browser:

```bash
git clone https://github.com/yourusername/Spotify-Clone.git
cd Spotify-Clone
# Open index.html in a browser
```

### Option 2: Local Server (Recommended)

**Python 3:**
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

**Node.js:**
```bash
npx http-server
# Visit http://localhost:8080
```

**VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## Usage Guide

### Playing Music

1. **Select a Folder**
   - Click any playlist card on the right side
   - Songs from that folder load in the left sidebar

2. **Play a Song**
   - Click "Play Now" on any song in the list
   - Or click the play button overlay on a card
   - Or use the Play/Pause button in the playbar

3. **Control Playback**
   - **Play/Pause:** Click the play icon in playbar
   - **Next:** Click next arrow (skips to next song)
   - **Previous:** Click previous arrow (goes to last song)
   - **Volume:** Drag volume slider
   - **Mute:** Click speaker icon to toggle
   - **Seekbar:** Click anywhere to jump to that time

4. **View Information**
   - Current song name displays in playbar
   - Time shows elapsed time / total duration
   - Progress bar indicates position in track

### Playlist Structure (Optional)

If hosting local files, create folders in `/songs/`:

```
songs/
├── Party/
│   ├── song1.mp3
│   ├── song2.mp3
│   └── info.json
└── Chill/
    ├── chill1.mp3
    └── info.json
```

**info.json format:**
```json
{
  "title": "Chill Vibes",
  "description": "Relaxing background music",
  "cover": "cover.jpg"
}
```

---

## Styling Guide

### CSS Files Overview

| File | Purpose | Size |
|------|---------|------|
| `style.css` | Main styles (997 lines) | Playbar, cards, layout |
| `reset.css` | Browser normalization | Font scaling fixes |
| `utility.css` | Utility classes | Reusable patterns |

### Color Scheme

| Element | Color | Hex |
|---------|-------|-----|
| Background | Black | #000000 |
| Sidebar | Dark Gray | #121212 |
| Playbar | Dark Blue | rgb(45 45 101) |
| Text | White | #ffffff |
| Secondary | Gray | #b1b0b0 |

### Key Components

- **Navigation:** Search, buttons, logo
- **Sidebar:** "Your Library" with play list
- **Main Area:** Trending songs grid
- **Player:** Fixed bottom bar with controls

For detailed styling documentation, see `STYLES_GUIDE.md`.

---

## Deployment

### Netlify (Recommended - Free)

1. **Connect GitHub:**
   ```bash
   git push origin main
   ```

2. **Deploy on Netlify:**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select repository
   - Build command: (leave empty)
   - Publish directory: `.` (root)
   - Click Deploy!

3. **Your site is live!**
   - Example: `https://your-site.netlify.app`

### Other Platforms

| Platform | Instructions |
|----------|--------------|
| GitHub Pages | Push to `gh-pages` branch |
| Vercel | Connect repository (auto-deploy) |
| Cloudflare Pages | Connect repository |
| Firebase Hosting | `firebase deploy` |

See `NETLIFY_DEPLOYMENT.md` for detailed instructions.

---

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Media queries
- **Vanilla JavaScript** - No frameworks/libraries
- **Web Audio API** - HTML5 audio element

### Hosting
- **Static Site** - No server needed
- **CDN Ready** - Netlify, Vercel, GitHub Pages
- **CORS Enabled** - Works with external audio sources

### Dependencies
- **None!** 🎉 Pure vanilla JavaScript

---

## Browser Support

| Browser | Support | Note |
|---------|---------|------|
| Chrome | ✅ 90+ | Full support |
| Firefox | ✅ 88+ | Full support |
| Safari | ✅ 14+ | Full support |
| Edge | ✅ 90+ | Full support |
| Mobile | ✅ iOS/Android | Responsive design |

---

## Troubleshooting

### Songs Not Playing

**Check browser console (DevTools → Console):**
```javascript
// Should see: Loading audio: https://...
// Should see: Audio can play, duration: 234.56
```

**Common issues:**
1. CORS error → Check netlify.toml headers
2. 404 error → Verify music-data.json paths
3. Playback denied → Allow audio on site
4. Cache issues → Hard refresh (Ctrl+Shift+R)

### Songs List Not Showing

1. Check music-data.json is valid JSON
2. Verify folder name matches exactly
3. Check browser console for errors
4. Hard refresh the page

### Styles Not Loading

1. Check CSS file paths in index.html
2. Verify .css files are in root directory
3. Hard refresh browser
4. Check Network tab in DevTools

### Mobile Issues

1. Test in portrait and landscape
2. Check hamburger menu opens/closes
3. Verify touch controls work
4. Test volume slider responsiveness

---

## Customization

### Change Playlists (music-data.json)

Add new folder with songs:
```json
{
  "name": "My Folder",
  "title": "My Playlist",
  "description": "My favorite songs",
  "cover": "path/to/image.jpg",
  "songs": [...]
}
```

### Customize Colors

Edit variables in `style.css`:
```css
/* Change background */
body { background-color: #000000; }

/* Change playbar */
.playbar { background-color: rgb(45 45 101); }

/* Change text */
body { color: #ffffff; }
```

### Add Features

Extend `script.js` with:
- Playlist creation
- Search functionality
- Shuffle/repeat modes
- Favorites/bookmarks
- User accounts

---

## Performance

### Optimization

✅ **Lightweight**
- No build process
- No npm dependencies
- ~15KB total (gzipped)

✅ **Fast Loading**
- Lazy-load song data
- Cache images 1 year
- Cache CSS/JS 1 year
- Cache HTML 5 minutes

✅ **Smooth Playback**
- Uses Web Audio API
- Hardware-accelerated transforms
- Optimized transition animations

### Network Waterfall

1. Load HTML (cached 5 min)
2. Load CSS/JS (cached 1 year)
3. Load playlist JSON (cached 1 hour)
4. Stream audio on demand

---

## Contributing

Want to improve the project?

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Contribution Ideas
- Dark/Light theme toggle
- Playlist creation UI
- Search functionality
- Offline mode (service worker)
- Mobile app wrapper
- Equalizer UI

---

## License

MIT License - Free to use and modify!

---

## Resources

### Documentation
- [MDN Audio API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [Netlify Docs](https://docs.netlify.com)
- [CSS Tricks](https://css-tricks.com)

### Design References
- [Spotify Design](https://www.spotify.com)
- [Material Design](https://material.io)
- [Dribbble](https://dribbble.com)

### Tools Used
- VS Code
- Chrome DevTools
- Netlify CLI

---

## Changelog

See `CHANGES_LOG.md` for version history and updates.

---

## Support

- 📧 Email: your-email@example.com
- 💬 Issues: GitHub Issues
- 🐦 Twitter: @yourhandle
- 📘 Documentation: See `/docs/`

---

## Quick Links

- 🚀 [Deploy to Netlify](https://netlify.com/drop)
- 📚 [CSS Documentation](STYLES_GUIDE.md)
- 🌐 [Deployment Guide](NETLIFY_DEPLOYMENT.md)
- 📖 [Full Documentation](DOCUMENTATION.md)
- ⚡ [Quick Start](QUICK_START.md)

---

**Made with ❤️ for music lovers**
