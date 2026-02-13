# 🎵 Background Music Setup Guide

## Current Setup: YouTube Embed (Auto-play & Loop)

The project is currently configured to play **"Until I Found You" by Stephen Sanchez** from YouTube automatically.

### Features:

- ✅ Auto-play on page load (after first user interaction)
- ✅ Loop continuously
- ✅ Music toggle button (bottom-right corner)
- ✅ 🔊 = Music playing
- ✅ 🔇 = Music muted

---

## Alternative: Using Local MP3 File

If you want to use a downloaded MP3 file instead of YouTube:

### Step 1: Download the Song

1. Download "Until I Found You - Stephen Sanchez" as MP3
2. Rename it to: `background-music.mp3`
3. Place it in: `c:/laragon/www/webcare/spesial/`

### Step 2: Update HTML

Replace the iframe in `index.html` (around line 306) with:

```html
<!-- Background Music: Until I Found You - Stephen Sanchez -->
<audio id="bgMusic" autoplay loop>
  <source src="background-music.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>

<!-- Music Control Button -->
<button id="musicToggle" class="music-toggle" onclick="toggleMusic()">
  <span id="musicIcon">🔊</span>
</button>
```

### Step 3: Update JavaScript

Replace the `toggleMusic()` function in `script.js` with:

```javascript
function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const musicIcon = document.getElementById("musicIcon");
  const musicButton = document.getElementById("musicToggle");

  if (music.paused) {
    music.play();
    musicIcon.textContent = "🔊";
    musicButton.classList.remove("muted");
  } else {
    music.pause();
    musicIcon.textContent = "🔇";
    musicButton.classList.add("muted");
  }
}

// Auto-play music on first user interaction
let musicStarted = false;
document.addEventListener(
  "click",
  function () {
    if (!musicStarted) {
      const music = document.getElementById("bgMusic");
      music.play().catch((e) => console.log("Autoplay prevented:", e));
      musicStarted = true;
    }
  },
  { once: true },
);
```

---

## Browser Autoplay Policy

Modern browsers block autoplay with sound. The music will start:

- ✅ After first user click/tap
- ✅ Automatically on some browsers if user has interacted with the site before

---

## Troubleshooting

### Music not playing?

1. **Check browser console** for errors
2. **Click anywhere** on the page to trigger autoplay
3. **Check volume** - make sure device/browser isn't muted
4. **Try different browser** - Chrome, Firefox, Edge

### YouTube embed not working?

- Check internet connection
- YouTube video might be blocked in some regions
- Use local MP3 file as alternative

### Music button not visible?

- Check if it's hidden behind other elements
- Look at bottom-right corner
- Try scrolling down

---

## Music Credits

**Song:** Until I Found You  
**Artist:** Stephen Sanchez  
**YouTube:** https://www.youtube.com/watch?v=cE0wfjsybIQ

---

## Tips for Best Experience

1. **Use headphones** for better audio quality
2. **Full volume** for emotional impact
3. **Quiet environment** to fully immerse
4. **Let it play** - don't skip the music!

---

Enjoy! 💕🎵
