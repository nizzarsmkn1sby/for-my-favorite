// ===================================
// GLOBAL VARIABLES
// ===================================
let currentScene = 1;
const totalScenes = 13;

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================
document.addEventListener("DOMContentLoaded", function () {
  createFloatingHearts();
  initializeScenes();
  addInteractiveEffects();
  setupBasketControls(); // Setup once
});

// ===================================
// FLOATING HEARTS BACKGROUND (OPTIMIZED)
// ===================================
function createFloatingHearts() {
  const container = document.getElementById("heartsContainer");
  const heartSymbols = ["❤", "♥", "💕", "💖", "💗"];
  // Reduced for performance
  const numberOfHearts = 12;

  for (let i = 0; i < numberOfHearts; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    // Random positioning
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 12 + "s";
    heart.style.fontSize = Math.random() * 15 + 15 + "px";
    heart.style.animationDuration = Math.random() * 8 + 12 + "s";

    container.appendChild(heart);
  }
}

// ===================================
// SCENE MANAGEMENT
// ===================================
function initializeScenes() {
  // Show first scene
  showScene(1);
}

function showScene(sceneNumber) {
  // Hide all scenes
  const scenes = document.querySelectorAll(".scene");
  scenes.forEach((scene) => {
    scene.classList.remove("active");
  });

  // Show target scene with delay for smooth transition
  setTimeout(() => {
    const targetScene = document.getElementById(`scene${sceneNumber}`);
    if (targetScene) {
      targetScene.classList.add("active");
      currentScene = sceneNumber;

      // Specific scene effects
      if (sceneNumber === 13) {
        setTimeout(() => {
          const secretBurst = document.getElementById("secretHeartBurst");
          if (secretBurst) {
            createSecretHeartBurst(secretBurst);
          }
        }, 500);
      }

      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Special effects for final scene
      if (sceneNumber === 7) {
        createHeartBurst();
        playFinalAnimation();
      }
    }
  }, 300);
}

function nextScene(sceneNumber) {
  // Add fade out effect
  let currentSceneElement = document.getElementById(`scene${currentScene}`);
  
  // Safety: if currentScene is wrong, find the active one
  if (!currentSceneElement || !currentSceneElement.classList.contains('active')) {
    currentSceneElement = document.querySelector('.scene.active');
  }
  
  if (currentSceneElement) {
    currentSceneElement.style.opacity = "0";
  }

  setTimeout(() => {
    showScene(sceneNumber);
  }, 500);
}

// ===================================
// QUESTION GAME FUNCTIONS
// ===================================
function runAway() {
  const btn = document.getElementById("yesBtn");
  if (!btn) return;
  
  // Get viewport dimensions
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  
  // Calculate random position within viewport with padding
  const padding = 50; // More padding for safety
  const btnWidth = btn.offsetWidth || 100;
  const btnHeight = btn.offsetHeight || 50;
  
  const x = Math.random() * (vw - btnWidth - (padding * 2)) + padding;
  const y = Math.random() * (vh - btnHeight - (padding * 2)) + padding;
  
  btn.style.position = "fixed";
  btn.style.left = x + "px";
  btn.style.top = y + "px";
  btn.style.zIndex = "10000"; // Ensure it's on top
  btn.style.transition = "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"; // Playful movement
}

function showAccusation() {
  document.getElementById("yesBtn").style.display = "none";
  document.getElementById("noBtn").style.display = "none";
  document.querySelector("#scene10 .subtitle").style.display = "none";
  document.querySelector("#scene10 .elegant-title").style.display = "none";
  document.getElementById("accusationResult").style.display = "block";
}

// ===================================
// ENVELOPE INTERACTION
// ===================================
function openEnvelope() {
  const envelope = document.getElementById("envelope");
  envelope.classList.add("open");

  // Create sparkle effect
  createSparkles(envelope);

  // Wait for envelope animation then move to next scene
  setTimeout(() => {
    nextScene(2);
  }, 1500);
}

function createSparkles(element) {
  const rect = element.getBoundingClientRect();
  const sparkleCount = 15;

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement("div");
    sparkle.style.position = "fixed";
    sparkle.style.left = rect.left + rect.width / 2 + "px";
    sparkle.style.top = rect.top + rect.height / 2 + "px";
    sparkle.style.width = "4px";
    sparkle.style.height = "4px";
    sparkle.style.borderRadius = "50%";
    sparkle.style.backgroundColor = "#d4af37";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "1000";

    document.body.appendChild(sparkle);

    // Animate sparkle
    const angle = (Math.PI * 2 * i) / sparkleCount;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    sparkle.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(${tx}px, ${ty}px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0, .9, .57, 1)",
      },
    ).onfinish = () => sparkle.remove();
  }
}

// ===================================
// FINAL SCENE EFFECTS
// ===================================
function createHeartBurst() {
  const container = document.getElementById("heartBurst");
  const heartCount = 30;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.textContent = "❤";
    heart.style.position = "absolute";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = Math.random() * 30 + 20 + "px";
    heart.style.color = `hsl(${Math.random() * 20 + 340}, 70%, 70%)`;
    heart.style.pointerEvents = "none";

    container.appendChild(heart);

    // Animate heart burst
    const angle = (Math.PI * 2 * i) / heartCount;
    const distance = 150 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(0) rotate(0deg)",
          opacity: 0,
        },
        {
          transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1) rotate(${Math.random() * 360}deg)`,
          opacity: 1,
          offset: 0.5,
        },
        {
          transform: `translate(calc(-50% + ${tx * 1.5}px), calc(-50% + ${ty * 1.5}px)) scale(0) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 3000,
        delay: Math.random() * 500,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    );
  }
}

function playFinalAnimation() {
  // Add continuous floating hearts
  setInterval(() => {
    createRandomHeart();
  }, 300);
}

function createRandomHeart() {
  const heart = document.createElement("div");
  heart.textContent = ["❤", "♥", "💕"][Math.floor(Math.random() * 3)];
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.bottom = "-50px";
  heart.style.fontSize = Math.random() * 25 + 15 + "px";
  heart.style.color = `hsl(${Math.random() * 20 + 340}, 70%, 70%)`;
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "999";
  heart.style.opacity = "0.6";

  document.body.appendChild(heart);

  heart.animate(
    [
      {
        transform: "translateY(0) rotate(0deg)",
        opacity: 0.6,
      },
      {
        transform: `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`,
        opacity: 0,
      },
    ],
    {
      duration: 4000 + Math.random() * 2000,
      easing: "linear",
    },
  ).onfinish = () => heart.remove();
}

// ===================================
// INTERACTIVE EFFECTS
// ===================================
function addInteractiveEffects() {
  // Add hover effect to story text paragraphs
  document.addEventListener("mouseover", function (e) {
    if (e.target.tagName === "P" && e.target.closest(".story-text")) {
      e.target.style.transform = "translateX(5px)";
      e.target.style.transition = "transform 0.3s ease";
    }
  });

  document.addEventListener("mouseout", function (e) {
    if (e.target.tagName === "P" && e.target.closest(".story-text")) {
      e.target.style.transform = "translateX(0)";
    }
  });

  // Add click ripple effect to buttons
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      createRipple(e, this);
    });
  });
}

function createRipple(event, button) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.style.position = "absolute";
  ripple.style.borderRadius = "50%";
  ripple.style.background = "rgba(255, 255, 255, 0.6)";
  ripple.style.transform = "scale(0)";
  ripple.style.pointerEvents = "none";

  button.style.position = "relative";
  button.style.overflow = "hidden";
  button.appendChild(ripple);

  ripple.animate(
    [
      { transform: "scale(0)", opacity: 1 },
      { transform: "scale(2)", opacity: 0 },
    ],
    {
      duration: 600,
      easing: "ease-out",
    },
  ).onfinish = () => ripple.remove();
}

// ===================================
// SCROLL EFFECTS
// ===================================
let lastScrollTop = 0;
window.addEventListener(
  "scroll",
  function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Parallax effect for floating hearts
    const hearts = document.querySelectorAll(".floating-heart");
    hearts.forEach((heart) => {
      const speed = 0.5;
      const yPos = -(scrollTop * speed);
      heart.style.transform = `translateY(${yPos}px)`;
    });

    lastScrollTop = scrollTop;
  },
  { passive: true },
);

// ===================================
// KEYBOARD NAVIGATION
// ===================================
document.addEventListener("keydown", function (e) {
  // Press Enter or Space to continue
  if (e.key === "Enter" || e.key === " ") {
    if (currentScene < totalScenes) {
      const button = document.querySelector(`#scene${currentScene} button`);
      if (button) {
        button.click();
      }
    }
  }

  // Press Escape to go back (if not on first scene)
  if (e.key === "Escape" && currentScene > 1) {
    nextScene(currentScene - 1);
  }
});

// ===================================
// TOUCH GESTURES FOR MOBILE
// ===================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
  "touchstart",
  function (e) {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true },
);

document.addEventListener(
  "touchend",
  function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true },
);

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  // Swipe left to go next
  if (diff > swipeThreshold && currentScene < totalScenes) {
    const button = document.querySelector(`#scene${currentScene} button`);
    if (button) {
      button.click();
    }
  }

  // Swipe right to go back
  if (diff < -swipeThreshold && currentScene > 1) {
    nextScene(currentScene - 1);
  }
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--animation-duration", "0.5s");
}

// ===================================
// PREVENT CONTEXT MENU ON LONG PRESS (MOBILE)
// ===================================
document.addEventListener("contextmenu", function (e) {
  if (e.target.tagName === "BUTTON" || e.target.closest(".envelope")) {
    e.preventDefault();
  }
});

// VISIBILITY CHANGE
document.addEventListener("visibilitychange", function () {
  const hearts = document.querySelectorAll(".floating-heart, .falling-heart-game");
  if (document.hidden) {
    hearts.forEach(h => h.style.animationPlayState = "paused");
    if (gameActive) clearInterval(gameInterval);
    if (gameActive) clearInterval(heartSpawnInterval);
  } else {
    hearts.forEach(h => h.style.animationPlayState = "running");
    if (gameActive) {
      gameInterval = setInterval(updateTimer, 1000);
      const isMobile = window.innerWidth <= 768;
      heartSpawnInterval = setInterval(spawnFallingHeart, isMobile ? 95 : 120);
    }
  }
});

function isMobileDevice() {
  return window.innerWidth <= 768;
}

// ===================================
// MINIGAME FUNCTIONS (OPTIMIZED)
// ===================================
let gameScore = 0;
let gameTimer = 30;
let gameInterval = null;
let heartSpawnInterval = null;
let gameActive = false;
let activeHearts = [];
let gameLoopId = null;
let cachedBasket = null;
let basketWidth = 0;

// Start minigame transition
function startMinigame() {
  nextScene(8);
}

// Initialize game
function initGame() {
  // Reset game state
  gameScore = 0;
  gameTimer = 15; 
  gameActive = true;
  activeHearts = [];

  // Stop any existing game first
  if (gameInterval) clearInterval(gameInterval);
  if (heartSpawnInterval) clearInterval(heartSpawnInterval);
  if (gameLoopId) cancelAnimationFrame(gameLoopId);

  // Detect mobile
  const isMobile = window.innerWidth <= 768;
  const spawnRate = isMobile ? 85 : 110; // Slightly faster for more chances
  
  // Update UI
  document.getElementById("gameScore").textContent = gameScore;
  document.getElementById("gameTimer").textContent = gameTimer;
  document.getElementById("gameMessages").innerHTML = "";
  document.getElementById("startGameBtn").style.display = "none";
  document.getElementById("retryGameBtn").style.display = "none";
  
  // Show target
  const targetLabel = document.querySelector(".stat-item:last-child .stat-value");
  if (targetLabel) targetLabel.textContent = (isMobile ? 85 : 75) + " ❤️";

  // Cache basket for collision
  cachedBasket = document.getElementById("basket");
  if (cachedBasket) basketWidth = cachedBasket.offsetWidth;

  // Clear any existing hearts
  const existingHearts = document.querySelectorAll(".falling-heart-game");
  existingHearts.forEach((heart) => heart.remove());

  // Start game timer
  gameInterval = setInterval(updateTimer, 1000);

  // Spawning
  heartSpawnInterval = setInterval(spawnFallingHeart, spawnRate);

  // Start unified game loop
  gameLoop();
}

// Unified Game Loop for performance
function gameLoop() {
  if (!gameActive) return;

  checkCollisions();
  gameLoopId = requestAnimationFrame(gameLoop);
}

// Update timer
function updateTimer() {
  if (!gameActive) return;
  gameTimer--;
  document.getElementById("gameTimer").textContent = gameTimer;

  if (gameTimer <= 0) {
    endGame();
  }
}

// Spawn falling heart
function spawnFallingHeart() {
  if (!gameActive) return;

  const gameArea = document.getElementById("gameArea");
  const heart = document.createElement("div");
  heart.className = "falling-heart-game";
  heart.textContent = ["❤", "♥", "💕", "💖", "💗"][
    Math.floor(Math.random() * 5)
  ];

  // Random horizontal position
  const randomX = Math.random() * 88 + 6; // Stay away from extreme edges
  heart.style.left = randomX + "%";

  // Detect mobile
  const isMobile = window.innerWidth <= 768;

  // Random fall duration - ULTRA FAST for Level Max
  // On mobile: 0.4 - 0.6s (Insane)
  // On desktop: 0.5 - 0.7s
  const minFall = isMobile ? 0.35 : 0.45;
  const maxFall = isMobile ? 0.55 : 0.65;
  const fallDuration = Math.random() * (maxFall - minFall) + minFall;
  heart.style.animationDuration = fallDuration + "s";

  gameArea.appendChild(heart);
  activeHearts.push(heart);

  // Remove heart after animation
  setTimeout(() => {
    if (heart.parentElement) {
      heart.remove();
      activeHearts = activeHearts.filter(h => h !== heart);
    }
  }, fallDuration * 1000);
}

// Check collisions between ALL active hearts and basket
function checkCollisions() {
  if (!cachedBasket) return;
  const basketRect = cachedBasket.getBoundingClientRect();

  // Filter only hearts that are low enough to collide
  activeHearts.forEach((heart) => {
    if (heart.classList.contains("caught-effect")) return;

    const heartRect = heart.getBoundingClientRect();
    
    // Forgiving collision: give the heart 15px extra space horizontally
    const tolerance = 15;
    if (!(
      heartRect.bottom < basketRect.top ||
      heartRect.top > basketRect.bottom + 20 || // Extra 20px leeway for fast falling hearts
      heartRect.right < basketRect.left - tolerance ||
      heartRect.left > basketRect.right + tolerance
    )) {
      catchHeart(heart);
    }
  });
}

// Catch heart
function catchHeart(heart) {
  gameScore++;
  document.getElementById("gameScore").textContent = gameScore;

  // Add caught effect
  heart.classList.add("caught-effect");

  // Show random love message
  showLoveMessage();

  // Check for immediate win
  const targetScore = isMobileDevice() ? 85 : 75;
  if (gameScore >= targetScore && gameActive) {
    // Immediate win!
    endGame();
  }

  // Remove heart from active list and DOM
  setTimeout(() => {
    if (heart.parentElement) {
      heart.remove();
      activeHearts = activeHearts.filter(h => h !== heart);
    }
  }, 500);
}

// Show love message
const loveMessages = [
  "Forever 💕", "My Love ❤", "Together 💑", "Always 💖", "Soulmate 💗",
  "Destiny ✨", "Eternal 💫", "Beloved 💝", "Precious 💎", "Cherished 🌹"
];

function showLoveMessage() {
  const container = document.getElementById("gameMessages");
  const msg = document.createElement("div");
  msg.className = "love-message";
  msg.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];

  container.innerHTML = "";
  container.appendChild(msg);

  setTimeout(() => {
    if (msg.parentElement) msg.remove();
  }, 1000);
}

// End game
function endGame() {
  // Ensure game is strictly inactive
  gameActive = false;
  
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
  if (heartSpawnInterval) {
    clearInterval(heartSpawnInterval);
    heartSpawnInterval = null;
  }
  if (gameLoopId) {
    cancelAnimationFrame(gameLoopId);
    gameLoopId = null;
  }

  // Remove ALL falling hearts immediately
  const remainingHearts = document.querySelectorAll(".falling-heart-game");
  remainingHearts.forEach((heart) => heart.remove());
  activeHearts = [];

  // Clear and update messages container
  const messagesContainer = document.getElementById("gameMessages");
  messagesContainer.innerHTML = "";

  const result = document.createElement("div");
  result.className = "game-result";

  const isMobile = isMobileDevice();
  const targetScore = isMobile ? 85 : 75;

  // Clean UI state
  document.getElementById("startGameBtn").style.display = "none";
  document.getElementById("retryGameBtn").style.display = "none";

  if (gameScore >= targetScore) {
    result.classList.add("success");
    result.textContent = "🎉 Perfect! You caught my love! 🎉";
    messagesContainer.appendChild(result);

    // Manual transition button - THE ONLY WAY to continue
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn-primary";
    nextBtn.id = "gameSuccessNextBtn";
    nextBtn.textContent = "Click to Continue 💌";
    nextBtn.style.marginTop = "1.5rem";
    nextBtn.style.display = "inline-block";
    nextBtn.style.padding = "1.2rem 3rem"; // Make it bigger
    nextBtn.style.fontSize = "1.3rem";
    
    // Explicitly handle the click to transition to the next scene (Scene 9)
    nextBtn.onclick = function(e) {
      if (e) e.preventDefault();
      nextScene(9);
    };
    
    messagesContainer.appendChild(nextBtn);
    
    // Auto-scroll to show the button if it's off-screen
    setTimeout(() => {
      nextBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  } else {
    result.classList.add("fail");
    result.textContent = `You caught ${gameScore}/${targetScore} hearts. Try again to unlock the secret message!`;
    messagesContainer.appendChild(result);
    
    const retryBtn = document.getElementById("retryGameBtn");
    retryBtn.style.display = "inline-block";
    retryBtn.textContent = "Try Again! 🎮";
  }
}

// Retry game
function retryGame() {
  initGame();
}

// Setup basket controls with better performance
function setupBasketControls() {
  const gameArea = document.getElementById("gameArea");
  const basket = document.getElementById("basket");
  if (!basket) return;

  const handleMove = (clientX) => {
    const rect = gameArea.getBoundingClientRect();
    const currentBasketWidth = basket.offsetWidth;
    
    let x = clientX - rect.left - (currentBasketWidth / 2);
    // Bind to game area
    x = Math.max(0, Math.min(x, rect.width - currentBasketWidth));
    
    // Smooth transform instead of left
    basket.style.transform = `translateX(${x}px)`;
  };

  gameArea.addEventListener("mousemove", (e) => {
    if (!gameActive) return;
    requestAnimationFrame(() => handleMove(e.clientX));
  });

  gameArea.addEventListener("touchmove", (e) => {
    if (!gameActive) return;
    e.preventDefault();
    requestAnimationFrame(() => handleMove(e.touches[0].clientX));
  }, { passive: false });
}

// Create secret heart burst (Optimized)
function createSecretHeartBurst(container) {
  const heartCount = 30; // Reduced for performance

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.textContent = "❤";
    heart.style.position = "absolute";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = Math.random() * 25 + 20 + "px";
    heart.style.color = `hsl(${Math.random() * 20 + 340}, 80%, 70%)`;
    heart.style.pointerEvents = "none";
    heart.style.willChange = "transform, opacity";

    container.appendChild(heart);

    const angle = (Math.PI * 2 * i) / heartCount;
    const distance = 150 + Math.random() * 120;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    heart.animate(
      [
        { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`, opacity: 1, offset: 0.5 },
        { transform: `translate(calc(-50% + ${tx * 1.2}px), calc(-50% + ${ty * 1.2}px)) scale(0)`, opacity: 0 }
      ],
      {
        duration: 3000,
        delay: Math.random() * 500,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      }
    ).onfinish = () => heart.remove();
  }

  // Optimized celebration
  let celebrationCount = 0;
  const celebrationInterval = setInterval(() => {
    if (celebrationCount >= 30) {
      clearInterval(celebrationInterval);
      return;
    }
    createCelebrationHeart();
    celebrationCount++;
  }, 400);
}

// Create celebration heart (Optimized)
function createCelebrationHeart() {
  const heart = document.createElement("div");
  heart.textContent = ["❤", "♥", "💕", "💖", "💗"][Math.floor(Math.random() * 5)];
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 90 + 5 + "%";
  heart.style.bottom = "-50px";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";
  heart.style.color = `hsl(${Math.random() * 20 + 340}, 80%, 75%)`;
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "999";
  heart.style.willChange = "transform";

  document.body.appendChild(heart);

  const duration = 4000 + Math.random() * 2000;
  heart.animate(
    [
      { transform: "translateY(0) rotate(0deg)", opacity: 1 },
      { transform: `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ],
    {
      duration: duration,
      easing: "ease-out",
    }
  ).onfinish = () => heart.remove();
}

// ===================================
// MUSIC CONTROL
// ===================================
let musicMuted = false;

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const musicIcon = document.getElementById("musicIcon");
  const musicButton = document.getElementById("musicToggle");

  if (music.paused) {
    music.play();
    musicIcon.textContent = "🔊";
    musicButton.classList.remove("muted");
    musicMuted = false;
  } else {
    music.pause();
    musicIcon.textContent = "🔇";
    musicButton.classList.add("muted");
    musicMuted = true;
  }
}

// Auto-play music on first user interaction (for browsers that block autoplay)
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

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log(
  "%c❤ Happy Valentine's Day ❤",
  "color: #d4a5a5; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);",
);
console.log(
  "%cThis letter was made with love and code.",
  "color: #b87d7d; font-size: 14px; font-style: italic;",
);
