// Dynamic narrative transitions based on location names and exit types
export const TRANSITIONS_CODE = `
// ----- NARRATIVE TRANSITION SYSTEM -----
let activeTransition = null;

const LOCATION_TAGLINES = {
    1: { name: "Outdoors", tag: "Sunny Sidewalks, Busy Pavements & Hungry Pigeons" },
    2: { name: "Upstairs Bedroom", tag: "Cozy Carpets, Scattered Clothes & The Giant Human" },
    3: { name: "The Sewer", tag: "Murky Depths, Toxic Slime & Scurrying Sewer Rats" },
    4: { name: "The Attic", tag: "Dusty Rafters, Ancient Boxes & Sticky Spiderwebs" },
    5: { name: "The Bathroom", tag: "Slippery Porcelain, Steamy Mirrors & Splashing Sinks" },
    6: { name: "The Hall", tag: "Polished Hardwood, Ticking Clocks & Lofty Ceilings" },
    7: { name: "The Kitchen", tag: "Delicious Food Crumbs, Sizzling Stoves & Danger" }
};

let arrivalBanner = {
    level: 1,
    alpha: 0,
    timer: 0
};

function startTransition(exit) {
    const fromLevel = currentLevel;
    const toLevel = exit.toLevel;
    const fromName = levelConfigs[fromLevel] ? levelConfigs[fromLevel].name : 'Unknown';
    const toName = levelConfigs[toLevel] ? levelConfigs[toLevel].name : 'Unknown';
    const label = (exit.label || '').trim().toLowerCase();

    // Determine narrative theme based on exit label and connected locations
    let type = 'DOOR';
    let title = 'TRANSIT';
    let narrative = \`Moving from \${fromName} to \${toName}...\`;

    if (label.includes('window') || toName.includes('Outdoors') && label.includes('window')) {
        type = 'WINDOW';
        title = 'THROUGH THE WINDOW SASH';
        narrative = fromLevel === 1 
            ? 'Squeezing past the billowing lace curtains into the cozy bedroom!'
            : 'Escaping through the open glass window into the breezy outdoor sky!';
    } else if (label.includes('manhole')) {
        type = 'MANHOLE';
        title = 'CLIMBING UP THE MANHOLE';
        narrative = 'Ascending the rusty iron rungs into blinding outdoor sunshine!';
    } else if (label.includes('drain') || label.includes('sink') || toLevel === 3) {
        type = 'DRAIN';
        title = 'PLUNGING DOWN THE DRAIN';
        narrative = 'Whirling through soapy whirlpool water into the deep, dark sewer pipes!';
    } else if (label.includes('attic')) {
        type = 'ATTIC_HATCH';
        title = 'ASCENDING INTO THE ATTIC';
        narrative = 'Crawling up through the creaky ceiling hatch into dusty rafters!';
    } else if (label.includes('vent')) {
        type = 'VENT';
        title = 'RIDING THE AIR VENT DUCT';
        narrative = 'Whooshing through galvanized steel air conditioning ducts to the outside!';
    } else if (label.includes('stairs')) {
        type = 'STAIRS';
        title = 'BUZZING DOWN THE STAIRS';
        narrative = 'Gliding past polished wooden banister posts down to the kitchen floor!';
    } else if (label.includes('pipe')) {
        type = 'PIPE';
        title = 'SLIDING DOWN WALL PIPES';
        narrative = 'Following copper pipes through wall studs down into the kitchen!';
    } else {
        type = 'DOOR';
        title = 'SLIPPING UNDER THE DOOR';
        narrative = \`Navigating the doorway from \${fromName} into \${toName}!\`;
    }

    activeTransition = {
        fromLevel,
        toLevel,
        fromName,
        toName,
        label: exit.label || '',
        type,
        title,
        narrative,
        duration: 90, // ~1.5 seconds at 60fps
        timer: 0,
        swirlParticles: []
    };

    // Initialize custom transition particles
    for (let i = 0; i < 35; i++) {
        activeTransition.swirlParticles.push({
            x: random(width),
            y: random(height),
            vx: random(-3, 3),
            vy: random(-3, 3),
            size: random(3, 10),
            rot: random(TWO_PI),
            vRot: random(-0.1, 0.1),
            color: type === 'DRAIN' ? color(80, random(160, 240), 220, 200) :
                   type === 'WINDOW' ? color(255, 255, random(180, 255), 180) :
                   type === 'ATTIC_HATCH' ? color(240, 210, 160, 160) :
                   color(255, 255, 255, 180)
        });
    }

    gameState = 'TRANSITION';
}

function updateAndDrawTransition() {
    if (!activeTransition) {
        gameState = 'PLAYING';
        return;
    }

    activeTransition.timer++;
    const t = activeTransition.timer / activeTransition.duration; // 0.0 to 1.0

    // Switch level halfway through the transition so new scene loads underneath
    if (activeTransition.timer === Math.floor(activeTransition.duration / 2)) {
        changeLevel(activeTransition.toLevel);
    }

    // Draw backdrop based on transition type
    drawTransitionBackdrop(t);

    // Cinematic Letterbox bars
    const barHeight = min(60, sin(t * PI) * 70);
    fill(10, 12, 18);
    noStroke();
    rect(0, 0, width, barHeight);
    rect(0, height - barHeight, width, barHeight);

    // Draw Narrative Typography Overlay
    drawTransitionText(t);

    // End transition
    if (activeTransition.timer >= activeTransition.duration) {
        triggerArrivalBanner(activeTransition.toLevel);
        activeTransition = null;
        gameState = 'PLAYING';
    }
}

function drawTransitionBackdrop(t) {
    const type = activeTransition.type;
    const midX = width / 2;
    const midY = height / 2;

    if (type === 'WINDOW') {
        // Outdoors <-> Indoors Window Zoom
        let bgCol = lerpColor(color(135, 206, 235), color(30, 40, 60), t);
        background(bgCol);

        push();
        translate(midX, midY);
        let scaleVal = map(t, 0, 1, 0.7, 2.8);
        scale(scaleVal);

        // Window Frame
        stroke(245, 240, 230);
        strokeWeight(12);
        fill(200, 235, 255, 140);
        rect(-180, -220, 360, 440, 12);

        // Panes divider
        stroke(240, 235, 220);
        strokeWeight(8);
        line(0, -220, 0, 220);
        line(-180, 0, 180, 0);

        // Billowing lace curtain
        noStroke();
        fill(255, 255, 255, 180);
        for (let side = -1; side <= 1; side += 2) {
            beginShape();
            vertex(side * 180, -220);
            for (let y = -220; y <= 220; y += 30) {
                let wave = sin(frameCounter * 0.1 + y * 0.05) * 25 * side;
                vertex(side * (120 + wave), y);
            }
            vertex(side * 180, 220);
            endShape(CLOSE);
        }

        // Sunbeam shafts
        fill(255, 245, 180, 50);
        quad(-100, -220, 100, -220, 300, 220, -300, 220);
        pop();

    } else if (type === 'DRAIN') {
        // Whirling drainage vortex
        background(15, 25, 25);
        push();
        translate(midX, midY);

        // Spiraling vortex rings
        noFill();
        for (let r = 350; r > 20; r -= 25) {
            let rot = t * 15 + r * 0.05;
            stroke(40 + r * 0.2, 130 + r * 0.3, 140 + r * 0.2, 190);
            strokeWeight(8 + sin(r + frameCounter * 0.1) * 3);
            ellipse(0, 0, r + sin(rot) * 20, (r + cos(rot) * 20) * 0.6);
        }

        // Swirling drain hole in center
        fill(5, 8, 10);
        noStroke();
        ellipse(0, 0, 80, 50);

        // Soap suds bubbles
        fill(220, 255, 240, 180);
        for (let i = 0; i < 12; i++) {
            let angle = t * 8 + i * (TWO_PI / 12);
            let rad = map(t, 0, 1, 300, 40) * (0.8 + sin(i) * 0.2);
            ellipse(cos(angle) * rad, sin(angle) * rad * 0.6, 12, 12);
        }
        pop();

    } else if (type === 'MANHOLE') {
        // Looking up from sewer into daylight
        background(20, 20, 25);
        push();
        translate(midX, midY);

        // Opening manhole circle expanding
        let manholeRadius = map(t, 0, 1, 50, 420);
        
        // Sunlight burst
        fill(255, 250, 210);
        ellipse(0, 0, manholeRadius * 2);

        // Sunburst rays
        stroke(255, 240, 170, 120);
        strokeWeight(6);
        for (let a = 0; a < TWO_PI; a += PI / 8) {
            line(0, 0, cos(a + t * 2) * (manholeRadius + 120), sin(a + t * 2) * (manholeRadius + 120));
        }

        // Iron rim of manhole
        noFill();
        stroke(70, 70, 80);
        strokeWeight(24);
        ellipse(0, 0, manholeRadius * 2);

        // Cast iron ladder rungs
        stroke(110, 105, 95);
        strokeWeight(12);
        for (let ry = -180; ry < 220; ry += 70) {
            line(-80, ry, 80, ry);
        }
        pop();

    } else if (type === 'ATTIC_HATCH') {
        // Creaky ceiling hatch opening into dusty beams
        background(35, 28, 22);
        push();
        translate(midX, midY);

        // Angled timber rafters
        stroke(90, 65, 45);
        strokeWeight(18);
        line(-width/2, -150, width/2, -150);
        line(-width/2, 180, width/2, 180);
        line(-180, -200, -180, 200);
        line(180, -200, 180, 200);

        // Trapdoor opening
        let doorAngle = map(t, 0, 1, 0, PI / 2.5);
        fill(140, 100, 65);
        noStroke();
        rect(-140, -140, 280, 280);

        // Golden light shafts cutting through
        fill(255, 220, 120, 70);
        quad(-60, -140, 60, -140, 200, 300, -200, 300);

        // Dangling pull string swinging
        stroke(220, 210, 180);
        strokeWeight(3);
        let sway = sin(frameCounter * 0.15) * 35;
        line(0, -140, sway, 80);
        fill(200, 160, 90);
        noStroke();
        ellipse(sway, 85, 16, 24);
        pop();

    } else if (type === 'STAIRS') {
        // Wooden staircase rushing down
        background(45, 30, 20);
        push();
        translate(midX, midY);

        let stepOffset = (t * 400) % 80;
        stroke(30, 18, 10);
        strokeWeight(4);

        for (let i = -5; i < 8; i++) {
            let sy = i * 65 + stepOffset - 50;
            // Tread
            fill(180, 120, 70);
            quad(-width/2, sy, width/2, sy - 80, width/2, sy - 50, -width/2, sy + 30);
            // Riser
            fill(120, 75, 40);
            quad(-width/2, sy + 30, width/2, sy - 50, width/2, sy - 20, -width/2, sy + 60);
        }

        // Polished banister railing
        stroke(210, 160, 90);
        strokeWeight(16);
        line(-width/2, -180 + stepOffset, width/2, height/2 + stepOffset);
        pop();

    } else if (type === 'VENT') {
        // Galvanized HVAC duct rushing air
        background(70, 75, 85);
        push();
        translate(midX, midY);

        // Tunnel perspective
        noFill();
        for (let s = 100; s < 700; s += 80) {
            let sz = (s + t * 160) % 700;
            stroke(140, 150, 165, map(sz, 100, 700, 255, 30));
            strokeWeight(10);
            rect(-sz/2, -sz/3, sz, sz * 0.66, 8);
        }

        // Louver blades
        stroke(180, 190, 205);
        strokeWeight(6);
        for (let ly = -120; ly <= 120; ly += 40) {
            line(-250, ly, 250, ly);
        }
        pop();

    } else {
        // Classic Door Opening
        background(25, 20, 30);
        push();
        translate(midX, midY);

        // Door Frame
        stroke(160, 130, 95);
        strokeWeight(16);
        fill(255, 245, 210, map(t, 0, 1, 40, 255)); // Light flooding in
        rect(-140, -220, 280, 440);

        // Door panel swinging open
        let openAmount = map(t, 0, 1, 0, 1);
        let doorW = 280 * (1 - openAmount * 0.85);
        fill(110, 70, 40);
        stroke(70, 45, 25);
        strokeWeight(6);
        rect(-140, -220, doorW, 440);

        // Brass doorknob
        fill(240, 200, 80);
        noStroke();
        ellipse(-140 + doorW - 25, 20, 22, 22);
        pop();
    }

    // Swirl atmospheric particles
    for (let p of activeTransition.swirlParticles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        push();
        translate(p.x, p.y);
        rotate(p.rot);
        fill(p.color);
        noStroke();
        ellipse(0, 0, p.size, p.size * 0.6);
        pop();
    }

    // Animated Fly flying through the transition!
    push();
    let flyScreenX = lerp(width * 0.2, width * 0.8, t);
    let flyScreenY = height / 2 + sin(t * TWO_PI * 2) * 45;
    let flyScale = sin(t * PI) * 0.8 + 1.0;

    translate(flyScreenX, flyScreenY);
    scale(flyScale);
    drawFlySilhouette();
    pop();
}

function drawFlySilhouette() {
    push();
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
    fill(200, 200, 255, 180);
    ellipse(-sz * 0.6, 0, sz, sz * 0.5);
    ellipse(sz * 0.6, 0, sz, sz * 0.5);

    // Speed lines
    stroke(255, 255, 255, 140);
    strokeWeight(2);
    line(-25, -6, -45, -6);
    line(-20, 6, -50, 6);
    pop();
}

function drawTransitionText(t) {
    push();
    textAlign(CENTER, CENTER);

    // Entrance and exit fade envelope
    let textAlpha = sin(t * PI) * 255;
    
    // Top banner badge: Action Title
    fill(0, 0, 0, textAlpha * 0.7);
    noStroke();
    rect(width/2 - 260, height * 0.22 - 25, 520, 50, 8);
    stroke(255, 215, 0, textAlpha * 0.8);
    strokeWeight(1.5);
    noFill();
    rect(width/2 - 260, height * 0.22 - 25, 520, 50, 8);

    noStroke();
    fill(255, 220, 80, textAlpha);
    textSize(22);
    textStyle(BOLD);
    text(activeTransition.title, width / 2, height * 0.22);

    // Center Big Location Route
    fill(255, 255, 255, textAlpha);
    textSize(34);
    textStyle(BOLD);
    text(\`\${activeTransition.fromName}  ➔  \${activeTransition.toName}\`, width / 2, height * 0.72);

    // Narrative flavor text
    fill(230, 240, 255, textAlpha * 0.9);
    textSize(16);
    textStyle(NORMAL);
    text(activeTransition.narrative, width / 2, height * 0.78);

    // Skip cue at bottom
    fill(180, 190, 210, textAlpha * 0.6);
    textSize(12);
    text("[ CLICK or SPACE to skip ]", width / 2, height - 25);
    pop();
}

function triggerArrivalBanner(level) {
    arrivalBanner = {
        level,
        alpha: 255,
        timer: 150 // Display for 2.5 seconds
    };
}

function drawArrivalBanner() {
    if (arrivalBanner.timer <= 0) return;
    arrivalBanner.timer--;

    let fadeAlpha = min(255, arrivalBanner.timer * 3);
    const locInfo = LOCATION_TAGLINES[arrivalBanner.level] || { name: "Mystery Zone", tag: "Beware of dangers!" };

    push();
    textAlign(CENTER, TOP);
    let boxW = 540;
    let boxH = 58;
    let boxX = width / 2 - boxW / 2;
    let boxY = 65;

    // Elegant card background
    fill(15, 20, 28, fadeAlpha * 0.85);
    stroke(255, 215, 0, fadeAlpha * 0.7);
    strokeWeight(1.5);
    rect(boxX, boxY, boxW, boxH, 8);

    // Location Name
    noStroke();
    fill(255, 255, 255, fadeAlpha);
    textSize(20);
    textStyle(BOLD);
    text(locInfo.name.toUpperCase(), width / 2, boxY + 8);

    // Subtitle tagline
    fill(200, 220, 245, fadeAlpha * 0.9);
    textSize(13);
    textStyle(NORMAL);
    text(locInfo.tag, width / 2, boxY + 34);
    pop();
}
`;
