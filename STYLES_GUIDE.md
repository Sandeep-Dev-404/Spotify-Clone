# Spotify Clone - Complete Styles Guide

## Overview
The project uses a modern, responsive design with a dark theme inspired by Spotify. Styles are split across three CSS files for better organization.

---

## CSS Files

### 1. **reset.css**
Prevents font scaling issues on mobile devices and normalizes font sizes across elements.

**Key Rules:**
- `-webkit-text-size-adjust: 100%` (prevents iOS font size adjustment)
- `-moz-text-size-adjust: 100%` (Firefox support)
- Base font size: `16px`

---

### 2. **style.css** (Main stylesheet)

#### **Navigation Bar**
- Dark background with Spotify logo and home icon
- Search bar with interactive hover effects
- Buttons for Premium, Support, Download, Sign Up, and Log In
- Responsive hamburger menu on screens < 1200px

```css
nav {
  background-color: black;
  display: flex;
  list-style: none;
  width: 100%;
}
```

**Key Components:**
- `.home` - Home button (43px × 41px)
- `.input` - Search bar (rounded, dark background)
- `.buttons` - Premium, Support, Download links
- `.log-in` - Log in button with hover effects

---

#### **Left Sidebar (.left)**
Contains "Your Library" section with playlists and song list.

**Properties:**
- `max-width: 300px`
- `background-color: rgb(18 18 18)`
- `border-radius: 12px`
- `overflow-y: auto` (scrollable)

**Child Elements:**
- `.Library` - Header with plus icon
- `.content` - Container boxes for playlists
- `.songlist` - Scrollable list of current folder's songs
- `footer` - Legal links and language selector

**Song List Styling (.songlist ul li):**
```css
.songlist ul li {
    border: 1px solid white;
    padding: 7px 7px;
    border-radius: 6px;
    margin: 6px 0;
    font-family: "Lato", sans-serif;
    font-size: 14px;
    color: white;
}
```

- Music icon, song name, and "Play Now" button
- Hover effects for interactivity
- Info div with song name and additional details

---

#### **Right Content Area (.right)**
Main music browsing and playback area.

**Properties:**
- `width: 80%`
- `background: linear-gradient(to bottom, #5d5d5d5c, #121212, #121212)`
- `border-radius: 12px`
- `overflow: auto`

**Components:**

##### **Trending Section**
```css
.trending-section {
    position: relative;
    top: 27px;
    left: 40px;
}

.trend-songs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    overflow-y: auto;
    max-width: calc(100% - 80px);
}
```

##### **Music Cards (.card)**
```css
.card {
    width: 210px;
    height: 250px;
    position: relative;
    overflow: visible;
}

.card img {
    width: 184px;
    height: 178px;
    border-radius: 19px;
    object-fit: contain;
}

.card h2 {
    font-size: 14px;
    color: #f3f3f3;
    font-weight: 500;
}

.card p {
    font-size: 12px;
    color: #b1b0b0;
}

.card .play {
    position: absolute;
    right: 27px;
    bottom: 63px;
    width: 40px;
    height: 40px;
    opacity: 0;
    transition: opacity .18s ease, transform .18s ease;
}

.card:hover .play {
    opacity: 1;
    transform: translateY(0) scale(1);
}
```

---

#### **Playbar (Music Player)**
Fixed footer with playback controls, seekbar, and volume control.

```css
.playbar {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: rgb(45 45 101);
    padding: 12px 40px;
    width: 100%;
    max-height: 100px;
    z-index: 1000;
}
```

**Child Elements:**
- `.seekbar` - Progress bar with white circular indicator
- `.abovebar` - Song info, play/pause/next buttons, time, volume
- `.songbuttons` - Previous, Play/Pause, Next icons
- `.volume` - Volume slider and mute toggle
- `.timevol` - Current time and duration display

**Seekbar:**
```css
.seekbar {
    height: 2px;
    width: 100%;
    background-color: white;
    cursor: pointer;
}

.circular {
    height: 11px;
    width: 11px;
    border-radius: 12px;
    background-color: white;
    transition: left 0.5s;
}
```

---

### 3. **utility.css** (Utility classes)

Reusable utility classes following a Tailwind-like pattern:

```css
.border { border: 2px solid black; }
.flex { display: flex; }
.justify-center { justify-content: center; }
.items-center { align-items: center; }
.invert { filter: invert(1); }
.m-1 { margin: 10px 0 0 223px; }
```

**Scrollbar Hiding:**
```css
::-webkit-scrollbar { display: none; }
* { scrollbar-width: none; }
```

---

## Responsive Design

### Small Screens (< 480px)
```css
@media (max-width: 480px) {
    .left {
        max-width: 300px;
        font-size: 10px;
    }
    
    .playbar {
        padding: 8px;
        max-height: 80px;
    }
}
```

### Tablets (480px - 768px)
- Standard display
- No major layout changes

### Medium Screens (768px - 1200px)
- Font size increases
- Layout remains flexible

### Small Desktops (< 1200px)
```css
@media (max-width: 1200px) {
    .left {
        position: fixed;
        left: -100%;
        transition: all .3s;
        width: 80%;
        height: 587px;
        z-index: 1;
    }
    
    .hamburger { display: block; }
    .close { display: block; }
    
    .right { width: 100vw; }
    
    .trend-songs {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 150px);
    }
    
    .card { width: 100%; }
}
```

---

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Very Dark Gray/Black | #000000, #1a1a1a |
| Sidebar | Dark Gray | #121212 |
| Playbar | Dark Blue | rgb(45 45 101) |
| Text | White | #ffffff |
| Secondary Text | Gray | #b3b3b3, #b1b0b0 |
| Borders | White/Gray | #ffffff, #625f5f |
| Hover | Light Gray | #353535, #1e1e1e5c |

---

## Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Logo/Headings | Noto Sans TC, Inter | 800-900 | 14px-22px |
| Body Text | Poppins, Lato | 400-500 | 12px-14px |
| Buttons | Montserrat, Alan Sans | 600-700 | 11px-15px |
| Navigation | Montserrat | 700 | 13px-15px |

---

## Key Features

### Smooth Transitions
```css
transition: opacity .18s ease, transform .18s ease;
transition: all .3s;
```

### Gradient Backgrounds
- Right panel: `linear-gradient(to bottom, #5d5d5d5c, #121212, #121212)`
- Card hover: `linear-gradient(to bottom, #1e1e1e5c, #1a1a1a)`

### Hover Effects
- Cards: Play button fades in with transform
- Buttons: Text color change to white
- Links: Underline on hover

### Z-Index Hierarchy
- Playbar: `z-index: 1000` (always on top)
- Hamburger/Close: `z-index: 1000`
- Sidebar (mobile): `z-index: 1`
- Default elements: `z-index: auto`

---

## Customization Tips

1. **Change primary color scheme:** Update the Background colors in style.css
2. **Adjust spacing:** Modify padding/margin values in individual classes
3. **Update fonts:** Change `font-family` in typography sections
4. **Modify dimensions:** Adjust card sizes, sidebar width, playbar height
5. **Animation speed:** Change transition durations (currently 0.18s to 0.3s)

---

## Browser Compatibility

- **Modern browsers:** Chrome, Firefox, Safari, Edge
- **Mobile optimization:** iOS, Android
- **Scrollbar hiding:** Works with -webkit, -moz, and standard properties
- **Flexbox layout:** Fully supported
- **CSS Grid fallbacks:** Not heavily used in current design

---

## Performance Notes

- Scrollbars are hidden via CSS (not JavaScript) for better performance
- Fixed positioning used for playbar to avoid layout reflows
- Image backgrounds use `object-fit: contain` for proper scaling
- Hover effects use CSS transforms (GPU acceleration) instead of position changes
