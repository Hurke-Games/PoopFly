/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Playground } from './playground';
import { CORE_CODE } from './src/game/core';
import { TRANSITIONS_CODE } from './src/game/transitions';
import { FLY_CODE } from './src/game/fly';
import { ENEMIES_CODE } from './src/game/enemies';
import { ENVIRONMENT_CODE } from './src/game/environment';
import { UI_CODE } from './src/game/ui';

const GAME_CODE = [
  CORE_CODE,
  TRANSITIONS_CODE,
  FLY_CODE,
  ENEMIES_CODE,
  ENVIRONMENT_CODE,
  UI_CODE
].join('\n\n');

function renderWebsite(rootElement: HTMLElement) {
  rootElement.innerHTML = `
    <div class="site-container">
      <!-- Top Navigation Header -->
      <header class="site-header">
        <div class="header-inner">
          <div class="brand">
            <span class="logo-emoji">🪰</span>
            <div class="brand-text">
              <span class="brand-title">POOP FLY</span>
              <span class="brand-badge">HURKE GAMES ARCADE</span>
            </div>
          </div>
          <nav class="header-nav">
            <a href="#play" class="nav-link">Play</a>
            <a href="#controls" class="nav-link">Controls</a>
            <a href="#locations" class="nav-link">Locations</a>
            <a href="#enemies" class="nav-link">Threats</a>
          </nav>
          <div class="header-actions">
            <button id="header-fullscreen-btn" class="btn-fullscreen-header" title="Enter Fullscreen">
              <span class="fs-icon">⛶</span> Fullscreen
            </button>
          </div>
        </div>
      </header>

      <!-- Main Arcade Content -->
      <main class="main-content">
        <section id="play" class="game-section">
          <div class="section-intro">
            <h1 class="game-heading">Survive. Feast. Splat.</h1>
            <p class="game-subheading">Fly through 7 dangerous rooms, dodge predators, snack on pastries, and drop tactical poop!</p>
          </div>

          <!-- Arcade Cabinet & Viewport -->
          <div id="game-wrapper" class="arcade-cabinet">
            <!-- Top Arcade Bezel -->
            <div class="cabinet-bezel-top">
              <div class="bezel-left">
                <span class="live-dot"></span>
                <span class="bezel-title">POOP FLY • PROCEDURAL SURVIVAL ARCADE</span>
              </div>
              <div class="bezel-actions">
                <div class="bezel-score-badge" title="All-time best score saved in browser">
                  <span class="score-trophy">🏆</span>
                  <span class="score-label">BEST:</span>
                  <span id="bezel-best-val" class="score-number">0</span>
                </div>
                <button id="restart-btn" class="bezel-btn" title="Reload Game">
                  ⟳ Restart
                </button>
                <button id="fullscreen-btn" class="bezel-btn btn-primary" title="Toggle Fullscreen">
                  <span class="fs-icon">⛶</span> Fullscreen
                </button>
              </div>
            </div>

            <!-- Embedded Game Screen -->
            <div id="game-viewport" class="arcade-screen">
              <!-- Playground element is appended here -->
            </div>

            <!-- Bottom Arcade Bezel -->
            <div class="cabinet-bezel-bottom">
              <div class="bezel-hint">
                <span>💡 <strong>Multiplier Tip:</strong> Explore all 7 areas to multiply your final score by 7x at the end! All-time best score is saved automatically.</span>
              </div>
              <div class="bezel-shortcuts">
                <span>Click <strong>⛶ Fullscreen</strong> for the complete arcade cabinet view (Press <strong>Esc</strong> to exit)</span>
              </div>
            </div>
          </div>

          <!-- Quick Controls Feature Cards -->
          <div id="controls" class="controls-grid">
            <div class="control-card">
              <div class="card-icon">🖱️</div>
              <h3>Mouse Steering</h3>
              <p>Guide the fly seamlessly with your mouse cursor. Click the mouse button or tap <kbd>Space</kbd> to drop tactical poop.</p>
            </div>
            <div class="control-card">
              <div class="card-icon">⌨️</div>
              <h3>Keyboard Pilot</h3>
              <p>Pilot with <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or <kbd>Arrow</kbd> keys. Press <kbd>Space</kbd> to poop. Mouse pointer won't pull you off course!</p>
            </div>
            <div class="control-card">
              <div class="card-icon">🗺️</div>
              <h3>Area Multiplier & Best Score</h3>
              <p>Discover rooms! At the end, your score is <strong>multiplied by the number of areas found (up to 7x)</strong>. Your best score is permanently saved!</p>
            </div>
          </div>
        </section>

        <!-- 7 Connected Locations Section -->
        <section id="locations" class="content-section">
          <h2 class="section-title">Explore 7 Interconnected Locations</h2>
          <p class="section-desc">Fly into glowing exits—windows, pipes, trapdoors, and grates—to transition between distinct narrative rooms:</p>
          <div class="locations-grid">
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">1. Outdoors</span>
                <span class="location-tag">Sunny</span>
              </div>
              <p class="location-desc">Picket fences, flying dandelion seeds, soft grass, and roaming yard hounds.</p>
              <span class="location-exit">➔ Exit via Window or Sewer Drain</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">2. Upstairs Bedroom</span>
                <span class="location-tag">Interior</span>
              </div>
              <p class="location-desc">Cozy bedding, dresser snacks, hanging ceiling fans, and an alert human with a rolled newspaper.</p>
              <span class="location-exit">➔ Exit via Ceiling Attic Hatch</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">3. The Sewers</span>
                <span class="location-tag">Subterranean</span>
              </div>
              <p class="location-desc">Steam pipes, brick tunnels, dripping green ooze, and jumping sewer rats.</p>
              <span class="location-exit">➔ Exit via Drainage Pipe to Bathroom</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">4. Dusty Attic</span>
                <span class="location-tag">Heights</span>
              </div>
              <p class="location-desc">Wooden beams, stacked storage boxes, drifting dust motes, and rooftop ventilation.</p>
              <span class="location-exit">➔ Exit via Rooftop Exhaust Vent</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">5. Tile Bathroom</span>
                <span class="location-tag">Enclosed</span>
              </div>
              <p class="location-desc">Porcelain bathtub, medicine mirror, and a hyperactive child wielding a neon swatter!</p>
              <span class="location-exit">➔ Exit via Hallway Doorway</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">6. Grand Hall</span>
                <span class="location-tag">Corridor</span>
              </div>
              <p class="location-desc">Ornate grandfather clock, oil portraits, long runner rugs, and roaming guard dogs.</p>
              <span class="location-exit">➔ Exit via Swing Door to Kitchen</span>
            </div>
            <div class="location-card">
              <div class="location-header">
                <span class="location-name">7. Gourmet Kitchen</span>
                <span class="location-tag">Feast Zone</span>
              </div>
              <p class="location-desc">Marble countertops loaded with frosted cakes, fruits, and sizzling stoves.</p>
              <span class="location-exit">➔ Exit via Open Kitchen Window</span>
            </div>
          </div>
        </section>

        <!-- Enemy Field Guide -->
        <section id="enemies" class="content-section">
          <h2 class="section-title">Predator Threat Matrix</h2>
          <p class="section-desc">Each enemy hunts the fly with distinct mobility and attack patterns. Drop defensive poop to disorient them!</p>
          <div class="enemies-grid">
            <div class="enemy-card">
              <div class="enemy-icon">🐀</div>
              <h4 class="enemy-name">Sewer Rat</h4>
              <div class="enemy-threat">Threat: Medium</div>
              <p class="enemy-behavior">High-agility leaper that scrambles across obstacles and launches aimed pounce attacks at the fly.</p>
            </div>
            <div class="enemy-card">
              <div class="enemy-icon">🐕</div>
              <h4 class="enemy-name">Hound Dog</h4>
              <div class="enemy-threat">Threat: High</div>
              <p class="enemy-behavior">Gallops swiftly on the ground, leaps at mid-altitude flies, and unleashes sonic bark shockwaves.</p>
            </div>
            <div class="enemy-card">
              <div class="enemy-icon">🐦</div>
              <h4 class="enemy-name">Urban Pigeon</h4>
              <div class="enemy-threat">Threat: Medium</div>
              <p class="enemy-behavior">Patrols the open airspace outdoors and inside the high attic rafters with swooping divebombs.</p>
            </div>
            <div class="enemy-card">
              <div class="enemy-icon">🧑</div>
              <h4 class="enemy-name">Angry Human</h4>
              <div class="enemy-threat">Threat: Very High</div>
              <p class="enemy-behavior">Tracks the fly, winds up explosive newspaper strikes, and tosses paper balls when you fly out of swat reach.</p>
            </div>
            <div class="enemy-card">
              <div class="enemy-icon">🧒</div>
              <h4 class="enemy-name">Hyper Child</h4>
              <div class="enemy-threat">Threat: Extreme</div>
              <p class="enemy-behavior">Frantic jumping swats with a wide-radius neon swatter. Fast reaction time—keep your distance!</p>
            </div>
          </div>
        </section>
      </main>

      <!-- Website Footer -->
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="footer-logo">POOP FLY</span>
            <span class="footer-copy">© 2026 Hurke Games • Procedural Canvas Game</span>
          </div>
          <div class="footer-links">
            <a href="https://hurke-games.github.io/Poopfly/" target="_blank">hurke-games.github.io/Poopfly</a>
            <button id="footer-fs-btn" class="footer-link-btn">⛶ Play Fullscreen</button>
          </div>
        </div>
      </footer>
    </div>
  `;
}

function initGame() {
  const rootElement = document.querySelector('#root');
  if (!rootElement) return;

  // Render the modern arcade website portal
  renderWebsite(rootElement);

  // Mount the embedded p5.js playground inside the game viewport
  const viewport = document.getElementById('game-viewport');
  if (!viewport) return;

  const playground = new Playground();
  viewport.appendChild(playground);
  playground.setCode(GAME_CODE);

  // Set up Fullscreen Handlers
  const gameWrapper = document.getElementById('game-wrapper');
  const fsBtn = document.getElementById('fullscreen-btn');
  const headerFsBtn = document.getElementById('header-fullscreen-btn');
  const footerFsBtn = document.getElementById('footer-fs-btn');
  const restartBtn = document.getElementById('restart-btn');

  function toggleFullscreen() {
    if (!gameWrapper) return;
    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      if (gameWrapper.requestFullscreen) {
        gameWrapper.requestFullscreen();
      } else if ((gameWrapper as any).webkitRequestFullscreen) {
        (gameWrapper as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  }

  function updateFullscreenUI() {
    const isFs = Boolean(document.fullscreenElement || (document as any).webkitFullscreenElement);
    const label = isFs ? '🗗 Exit Fullscreen' : '⛶ Fullscreen';
    if (fsBtn) fsBtn.innerHTML = `<span class="fs-icon">${isFs ? '🗗' : '⛶'}</span> ${isFs ? 'Exit Fullscreen' : 'Fullscreen'}`;
    if (headerFsBtn) headerFsBtn.innerHTML = `<span class="fs-icon">${isFs ? '🗗' : '⛶'}</span> ${isFs ? 'Exit' : 'Fullscreen'}`;
    if (footerFsBtn) footerFsBtn.textContent = isFs ? '🗗 Exit Fullscreen' : '⛶ Play Fullscreen';
  }

  if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);
  if (headerFsBtn) headerFsBtn.addEventListener('click', toggleFullscreen);
  if (footerFsBtn) footerFsBtn.addEventListener('click', toggleFullscreen);

  document.addEventListener('fullscreenchange', updateFullscreenUI);
  document.addEventListener('webkitfullscreenchange', updateFullscreenUI);

  // Restart Button Handler
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      playground.setCode(GAME_CODE);
    });
  }

  // Best Score Tracker Sync
  const bestScoreVal = document.getElementById('bezel-best-val');
  function updateSiteBestScore(score?: number) {
    let s = score;
    if (s === undefined) {
      try {
        const stored = localStorage.getItem('poopfly_best_score');
        s = stored ? parseInt(stored, 10) || 0 : 0;
      } catch (e) {
        s = 0;
      }
    }
    if (bestScoreVal) {
      bestScoreVal.textContent = s.toLocaleString();
    }
  }
  updateSiteBestScore();

  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'POOPFLY_BEST_SCORE_UPDATE') {
      updateSiteBestScore(event.data.bestScore);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
