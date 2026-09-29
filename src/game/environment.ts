// Rich environmental visuals, parallax backgrounds, animated objects, food, and exits
export const ENVIRONMENT_CODE = `
// ----- AMBIENT BACKGROUND PARTICLES -----
let ambientParticles = [];

function initAmbientParticles() {
    ambientParticles = [];
    for (let i = 0; i < 18; i++) {
        ambientParticles.push({
            x: random(width),
            y: random(height),
            vx: random(-0.3, 0.3),
            vy: random(-0.25, 0.25),
            size: random(2, 4),
            alpha: random(40, 100),
            phase: random(TWO_PI)
        });
    }
}

// ----- BACKGROUND RENDERING BY LOCATION -----
function drawBackground() {
    const config = levelConfigs[currentLevel];
    if (!config) return;

    if (currentLevel === 1) {
        drawOutdoorsBackground();
    } else if (currentLevel === 2) {
        drawBedroomBackground();
    } else if (currentLevel === 3) {
        drawSewerBackground();
    } else if (currentLevel === 4) {
        drawAtticBackground();
    } else if (currentLevel === 5) {
        drawBathroomBackground();
    } else if (currentLevel === 6) {
        drawHallBackground();
    } else if (currentLevel === 7) {
        drawKitchenBackground();
    }

    // Draw ambient floating particles (pollen, dust, steam)
    drawAmbientParticles();
}

function drawOutdoorsBackground() {
    // Summer Sky Gradient
    let skyTop = color(56, 140, 240);
    let skyMid = color(140, 200, 255);
    let skyBottom = color(225, 240, 255);

    noStroke();
    for (let y = 0; y < height - 60; y += 12) {
        let t = y / (height - 60);
        let col = t < 0.6 ? lerpColor(skyTop, skyMid, t / 0.6) : lerpColor(skyMid, skyBottom, (t - 0.6) / 0.4);
        fill(col);
        rect(0, y, width, 12);
    }

    // Glowing Sun
    push();
    fill(255, 245, 180, 70);
    ellipse(width * 0.82, 100, 140, 140);
    fill(255, 255, 220, 180);
    ellipse(width * 0.82, 100, 80, 80);
    fill(255, 255, 255);
    ellipse(width * 0.82, 100, 50, 50);
    pop();

    // Distant Parallax Hills (0.2x speed)
    fill(130, 185, 140);
    let hillScroll = (scrollX * 0.15) % 800;
    for (let x = -800; x < width + 800; x += 350) {
        ellipse(x - hillScroll, height - 70, 480, 120);
    }

    // Concrete Sidewalk (height - 60 to height - 20)
    fill(195, 198, 204);
    rect(0, height - 60, width, 40);

    // Sidewalk slabs expansion joints
    stroke(150, 155, 160);
    strokeWeight(2);
    let slabOffset = (scrollX) % 180;
    for (let sx = -180; sx < width + 180; sx += 180) {
        line(sx - slabOffset, height - 60, sx - slabOffset, height - 20);
        // Little grass tuft in sidewalk crack
        if (Math.floor((sx + scrollX) / 180) % 2 === 0) {
            stroke(74, 160, 60);
            strokeWeight(1.5);
            line(sx - slabOffset, height - 20, sx - slabOffset - 4, height - 28);
            line(sx - slabOffset, height - 20, sx - slabOffset + 4, height - 27);
        }
    }

    // Concrete Curb drop shadow
    noStroke();
    fill(130, 135, 140);
    rect(0, height - 22, width, 4);

    // Asphalt Road with white/yellow road line markings
    fill(55, 60, 68);
    rect(0, height - 18, width, 18);
    fill(250, 204, 21);
    let dashOffset = (scrollX * 1.0) % 60;
    for (let dx = -60; dx < width + 60; dx += 60) {
        rect(dx - dashOffset, height - 9, 30, 4);
    }
}

function drawBedroomBackground() {
    // Cozy vertical striped wallpaper
    noStroke();
    let stripeW = 28;
    for (let x = 0; x < width; x += stripeW) {
        let isStripe = (Math.floor(x / stripeW) % 2 === 0);
        fill(isStripe ? '#dbeafe' : '#eff6ff');
        rect(x, 0, stripeW, height - 35);
    }

    // Decorative white crown molding
    fill(255);
    rect(0, 0, width, 16);
    fill(225, 230, 240);
    rect(0, 16, width, 5);

    // Plush plush navy carpet floor
    fill(30, 58, 110);
    rect(0, height - 35, width, 35);
    // Baseboard trim
    fill(250, 250, 250);
    rect(0, height - 44, width, 9);
    fill(210, 215, 225);
    rect(0, height - 37, width, 2);

    // Sunbeam streaming from ceiling/window
    fill(255, 245, 180, 25);
    quad(80, 0, 280, 0, 480, height - 35, 20, height - 35);
}

function drawSewerBackground() {
    // Curved subterranean brick tunnel
    background(28, 36, 40);

    // Brick texture pattern
    stroke(20, 24, 28);
    strokeWeight(1.5);
    let brickW = 48;
    let brickH = 22;
    for (let y = 0; y < height - 60; y += brickH) {
        let row = Math.floor(y / brickH);
        let shift = (row % 2 === 0) ? 0 : brickW / 2;
        line(0, y, width, y);
        for (let x = -brickW; x < width + brickW; x += brickW) {
            let bx = x + shift - (scrollX * 0.3 % brickW);
            line(bx, y, bx, y + brickH);
        }
    }

    // Slime and moss stains running down
    noStroke();
    fill(45, 95, 45, 140);
    let slimeScroll = (scrollX * 0.3) % 240;
    for (let sx = -240; sx < width + 240; sx += 180) {
        beginShape();
        vertex(sx - slimeScroll, 0);
        vertex(sx - slimeScroll + 35, 0);
        vertex(sx - slimeScroll + 20, 120 + sin(sx) * 40);
        vertex(sx - slimeScroll + 5, 80 + cos(sx) * 30);
        endShape(CLOSE);
    }

    // Toxic bubbling slime runoff water at the bottom!
    let slimeBaseY = height - 50;
    fill(35, 115, 55);
    rect(0, slimeBaseY, width, 50);

    // Animated sinusoidal sludge wave
    fill(65, 175, 75, 220);
    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 25) {
        let wave = sin(frameCounter * 0.08 + x * 0.03) * 6;
        vertex(x, slimeBaseY + wave);
    }
    vertex(width, height);
    endShape(CLOSE);

    // Slime foam bubbles popping
    fill(130, 230, 120, 190);
    for (let bx = 30; bx < width; bx += 90) {
        let bubY = slimeBaseY + sin(frameCounter * 0.08 + bx * 0.03) * 6;
        let bubSize = 6 + sin(frameCounter * 0.15 + bx) * 3;
        ellipse(bx, bubY + 3, bubSize, bubSize * 0.7);
    }
}

function drawAtticBackground() {
    // Rustic timber planks
    background(55, 42, 32);

    // Diagonal roof rafter angle
    stroke(40, 30, 22);
    strokeWeight(10);
    line(0, 0, width, height * 0.35);

    // Golden dust shafts of light streaming between roof planks
    noStroke();
    fill(255, 225, 130, 35);
    quad(width * 0.2, 0, width * 0.35, 0, width * 0.55, height - 30, width * 0.15, height - 30);
    quad(width * 0.65, 0, width * 0.75, 0, width * 0.9, height - 30, width * 0.6, height - 30);

    // Rough wooden floorboards with iron nails
    fill(75, 55, 40);
    rect(0, height - 35, width, 35);
    stroke(45, 32, 22);
    strokeWeight(2);
    let plankOffset = (scrollX) % 150;
    for (let px = -150; px < width + 150; px += 150) {
        line(px - plankOffset, height - 35, px - plankOffset, height);
        // Iron nails
        fill(30, 20, 15);
        noStroke();
        ellipse(px - plankOffset + 8, height - 25, 3, 3);
        ellipse(px - plankOffset + 8, height - 12, 3, 3);
    }
}

function drawBathroomBackground() {
    // White porcelain subway tiles
    background(245, 248, 252);

    // Charcoal grout lines
    stroke(215, 225, 235);
    strokeWeight(1.5);
    let tileW = 55;
    let tileH = 25;
    for (let y = 0; y < height - 60; y += tileH) {
        let row = Math.floor(y / tileH);
        let shift = (row % 2 === 0) ? 0 : tileW / 2;
        line(0, y, width, y);
        for (let x = -tileW; x < width + tileW; x += tileW) {
            line(x + shift, y, x + shift, y + tileH);
        }
    }

    // Turquoise glass mosaic accent border
    noStroke();
    fill(45, 175, 195);
    rect(0, height * 0.38, width, 14);
    fill(35, 145, 165);
    for (let x = 0; x < width; x += 14) {
        rect(x, height * 0.38 + 2, 6, 10);
    }

    // Glossy Hexagonal floor tiles
    fill(235, 240, 248);
    rect(0, height - 55, width, 55);
    stroke(205, 215, 225);
    strokeWeight(1);
    for (let x = 0; x < width; x += 30) {
        line(x, height - 55, x + 15, height);
        line(x + 15, height - 55, x, height);
    }
}

function drawHallBackground() {
    // Victorian warm gold/amber patterned damask wallpaper
    background(245, 225, 175);

    // Subtle wallpaper diamond pattern
    noFill();
    stroke(228, 200, 145, 120);
    strokeWeight(1.5);
    let patSize = 40;
    let scrollPat = (scrollX * 0.5) % patSize;
    for (let y = 0; y < height - 120; y += patSize) {
        for (let x = -patSize; x < width + patSize; x += patSize) {
            let cx = x - scrollPat;
            let cy = y;
            quad(cx, cy - patSize / 2, cx + patSize / 2, cy, cx, cy + patSize / 2, cx - patSize / 2, cy);
        }
    }

    // Rich mahogany wainscoting on lower wall
    noStroke();
    fill(95, 45, 22);
    rect(0, height - 120, width, 75);

    // Wainscoting wood panel frames
    stroke(70, 30, 15);
    strokeWeight(2);
    let panelW = 90;
    let panelScroll = (scrollX * 0.5) % panelW;
    for (let px = -panelW; px < width + panelW; px += panelW) {
        rect(px - panelScroll + 10, height - 112, panelW - 20, 60, 3);
    }

    // Dark polished hardwood floor
    noStroke();
    fill(55, 28, 12);
    rect(0, height - 45, width, 45);

    // Red and Gold Persian carpet runner
    fill(165, 30, 35);
    rect(0, height - 38, width, 30);
    // Gold ornamental carpet borders
    fill(245, 200, 70);
    rect(0, height - 38, width, 3);
    rect(0, height - 11, width, 3);
}

function drawKitchenBackground() {
    // Mint / turquoise subway tile backsplash
    background(225, 242, 240);

    // Backsplash tiles
    stroke(190, 220, 218);
    strokeWeight(1.5);
    let tileW = 50;
    let tileH = 24;
    for (let y = 0; y < height - 55; y += tileH) {
        let row = Math.floor(y / tileH);
        let shift = (row % 2 === 0) ? 0 : tileW / 2;
        line(0, y, width, y);
        for (let x = -tileW; x < width + tileW; x += tileW) {
            line(x + shift - (scrollX * 0.4 % tileW), y, x + shift - (scrollX * 0.4 % tileW), y + tileH);
        }
    }

    // Classic black & white diagonal checkered floor
    noStroke();
    let checkSize = 35;
    let floorY = height - 55;
    rect(0, floorY, width, 55);

    for (let y = floorY; y < height; y += checkSize / 2) {
        for (let x = -checkSize; x < width + checkSize; x += checkSize) {
            let row = Math.floor((y - floorY) / (checkSize / 2));
            let col = Math.floor(x / checkSize);
            let isBlack = (row + col) % 2 === 0;
            fill(isBlack ? 35 : 245);
            rect(x - (scrollX % checkSize), y, checkSize, checkSize / 2);
        }
    }
}

function drawAmbientParticles() {
    for (let p of ambientParticles) {
        p.x += p.vx + sin(frameCounter * 0.05 + p.phase) * 0.3;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        noStroke();
        if (currentLevel === 1) {
            // Dandelion fluff / pollen
            fill(255, 255, 255, p.alpha * 0.8);
            ellipse(p.x, p.y, p.size, p.size);
        } else if (currentLevel === 3) {
            // Sewer steam / droplets
            fill(120, 220, 160, p.alpha * 0.6);
            ellipse(p.x, p.y, p.size * 1.5, p.size * 1.5);
        } else if (currentLevel === 4) {
            // Sparkling golden attic dust
            fill(255, 230, 150, p.alpha);
            ellipse(p.x, p.y, p.size * 0.8, p.size * 0.8);
        } else {
            // Indoor dust mote
            fill(255, 255, 255, p.alpha * 0.5);
            ellipse(p.x, p.y, p.size * 0.8, p.size * 0.8);
        }
    }
}

// ----- FOOD CLASS WITH HIGH-RES GRAPHICS -----
class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = random(['apple', 'sandwich', 'burger', 'donut', 'banana']);
        this.bobOffset = random(TWO_PI);

        switch (this.type) {
            case 'apple':
                this.size = 24; this.energyValue = 18; this.displayName = 'Crisp Apple'; break;
            case 'sandwich':
                this.size = 32; this.energyValue = 35; this.displayName = 'Deli Club'; break;
            case 'burger':
                this.size = 36; this.energyValue = 50; this.displayName = 'Juicy Burger'; break;
            case 'donut':
                this.size = 28; this.energyValue = 30; this.displayName = 'Pink Donut'; break;
            case 'banana':
                this.size = 28; this.energyValue = 22; this.displayName = 'Sweet Banana'; break;
        }
    }

    update() {}

    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;
        let hoverY = this.y + sin(frameCounter * 0.1 + this.bobOffset) * 4;

        push();
        translate(drawX, hoverY);

        // Aroma scent trail floating up
        noStroke();
        fill(255, 230, 150, 90 + sin(frameCounter * 0.15) * 40);
        let aromaSway = sin(frameCounter * 0.12 + this.bobOffset) * 6;
        ellipse(aromaSway, -this.size / 2 - 8, 5, 5);
        ellipse(-aromaSway * 0.8, -this.size / 2 - 16, 7, 7);

        // Drop shadow under food
        fill(0, 0, 0, 50);
        ellipse(0, this.size / 2 + 3, this.size * 0.9, 6);

        if (this.type === 'apple') {
            // Shiny Red Apple
            noStroke();
            fill(225, 29, 72); // Deep red
            ellipse(0, 0, 22, 22);
            // Highlight shine
            fill(255, 120, 140, 190);
            ellipse(-4, -5, 8, 8);
            fill(255, 255, 255, 220);
            ellipse(-5, -6, 3, 3);
            // Stem
            stroke(100, 50, 20);
            strokeWeight(2.5);
            line(0, -10, 2, -15);
            // Green leaf
            noStroke();
            fill(34, 197, 94);
            ellipse(5, -14, 7, 4);

        } else if (this.type === 'sandwich') {
            // Layered Club Sandwich
            noStroke();
            // Bread bottom
            fill(217, 170, 115);
            rect(-15, 4, 30, 6, 2);
            // Pink Ham
            fill(244, 114, 182);
            rect(-14, 1, 28, 3);
            // Yellow Cheese point
            fill(250, 204, 21);
            triangle(-10, 1, 6, 1, -2, 7);
            // Curly Lettuce
            fill(34, 197, 94);
            rect(-16, -3, 32, 4, 2);
            // Red Tomato slice
            fill(239, 68, 68);
            rect(-13, -6, 26, 3);
            // Bread top with crust
            fill(235, 190, 130);
            rect(-15, -12, 30, 6, 2);
            // Toothpick with olive
            stroke(200, 160, 100);
            strokeWeight(1.5);
            line(0, -12, 0, -18);
            noStroke();
            fill(101, 163, 13);
            ellipse(0, -18, 5, 5);

        } else if (this.type === 'burger') {
            // Deluxe Cheeseburger
            noStroke();
            // Bottom toasted bun
            fill(215, 155, 95);
            rect(-16, 6, 32, 6, 3);
            // Grilled Patty
            fill(90, 45, 20);
            rect(-17, 1, 34, 5, 2);
            // Dripping Melted Cheddar
            fill(245, 190, 20);
            rect(-16, -1, 32, 3);
            triangle(-10, 2, -4, 2, -7, 6);
            // Lettuce ripple
            fill(34, 197, 94);
            rect(-18, -4, 36, 3, 2);
            // Tomato slice
            fill(220, 38, 38);
            rect(-15, -7, 30, 3);
            // Golden Sesame Seed Brioche Bun
            fill(230, 165, 100);
            arc(0, -7, 34, 20, PI, TWO_PI, CHORD);
            // White sesame seeds
            fill(255, 250, 230);
            ellipse(-8, -12, 2.5, 1.5);
            ellipse(0, -14, 2.5, 1.5);
            ellipse(8, -12, 2.5, 1.5);

        } else if (this.type === 'donut') {
            // Frosted Donut
            noStroke();
            fill(217, 170, 115);
            ellipse(0, 0, 26, 26);
            // Strawberry frosting
            fill(244, 114, 182);
            ellipse(0, 0, 23, 23);
            // Donut center hole
            fill(currentLevel === 3 ? '#1c2428' : currentLevel === 4 ? '#372a20' : '#dbeafe');
            ellipse(0, 0, 8, 8);
            // Colorful sprinkles
            fill(59, 130, 246);
            rect(-6, -6, 4, 1.5);
            fill(250, 204, 21);
            rect(4, -5, 1.5, 4);
            fill(34, 197, 94);
            rect(2, 5, 4, 1.5);

        } else {
            // Sweet Banana
            stroke(245, 200, 30);
            strokeWeight(7);
            noFill();
            arc(0, 0, 22, 22, 0.4, 2.8);
            // Brown tips
            stroke(90, 50, 15);
            strokeWeight(3);
            point(10, 3);
            point(-10, 3);
            noStroke();
        }

        pop();
    }

    isOnScreen() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        return this.x - screenX > -60 && this.x - screenX < width + 60;
    }
}

// ----- HIGH-RES EXIT PORTAL CLASS -----
class Exit {
    constructor(x, y, w, h, toLevel, label) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.size = (w + h) / 2;
        this.toLevel = toLevel;
        this.label = label || '';
        this.pulsePhase = random(TWO_PI);
    }

    update() {}

    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);

        let pulse = sin(frameCounter * 0.1 + this.pulsePhase);
        let glowAlpha = map(pulse, -1, 1, 90, 210);

        // Check exit label to render bespoke thematic visual
        let lbl = this.label.toLowerCase();

        if (lbl.includes('window')) {
            // Detailed Window Frame with Glass
            stroke(245, 245, 250);
            strokeWeight(5);
            fill(210, 235, 255, 160);
            rect(0, 0, this.w, this.h, 4);
            // Window mullions
            stroke(240, 240, 245);
            strokeWeight(2.5);
            line(this.w / 2, 0, this.w / 2, this.h);
            line(0, this.h / 2, this.w, this.h / 2);
            // Open window sash gap
            fill(30, 40, 60, 200);
            noStroke();
            rect(4, this.h / 2, this.w - 8, this.h / 2 - 4);
            // Billowing curtain
            fill(255, 255, 255, 200);
            let wave = sin(frameCounter * 0.15) * 8;
            quad(this.w - 12, 0, this.w, 0, this.w + wave, this.h, this.w - 16 + wave, this.h);

        } else if (lbl.includes('manhole') || lbl.includes('drain')) {
            // Cast Iron Grate / Manhole
            fill(40, 42, 48);
            stroke(85, 90, 100);
            strokeWeight(4);
            rect(0, 0, this.w, this.h, 8);
            // Grate slots
            stroke(15, 18, 22);
            strokeWeight(3);
            for (let gx = 10; gx < this.w; gx += 12) {
                line(gx, 4, gx, this.h - 4);
            }
            // Suction whirlpool vortex particles
            noStroke();
            fill(45, 180, 150, 120);
            ellipse(this.w / 2 + sin(frameCounter * 0.2) * 10, this.h / 2, 16, 8);

        } else if (lbl.includes('attic') || lbl.includes('vent')) {
            // Ceiling Hatch or Louvered HVAC Vent
            fill(50, 40, 32);
            stroke(180, 150, 110);
            strokeWeight(3);
            rect(0, 0, this.w, this.h, 4);
            // Louver slats
            stroke(120, 100, 80);
            strokeWeight(2);
            for (let ly = 6; ly < this.h; ly += 8) {
                line(4, ly, this.w - 4, ly);
            }
            // Dangling pull cord
            stroke(240, 220, 180);
            strokeWeight(2);
            let cordSway = sin(frameCounter * 0.1) * 6;
            line(this.w / 2, this.h, this.w / 2 + cordSway, this.h + 20);
            fill(200, 160, 90);
            noStroke();
            ellipse(this.w / 2 + cordSway, this.h + 22, 6, 8);

        } else if (lbl.includes('door')) {
            // Paneled Wooden Door
            fill(120, 75, 45);
            stroke(75, 45, 25);
            strokeWeight(3);
            rect(0, 0, this.w, this.h, 2);
            // Door panels
            fill(100, 60, 35);
            rect(6, 8, this.w - 12, this.h * 0.4, 2);
            rect(6, this.h * 0.48, this.w - 12, this.h * 0.44, 2);
            // Brass handle
            fill(250, 204, 21);
            noStroke();
            ellipse(this.w - 8, this.h / 2, 7, 7);

        } else if (lbl.includes('stairs')) {
            // Wooden Staircase Steps
            fill(140, 85, 45);
            stroke(85, 50, 25);
            strokeWeight(2);
            rect(0, 0, this.w, this.h);
            for (let sx = 0; sx < this.w; sx += 20) {
                line(sx, 0, sx + 10, this.h);
            }

        } else {
            // General Pipe or Passage
            fill(60, 70, 85);
            stroke(100, 120, 140);
            strokeWeight(3);
            rect(0, 0, this.w, this.h, 6);
        }

        // Glowing Pulsing Beacon Frame & Target Arrow
        stroke(255, 215, 0, glowAlpha);
        strokeWeight(2);
        noFill();
        rect(-2, -2, this.w + 4, this.h + 4, 6);

        // Animated Beacon Label Badge
        const destName = levelConfigs[this.toLevel] ? levelConfigs[this.toLevel].name : 'NEXT';
        fill(15, 23, 42, 220);
        stroke(255, 215, 0, glowAlpha);
        strokeWeight(1);
        rect(this.w / 2 - 50, -22, 100, 18, 4);

        noStroke();
        fill(255, 235, 120, 240);
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(BOLD);
        text(\`➔ \${destName.toUpperCase()}\`, this.w / 2, -13);

        pop();
    }
}

// ----- LEVEL-SPECIFIC OBJECT CLASSES -----
class LevelObject {
    constructor(x, y, w, h, color) {
        this.x = x; this.y = y; this.w = w; this.h = h; this.color = color;
    }
    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        fill(this.color);
        rect(this.x - screenX, this.y, this.w, this.h);
    }
}

class BackgroundObject {
    constructor(x, y, w, h, color) {
        this.x = x; this.y = y; this.w = w; this.h = h; this.color = color;
    }
    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - (levelConfigs[currentLevel].isScrolling ? screenX : 0);
        noStroke();
        fill(this.color);
        rect(drawX, this.y, this.w, this.h);
    }
}

// Outdoor House
class House extends BackgroundObject {
    constructor(x, y) {
        const houseHeight = random(280, 420);
        const houseWidth = random(240, 360);
        super(x, y - houseHeight, houseWidth, houseHeight, '#e2e8f0');
        this.roofColor = '#991b1b'; // Red brick shingles
        this.doorColor = '#78350f';
    }
    draw() {
        let screenX = this.x - scrollX;
        // Siding
        fill(this.color);
        rect(screenX, this.y, this.w, this.h);
        stroke(203, 213, 225);
        strokeWeight(1);
        for (let sy = this.y + 20; sy < this.y + this.h; sy += 18) {
            line(screenX, sy, screenX + this.w, sy);
        }
        noStroke();

        // Shingle Roof
        fill(this.roofColor);
        triangle(screenX - 15, this.y, screenX + this.w + 15, this.y, screenX + this.w / 2, this.y - 75);

        // Paneled Door with Brass Knob
        fill(this.doorColor);
        rect(screenX + this.w / 2 - 20, this.y + this.h - 65, 40, 65, 2);
        fill(250, 204, 21);
        ellipse(screenX + this.w / 2 + 12, this.y + this.h - 32, 5, 5);

        // Lighted Windows with Curtains
        fill(254, 240, 138); // Warm indoor light
        rect(screenX + 30, this.y + 50, 50, 55, 3);
        rect(screenX + this.w - 80, this.y + 50, 50, 55, 3);
        // Window frames
        stroke(255);
        strokeWeight(2.5);
        line(screenX + 55, this.y + 50, screenX + 55, this.y + 105);
        line(screenX + 30, this.y + 77, screenX + 80, this.y + 77);
        line(screenX + this.w - 55, this.y + 50, screenX + this.w - 55, this.y + 105);
        line(screenX + this.w - 80, this.y + 77, screenX + this.w - 30, this.y + 77);
        noStroke();
    }
}

// Outdoor Tree
class Tree extends BackgroundObject {
    constructor(x, y) {
        const treeHeight = random(240, 380);
        const trunkWidth = random(24, 42);
        super(x, y - treeHeight, trunkWidth, treeHeight, '#78350f');
        this.foliageW = random(120, 180);
    }
    draw() {
        let screenX = this.x - scrollX;
        // Textured Trunk
        fill(100, 50, 20);
        rect(screenX, this.y + 60, this.w, this.h - 60, 4);

        // Lush Layered Foliage
        noStroke();
        fill(22, 101, 52); // Darker base green
        ellipse(screenX + this.w / 2, this.y + 70, this.foliageW, this.foliageW * 0.9);
        fill(34, 197, 94); // Vibrant mid green
        ellipse(screenX + this.w / 2 - 25, this.y + 50, this.foliageW * 0.85, this.foliageW * 0.8);
        ellipse(screenX + this.w / 2 + 25, this.y + 45, this.foliageW * 0.8, this.foliageW * 0.8);
        fill(74, 222, 128); // Highlight green
        ellipse(screenX + this.w / 2, this.y + 25, this.foliageW * 0.75, this.foliageW * 0.75);
    }
}

// Streetlight
class Streetlight extends BackgroundObject {
    constructor(x, y) {
        super(x, y - 260, 16, 260, '#334155');
    }
    draw() {
        let screenX = this.x - scrollX;
        // Cast iron post
        fill(51, 65, 85);
        rect(screenX, this.y, this.w, this.h, 2);
        // Base
        rect(screenX - 8, this.y + this.h - 15, this.w + 16, 15, 3);
        // Light arm curved
        rect(screenX - 55, this.y, 70, 14, 2);
        // Lantern head
        fill(30, 41, 59);
        rect(screenX - 70, this.y, 24, 32, 3);
        // Warm glow bulb
        fill(254, 240, 138, 220);
        ellipse(screenX - 58, this.y + 36, 18, 18);
        // Ambient glow halo
        noStroke();
        fill(255, 245, 160, 60);
        ellipse(screenX - 58, this.y + 40, 90, 60);
    }
}

// Fire Hydrant
class FireHydrant extends BackgroundObject {
    constructor(x, y) {
        super(x, y - 65, 34, 65, '#ef4444');
    }
    draw() {
        let screenX = this.x - scrollX;
        // Base
        fill(185, 28, 28);
        rect(screenX - 6, this.y + this.h - 12, this.w + 12, 12, 2);
        // Red Barrel
        fill(239, 68, 68);
        rect(screenX, this.y + 12, this.w, this.h - 24, 3);
        // Bonnet top
        fill(220, 38, 38);
        arc(screenX + this.w / 2, this.y + 12, this.w + 6, 22, PI, TWO_PI, CHORD);
        // Pentagonal operating nut
        fill(250, 204, 21);
        rect(screenX + this.w / 2 - 4, this.y - 4, 8, 6, 1);
        // Hose nozzles
        fill(185, 28, 28);
        rect(screenX - 10, this.y + 24, 10, 16, 2);
        rect(screenX + this.w, this.y + 24, 10, 16, 2);
    }
}

// Sewer Drain
class SewerDrain extends BackgroundObject {
    constructor(x, y) {
        super(x, y, 110, 22, '#334155');
    }
    draw() {
        let screenX = this.x - scrollX;
        fill(20, 25, 30);
        rect(screenX, this.y, this.w, this.h, 4);
        stroke(100, 116, 139);
        strokeWeight(3);
        for (let i = 12; i < this.w; i += 12) {
            line(screenX + i, this.y + 2, screenX + i, this.y + this.h - 2);
        }
        noStroke();
    }
}

// Bedroom Bed
class Bed extends LevelObject {
    constructor(x, y) { super(x, y, 260, 130, '#78350f'); }
    draw() {
        let screenX = this.x - scrollX;
        // Headboard & frame
        fill(120, 53, 15);
        rect(screenX, this.y - this.h, 24, this.h, 3); // Tall headboard
        rect(screenX, this.y - 40, this.w, 40, 2); // Frame base
        // Thick mattress
        fill(248, 250, 252);
        rect(screenX + 20, this.y - 85, this.w - 25, 45, 4);
        // Quilted blue duvet blanket
        fill(59, 130, 246);
        rect(screenX + 20, this.y - 88, this.w - 100, 48, 4);
        // Quilt stitches
        stroke(37, 99, 235);
        strokeWeight(1.5);
        line(screenX + 60, this.y - 88, screenX + 60, this.y - 40);
        line(screenX + 110, this.y - 88, screenX + 110, this.y - 40);
        noStroke();
        // Fluffy pillows
        fill(255);
        ellipse(screenX + this.w - 45, this.y - 95, 55, 26);
    }
}

// Bedroom Dresser
class Dresser extends LevelObject {
    constructor(x, y) { super(x, y, 160, 210, '#9a3412'); }
    draw() {
        let screenX = this.x - scrollX;
        fill(154, 52, 18);
        rect(screenX, this.y - this.h, this.w, this.h, 3);
        // Drawers with shadow line and brass handles
        for (let i = 0; i < 4; i++) {
            let dy = this.y - this.h + 15 + i * 48;
            fill(124, 45, 18);
            rect(screenX + 12, dy, this.w - 24, 40, 2);
            // Brass ring pull handles
            fill(250, 204, 21);
            ellipse(screenX + 45, dy + 20, 8, 8);
            ellipse(screenX + this.w - 45, dy + 20, 8, 8);
        }
    }
}

// Bedroom Desk with Gaming PC
class DeskWithPC extends LevelObject {
    constructor(x, y) { super(x, y, 190, 110, '#57534e'); }
    draw() {
        let screenX = this.x - scrollX;
        // Desk Top & Legs
        fill(87, 83, 78);
        rect(screenX, this.y - this.h, this.w, this.h, 3);

        // Curved Ultra-wide Monitor
        fill(15, 23, 42);
        rect(screenX + 30, this.y - this.h - 68, 105, 62, 4);
        // Screen Cyberpunk Glow
        fill(14, 165, 233);
        rect(screenX + 34, this.y - this.h - 64, 97, 54, 2);
        // Matrix / code graph lines
        stroke(255, 255, 255, 180);
        strokeWeight(1.5);
        line(screenX + 40, this.y - this.h - 30, screenX + 70, this.y - this.h - 50);
        line(screenX + 70, this.y - this.h - 50, screenX + 110, this.y - this.h - 35);
        noStroke();

        // RGB PC Gaming Tower
        fill(24, 24, 27);
        rect(screenX + this.w - 45, this.y - this.h, 40, -85, 3);
        // Glowing circular fans
        fill(236, 72, 153);
        ellipse(screenX + this.w - 25, this.y - this.h - 60, 18, 18);
        fill(168, 85, 247);
        ellipse(screenX + this.w - 25, this.y - this.h - 30, 18, 18);
    }
}

// Laundry Hamper
class Hamper extends LevelObject {
    constructor(x, y) { super(x, y, 85, 130, '#d97706'); }
    draw() {
        let screenX = this.x - scrollX;
        fill(217, 119, 6);
        rect(screenX, this.y - this.h, this.w, this.h, 8);
        // Wicker weave pattern
        stroke(180, 83, 9);
        strokeWeight(1.5);
        for (let ly = this.y - this.h + 15; ly < this.y; ly += 14) {
            line(screenX + 4, ly, screenX + this.w - 4, ly);
        }
        noStroke();
        // Clothes spilling out top
        fill(244, 63, 94);
        ellipse(screenX + 25, this.y - this.h - 4, 24, 14);
        fill(59, 130, 246);
        ellipse(screenX + 55, this.y - this.h - 2, 28, 16);
    }
}

// Standing Floor Lamp
class Lamp extends LevelObject {
    constructor(x, y) { super(x, y, 44, 160, '#e2e8f0'); }
    draw() {
        let screenX = this.x - scrollX;
        let lampTopY = this.y - this.h;
        // Brass base
        fill(234, 179, 8);
        ellipse(screenX + this.w / 2, this.y, 40, 12);
        // Pole
        rect(screenX + this.w / 2 - 4, lampTopY + 35, 8, this.h - 35);
        // Pleated Fabric Lampshade
        fill(254, 249, 195);
        quad(screenX + 5, lampTopY + 35, screenX + this.w - 5, lampTopY + 35, screenX + this.w + 8, lampTopY, screenX - 8, lampTopY);
        // Ambient light cone downward
        fill(254, 240, 138, 40);
        noStroke();
        triangle(screenX + this.w / 2, lampTopY + 35, screenX - 60, this.y, screenX + this.w + 60, this.y);
    }
}

// Sewer Pipe
class BackgroundPipe extends BackgroundObject {
    constructor(x) {
        const pipeY = random(80, height - 140);
        const pipeW = random(220, 420);
        const pipeH = random(35, 65);
        super(x, pipeY, pipeW, pipeH, '#475569');
    }
    draw() {
        let screenX = this.x - scrollX;
        // Metallic cast iron pipe
        fill(71, 85, 105);
        rect(screenX, this.y, this.w, this.h, 4);
        // Flanges with bolts
        fill(51, 65, 85);
        rect(screenX, this.y - 4, 12, this.h + 8, 2);
        rect(screenX + this.w - 12, this.y - 4, 12, this.h + 8, 2);
        // Highlight sheen
        fill(148, 163, 184, 120);
        rect(screenX + 12, this.y + 4, this.w - 24, 6);
    }
}

// Attic Box
class AtticBox extends LevelObject {
    constructor(x, y) {
        const size = random(90, 150);
        super(x, y, size, size, '#b45309');
    }
    draw() {
        let screenX = this.x - scrollX;
        fill(180, 83, 9);
        rect(screenX, this.y - this.h, this.w, this.h, 3);
        // Corrugated box tape
        fill(245, 158, 11, 200);
        rect(screenX + this.w / 2 - 12, this.y - this.h, 24, this.h);
        rect(screenX, this.y - this.h / 2 - 12, this.w, 24);
        // "FRAGILE" red stamp
        fill(220, 38, 38, 220);
        rect(screenX + 15, this.y - this.h + 15, 45, 18, 2);
    }
}

// Attic Wooden Beam (Hanging rafter or floor post with generous fly-through clearance)
class WoodenBeam extends LevelObject {
    constructor(x, isHanging = true) {
        const beamH = random(110, 140);
        const beamY = isHanging ? beamH : height;
        super(x, beamY, 36, beamH, '#451a03');
        this.isHanging = isHanging;
    }
    draw() {
        let screenX = this.x - scrollX;
        fill(69, 26, 3);
        if (this.isHanging) {
            // Hanging rafter from ceiling
            rect(screenX, 0, this.w, this.h, 0, 0, 4, 4);
            // Steel bracket at ceiling
            fill(100, 116, 139);
            rect(screenX - 4, 0, this.w + 8, 22, 2);
            fill(15, 23, 42);
            ellipse(screenX + 6, 11, 4, 4);
            ellipse(screenX + this.w - 6, 11, 4, 4);
            // Wood grain lines
            stroke(45, 18, 2);
            strokeWeight(1.5);
            line(screenX + 12, 22, screenX + 12, this.h - 8);
            line(screenX + 24, 22, screenX + 24, this.h - 14);
            noStroke();
        } else {
            // Pillar post rising from floor
            rect(screenX, this.y - this.h, this.w, this.h, 4, 4, 0, 0);
            // Steel floor bracket plate
            fill(100, 116, 139);
            rect(screenX - 4, this.y - 20, this.w + 8, 20, 2);
            fill(15, 23, 42);
            ellipse(screenX + 6, this.y - 10, 4, 4);
            ellipse(screenX + this.w - 6, this.y - 10, 4, 4);
            // Wood grain lines
            stroke(45, 18, 2);
            strokeWeight(1.5);
            line(screenX + 12, this.y - this.h + 8, screenX + 12, this.y - 20);
            line(screenX + 24, this.y - this.h + 14, screenX + 24, this.y - 20);
            noStroke();
        }
    }
}

// Attic Cobweb
class Cobweb extends BackgroundObject {
    constructor(x) {
        const size = random(90, 140);
        const y = random([0, height - size]);
        super(x, y, size, size, 'rgba(255, 255, 255, 0.45)');
    }
    draw() {
        let screenX = this.x - scrollX;
        stroke(255, 255, 255, 120);
        strokeWeight(1);
        noFill();
        for (let i = 0; i <= 5; i++) {
            let angle = (PI / 2) / 5 * i;
            line(screenX, this.y, screenX + cos(angle) * this.w, this.y + sin(angle) * this.h);
        }
        for (let r = 0.25; r < 1; r += 0.25) {
            arc(screenX, this.y, this.w * 2 * r, this.h * 2 * r, 0, PI / 2);
        }
        noStroke();
    }
}

// Bathroom Bathtub
class BathTub extends LevelObject {
    constructor(x, y, w, h) { super(x, y, w, h, '#f8fafc'); }
    draw() {
        // Enamel porcelain tub
        fill(248, 250, 252);
        stroke(203, 213, 225);
        strokeWeight(4);
        rect(this.x, this.y, this.w, -this.h, 16);
        // Antique brass claw feet
        noStroke();
        fill(234, 179, 8);
        ellipse(this.x + 35, this.y + 4, 28, 18);
        ellipse(this.x + this.w - 35, this.y + 4, 28, 18);
        // Water ripples
        fill(186, 230, 253, 160);
        ellipse(this.x + this.w / 2, this.y - this.h + 25, this.w - 40, 24);
    }
}

// Bathroom Toilet
class Toilet extends LevelObject {
    constructor(x, y, w, h) { super(x, y, w, h, '#ffffff'); }
    draw() {
        // Bowl base
        fill(255);
        stroke(226, 232, 240);
        strokeWeight(3);
        rect(this.x + 10, this.y - this.h * 0.6, this.w - 20, this.h * 0.6, 6);
        // Tank
        rect(this.x, this.y - this.h, this.w, this.h * 0.44, 4);
        // Chrome flush lever
        fill(148, 163, 184);
        rect(this.x + 8, this.y - this.h + 10, 16, 5, 2);
        noStroke();
    }
}

// Bathroom Sink
class BathroomSink extends LevelObject {
    constructor(x, y, w, h) { super(x, y, w, h, '#f1f5f9'); }
    draw() {
        // Pedestal
        fill(226, 232, 240);
        rect(this.x + this.w / 2 - 18, this.y, 36, -this.h, 4);
        // Basin
        fill(255);
        stroke(203, 213, 225);
        strokeWeight(3);
        rect(this.x, this.y - this.h - 45, this.w, 45, 8);
        noStroke();
        // Gooseneck Chrome Faucet
        stroke(148, 163, 184);
        strokeWeight(5);
        noFill();
        arc(this.x + this.w / 2, this.y - this.h - 45, 30, 35, PI, TWO_PI);
        noStroke();
    }
}

// Bathroom Mirror
class BathroomMirror extends BackgroundObject {
    constructor(x, y, w, h) { super(x, y, w, h, '#38bdf8'); }
    draw() {
        // Ornate gilt frame
        fill(234, 179, 8);
        rect(this.x, this.y, this.w, this.h, 6);
        // Mirror glass
        fill(224, 242, 254);
        rect(this.x + 8, this.y + 8, this.w - 16, this.h - 16, 4);
        // Diagonal glass reflection sheen
        fill(255, 255, 255, 140);
        quad(this.x + 18, this.y + 8, this.x + 40, this.y + 8, this.x + 18, this.y + this.h - 8, this.x - 4, this.y + this.h - 8);
    }
}

// Hall Grandfather Clock
class GrandfatherClock extends LevelObject {
    constructor(x, y) { super(x, y, 85, 310, '#451a03'); }
    draw() {
        let screenX = this.x - scrollX;
        let clockY = this.y - this.h;
        // Wood cabinet
        fill(69, 26, 3);
        rect(screenX, clockY, this.w, this.h, 4);
        // Bonnet top
        fill(120, 53, 15);
        arc(screenX + this.w / 2, clockY, this.w, 35, PI, TWO_PI, CHORD);
        // Clock face
        fill(254, 249, 195);
        stroke(234, 179, 8);
        strokeWeight(3);
        ellipse(screenX + this.w / 2, clockY + 65, 62, 62);
        // Clock hands
        stroke(15, 23, 42);
        strokeWeight(2);
        let handAngle = frameCounter * 0.03;
        line(screenX + this.w / 2, clockY + 65, screenX + this.w / 2 + cos(handAngle) * 22, clockY + 65 + sin(handAngle) * 22);
        line(screenX + this.w / 2, clockY + 65, screenX + this.w / 2, clockY + 50);
        noStroke();
        // Glass pendulum window
        fill(30, 41, 59, 140);
        rect(screenX + 12, clockY + 120, this.w - 24, 120, 3);
        // Swinging Brass Pendulum
        let swing = sin(frameCounter * 0.05) * 20;
        stroke(234, 179, 8);
        strokeWeight(3);
        line(screenX + this.w / 2, clockY + 125, screenX + this.w / 2 + swing, clockY + 215);
        noStroke();
        fill(250, 204, 21);
        ellipse(screenX + this.w / 2 + swing, clockY + 215, 24, 24);
    }
}

// Hall Painting
class Painting extends BackgroundObject {
    constructor(x, y) {
        super(x, y, random(120, 180), random(85, 140), '#78350f');
    }
    draw() {
        let screenX = this.x - scrollX;
        // Heavy gold frame
        fill(234, 179, 8);
        rect(screenX, this.y, this.w, this.h, 4);
        // Canvas landscape
        fill(14, 165, 233);
        rect(screenX + 8, this.y + 8, this.w - 16, this.h - 16);
        // Landscape sunset & mountain
        fill(244, 63, 94);
        ellipse(screenX + this.w / 2, this.y + this.h * 0.55, 30, 30);
        fill(74, 222, 128);
        triangle(screenX + 8, this.y + this.h - 8, screenX + this.w / 2, this.y + this.h * 0.45, screenX + this.w - 8, this.y + this.h - 8);
    }
}

// Kitchen Countertop
class Countertop extends LevelObject {
    constructor(x, y, w) { super(x, y, w, 155, '#f1f5f9'); }
    draw() {
        let screenX = this.x - scrollX;
        // Wooden lower shaker cabinets
        fill(180, 83, 9);
        rect(screenX, this.y - this.h, this.w, this.h, 2);
        // Cabinet doors
        fill(146, 64, 14);
        rect(screenX + 8, this.y - this.h + 28, this.w / 2 - 12, this.h - 36, 2);
        rect(screenX + this.w / 2 + 4, this.y - this.h + 28, this.w / 2 - 12, this.h - 36, 2);
        // Polished Granite counter slab with bevel
        fill(226, 232, 240);
        rect(screenX - 4, this.y - this.h - 18, this.w + 8, 20, 3);
        fill(255);
        rect(screenX - 4, this.y - this.h - 18, this.w + 8, 4, 1);
    }
}

// Kitchen Upper Cabinet
class UpperCabinet extends BackgroundObject {
    constructor(x) {
        super(x, 40, random(160, 280), 105, '#f59e0b');
    }
    draw() {
        let screenX = this.x - scrollX;
        fill(180, 83, 9);
        rect(screenX, this.y, this.w, this.h, 3);
        // Glass cabinet inserts
        fill(219, 234, 254, 180);
        rect(screenX + 10, this.y + 12, this.w / 2 - 15, this.h - 24, 2);
        rect(screenX + this.w / 2 + 5, this.y + 12, this.w / 2 - 15, this.h - 24, 2);
        // Under-cabinet warm task light
        noStroke();
        fill(254, 240, 138, 50);
        triangle(screenX + 15, this.y + this.h, screenX + this.w - 15, this.y + this.h, screenX + this.w / 2, this.y + this.h + 40);
    }
}

// ----- LEVEL CONFIGURATIONS MAP WITH STRUCTURED PACING -----
let levelStepIndices = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

const levelConfigs = {
    1: {
        name: "Outdoors",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[1] % 4;
            levelStepIndices[1]++;
            let groundY = height - 50;

            if (step === 0) {
                // Suburban House
                const house = new House(worldX, groundY);
                backgroundObjects.push(house);
                return house.w + 360; // Clean clearance after house
            } else if (step === 1) {
                // Front Yard with Tree & Fire Hydrant
                backgroundObjects.push(new Tree(worldX, groundY));
                backgroundObjects.push(new FireHydrant(worldX + 180, groundY));
                return 360;
            } else if (step === 2) {
                // Sidewalk with Streetlight
                backgroundObjects.push(new Streetlight(worldX + 40, groundY));
                return 340;
            } else {
                // Street Gutter with Sewer Drain
                backgroundObjects.push(new SewerDrain(worldX + 20, height - 44));
                return 380;
            }
        },
        spawnExit: (worldX) => {
            let toBed = random(1) < 0.55;
            if (toBed) {
                // Open bedroom window on house
                let house = new House(worldX, height - 50);
                backgroundObjects.push(house);
                exits.push(new Exit(house.x + house.w - 85, house.y + 50, 55, 55, 2, "Window"));
            } else {
                // Drain to Sewer
                let drain = new SewerDrain(worldX, height - 44);
                backgroundObjects.push(drain);
                exits.push(new Exit(drain.x, drain.y, drain.w, drain.h, 3, "Sewer Drain"));
            }
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[1].enemies;
            const spawnY = height - 50;
            if (allowed.bird && random(1) < 0.4) {
                enemies.push(new Bird(worldX, random(80, height - 200)));
            } else if (allowed.dog && random(1) < 0.6) {
                enemies.push(new Dog(worldX, spawnY));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, spawnY));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(120, height - 160)));
        }
    },
    2: {
        name: "Upstairs Bedroom",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[2] % 5;
            levelStepIndices[2]++;

            if (step === 0) {
                // Dresser with food on top
                const dresser = new Dresser(worldX, height);
                levelObjects.push(dresser);
                foods.push(new Food(dresser.x + dresser.w / 2, dresser.y - dresser.h - 22));
                return dresser.w + 340;
            } else if (step === 1) {
                // Bed
                const bed = new Bed(worldX, height);
                levelObjects.push(bed);
                return bed.w + 350;
            } else if (step === 2) {
                // Desk with PC
                const desk = new DeskWithPC(worldX, height);
                levelObjects.push(desk);
                return desk.w + 340;
            } else if (step === 3) {
                // Hamper & Lamp in corner
                const hamper = new Hamper(worldX, height);
                const lamp = new Lamp(worldX + hamper.w + 40, height);
                levelObjects.push(hamper);
                levelObjects.push(lamp);
                return hamper.w + lamp.w + 360;
            } else {
                // Bedroom Window backdrop
                backgroundObjects.push(new BackgroundObject(worldX, height - 320, 110, 160, '#fef08a'));
                return 320;
            }
        },
        spawnExit: (worldX) => {
            let r = random(1);
            if (r < 0.35) {
                // Ceiling Attic hatch
                exits.push(new Exit(worldX, 0, 130, 45, 4, "Attic"));
            } else if (r < 0.70) {
                // Bedroom Door to Bathroom
                exits.push(new Exit(worldX, height - 200, 70, 160, 5, "Door"));
            } else {
                // Hallway passage
                exits.push(new Exit(worldX, height - 50, 160, 45, 6, "Hall"));
            }
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[2].enemies;
            if (allowed.human && random(1) < 0.45) {
                enemies.push(new Human(worldX, height - 130));
            } else if (allowed.child && random(1) < 0.6) {
                enemies.push(new Child(worldX, height - 85));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, height - 35));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(140, height - 150)));
        }
    },
    3: {
        name: "The Sewer",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[3] % 2;
            levelStepIndices[3]++;

            // Generous overhead pipe obstacle that leaves clear space above or below
            let pipeY = step === 0 ? 110 : height - 170;
            levelObjects.push(new LevelObject(worldX, pipeY, 260, 45, '#475569'));
            backgroundObjects.push(new BackgroundPipe(worldX + 80));

            return 440; // 440px between pipes
        },
        spawnExit: (worldX) => {
            // Manhole ladder leading up to Outdoors
            exits.push(new Exit(worldX, 0, 120, 85, 1, "Manhole"));
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[3].enemies;
            if (allowed.dog && random(1) < 0.35) {
                enemies.push(new Dog(worldX, height - 50));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, height - 50));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(100, height - 170)));
        }
    },
    4: {
        name: "The Attic",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[4] % 3;
            levelStepIndices[4]++;

            if (step === 0) {
                // Cardboard box stack
                const box = new AtticBox(worldX, height);
                levelObjects.push(box);
                return box.w + 380;
            } else if (step === 1) {
                // Wooden support beam (alternating hanging rafter vs floor post with wide flight corridor)
                let isHanging = (levelStepIndices[4] % 2 === 0);
                const beam = new WoodenBeam(worldX, isHanging);
                levelObjects.push(beam);
                return beam.w + 420;
            } else {
                // Dusty cobweb in corner
                backgroundObjects.push(new Cobweb(worldX));
                return 360;
            }
        },
        spawnExit: (worldX) => {
            let toOutdoors = random(1) < 0.5;
            if (toOutdoors) {
                exits.push(new Exit(worldX, 0, 130, 45, 1, "Vent"));
            } else {
                exits.push(new Exit(worldX, random(height / 2, height - 90), 45, 90, 7, "Pipe"));
            }
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[4].enemies;
            if (allowed.bird && random(1) < 0.5) {
                enemies.push(new Bird(worldX, random(80, height - 180)));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, height - 35));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(100, height - 160)));
        }
    },
    5: {
        name: "The Bathroom",
        isScrolling: false,
        setup: () => {
            const sink = new BathroomSink(110, height - 140, 150, 140);
            levelObjects.push(new BathTub(width - 340, height, 290, 230));
            levelObjects.push(new Toilet(width / 2 - 50, height, 100, 110));
            levelObjects.push(sink);
            backgroundObjects.push(new BathroomMirror(135, 110, 100, 140));

            enemies.push(new Child(width - 160, height - 85));
            // Drain exit down to The Sewer (Level 3)
            exits.push(new Exit(sink.x + 50, sink.y - sink.h - 30, 50, 24, 3, "Drain"));
        }
    },
    6: {
        name: "The Hall",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[6] % 2;
            levelStepIndices[6]++;

            if (step === 0) {
                // Grandfather clock
                const clock = new GrandfatherClock(worldX, height);
                levelObjects.push(clock);
                return clock.w + 420;
            } else {
                // Framed painting on wall
                backgroundObjects.push(new Painting(worldX, 130));
                return 380;
            }
        },
        spawnExit: (worldX) => {
            let r = random(1);
            if (r < 0.4) {
                exits.push(new Exit(worldX, height - 45, 160, 45, 7, "Stairs"));
            } else if (r < 0.7) {
                exits.push(new Exit(worldX, 180, 60, 60, 1, "Window"));
            } else {
                exits.push(new Exit(worldX, 0, 130, 45, 4, "Attic"));
            }
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[6].enemies;
            if (allowed.human && random(1) < 0.4) {
                enemies.push(new Human(worldX, height - 130));
            } else if (allowed.dog && random(1) < 0.6) {
                enemies.push(new Dog(worldX, height - 40));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, height - 40));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(120, height - 150)));
        }
    },
    7: {
        name: "The Kitchen",
        isScrolling: true,
        spawnStep: (worldX) => {
            let step = levelStepIndices[7] % 2;
            levelStepIndices[7]++;

            const counterW = 280;
            const counter = new Countertop(worldX, height, counterW);
            levelObjects.push(counter);
            backgroundObjects.push(new UpperCabinet(worldX + 20));

            // Food crumb on counter
            if (step === 0) {
                foods.push(new Food(counter.x + counterW / 2, counter.y - counter.h - 35));
            }
            return counterW + 360;
        },
        spawnExit: (worldX) => {
            let toOutdoors = random(1) < 0.5;
            if (toOutdoors) {
                exits.push(new Exit(worldX, 190, 60, 60, 1, "Window"));
            } else {
                const counter = new Countertop(worldX, height, 280);
                levelObjects.push(counter);
                exits.push(new Exit(counter.x + 115, counter.y - counter.h - 18, 50, 18, 3, "Sink"));
            }
        },
        spawnEnemy: (worldX) => {
            const allowed = settings.levels[7].enemies;
            if (allowed.child && random(1) < 0.4) {
                enemies.push(new Child(worldX, height - 85));
            } else if (allowed.human && random(1) < 0.6) {
                enemies.push(new Human(worldX, height - 130));
            } else if (allowed.dog && random(1) < 0.8) {
                enemies.push(new Dog(worldX, height - 40));
            } else if (allowed.rat) {
                enemies.push(new Rat(worldX, height - 40));
            }
        },
        spawnFood: (worldX) => {
            foods.push(new Food(worldX, random(100, height - 160)));
        }
    }
};
`;
