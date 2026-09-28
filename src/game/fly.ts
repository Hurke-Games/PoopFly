// Fly player character, Poop projectiles, and particle effects
export const FLY_CODE = `
// ----- PLAYER CLASS: THE FLY -----
class Fly {
    constructor() {
        this.x = 160;
        this.y = height / 2;
        this.size = 18;
        this.speed = settings.flySpeed;
        this.energy = 100;
        this.vy = 0;
        this.vx = 0;
        this.invincibleTime = 0;
        this.pitch = 0; // Flight tilt angle
        this.squash = 1;
        this.stretch = 1;
        this.wingSpeed = 0.5;
    }

    get isInvincible() { return this.invincibleTime > 0; }

    update() {
        this.y += this.vy;
        this.x += this.vx;

        // Pitch smoothly tilts with vertical velocity
        this.pitch = lerp(this.pitch, this.vy * 0.08, 0.2);

        // Recover squash and stretch
        this.squash = lerp(this.squash, 1, 0.15);
        this.stretch = lerp(this.stretch, 1, 0.15);

        // Screen bounds
        this.x = constrain(this.x, this.size, width - this.size);
        this.y = constrain(this.y, this.size, height - this.size);

        if (this.isInvincible) {
            this.invincibleTime--;
        }

        // Dampen horizontal velocity
        this.vx *= 0.85;
    }

    applyGravity() {
        this.vy += settings.gravity;
        this.vy = constrain(this.vy, -11, 7);
    }

    move(dx, dy) {
        this.vx += dx * this.speed * 0.4;
        this.vx = constrain(this.vx, -this.speed, this.speed);

        if (dy < 0) {
            this.vy += dy * 0.75; // Flap upwards
            this.stretch = 1.15;
            this.squash = 0.85;
        } else if (dy > 0) {
            this.vy += dy * 0.4;
        }
    }

    moveTo(targetX, targetY) {
        let dx = targetX - this.x;
        let dy = targetY - this.y;
        let d = dist(this.x, this.y, targetX, targetY);

        if (d > 4) {
            let moveSpeed = min(this.speed * 1.5, d * 0.16);
            let angle = atan2(dy, dx);
            this.vx = cos(angle) * moveSpeed;
            this.vy = sin(angle) * moveSpeed;

            this.pitch = lerp(this.pitch, sin(angle) * 0.35, 0.25);
            if (dy < -2) {
                this.stretch = 1.1;
                this.squash = 0.9;
            }
        } else {
            this.vx *= 0.4;
            this.vy *= 0.4;
        }
    }

    poop() {
        poops.push(new Poop(this.x - 10, this.y + 6));
        this.squash = 1.25;
        this.stretch = 0.75;

        // Little recoil push & puff
        this.vy -= 0.6;
        for (let i = 0; i < 4; i++) {
            particles.push(new StinkParticle(this.x - 12 + random(-3, 3), this.y + 10 + random(-2, 2)));
        }
    }

    eat(amount, foodName = "Food") {
        this.energy = min(100, this.energy + amount);
        this.squash = 0.8;
        this.stretch = 1.2;

        // Spawn heart / sparkle particles
        for (let i = 0; i < 8; i++) {
            particles.push(new SparkleParticle(this.x, this.y, '#4ade80'));
        }
        scorePopups.push(new ScorePopup(this.x, this.y - 20, \`+\${amount} \${foodName}\`, '#22c55e'));
    }

    takeDamage(amount) {
        this.energy -= amount;
        this.invincibleTime = 65; // ~1 sec invulnerability
        this.squash = 1.3;
        this.stretch = 0.7;

        // Damage particles
        for (let i = 0; i < 10; i++) {
            particles.push(new SparkleParticle(this.x, this.y, '#ef4444'));
        }

        scorePopups.push(new ScorePopup(this.x, this.y - 20, \`-\${amount} HP\`, '#ef4444'));

        if (amount >= 999 || this.energy <= 0) {
            gameOver();
        }
    }

    collides(other) {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const otherX = other.x - screenX;
        const otherY = other.y;
        return dist(this.x, this.y, otherX, otherY) < (this.size / 2 + other.size / 2);
    }

    handleBarrierCollision(barrier) {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const flyLeft = this.x - this.size / 2;
        const flyRight = this.x + this.size / 2;
        const flyTop = this.y - this.size / 2;
        const flyBottom = this.y + this.size / 2;

        let objLeft = barrier.x - (levelConfigs[currentLevel].isScrolling ? screenX : 0);
        let objTop = barrier.y - barrier.h;
        let objRight = objLeft + barrier.w;
        let objBottom = objTop + barrier.h;

        if (flyRight > objLeft && flyLeft < objRight && flyBottom > objTop && flyTop < objBottom) {
            const overlapX1 = flyRight - objLeft;
            const overlapX2 = objRight - flyLeft;
            const overlapY1 = flyBottom - objTop;
            const overlapY2 = objBottom - flyTop;

            const minOverlapX = min(overlapX1, overlapX2);
            const minOverlapY = min(overlapY1, overlapY2);

            if (minOverlapX < minOverlapY) {
                if (overlapX1 < overlapX2) {
                    this.x = objLeft - this.size / 2;
                    this.vx = -1;
                } else {
                    this.x = objRight + this.size / 2;
                    this.vx = 1;
                }
            } else {
                if (overlapY1 < overlapY2) {
                    this.y = objTop - this.size / 2;
                    this.vy = 0;
                } else {
                    this.y = objBottom + this.size / 2;
                    this.vy = 1;
                }
            }
        }
    }

    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.pitch);

        if (this.isInvincible && frameCounter % 10 < 5) {
            // Blink when invincible
        } else {
            noStroke();
            // Body
            fill(0);
            ellipse(0, 0, this.size, this.size * 0.8);
            // Eyes
            fill(255, 0, 0);
            ellipse(-this.size * 0.2, -this.size * 0.2, this.size * 0.3);
            ellipse(this.size * 0.2, -this.size * 0.2, this.size * 0.3);
            // Wings
            fill(200, 200, 255, 150);
            ellipse(-this.size * 0.6, 0, this.size, this.size * 0.5);
            ellipse(this.size * 0.6, 0, this.size, this.size * 0.5);
        }
        pop();
    }
}

// ----- POOP PROJECTILE CLASS -----
class Poop {
    constructor(x, y) {
        this.x = x + (levelConfigs[currentLevel].isScrolling ? scrollX : 0);
        this.y = y;
        this.size = 14;
        this.vy = 2.2;
        this.vx = -0.5;
        this.rotation = random(-0.2, 0.2);
    }

    update() {
        this.vy += settings.gravity * 2.2;
        this.y += this.vy;
        this.x += this.vx;

        // Occasional stink fume
        if (frameCounter % 6 === 0) {
            particles.push(new StinkParticle(this.x - (levelConfigs[currentLevel].isScrolling ? scrollX : 0), this.y));
        }
    }

    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        rotate(this.rotation);

        // 3D Soft-serve swirl poop shape
        noStroke();

        // Base drop shadow
        fill(45, 25, 10, 120);
        ellipse(0, 6, 14, 5);

        // Bottom swirl tier
        fill(105, 55, 22);
        ellipse(0, 3, 14, 8);

        // Middle swirl tier
        fill(125, 68, 28);
        ellipse(0, -1, 10, 6);

        // Top swirl tip
        fill(145, 80, 35);
        triangle(-4, -2, 4, -2, 1, -7);

        // Gloss highlight
        fill(200, 140, 90, 180);
        ellipse(-2, 0, 3, 2);

        pop();
    }

    isOnScreen() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        return this.y < height + 50 && this.x - screenX > -60 && this.x - screenX < width + 60;
    }

    collides(other) {
        return dist(this.x, this.y, other.x, other.y) < (this.size / 2 + other.size / 2);
    }
}

// ----- PARTICLES & SCORE POPUPS -----
class StinkParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-0.5, 0.5);
        this.vy = random(-1.2, -0.4);
        this.size = random(4, 9);
        this.alpha = 180;
    }
    update() {
        this.x += this.vx + sin(frameCounter * 0.1) * 0.4;
        this.y += this.vy;
        this.alpha -= 4;
        this.size += 0.1;
    }
    draw() {
        noStroke();
        fill(130, 185, 60, this.alpha);
        ellipse(this.x, this.y, this.size, this.size * 0.8);
    }
    isDead() { return this.alpha <= 0; }
}

class SparkleParticle {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.vx = random(-2.5, 2.5);
        this.vy = random(-2.5, 2.5);
        this.size = random(3, 7);
        this.col = col;
        this.alpha = 255;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05;
        this.alpha -= 7;
    }
    draw() {
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.size);
    }
    isDead() { return this.alpha <= 0; }
}

class SplatParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-3, 3);
        this.vy = random(-3.5, 1);
        this.size = random(5, 12);
        this.alpha = 240;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15;
        this.alpha -= 6;
    }
    draw() {
        noStroke();
        fill(115, 60, 25, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
    isDead() { return this.alpha <= 0; }
}

class ScorePopup {
    constructor(x, y, text, col = '#ffffff') {
        this.x = x;
        this.y = y;
        this.text = text;
        this.col = col;
        this.vy = -1.2;
        this.alpha = 255;
    }
    update() {
        this.y += this.vy;
        this.alpha -= 4.5;
    }
    draw() {
        push();
        textAlign(CENTER, CENTER);
        textSize(15);
        textStyle(BOLD);
        // Text shadow
        fill(0, 0, 0, this.alpha);
        text(this.text, this.x + 1, this.y + 1);
        // Main text
        fill(this.col);
        text(this.text, this.x, this.y);
        pop();
    }
    isDead() { return this.alpha <= 0; }
}
`;
