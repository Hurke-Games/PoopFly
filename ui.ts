// HUD, UI Screens, Main Game Loop, and Collision System
export const UI_CODE = `
// ----- MAIN LOOP & COLLISION DISPATCH -----
function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont('sans-serif');
    initAmbientParticles();
    resetGame();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    frameCounter++;

    switch (gameState) {
        case 'MENU':
            drawMenu();
            break;
        case 'SETTINGS':
            drawSettings();
            break;
        case 'PLAYING':
            gameLoop();
            break;
        case 'TRANSITION':
            updateAndDrawTransition();
            break;
        case 'GAME_OVER':
            drawGameOver();
            break;
    }
}

let survivalSeconds = 0;

function resetGame() {
    fly = new Fly();
    score = 0;
    survivalSeconds = 0;
    changeLevel(1, true);
}

function startGame() {
    resetGame();
    gameState = 'PLAYING';
    triggerArrivalBanner(1);
}

function gameOver() {
    gameState = 'GAME_OVER';
}

let layoutState = {
    nextGroundX: 0,
    nextExitX: 0,
    nextEnemyX: 0,
    nextFoodX: 0
};

function resetLayoutState() {
    let startX = width + 100;
    layoutState = {
        nextGroundX: startX,
        nextExitX: startX + 1300,  // First exit milestone after exploring ~1300px
        nextEnemyX: startX + 550,  // First enemy milestone after ~550px
        nextFoodX: startX + 280    // First food milestone after ~280px
    };
    if (typeof levelStepIndices !== 'undefined') {
        levelStepIndices = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    }
}

function changeLevel(level, isFirstLoad = false) {
    currentLevel = level;
    scrollX = 0;
    poops = [];
    enemies = [];
    foods = [];
    levelObjects = [];
    backgroundObjects = [];
    exits = [];
    particles = [];
    scorePopups = [];
    enemyProjectiles = [];
    resetLayoutState();

    if (!isFirstLoad) {
        levelHistory.push(level);
    } else {
        levelHistory = [1];
    }

    const config = levelConfigs[currentLevel];
    if (config && config.setup) {
        config.setup();
    }
}

// ----- CORE GAMEPLAY LOOP -----
function gameLoop() {
    const config = levelConfigs[currentLevel];

    // Scroll game world
    if (config.isScrolling) {
        scrollX += settings.scrollSpeed;
    }

    // Player Input (handles mouse or keyboard)
    handlePlayerInput();

    // Survival Score: +10 score per second survived
    if (frameCounter % 60 === 0) {
        survivalSeconds++;
        score += 10;
        scorePopups.push(new ScorePopup(fly.x, fly.y - 25, "+10 SURVIVAL", "#38bdf8"));
    }

    // Update Game Entities
    fly.update();
    poops.forEach(p => p.update());
    enemies.forEach(e => e.update(fly));
    foods.forEach(f => f.update());
    exits.forEach(ex => ex.update());
    enemyProjectiles.forEach(ep => ep.update());

    // Update Particle System
    particles.forEach(p => p.update());
    particles = particles.filter(p => !p.isDead());

    scorePopups.forEach(sp => sp.update());
    scorePopups = scorePopups.filter(sp => !sp.isDead());

    // Procedural generation with structured spacing
    if (config.isScrolling) {
        generateLevelContent();
    }

    // Collision Detection
    checkCollisions();

    // Cleanup offscreen objects (fixed coordinate checks)
    poops = poops.filter(p => p.isOnScreen());
    enemies = enemies.filter(e => e.isOnScreen());
    foods = foods.filter(f => f.isOnScreen());
    enemyProjectiles = enemyProjectiles.filter(ep => ep.isOnScreen() && !ep.isDead());
    if (config.isScrolling) {
        levelObjects = levelObjects.filter(o => o.x - scrollX + o.w > -100);
        backgroundObjects = backgroundObjects.filter(o => o.x - scrollX + o.w > -150);
        exits = exits.filter(ex => ex.x - scrollX + ex.w > -100);
    }

    // DRAWING PIPELINE
    drawBackground();
    backgroundObjects.forEach(o => o.draw());
    levelObjects.forEach(o => o.draw());
    foods.forEach(f => f.draw());
    exits.forEach(ex => ex.draw());
    enemyProjectiles.forEach(ep => ep.draw());
    enemies.forEach(e => e.draw());
    poops.forEach(p => p.draw());
    fly.draw();

    // Particles & Popups
    particles.forEach(p => p.draw());
    scorePopups.forEach(sp => sp.draw());

    // Arrival Notification Banner
    drawArrivalBanner();

    // HUD / UI
    drawUI();

    // Energy drain: 1% per ~1.5s
    fly.energy -= 0.012;
    if (fly.energy <= 0) {
        gameOver();
    }
}

// ----- STRUCTURED PACING & LAYOUT SYSTEM -----
function generateLevelContent() {
    const config = levelConfigs[currentLevel];
    if (!config || !config.isScrolling) return;

    const worldX = width + scrollX;

    // 1. Orderly Ground Obstacles & Scenery (no overlap, generous clearance!)
    if (config.spawnStep && worldX >= layoutState.nextGroundX) {
        let clearance = config.spawnStep(worldX);
        layoutState.nextGroundX = worldX + (clearance || 380);
    }

    // 2. Exits (At most ONE on screen, spaced 1400-1900px apart!)
    if (config.spawnExit && worldX >= layoutState.nextExitX) {
        if (exits.length === 0) {
            config.spawnExit(worldX);
            layoutState.nextExitX = worldX + random(1400, 1900);
        }
    }

    // 3. Enemies (At most 2 active on screen, spaced 750-1100px apart!)
    let activeEnemies = enemies.filter(e => !e.isDefeated);
    if (config.spawnEnemy && worldX >= layoutState.nextEnemyX) {
        if (activeEnemies.length < 2) {
            config.spawnEnemy(worldX);
            layoutState.nextEnemyX = worldX + random(750, 1100);
        } else {
            layoutState.nextEnemyX = worldX + 300;
        }
    }

    // 4. Food (Paced every 700-950px, guides flight path)
    if (config.spawnFood && worldX >= layoutState.nextFoodX) {
        config.spawnFood(worldX);
        layoutState.nextFoodX = worldX + random(700, 950);
    }
}

// ----- COLLISION DETECTION -----
function checkCollisions() {
    // Fly vs Food
    for (let i = foods.length - 1; i >= 0; i--) {
        if (fly.collides(foods[i])) {
            fly.eat(foods[i].energyValue, foods[i].displayName);
            foods.splice(i, 1);
        }
    }

    // Fly vs Enemies
    for (const enemy of enemies) {
        if (!fly.isInvincible && !enemy.isDefeated && fly.collides(enemy)) {
            fly.takeDamage(enemy.damage);
        }
    }

    // Fly vs Enemy Projectiles (Sonic barks, paper balls)
    for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
        let ep = enemyProjectiles[i];
        if (!fly.isInvincible && dist(fly.x, fly.y, ep.getScreenX(), ep.y) < (fly.size / 2 + ep.size / 2)) {
            fly.takeDamage(ep.damage);
            enemyProjectiles.splice(i, 1);
        }
    }

    // Fly vs Barriers
    for (const obj of levelObjects) {
        fly.handleBarrierCollision(obj);
    }

    // Fly vs Exits (Triggers dynamic narrative transitions!)
    for (const exit of exits) {
        if (fly.collides(exit)) {
            startTransition(exit);
            return;
        }
    }

    // Poop vs Enemies
    for (let i = poops.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (poops[i] && enemies[j] && !enemies[j].isDefeated && poops[i].collides(enemies[j])) {
                enemies[j].takeHit();
                poops.splice(i, 1);
                break;
            }
        }
    }
}

// ----- PLAYER INPUT (MOUSE + KEYBOARD) -----
function handlePlayerInput() {
    if (controlScheme === 'MOUSE') {
        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
            fly.moveTo(mouseX, mouseY);
        } else {
            fly.applyGravity();
        }
    } else { // 'KEYBOARD'
        let keyMoved = false;
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) { fly.move(0, -1); keyMoved = true; } // Up or W
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { fly.move(0, 1); keyMoved = true; } // Down or S
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { fly.move(-1, 0); keyMoved = true; } // Left or A
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { fly.move(1, 0); keyMoved = true; } // Right or D

        fly.applyGravity();
    }
}

function keyPressed() {
    if (keyCode === 32) { // SPACE
        if (gameState === 'PLAYING') {
            fly.poop();
        } else if (gameState === 'TRANSITION' && activeTransition) {
            // Fast skip transition
            activeTransition.timer = activeTransition.duration - 2;
        }
    }
}

function mousePressed() {
    if (gameState === 'MENU') {
        handleMenuClick();
    } else if (gameState === 'PLAYING') {
        fly.poop();
    } else if (gameState === 'TRANSITION' && activeTransition) {
        activeTransition.timer = activeTransition.duration - 2;
    } else if (gameState === 'SETTINGS') {
        handleSettingsClick();
    } else if (gameState === 'GAME_OVER') {
        handleGameOverClick();
    }
}

// ----- MODERN HUD DRAWING -----
function drawUI() {
    push();

    // 1. Sleek Energy Meter Bar
    let barX = 20;
    let barY = 20;
    let barW = 220;
    let barH = 22;

    // Outer capsule frame
    fill(15, 23, 42, 220);
    stroke(71, 85, 105);
    strokeWeight(1.5);
    rect(barX, barY, barW, barH, 11);

    // Energy fill color with dynamic warning
    let energyPct = constrain(fly.energy / 100, 0, 1);
    let barColor = fly.energy > 50 ? color(34, 197, 94) :
                   fly.energy > 25 ? color(234, 179, 8) :
                   (frameCounter % 16 < 8 ? color(239, 68, 68) : color(185, 28, 28));

    noStroke();
    fill(barColor);
    if (energyPct > 0) {
        rect(barX + 2, barY + 2, (barW - 4) * energyPct, barH - 4, 9);
    }

    // Glass reflection bar
    fill(255, 255, 255, 70);
    rect(barX + 4, barY + 3, (barW - 8) * energyPct, 5, 2);

    // Energy text label
    fill(255);
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text(\`ENERGY: \${Math.ceil(fly.energy)}%\`, barX + 12, barY + barH / 2);

    // 2. Center Location Badge
    let locName = levelConfigs[currentLevel] ? levelConfigs[currentLevel].name : 'ZONE';
    let locW = 200;
    let locX = width / 2 - locW / 2;
    fill(15, 23, 42, 210);
    stroke(100, 116, 139, 150);
    strokeWeight(1);
    rect(locX, barY - 2, locW, 26, 6);

    noStroke();
    fill(250, 204, 21);
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(\`📍 \${locName.toUpperCase()}\`, width / 2, barY + 11);

    // 3. Scoreboard (Top Right) with Survival Timer
    fill(15, 23, 42, 210);
    stroke(100, 116, 139, 150);
    strokeWeight(1);
    rect(width - 230, barY - 2, 210, 26, 6);

    noStroke();
    fill(255);
    textAlign(RIGHT, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(\`SCORE: \${score}   ⏱ \${survivalSeconds}s\`, width - 30, barY + 11);

    // 4. Subtle Controls Hint (Bottom Left)
    fill(255, 255, 255, 140);
    textSize(11);
    textStyle(NORMAL);
    textAlign(LEFT, BOTTOM);
    let hudTip = controlScheme === 'MOUSE'
        ? "CONTROL: [MOUSE] Move cursor to fly  •  Click or Space: Poop (+10 pts/sec)"
        : "CONTROL: [KEYBOARD] WASD / Arrows to fly  •  Spacebar: Poop (+10 pts/sec)";
    text(hudTip, 20, height - 12);

    pop();
}

// ----- MENU SCREEN -----
function drawMenu() {
    drawBackground();

    // Dark glass card
    push();
    let cardW = min(520, width - 40);
    let cardH = 430;
    let cardX = width / 2 - cardW / 2;
    let cardY = height / 2 - cardH / 2;

    fill(15, 23, 42, 240);
    stroke(250, 204, 21, 180);
    strokeWeight(2);
    rect(cardX, cardY, cardW, cardH, 16);

    // Game Title with Shadow
    textAlign(CENTER, TOP);
    textSize(44);
    textStyle(BOLD);
    fill(250, 204, 21);
    text("POOP FLY", width / 2, cardY + 22);

    textSize(13);
    textStyle(NORMAL);
    fill(203, 213, 225);
    text("Survive, eat treats, splat enemies & explore connected rooms!", width / 2, cardY + 74);

    // Animated Fly Icon
    push();
    translate(width / 2, cardY + 112);
    scale(1.3);
    drawMenuFly();
    pop();

    // ----- CONTROLS CHECKBOX PICKER CONTAINER -----
    let ctrlBoxW = cardW - 50;
    let ctrlBoxH = 68;
    let ctrlBoxX = width / 2 - ctrlBoxW / 2;
    let ctrlBoxY = cardY + 144;

    fill(30, 41, 59, 190);
    stroke(71, 85, 105, 160);
    strokeWeight(1);
    rect(ctrlBoxX, ctrlBoxY, ctrlBoxW, ctrlBoxH, 10);

    noStroke();
    fill(203, 213, 225);
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text("CHOOSE CONTROLS (CLICK CHECKBOX TO SELECT):", width / 2, ctrlBoxY + 7);

    // Option 1: Mouse Checkbox
    let optW = (ctrlBoxW - 24) / 2;
    let opt1X = ctrlBoxX + 8;
    let opt1Y = ctrlBoxY + 26;
    let isMouse = (controlScheme === 'MOUSE');
    let isHoverOpt1 = (mouseX >= opt1X && mouseX <= opt1X + optW && mouseY >= opt1Y && mouseY <= opt1Y + 34);

    fill(isMouse ? color(34, 197, 94, 35) : (isHoverOpt1 ? color(51, 65, 85, 190) : color(15, 23, 42, 120)));
    stroke(isMouse ? color(34, 197, 94, 210) : (isHoverOpt1 ? color(148, 163, 184) : color(51, 65, 85, 160)));
    strokeWeight(isMouse ? 1.5 : 1);
    rect(opt1X, opt1Y, optW, 34, 6);

    let cb1X = opt1X + 10;
    let cb1Y = opt1Y + 7;
    let cbSz = 20;
    fill(isMouse ? '#22c55e' : '#0f172a');
    stroke(isMouse ? '#4ade80' : '#64748b');
    strokeWeight(1.5);
    rect(cb1X, cb1Y, cbSz, cbSz, 4);

    if (isMouse) {
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(14);
        textStyle(BOLD);
        text("✓", cb1X + cbSz / 2, cb1Y + cbSz / 2);
    }

    noStroke();
    fill(isMouse ? 255 : (isHoverOpt1 ? 230 : 190));
    textAlign(LEFT, CENTER);
    textSize(13);
    textStyle(isMouse ? BOLD : NORMAL);
    text("Mouse Control", cb1X + cbSz + 8, opt1Y + 17);

    // Option 2: Keyboard Checkbox
    let opt2X = ctrlBoxX + 16 + optW;
    let opt2Y = ctrlBoxY + 26;
    let isKeyboard = (controlScheme === 'KEYBOARD');
    let isHoverOpt2 = (mouseX >= opt2X && mouseX <= opt2X + optW && mouseY >= opt2Y && mouseY <= opt2Y + 34);

    fill(isKeyboard ? color(34, 197, 94, 35) : (isHoverOpt2 ? color(51, 65, 85, 190) : color(15, 23, 42, 120)));
    stroke(isKeyboard ? color(34, 197, 94, 210) : (isHoverOpt2 ? color(148, 163, 184) : color(51, 65, 85, 160)));
    strokeWeight(isKeyboard ? 1.5 : 1);
    rect(opt2X, opt2Y, optW, 34, 6);

    let cb2X = opt2X + 10;
    let cb2Y = opt2Y + 7;
    fill(isKeyboard ? '#22c55e' : '#0f172a');
    stroke(isKeyboard ? '#4ade80' : '#64748b');
    strokeWeight(1.5);
    rect(cb2X, cb2Y, cbSz, cbSz, 4);

    if (isKeyboard) {
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(14);
        textStyle(BOLD);
        text("✓", cb2X + cbSz / 2, cb2Y + cbSz / 2);
    }

    noStroke();
    fill(isKeyboard ? 255 : (isHoverOpt2 ? 230 : 190));
    textAlign(LEFT, CENTER);
    textSize(13);
    textStyle(isKeyboard ? BOLD : NORMAL);
    text("Keyboard (WASD)", cb2X + cbSz + 8, opt2Y + 17);

    // Start Button
    let btnW = 240;
    let btnH = 44;
    let startBtn = { x: width / 2 - btnW / 2, y: cardY + 228, w: btnW, h: btnH };
    let isHoverStart = (mouseX > startBtn.x && mouseX < startBtn.x + startBtn.w && mouseY > startBtn.y && mouseY < startBtn.y + startBtn.h);

    fill(isHoverStart ? '#22c55e' : '#16a34a');
    noStroke();
    rect(startBtn.x, startBtn.y, startBtn.w, startBtn.h, 10);
    fill(255);
    textSize(17);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("START FLYING", width / 2, startBtn.y + btnH / 2);

    // Settings Button
    let settingsBtn = { x: width / 2 - btnW / 2, y: cardY + 284, w: btnW, h: btnH };
    let isHoverSettings = (mouseX > settingsBtn.x && mouseX < settingsBtn.x + settingsBtn.w && mouseY > settingsBtn.y && mouseY < settingsBtn.y + settingsBtn.h);

    fill(isHoverSettings ? '#3b82f6' : '#2563eb');
    rect(settingsBtn.x, settingsBtn.y, settingsBtn.w, settingsBtn.h, 10);
    fill(255);
    text("LEVEL & ENEMY SETTINGS", width / 2, settingsBtn.y + btnH / 2);

    // Controls tip and survival hint
    fill(250, 204, 21);
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    if (controlScheme === 'MOUSE') {
        text("🎮 Move mouse cursor to steer  •  Click or Spacebar to Poop", width / 2, cardY + 344);
    } else {
        text("🎮 WASD or Arrow Keys to steer  •  Spacebar to Poop", width / 2, cardY + 344);
    }

    fill(148, 163, 184);
    textSize(12);
    textStyle(NORMAL);
    text("⏱ Survive for +10 score per second!", width / 2, cardY + 368);

    pop();
}

function handleMenuClick() {
    let cardW = min(520, width - 40);
    let cardH = 430;
    let cardX = width / 2 - cardW / 2;
    let cardY = height / 2 - cardH / 2;

    let ctrlBoxW = cardW - 50;
    let ctrlBoxX = width / 2 - ctrlBoxW / 2;
    let ctrlBoxY = cardY + 144;
    let optW = (ctrlBoxW - 24) / 2;

    let opt1X = ctrlBoxX + 8;
    let opt1Y = ctrlBoxY + 26;
    let opt2X = ctrlBoxX + 16 + optW;
    let opt2Y = ctrlBoxY + 26;

    // Checkbox 1: Mouse Control
    if (mouseX >= opt1X && mouseX <= opt1X + optW && mouseY >= opt1Y && mouseY <= opt1Y + 34) {
        controlScheme = 'MOUSE';
        return;
    }

    // Checkbox 2: Keyboard Control
    if (mouseX >= opt2X && mouseX <= opt2X + optW && mouseY >= opt2Y && mouseY <= opt2Y + 34) {
        controlScheme = 'KEYBOARD';
        return;
    }

    // Start Button
    let btnW = 240;
    let btnH = 44;
    let startBtn = { x: width / 2 - btnW / 2, y: cardY + 228, w: btnW, h: btnH };
    if (mouseX >= startBtn.x && mouseX <= startBtn.x + startBtn.w && mouseY >= startBtn.y && mouseY <= startBtn.y + startBtn.h) {
        startGame();
        return;
    }

    // Settings Button
    let settingsBtn = { x: width / 2 - btnW / 2, y: cardY + 284, w: btnW, h: btnH };
    if (mouseX >= settingsBtn.x && mouseX <= settingsBtn.x + settingsBtn.w && mouseY >= settingsBtn.y && mouseY <= settingsBtn.y + settingsBtn.h) {
        gameState = 'SETTINGS';
        return;
    }
}

function handleGameOverClick() {
    let cardH = 340;
    let cardY = height / 2 - cardH / 2;
    let btnW = 220;
    let btnH = 46;
    let restartBtn = { x: width / 2 - btnW / 2, y: cardY + 195, w: btnW, h: btnH };
    if (mouseX >= restartBtn.x && mouseX <= restartBtn.x + restartBtn.w && mouseY >= restartBtn.y && mouseY <= restartBtn.y + restartBtn.h) {
        startGame();
    }
}

function drawMenuFly() {
    noStroke();
    let sz = 24;
    // Body
    fill(0);
    ellipse(0, 0, sz, sz * 0.8);
    // Eyes
    fill(255, 0, 0);
    ellipse(-sz * 0.2, -sz * 0.2, sz * 0.3);
    ellipse(sz * 0.2, -sz * 0.2, sz * 0.3);
    // Wings
    fill(200, 200, 255, 150);
    ellipse(-sz * 0.6, 0, sz, sz * 0.5);
    ellipse(sz * 0.6, 0, sz, sz * 0.5);
}

// ----- SETTINGS SCREEN -----
function drawSettings() {
    drawBackground();

    push();
    let cardW = min(560, width - 40);
    let cardH = 460;
    let cardX = width / 2 - cardW / 2;
    let cardY = height / 2 - cardH / 2;

    fill(15, 23, 42, 240);
    stroke(59, 130, 246, 180);
    strokeWeight(2);
    rect(cardX, cardY, cardW, cardH, 16);

    // Title
    textAlign(CENTER, TOP);
    textSize(28);
    textStyle(BOLD);
    fill(255);
    text("LOCATION & ENEMY CONFIG", width / 2, cardY + 22);

    // Level selector
    let currentLevelName = levelConfigs[selectedLevelSettings] ? levelConfigs[selectedLevelSettings].name : 'Level';
    fill(250, 204, 21);
    textSize(18);
    text(\`Level \${selectedLevelSettings}: \${currentLevelName}\`, width / 2, cardY + 70);

    // Level arrows < >
    fill(59, 130, 246);
    rect(width / 2 - 180, cardY + 65, 34, 30, 6);
    rect(width / 2 + 146, cardY + 65, 34, 30, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    text("<", width / 2 - 163, cardY + 80);
    text(">", width / 2 + 163, cardY + 80);

    // Toggles list
    const enemyTypes = ['rat', 'dog', 'bird', 'human', 'child'];
    const currentLvlSettings = settings.levels[selectedLevelSettings].enemies;

    let rowY = cardY + 125;
    textAlign(LEFT, CENTER);

    enemyTypes.forEach(type => {
        let isEnabled = currentLvlSettings[type];

        // Checkbox box
        fill(isEnabled ? '#22c55e' : '#ef4444');
        rect(width / 2 - 150, rowY, 26, 26, 5);

        // Check icon or X
        fill(255);
        textAlign(CENTER, CENTER);
        text(isEnabled ? "✓" : "✕", width / 2 - 137, rowY + 13);

        // Enemy Label
        textAlign(LEFT, CENTER);
        fill(241, 245, 249);
        textSize(15);
        textStyle(BOLD);
        text(type.toUpperCase() + (isEnabled ? "  (Active)" : "  (Disabled)"), width / 2 - 105, rowY + 13);

        rowY += 46;
    });

    // Back to Menu button
    let backBtn = { x: width / 2 - 90, y: cardY + cardH - 58, w: 180, h: 40 };
    let isHoverBack = (mouseX > backBtn.x && mouseX < backBtn.x + backBtn.w && mouseY > backBtn.y && mouseY < backBtn.y + backBtn.h);

    fill(isHoverBack ? '#475569' : '#334155');
    noStroke();
    rect(backBtn.x, backBtn.y, backBtn.w, backBtn.h, 8);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(15);
    textStyle(BOLD);
    text("DONE & BACK", width / 2, backBtn.y + 20);

    pop();
}

function handleSettingsClick() {
    let cardH = 460;
    let cardY = height / 2 - cardH / 2;

    // Back button click
    let backBtn = { x: width / 2 - 90, y: cardY + cardH - 58, w: 180, h: 40 };
    if (mouseX > backBtn.x && mouseX < backBtn.x + backBtn.w && mouseY > backBtn.y && mouseY < backBtn.y + backBtn.h) {
        gameState = 'MENU';
        return;
    }

    // Prev / Next Level Selector
    if (mouseY > cardY + 65 && mouseY < cardY + 95) {
        if (mouseX > width / 2 - 180 && mouseX < width / 2 - 146) {
            selectedLevelSettings = max(1, selectedLevelSettings - 1);
        }
        if (mouseX > width / 2 + 146 && mouseX < width / 2 + 180) {
            selectedLevelSettings = min(7, selectedLevelSettings + 1);
        }
    }

    // Enemy Toggles
    const enemyTypes = ['rat', 'dog', 'bird', 'human', 'child'];
    let rowY = cardY + 125;
    enemyTypes.forEach(type => {
        if (mouseX > width / 2 - 150 && mouseX < width / 2 - 100 && mouseY > rowY && mouseY < rowY + 30) {
            settings.levels[selectedLevelSettings].enemies[type] = !settings.levels[selectedLevelSettings].enemies[type];
        }
        rowY += 46;
    });
}

// ----- GAME OVER SCREEN -----
function drawGameOver() {
    // Dim background
    fill(0, 0, 0, 190);
    noStroke();
    rect(0, 0, width, height);

    push();
    let cardW = min(480, width - 40);
    let cardH = 340;
    let cardX = width / 2 - cardW / 2;
    let cardY = height / 2 - cardH / 2;

    fill(15, 23, 42, 240);
    stroke(239, 68, 68, 180);
    strokeWeight(2);
    rect(cardX, cardY, cardW, cardH, 16);

    // Title
    textAlign(CENTER, TOP);
    textSize(38);
    textStyle(BOLD);
    fill(239, 68, 68);
    text("SWATTED!", width / 2, cardY + 30);

    // Stats
    fill(241, 245, 249);
    textSize(24);
    textStyle(BOLD);
    text(\`Final Score: \${score}\`, width / 2, cardY + 95);

    fill(148, 163, 184);
    textSize(14);
    textStyle(NORMAL);
    let roomsVisited = new Set(levelHistory).size;
    text(\`Survived: \${survivalSeconds}s (+\${survivalSeconds * 10} pts)  •  Rooms: \${roomsVisited} of 7\`, width / 2, cardY + 135);

    // Restart Button
    let btnW = 220;
    let btnH = 46;
    let restartBtn = { x: width / 2 - btnW / 2, y: cardY + 195, w: btnW, h: btnH };
    let isHoverRestart = (mouseX > restartBtn.x && mouseX < restartBtn.x + restartBtn.w && mouseY > restartBtn.y && mouseY < restartBtn.y + restartBtn.h);

    fill(isHoverRestart ? '#22c55e' : '#16a34a');
    noStroke();
    rect(restartBtn.x, restartBtn.y, restartBtn.w, restartBtn.h, 10);

    fill(255);
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("FLY AGAIN", width / 2, restartBtn.y + btnH / 2);

    if (mouseIsPressed && isHoverRestart) {
        startGame();
    }

    pop();
}
`;
