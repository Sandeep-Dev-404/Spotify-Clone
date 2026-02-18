 // Beginner-friendly script for the music page
// - Reads folders from /songs/
// - Loads info.json for each folder and updates existing .card h2/p and images
// - Loads songs for clicked folder into the left playlist and selects first song paused
// - Simple play / pause / prev / next controls

// Utility helpers -----------------------------------------------------------
const HOST = window.location.origin; // Use current domain for hosting
const BASE_PATH = window.location.pathname.replace(/\/[^\/]*$/, '/'); // Get the base path

function q(sel) { return document.querySelector(sel); }
function qAll(sel) { return Array.from(document.querySelectorAll(sel)); }

function safeSelectorValue(s) {
  // CSS.escape polyfill fallback — keep folder names safe in attribute selector
  if (window.CSS && CSS.escape) return CSS.escape(s);
  return String(s).replace(/(["'\\])/g, '\\$1');
}

function formatTime(s) {
  if (!s || isNaN(s)) return '00:00';
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return String(m).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
}

// Audio + controls ---------------------------------------------------------
const audio = new Audio();
const playBtn = q('#play');
const prevBtn = q('#previous');
const nextBtn = q('#next');

let currentFolder = null;
let currentSongs = [];
let currentIndex = -1;

// Load info.json for a folder. Returns object (or null)
async function loadInfoJson(folder) {
  if (!folder) return null;
  try {
    const res = await fetch(`/songs/${encodeURIComponent(folder)}/info.json`);
    if (!res.ok) return null;
    return await res.json().catch(() => null);
  } catch (e) { return null; }
}

// Probe common cover file names
async function probeCover(folder, info) {
  if (!folder) return null;

  if (info && info.cover) {
    let raw = String(info.cover).trim();
    try { raw = decodeURIComponent(raw); } catch (e) {}
    if (!raw) return null;
    let c = raw.replace(/\\+/g, '/').trim();

    if (/^https?:\/\//i.test(c)) return c;
    if (c.startsWith('/')) return c;
    if (c.toLowerCase().startsWith('songs/')) return '/' + c;
    if (c.includes('/')) return '/' + c;
    return `/Spotify-Clone/songs/${encodeURIComponent(folder)}/${encodeURIComponent(c)}`;
  }

  try {
    const res = await fetch(`/songs/${encodeURIComponent(folder)}/`);
    if (!res.ok) return null;
    const text = await res.text();
    const anchors = parseDirectoryListing(text);
    const files = anchors.map(a => {
      let raw = a.getAttribute('href') || a.href || '';
      try { raw = decodeURIComponent(raw); } catch (e) {}
      raw = String(raw).replace(/\\+/g, '/').trim();
      return raw.split('/').filter(Boolean).pop();
    }).filter(Boolean);

    const preferred = ['cover.jpg', 'cover.png', 'cover.webp', 'cover.webp', 'cover.jpeg', 'folder.jpg', 'folder.png'];
    for (const n of preferred) {
      if (files.includes(n)) return `/songs/${encodeURIComponent(folder)}/${encodeURIComponent(n)}`;
    }

    const imgFile = files.find(f => f.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif)$/));
    if (imgFile) return `/songs/${encodeURIComponent(folder)}/${encodeURIComponent(imgFile)}`;
  } catch (e) { return null; }
  return null;
}

// Parse a directory listing HTML and return anchors
function parseDirectoryListing(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return Array.from(div.getElementsByTagName('a'));
}

// Static hosting version - load from music-data.json
async function getAllFolders() {
  try {
    const res = await fetch('./music-data.json');
    if (!res.ok) return [];
    const data = await res.json();
    return data.folders.map(f => f.name);
  } catch (e) { return []; }
}

// Load folder info from static data
async function loadFolderData(folder) {
  try {
    const res = await fetch('./music-data.json');
    if (!res.ok) return null;
    const data = await res.json();
    return data.folders.find(f => f.name === folder);
  } catch (e) { return null; }
}

// Normalize a raw folder or href string to just the base folder name
function normalizeFolderName(raw) {
  if (!raw) return '';
  try { raw = decodeURIComponent(raw); } catch (e) {}
  raw = String(raw).trim().replace(/\\+/g, '/').replace(/\/\/+/g, '/').replace(/^\/+|\/+$/g, '');
  if (raw.toLowerCase().startsWith('songs/')) raw = raw.split('/').slice(1).join('/');
  const parts = raw.split('/').filter(Boolean);
  return parts.length ? parts[parts.length - 1] : '';
}

// Clean a displayed song name — remove folder prefixes and percent-encoding
function sanitizeSongDisplayName(rawName) {
  if (!rawName) return '';
  try { rawName = decodeURIComponent(rawName); } catch (e) {}
  rawName = rawName.replace(/\\+/g, '/').split('/').filter(Boolean).pop().replace(/\.mp3$/i, '').replace(/\s*[\(\[]?\s*pendujatt\.com\.se\s*[\)\]]?/gi, '').replace(/^[0-9]+[\s\-_:,.]+/, '').replace(/_/g, ' ').trim().replace(/\s{2,}/g, ' ');
  return rawName;
}

// Create or update a card element for the folder
async function updateOrCreateCard(folder, container) {
  folder = normalizeFolderName(folder) || folder;
  const safe = safeSelectorValue(folder);
  let card = document.querySelector(`.card[data-folder="${safe}"]`);
  const info = await loadInfoJson(folder);
  const cover = await probeCover(folder, info);

  if (card) {
    const h2 = card.querySelector('h2');
    const p = card.querySelector('p');
    if (h2 && info && info.title) h2.textContent = info.title;
    if (p && info && info.description) p.textContent = info.description;
    if (cover) {
      const img = card.querySelector('img');
      if (img) img.src = cover;
      else { const i = document.createElement('img'); i.src = cover; card.insertBefore(i, card.firstChild); }
    }
    return card;
  }

  card = document.createElement('div');
  card.className = 'card';
  card.dataset.folder = folder;
  const playWrap = document.createElement('div');
  playWrap.className = 'play';
  playWrap.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  card.appendChild(playWrap);
  if (cover) { const img = document.createElement('img'); img.src = cover; img.alt = folder; card.appendChild(img); }
  const h2 = document.createElement('h2');
  h2.textContent = (info && info.title) ? info.title : folder;
  card.appendChild(h2);
  const p = document.createElement('p');
  p.textContent = (info && info.description) ? info.description : '';
  card.appendChild(p);

  card.addEventListener('click', () => openFolder(folder));
  container.appendChild(card);
  return card;
}

// Load songs for a folder from static data
async function openFolder(folder) {
  folder = normalizeFolderName(folder) || folder;
  currentFolder = folder;
  currentSongs = [];

  audio.pause();
  audio.currentTime = 0;
  const circle = q('.circular');
  if (circle) circle.style.left = '0%';
  if (playBtn) playBtn.src = 'img/play.svg';

  const folderData = await loadFolderData(folder);
  if (folderData && folderData.songs) {
    currentSongs = folderData.songs;
  }

  const ul = q('.songlist ul');
  if (!ul) return;
  ul.innerHTML = '';
  currentSongs.forEach((s, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<img class="invert" width="34" src="img/music.svg" alt=""><div class="info"><div>${sanitizeSongDisplayName(typeof s === 'string' ? s : s.file)}</div><div></div></div><div class="playnow"><span>Play Now</span><img class="invert" src="img/play.svg" alt=""></div>`;
    li.addEventListener('click', () => playAt(i));
    ul.appendChild(li);
  });

  if (currentSongs.length > 0) {
    currentIndex = 0;
    // Add active class to first song
    const firstLi = ul.querySelector('li');
    if (firstLi) firstLi.classList.add('active');
    const songData = currentSongs[0];
    
    // Handle both string filenames and object URLs
    let songFile = typeof songData === 'string' ? songData + '.mp3' : songData.file;
    
    // Always use local path from /songs/ directory
    let src = HOST + BASE_PATH + 'songs/' + encodeURIComponent(folder) + '/' + encodeURIComponent(songFile);
    
    console.log('Opening folder:', folder, 'Loading first song:', src);
    
    audio.src = src;
    audio.crossOrigin = 'anonymous';
    
    audio.onerror = function() {
      console.error('Failed to load audio. Error code:', audio.error ? audio.error.code : 'unknown');
      console.error('Audio source:', audio.src);
    };
    
    audio.oncanplay = function() {
      console.log('Audio can play, duration:', audio.duration);
    };
    
    audio.play().catch((err) => {
      console.error('Play error:', err);
    });
    const infoEl = q('.songinfo');
    if (infoEl) infoEl.textContent = sanitizeSongDisplayName(songFile);
    if (playBtn) playBtn.src = 'img/pause.svg';
    const timeEl = q('.songtime');
    if (timeEl) timeEl.textContent = '00:00 / 00:00';
  } else {
    const infoEl = q('.songinfo');
    if (infoEl) infoEl.textContent = '';
  }
}

function playAt(index) {
  if (index < 0 || index >= currentSongs.length) return;
  currentIndex = index;
  // Remove active class from all li
  const ul = q('.songlist ul');
  if (ul) {
    ul.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    const currentLi = ul.children[index];
    if (currentLi) currentLi.classList.add('active');
  }
  const songData = currentSongs[index];
  
  // Handle both string filenames and object URLs
  let songFile = typeof songData === 'string' ? songData + '.mp3' : songData.file;
  
  // Always use local path from /songs/ directory
  let src = HOST + BASE_PATH + 'songs/' + encodeURIComponent(currentFolder) + '/' + encodeURIComponent(songFile);
  
  console.log('Loading audio:', src);
  
  audio.src = src;
  audio.crossOrigin = 'anonymous';
  
  audio.onerror = function() {
    console.error('Failed to load audio. Error code:', audio.error ? audio.error.code : 'unknown');
    console.error('Audio source:', audio.src);
  };
  
  audio.oncanplay = function() {
    console.log('Audio can play, duration:', audio.duration);
  };
  
  audio.play().catch((err) => {
    console.error('Play error:', err);
  });
  const infoEl = q('.songinfo');
  if (infoEl) infoEl.textContent = sanitizeSongDisplayName(songFile);
  if (playBtn) playBtn.src = 'img/pause.svg';
}

function playPrev() {
  if (currentIndex > 0) playAt(currentIndex - 1);
}

function playNext() {
  if (currentIndex + 1 < currentSongs.length) playAt(currentIndex + 1);
}

function setupControls() {
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => {});
        if (playBtn) playBtn.src = 'img/pause.svg';
      } else {
        audio.pause();
        if (playBtn) playBtn.src = 'img/play.svg';
      }
    });
  }
  if (prevBtn) prevBtn.addEventListener('click', playPrev);
  if (nextBtn) nextBtn.addEventListener('click', playNext);

  const volumeRange = q('input[type="range"]');
  if (volumeRange) volumeRange.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
  });

  const volumeImg = document.querySelector(".volume > img");
  if (volumeImg) {
    volumeImg.addEventListener("click", (e) => {
      if (e.target.src.includes("volume.svg")) {
        e.target.src = e.target.src.replace("volume.svg", "mute.svg");
        audio.volume = 0;
      } else {
        e.target.src = e.target.src.replace("mute.svg", "volume.svg");
        audio.volume = 0.10;
      }
    });
  }

  const seekbar = q('.seekbar');
  if (seekbar) {
    seekbar.addEventListener('click', (e) => {
      const rect = seekbar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      if (audio.duration) audio.currentTime = pct * audio.duration;
    });
  }

  audio.addEventListener('timeupdate', () => {
    const tEl = q('.songtime');
    if (tEl) tEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    const circle = q('.circular');
    if (circle && audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      circle.style.left = pct + '%';
    }
  });

  audio.addEventListener('ended', () => {
    if (currentIndex + 1 < currentSongs.length) {
      playAt(currentIndex + 1);
    }
  });
}

async function main() {
  const container = q('.trend-songs');
  if (!container) return;

  const res = await fetch('./music-data.json');
  const data = await res.json();
  console.log('Loaded music data:', data.folders.length, 'folders');
  console.log('First folder songs:', data.folders[0]);
  let cardsHTML = '';

  for (const folder of data.folders) {
    const imgSrc = folder.cover || 'https://i.scdn.co/image/ab67616d00001e0203b41d32b65a4d6bca8ec665';

    cardsHTML += `<div data-folder="${folder.name}" class="card">
      <img src="${imgSrc}" alt="" srcset="">
      <h2>${folder.title}</h2>
      <p>${folder.description}</p>
      <div class="play">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_iconCarrier">
            <circle cx="12" cy="12" r="9" fill="#00b200" stroke="#00b200" stroke-width="2"></circle>
            <polygon points="10,8 15,12 10,16" fill="#000000" stroke="#000000" stroke-width="1"></polygon>
          </g>
        </svg>
      </div>
    </div>`;
  }

  container.innerHTML = cardsHTML;
  console.log('Created', cardsHTML.split('data-folder').length - 1, 'cards');
  qAll('.card').forEach(c => c.addEventListener('click', () => {
    const f = c.dataset.folder;
    if (f) openFolder(f);
  }));

  if (data.folders.length > 0) {
    console.log('Opening first folder:', data.folders[0].name);
    await openFolder(data.folders[0].name);
  }

  setupControls();

  for (const folder of data.folders) {
    const meta = await loadInfoJson(folder.name).catch(() => null);
    console.log('folder', folder.name, 'info.json ->', meta);
  }

  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const left = document.querySelector(".left");
      if (left) left.style.left = "0";
    });
  }

  const closeBtn = document.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const left = document.querySelector(".left");
      if (left) left.style.left = "-120%";
    });
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', main);
else main();