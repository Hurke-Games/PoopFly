// Expressive enemies with intelligent terrain mobility, active hunting, and aggressive attacks
export const ENEMIES_CODE = `
// ----- TERRAIN SURFACE HELPER -----
function getGroundSurface(worldX, defaultGroundY) {
    let surface = defaultGroundY;
    if (typeof levelObjects !== 'undefined') {
        for (let obj of levelObjects) {
            let left = obj.x - 15;
            let right = obj.x + obj.w + 15;
            if (worldX >= left && worldX <= right) {
                let topY = obj.y - obj.h;
                // If the top of this barrier is elevated above floor and within bounds
                if (topY < surface && topY > 80) {
                    surface = topY;
                }
            }
        }
    }
    return surface;
}

// ----- ENEMY PROJECTILES -----
class SonicBark {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.size = 26;
        this.damage = 18;
        let angle = atan2(targetY - y, targetX - x);
        this.vx = cos(angle) * 5.2;
        this.vy = sin(angle) * 5.2;
        this.life = 70;
        this.initialLife = 70;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += 0.5;
        this.life--;
    }

    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;
        let alpha = map(this.life, 0, this.initialLife, 0, 220);

        push();
        translate(drawX, this.y);
        noFill();
        stroke(250, 204, 21, alpha);
        strokeWeight(3.5);
        arc(0, 0, this.size, this.size * 0.7, -PI * 0.6, PI * 0.6);

        stroke(255, 255, 255, alpha * 0.9);
        strokeWeight(1.8);
        arc(0, 0, this.size * 0.65, this.size * 0.45, -PI * 0.6, PI * 0.6);

        noStroke();
        fill(250, 204, 21, alpha);
        textSize(10);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text("BARK!", 0, -this.size * 0.5);
        pop();
    }

    getScreenX() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        return this.x - screenX;
    }

    isOnScreen() {
        let sx = this.getScreenX();
        return sx > -60 && sx < width + 60 && this.y > -50 && this.y < height + 50;
    }

    isDead() { return this.life <= 0; }
}

class PaperBall {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.size = 15;
        this.damage = 18;
        let screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let myScreenX = x - screenX;
        let dx = targetX - myScreenX;
        this.vx = constrain(dx * 0.035, -4.5, 4.5);
        this.vy = -8.2;
        this.rot = random(TWO_PI);
    }

    update() {
        this.vy += 0.24; // Gravity
        this.x += this.vx;
        this.y += this.vy;
        this.rot += 0.18;
    }

    draw() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        rotate(this.rot);
        fill(248, 250, 252);
        stroke(148, 163, 184);
        strokeWeight(1.5);
        rect(-6, -6, 12, 12, 3);
        // Paper crumpled fold lines
        stroke(203, 213, 225);
        line(-4, -2, 4, 3);
        line(-2, 4, 3, -4);
        pop();
    }

    getScreenX() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        return this.x - screenX;
    }

    isOnScreen() {
        let sx = this.getScreenX();
        return sx > -60 && sx < width + 60 && this.y < height + 40;
    }

    isDead() { return this.y > height + 20; }
}

// ----- BASE ENEMY CLASS -----
class Enemy {
    constructor(x, y, size, health, damage, points, name) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = size;
        this.initialHealth = health;
        this.health = health;
        this.damage = damage;
        this.points = points;
        this.name = name;
        this.isDefeated = false;
        this.hitTimer = 0;
        this.animTimer = random(100);
        this.facing = -1;
        this.onGround = false;
    }

    takeHit() {
        this.health--;
        this.hitTimer = 25; // Splat reaction
        for (let i = 0; i < 8; i++) {
            particles.push(new SplatParticle(this.x - (levelConfigs[currentLevel].isScrolling ? scrollX : 0), this.y));
        }

        if (this.health <= 0) {
            this.isDefeated = true;
            score += this.points;
            scorePopups.push(new ScorePopup(
                this.x - (levelConfigs[currentLevel].isScrolling ? scrollX : 0),
                this.y - this.size / 2 - 15,
                \`+\${this.points} \${this.name} SPLAT!\`,
                '#f59e0b'
            ));
        } else {
            scorePopups.push(new ScorePopup(
                this.x - (levelConfigs[currentLevel].isScrolling ? scrollX : 0),
                this.y - this.size / 2 - 10,
                \`HIT! \${this.health} HP\`,
                '#fbbf24'
            ));
        }
    }

    update(fly) {
        this.animTimer++;
        if (this.hitTimer > 0) this.hitTimer--;

        if (this.isDefeated) {
            this.x -= 8; // Scampers away in panic
        }
    }

    isOnScreen() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        return this.x - screenX > -140 && this.x - screenX < width + 140;
    }

    draw() {
        this.drawEnemy();
    }
}

// ----- 1. RAT ENEMY (ACROBATIC CLIMBER & PREDATOR) -----
class Rat extends Enemy {
    constructor(x, y) {
        super(x, y, 38, 1, 18, 20, "RAT");
        this.pounceCooldown = 60;
        this.isPouncing = false;
        this.crouchTimer = 0;
    }

    update(fly) {
        super.update(fly);
        if (this.isDefeated) return;

        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const flyScreenX = fly.x;
        const myScreenX = this.x - screenX;
        const distToFly = dist(myScreenX, this.y, flyScreenX, fly.y);

        // Dynamic facing towards fly
        if (!this.isPouncing) {
            this.facing = flyScreenX < myScreenX ? -1 : 1;
        }

        // Active Pursuit: sprint towards fly on terrain
        if (!this.isPouncing && this.crouchTimer <= 0) {
            let runSpeed = (distToFly < 420) ? 3.4 : 1.8;
            this.vx = this.facing * runSpeed;
        }

        // Apply horizontal velocity
        this.x += this.vx;

        // Terrain Awareness: detect current floor/obstacle height
        const defaultFloor = height - 50;
        const groundLevel = getGroundSurface(this.x, defaultFloor);

        // Gravity & Ground Collision
        if (this.y < groundLevel - this.size / 2) {
            this.vy += 0.58;
            this.onGround = false;
        } else {
            this.y = groundLevel - this.size / 2;
            this.vy = 0;
            this.onGround = true;
            this.isPouncing = false;
        }
        this.y += this.vy;

        // Obstacle Climbing Leap: if approaching a barrier ahead, jump onto it!
        if (this.onGround && !this.isPouncing) {
            let nextGround = getGroundSurface(this.x + this.facing * 35, defaultFloor);
            if (nextGround < this.y - 15) {
                // Hop up onto the barrier/furniture!
                this.vy = -9.0;
                this.onGround = false;
            }
        }

        // Pounce Attack Cooldown & Trigger
        if (this.pounceCooldown > 0) this.pounceCooldown--;

        // If fly is in attack range (within 280px), actively try to kill the fly with an aimed pounce!
        if (this.onGround && this.pounceCooldown <= 0 && distToFly < 280 && fly.y < this.y + 20) {
            // Crouch anticipation for 8 frames
            this.crouchTimer++;
            this.vx *= 0.2;

            if (this.crouchTimer >= 10) {
                // Launch aimed predatory leap directly at the fly!
                let dy = fly.y - this.y;
                let dx = flyScreenX - myScreenX;
                this.vy = constrain(dy * 0.08 - 9.5, -14, -7.5);
                this.vx = constrain(dx * 0.06, -6, 6);
                this.isPouncing = true;
                this.onGround = false;
                this.crouchTimer = 0;
                this.pounceCooldown = 90; // Attack cooldown
            }
        } else {
            if (this.crouchTimer > 0 && distToFly >= 280) this.crouchTimer = 0;
        }
    }

    drawEnemy() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        scale(this.facing, 1);

        let isHit = this.hitTimer > 0;
        let runCycle = sin(this.animTimer * 0.5);

        // Crouch posture
        if (this.crouchTimer > 0) {
            scale(1.2, 0.75);
        } else if (this.isPouncing) {
            scale(1.1, 0.9);
            rotate(this.vy * 0.03 * this.facing);
        }

        // Long flexible pink tail (twitches vigorously when hunting)
        noFill();
        stroke(235, 160, 160);
        strokeWeight(3.5);
        let tailWag = sin(this.animTimer * (this.isPouncing ? 0.8 : 0.4)) * 14;
        bezier(14, 2, 28, 4, 38, -6 + tailWag, 48, -14 + tailWag);

        // Claws & Paws (reaching forward during pounce!)
        stroke(220, 150, 150);
        strokeWeight(3);
        if (this.isPouncing) {
            // Outstretched leaping claws!
            line(8, 2, 18, 12);
            line(-8, 2, -22, -4);
            line(-8, 6, -24, 2);
        } else {
            // Back paw
            line(8, 6, 12 + runCycle * 8, 14);
            // Front paw
            line(-8, 6, -12 - runCycle * 8, 14);
        }

        // Fur Body (layered shading)
        noStroke();
        fill(75, 75, 80);
        ellipse(0, 0, this.size, this.size * 0.65);
        fill(105, 105, 115);
        ellipse(-2, -2, this.size * 0.8, this.size * 0.5);

        // Rat Head & Snout
        fill(85, 85, 95);
        triangle(-8, -8, -8, 8, -25, 2);

        // Bared teeth when pouncing
        if (this.isPouncing || this.crouchTimer > 0) {
            fill(255);
            triangle(-22, 1, -22, 5, -26, 3);
        }

        // Pink rounded ear
        fill(235, 165, 165);
        ellipse(-4, -10, 8, 10);
        stroke(75, 75, 80);
        strokeWeight(1.5);
        ellipse(-4, -10, 8, 10);
        noStroke();

        // Pink nose & whiskers
        fill(240, 130, 140);
        ellipse(-25, 2, 4, 4);

        // Whiskers
        stroke(200, 200, 200, 180);
        strokeWeight(1);
        line(-22, 1, -31, -4);
        line(-22, 3, -31, 8);

        // Eye (Glows crimson when actively hunting!)
        noStroke();
        if (isHit || this.isDefeated) {
            stroke(240, 50, 50);
            strokeWeight(2);
            line(-16, -2, -12, 2);
            line(-12, -2, -16, 2);
        } else if (this.isPouncing || this.crouchTimer > 0) {
            // Glowing predatory red eye
            fill(239, 68, 68);
            ellipse(-14, 0, 5.5, 5.5);
            fill(255, 255, 255);
            ellipse(-15, -1, 2, 2);
        } else {
            fill(15, 15, 20);
            ellipse(-14, 0, 4.5, 4.5);
            fill(255);
            ellipse(-15, -1, 1.5, 1.5);
        }

        // Splat on back
        if (isHit || this.isDefeated) {
            fill(110, 55, 20, 220);
            noStroke();
            ellipse(2, -6, 14, 8);
        }

        pop();
    }
}

// ----- 2. DOG ENEMY (AGGRESSIVE PURSUIT, JUMP BITE & SONIC BARK) -----
class Dog extends Enemy {
    constructor(x, y) {
        super(x, y, 54, 2, 32, 40, "DOG");
        this.lungeCooldown = 70;
        this.isLunging = false;
        this.barkCooldown = 90;
        this.barkTimer = 0;
        this.isBarking = false;
    }

    update(fly) {
        super.update(fly);
        if (this.isDefeated) return;

        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const flyScreenX = fly.x;
        const myScreenX = this.x - screenX;
        const distToFly = dist(myScreenX, this.y, flyScreenX, fly.y);

        // Dynamic facing towards fly
        if (!this.isLunging) {
            this.facing = flyScreenX < myScreenX ? -1 : 1;
        }

        // Cooldowns
        if (this.lungeCooldown > 0) this.lungeCooldown--;
        if (this.barkCooldown > 0) this.barkCooldown--;

        // Terrain Awareness: can step/hop onto beds, obstacles, curbs
        const defaultFloor = height - 50;
        const groundLevel = getGroundSurface(this.x, defaultFloor);

        // Gravity & Ground Physics
        if (this.y < groundLevel - this.size / 2) {
            this.vy += 0.58;
            this.onGround = false;
        } else {
            this.y = groundLevel - this.size / 2;
            this.vy = 0;
            this.onGround = true;
            this.isLunging = false;
        }
        this.y += this.vy;

        // Obstacle Hopping: jumps over or onto barriers in pursuit
        if (this.onGround && !this.isLunging && !this.isBarking) {
            let nextGround = getGroundSurface(this.x + this.facing * 45, defaultFloor);
            if (nextGround < this.y - 15) {
                this.vy = -10.0;
                this.onGround = false;
            }
        }

        // ACTIVE HUNTING AI:
        if (this.isBarking) {
            this.vx *= 0.5;
            this.barkTimer--;
            if (this.barkTimer === 15) {
                // Fire sonic bark projectile towards fly!
                enemyProjectiles.push(new SonicBark(this.x - 25 * this.facing, this.y - 15, flyScreenX, fly.y));
            }
            if (this.barkTimer <= 0) {
                this.isBarking = false;
            }
        } else if (distToFly < 450) {
            // Case A: Fly is elevated high out of leaping reach -> Sonic Bark Attack!
            if (this.onGround && this.barkCooldown <= 0 && fly.y < this.y - 120 && abs(flyScreenX - myScreenX) < 320) {
                this.isBarking = true;
                this.barkTimer = 30;
                this.barkCooldown = 110;
                this.vx = 0;
            }
            // Case B: Fly is within leaping distance -> Running Leaping Jaw Snap!
            else if (this.onGround && this.lungeCooldown <= 0 && distToFly < 260 && fly.y < this.y - 15) {
                let dx = flyScreenX - myScreenX;
                let dy = fly.y - this.y;
                this.vy = constrain(dy * 0.08 - 10.5, -14.5, -9);
                this.vx = constrain(dx * 0.065, -6.5, 6.5);
                this.isLunging = true;
                this.onGround = false;
                this.lungeCooldown = 85;
            }
            // Case C: Aggressive sprint chase
            else if (!this.isLunging) {
                this.vx = this.facing * 4.0;
            }
        } else {
            // Patrol trot
            this.vx = this.facing * 1.5;
        }

        this.x += this.vx;
    }

    drawEnemy() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        scale(this.facing, 1);

        let isHit = this.hitTimer > 0;
        let runCycle = sin(this.animTimer * 0.45);

        // Bark pose or leaping pose
        if (this.isBarking) {
            rotate(-0.25 * this.facing); // Head tilted up
        } else if (this.isLunging) {
            rotate(this.vy * 0.02 * this.facing);
        }

        // Wagging Tail
        stroke(140, 85, 35);
        strokeWeight(6);
        let tailSwing = sin(this.animTimer * 0.7) * 16;
        noFill();
        bezier(18, 0, 32, -4, 38, -16 + tailSwing, 46, -14 + tailSwing);

        // 4 Running Legs
        stroke(120, 70, 25);
        strokeWeight(5.5);
        if (this.isLunging) {
            // Outstretched leaping legs
            line(12, 10, 24, 22);
            line(6, 10, 18, 20);
            line(-12, 10, -26, 4);
            line(-18, 10, -28, 10);
        } else {
            line(12, 10, 16 + runCycle * 10, 24);
            line(6, 10, 8 - runCycle * 10, 24);
            line(-12, 10, -8 - runCycle * 10, 24);
            line(-18, 10, -22 + runCycle * 10, 24);
        }

        // Chunky Body
        noStroke();
        fill(175, 110, 45);
        ellipse(0, 4, this.size, this.size * 0.65);

        // Fur coat spot pattern
        fill(135, 80, 30);
        ellipse(6, 0, 16, 12);
        ellipse(-4, 6, 12, 8);

        // Head
        fill(185, 120, 50);
        ellipse(-20, -10, 26, 24);

        // Muzzle / Jowls
        fill(215, 155, 95);
        ellipse(-28, -6, 16, 14);

        // Black Wet Nose
        fill(20, 20, 25);
        ellipse(-34, -8, 6, 5);

        // Floppy Ear
        fill(130, 75, 25);
        let earBounce = sin(this.animTimer * 0.45) * 5;
        ellipse(-14, -14 + earBounce, 12, 18);

        // Red Spiked Collar with Gold Bone Tag
        stroke(220, 38, 38);
        strokeWeight(4);
        line(-16, -2, -10, 4);
        noStroke();
        fill(250, 204, 21);
        ellipse(-12, 6, 6, 6);

        // Mouth & Snapping Jaws
        if (this.isBarking || this.isLunging) {
            // Mouth wide open snapping!
            fill(40, 15, 15);
            arc(-28, -2, 16, 16, 0, PI);
            // Sharp white teeth
            fill(255);
            triangle(-32, -2, -30, -2, -31, 2);
            triangle(-28, -2, -26, -2, -27, 2);
            // Panting tongue
            fill(244, 114, 182);
            ellipse(-26, 3, 9, 8);
        } else {
            fill(40, 20, 20);
            ellipse(-26, -2, 10, 6);
            fill(244, 114, 182);
            ellipse(-26, 2 + sin(this.animTimer * 0.4) * 2, 7, 10);
        }

        // Eye
        if (isHit || this.isDefeated) {
            stroke(220, 38, 38);
            strokeWeight(2);
            line(-24, -14, -18, -10);
            line(-18, -14, -24, -10);
        } else {
            noStroke();
            fill(255);
            ellipse(-22, -13, 7, 7);
            fill(25, 20, 15);
            ellipse(-23, -13, 4, 4);
            fill(255);
            ellipse(-24, -14, 1.5, 1.5);
        }

        // Splat on back
        if (isHit || this.isDefeated) {
            fill(110, 55, 20, 220);
            noStroke();
            ellipse(0, -6, 20, 12);
        }

        pop();
    }
}

// ----- 3. BIRD ENEMY (AERIAL PREDATOR) -----
class Bird extends Enemy {
    constructor(x, y) {
        super(x, y, 42, 2, 30, 45, "BIRD");
        this.angle = random(TWO_PI);
        this.wingFlapPhase = 0;
    }

    update(fly) {
        super.update(fly);
        if (this.isDefeated) return;

        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const myScreenX = this.x - screenX;

        // General leftward patrol drift
        this.x -= 1.6;
        this.angle += 0.05;
        this.y += sin(this.angle) * 1.8;

        // Aggressive dive attack when near fly
        let dx = fly.x - myScreenX;
        let dy = fly.y - this.y;
        let d = dist(fly.x, fly.y, myScreenX, this.y);

        if (d < 300) {
            let targetAngle = atan2(dy, dx);
            this.x += cos(targetAngle) * 3.4;
            this.y += sin(targetAngle) * 3.4;
        }

        this.wingFlapPhase += 0.38;
    }

    drawEnemy() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);

        let bank = sin(this.angle) * 0.25;
        rotate(bank);

        let isHit = this.hitTimer > 0;
        let flap = sin(this.wingFlapPhase) * 18;

        // Tail Feathers
        fill(70, 80, 95);
        noStroke();
        triangle(12, 0, 28, -6, 28, 6);

        // Lower Wing
        fill(85, 95, 115);
        push();
        translate(-2, -flap * 0.5);
        ellipse(-4, -14, 22, 14);
        pop();

        // Streamlined Torso
        fill(100, 115, 135);
        ellipse(0, 0, this.size, this.size * 0.55);

        // Breast plumage highlight
        fill(115, 140, 150);
        ellipse(-6, 2, 18, 12);

        // Head
        fill(90, 105, 125);
        ellipse(-16, -3, 14, 13);

        // Golden sharp beak
        fill(245, 180, 40);
        triangle(-22, -4, -22, -1, -30, -2);

        // Yellow talons tucked up
        stroke(230, 170, 30);
        strokeWeight(2);
        line(2, 6, -2, 11);
        line(6, 6, 4, 11);

        // Top Wing
        fill(120, 135, 160);
        noStroke();
        push();
        translate(-2, flap * 0.6);
        ellipse(-4, 4, 26, 16);
        fill(70, 80, 95);
        rect(-8, 3, 16, 2.5);
        rect(-6, 7, 12, 2.5);
        pop();

        // Eye
        if (isHit || this.isDefeated) {
            stroke(220, 38, 38);
            strokeWeight(2);
            line(-19, -5, -15, -1);
            line(-15, -5, -19, -1);
        } else {
            noStroke();
            fill(245, 160, 30);
            ellipse(-17, -3, 5, 5);
            fill(15);
            ellipse(-17, -3, 2.5, 2.5);
        }

        // Splat on feathers
        if (isHit || this.isDefeated) {
            fill(110, 55, 20, 220);
            ellipse(0, 0, 16, 10);
        }

        pop();
    }
}

// ----- 4. HUMAN ENEMY (ACTIVE PURSUIT, AIMED POWER SWAT & JUMPING SWAT) -----
class Human extends Enemy {
    constructor(x, y) {
        super(x, y, 46, 3, 999, 60, "HUMAN");
        this.swatPhase = 'IDLE'; // IDLE, WINDUP, STRIKE
        this.swatTimer = 0;
        this.armAngle = 0.2;
        this.targetAngle = 0;
        this.isJumping = false;
    }

    update(fly) {
        super.update(fly);
        if (this.isDefeated) return;

        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const flyScreenX = fly.x;
        const myScreenX = this.x - screenX;
        const dx = flyScreenX - myScreenX;
        const distToFly = dist(myScreenX, this.y, flyScreenX, fly.y);

        // Dynamic facing: always turns to face the fly!
        this.facing = dx < 0 ? -1 : 1;

        // Terrain Awareness: floor height
        const defaultFloor = height - 130;
        const groundLevel = getGroundSurface(this.x, defaultFloor);

        // Gravity & Jump Physics
        if (this.y < groundLevel) {
            this.vy += 0.5;
            this.onGround = false;
        } else {
            this.y = groundLevel;
            this.vy = 0;
            this.onGround = true;
            this.isJumping = false;
        }
        this.y += this.vy;

        // Active Footwork: moves forward/backward to position directly under or beside fly!
        if (this.swatPhase === 'IDLE') {
            if (abs(dx) > 110 && abs(dx) < 400) {
                this.x += this.facing * 2.2; // Step toward fly
            } else if (abs(dx) < 60) {
                this.x -= this.facing * 1.5; // Back up slightly for optimal swing!
            }
        }

        // ACTIVE HUNTING: Calculate aimed angle from shoulder to fly
        let shoulderX = myScreenX + (this.facing === -1 ? -14 : 14);
        let shoulderY = this.y - 20;
        this.targetAngle = atan2(fly.y - shoulderY, (flyScreenX - shoulderX) * this.facing);

        // Trigger Swat Attack when fly is within 220px!
        if (this.swatPhase === 'IDLE' && distToFly < 220) {
            this.swatPhase = 'WINDUP';
            this.swatTimer = 18; // Wind up anticipation
        }

        if (this.swatPhase === 'WINDUP') {
            this.swatTimer--;
            // Pull swatter back in anticipation
            this.armAngle = lerp(this.armAngle, -PI * 0.55, 0.25);

            if (this.swatTimer <= 0) {
                this.swatPhase = 'STRIKE';
                this.swatTimer = 16;

                // If fly is high up in the air, execute a JUMPING SWAT!
                if (fly.y < this.y - 60 && this.onGround) {
                    this.vy = -7.8;
                    this.isJumping = true;
                    this.onGround = false;
                }
            }
        } else if (this.swatPhase === 'STRIKE') {
            this.swatTimer--;
            // Violent aimed snap swing directly along the targeted angle!
            this.armAngle = lerp(this.armAngle, this.targetAngle + 0.3, 0.45);

            if (this.swatTimer <= 0) {
                this.swatPhase = 'IDLE';
                this.armAngle = 0.2;
            }
        }
    }

    drawEnemy() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        scale(this.facing, 1);

        let isHit = this.hitTimer > 0;
        let walkCycle = sin(this.animTimer * 0.16);

        // Warning Alert Icon when preparing to swat!
        if (this.swatPhase === 'WINDUP') {
            fill(239, 68, 68);
            noStroke();
            ellipse(0, -82, 20, 20);
            fill(255);
            textSize(14);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            text("!", 0, -82);
        }

        // Legs with Denim Jeans
        stroke(37, 99, 235);
        strokeWeight(12);
        if (this.isJumping) {
            line(-6, 30, -14, 70);
            line(6, 30, 8, 72);
        } else {
            line(-6, 30, -12 + walkCycle * 14, 85);
            line(6, 30, 12 - walkCycle * 14, 85);
        }

        // Shoes with white rubber soles
        stroke(30, 30, 35);
        strokeWeight(10);
        let footY = this.isJumping ? 70 : 85;
        line(-12 + walkCycle * 14, footY, -20 + walkCycle * 14, footY + 2);
        line(12 - walkCycle * 14, footY, 4 - walkCycle * 14, footY + 2);

        // Torso / Red Shirt
        noStroke();
        fill(220, 38, 38);
        rect(-16, -30, 32, 60, 4);
        fill(40, 30, 20);
        rect(-16, 26, 32, 6);
        fill(250, 204, 21);
        rect(-4, 25, 8, 8);

        // Head & Neck
        fill(245, 195, 160);
        rect(-6, -42, 12, 14);
        ellipse(0, -56, 30, 32);

        // Hair
        fill(60, 40, 25);
        arc(0, -60, 32, 26, PI, TWO_PI, CHORD);

        // Angry Face
        if (isHit || this.isDefeated) {
            stroke(220, 38, 38);
            strokeWeight(2);
            line(-8, -58, -4, -54);
            line(-4, -58, -8, -54);
        } else {
            // Intense angry brows
            stroke(40, 25, 15);
            strokeWeight(2.5);
            line(-10, -61, -3, -57);
            line(3, -57, 10, -61);
            noStroke();
            fill(20);
            ellipse(-6, -55, 3.5, 3.5);
            ellipse(6, -55, 3.5, 3.5);
            // Gritted teeth
            fill(255);
            rect(-6, -48, 12, 4);
        }

        // Swatter Arm Joint (aims directly at targeted flight angle)
        push();
        translate(-14, -20);
        rotate(this.armAngle);

        // Arm
        stroke(245, 195, 160);
        strokeWeight(9);
        line(0, 0, -28, 12);

        // Swatter Wire Handle
        stroke(140, 140, 150);
        strokeWeight(3.5);
        line(-28, 12, -78, 28);

        // Mesh Fly Swatter Head
        push();
        translate(-78, 28);
        rotate(-0.3);

        // Swat whoosh motion trail during strike!
        if (this.swatPhase === 'STRIKE') {
            noStroke();
            fill(239, 68, 68, 80);
            arc(0, 0, 80, 80, -PI * 0.4, PI * 0.4);
        }

        fill(239, 68, 68, 180);
        stroke(185, 28, 28);
        strokeWeight(2.5);
        rect(-18, -18, 36, 36, 4);

        // Mesh grid
        strokeWeight(1);
        line(-18, -6, 18, -6);
        line(-18, 6, 18, 6);
        line(-6, -18, -6, 18);
        line(6, -18, 6, 18);
        pop();

        pop();

        // Splat on shirt
        if (isHit || this.isDefeated) {
            fill(110, 55, 20, 230);
            noStroke();
            ellipse(4, -18, 18, 14);
        }

        pop();
    }
}

// ----- 5. CHILD ENEMY (FRANTIC RUNNER, JUMP SWAT & PAPER BALL THROW) -----
class Child extends Human {
    constructor(x, y) {
        super(x, y);
        this.size = 32;
        this.health = 2;
        this.damage = 45;
        this.points = 45;
        this.name = "KID";
        this.throwCooldown = 90;
        this.throwTimer = 0;
        this.isThrowing = false;
    }

    update(fly) {
        // Base Enemy update (not human update)
        this.animTimer++;
        if (this.hitTimer > 0) this.hitTimer--;
        if (this.isDefeated) {
            this.x -= 9;
            return;
        }

        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        const flyScreenX = fly.x;
        const myScreenX = this.x - screenX;
        const dx = flyScreenX - myScreenX;
        const distToFly = dist(myScreenX, this.y, flyScreenX, fly.y);

        this.facing = dx < 0 ? -1 : 1;

        // Terrain Awareness: floor height
        const defaultFloor = height - 85;
        const groundLevel = getGroundSurface(this.x, defaultFloor);

        if (this.y < groundLevel) {
            this.vy += 0.55;
            this.onGround = false;
        } else {
            this.y = groundLevel;
            this.vy = 0;
            this.onGround = true;
            this.isJumping = false;
        }
        this.y += this.vy;

        if (this.throwCooldown > 0) this.throwCooldown--;

        // Throwing Paper Ball Attack if fly is high up and out of reach
        if (this.isThrowing) {
            this.throwTimer--;
            this.vx *= 0.5;
            if (this.throwTimer === 12) {
                // Throw paper ball!
                enemyProjectiles.push(new PaperBall(this.x, this.y - 45, flyScreenX, fly.y));
            }
            if (this.throwTimer <= 0) {
                this.isThrowing = false;
            }
        } else if (distToFly < 420) {
            // Case A: Fly is elevated high -> Throw Paper Ball!
            if (this.onGround && this.throwCooldown <= 0 && fly.y < this.y - 100 && abs(dx) < 280) {
                this.isThrowing = true;
                this.throwTimer = 25;
                this.throwCooldown = 110;
                this.vx = 0;
            }
            // Case B: Close range -> Frantic sprint & jump swat!
            else if (distToFly < 180) {
                this.swatPhase = 'STRIKE';
                this.armAngle = sin(this.animTimer * 0.5) * 1.2;
                if (this.onGround && fly.y < this.y - 30 && random(1) < 0.08) {
                    this.vy = -8.5; // Jump swat!
                    this.isJumping = true;
                    this.onGround = false;
                }
            } else {
                // Fast sprint pursuit
                this.vx = this.facing * 4.2;
                this.armAngle = 0.2;
            }
        } else {
            this.vx = this.facing * 2.2;
        }

        this.x += this.vx;
    }

    drawEnemy() {
        const screenX = levelConfigs[currentLevel].isScrolling ? scrollX : 0;
        let drawX = this.x - screenX;

        push();
        translate(drawX, this.y);
        scale(this.facing, 1);

        let isHit = this.hitTimer > 0;
        let sprintCycle = sin(this.animTimer * 0.35);

        // Throwing text
        if (this.isThrowing) {
            fill(250, 204, 21);
            noStroke();
            textSize(12);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            text("TAKE THIS!", 0, -56);
        }

        // Kid Shorts & Striped Legs
        stroke(234, 179, 8);
        strokeWeight(7);
        if (this.isJumping) {
            line(-4, 18, -12, 42);
            line(4, 18, 10, 44);
        } else {
            line(-4, 18, -10 + sprintCycle * 16, 52);
            line(4, 18, 10 - sprintCycle * 16, 52);
        }

        // Denim Shorts
        noStroke();
        fill(30, 64, 175);
        rect(-11, 8, 22, 16, 2);

        // Striped T-Shirt
        fill(14, 165, 233);
        rect(-11, -22, 22, 32, 3);
        fill(255);
        rect(-11, -16, 22, 5);
        rect(-11, -6, 22, 5);

        // Head
        fill(254, 215, 170);
        ellipse(0, -34, 24, 24);

        // Backwards Baseball Cap
        fill(220, 38, 38);
        arc(0, -38, 26, 22, PI, TWO_PI, CHORD);
        fill(185, 28, 28);
        rect(8, -40, 10, 4, 2);

        // Face
        if (isHit || this.isDefeated) {
            stroke(220, 38, 38);
            strokeWeight(2);
            line(-5, -36, -1, -32);
            line(-1, -36, -5, -32);
        } else {
            noStroke();
            fill(25);
            ellipse(-4, -34, 3, 3);
            ellipse(4, -34, 3, 3);
            fill(239, 68, 68);
            arc(0, -28, 8, 6, 0, PI, CHORD);
        }

        // Plastic Neon Swatter Arm
        push();
        translate(-8, -14);
        rotate(this.armAngle);

        stroke(254, 215, 170);
        strokeWeight(6);
        line(0, 0, -20, 8);

        stroke(250, 204, 21);
        strokeWeight(3);
        line(-20, 8, -52, 16);

        push();
        translate(-52, 16);
        fill(163, 230, 53, 190);
        stroke(101, 163, 13);
        strokeWeight(2);
        rect(-12, -12, 24, 24, 3);
        pop();

        pop();

        // Splat mark
        if (isHit || this.isDefeated) {
            fill(110, 55, 20, 230);
            noStroke();
            ellipse(0, -10, 14, 10);
        }

        pop();
    }
}
`;
