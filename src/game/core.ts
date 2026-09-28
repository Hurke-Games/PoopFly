// Core types and state management for Poop Fly
export const CORE_CODE = `
// ----- GAME STATE MANAGEMENT -----
let gameState = 'MENU'; // MENU, SETTINGS, PLAYING, TRANSITION, GAME_OVER
let currentLevel = 1;
let score = 0;
let scrollX = 0;
let levelHistory = [];
let frameCounter = 0;

// ----- GAME OBJECTS & ARRAYS -----
let fly;
let poops = [];
let enemies = [];
let foods = [];
let levelObjects = []; 
let backgroundObjects = [];
let exits = [];
let particles = [];
let scorePopups = [];
let enemyProjectiles = [];

// ----- GAME CONFIGURATION -----
let settings = {
    flySpeed: 4.2,
    gravity: 0.08,
    scrollSpeed: 1.6,
    spawnRates: {
        food: 0.010,
        enemy: 0.005,
        exit: 0.012,
    },
    levels: {
        1: { enemies: { rat: true, dog: true, bird: true, human: false, child: false } },
        2: { enemies: { rat: true, dog: false, bird: false, human: true, child: true } },
        3: { enemies: { rat: true, dog: true, bird: false, human: false, child: false } },
        4: { enemies: { rat: true, dog: false, bird: true, human: false, child: false } },
        5: { enemies: { rat: false, dog: false, bird: false, human: false, child: true } },
        6: { enemies: { rat: true, dog: true, bird: false, human: true, child: false } },
        7: { enemies: { rat: true, dog: true, bird: false, human: true, child: true } },
    }
};

let selectedLevelSettings = 1;
let controlScheme = 'MOUSE'; // 'MOUSE' or 'KEYBOARD'
`;
