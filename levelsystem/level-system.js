// Level System - XP Tracking und Local Storage
class LevelSystem {
    constructor() {
        this.xpPerSecond = 5;
        this.totalXP = 0;
        this.level = 1;
        this.xpForCurrentLevel = 0;
        this.xpNeededForNextLevel = 100;
        this.gold = 0;
        this.intervalId = null;
        this.lastUpdateTime = Date.now();
        
        this.loadFromStorage();
        this.init();
    }

    // XP für Level berechnen: Level N benötigt 100 * N XP
    calculateLevel(xp) {
        let level = 1;
        let xpNeeded = 0;
        
        while (xpNeeded <= xp) {
            xpNeeded += 100 * level;
            if (xpNeeded <= xp) {
                level++;
            }
        }
        
        // XP für aktuelles Level berechnen
        let xpForPreviousLevels = 0;
        for (let i = 1; i < level; i++) {
            xpForPreviousLevels += 100 * i;
        }
        
        const xpForCurrentLevel = xp - xpForPreviousLevels;
        const xpNeededForNextLevel = 100 * level;
        
        return {
            level: level,
            xpForCurrentLevel: xpForCurrentLevel,
            xpNeededForNextLevel: xpNeededForNextLevel
        };
    }

    // Daten aus Local Storage laden
    loadFromStorage() {
        const saved = localStorage.getItem('levelSystem');
        if (saved) {
            const data = JSON.parse(saved);
            this.totalXP = data.totalXP || 0;
            this.gold = data.gold || 0;
            this.lastUpdateTime = data.lastUpdateTime || Date.now();
            
            // Berechne Level basierend auf gespeichertem XP
            const levelData = this.calculateLevel(this.totalXP);
            this.level = levelData.level;
            this.xpForCurrentLevel = levelData.xpForCurrentLevel;
            this.xpNeededForNextLevel = levelData.xpNeededForNextLevel;
        }
    }

    // Daten in Local Storage speichern
    saveToStorage() {
        // Ensure we're saving the current state, not a stale copy
        const currentGold = this.gold;
        const currentXP = this.totalXP;
        const data = {
            totalXP: currentXP,
            gold: currentGold,
            lastUpdateTime: Date.now()
        };
        localStorage.setItem('levelSystem', JSON.stringify(data));
    }

    // XP hinzufügen
    addXP(amount) {
        this.totalXP += amount;
        
        const levelData = this.calculateLevel(this.totalXP);
        const oldLevel = this.level;
        this.level = levelData.level;
        this.xpForCurrentLevel = levelData.xpForCurrentLevel;
        this.xpNeededForNextLevel = levelData.xpNeededForNextLevel;
        
        this.updateUI();
        this.saveToStorage();
        
        // Level-Up Animation (optional)
        if (this.level > oldLevel) {
            this.onLevelUp();
        }
    }

    // Gold hinzufügen
    addGold(amount) {
        if (amount && amount > 0) {
            this.gold += amount;
            this.updateUI();
            this.saveToStorage();
        }
    }

    // UI aktualisieren
    updateUI() {
        const levelValueEl = document.getElementById('level-value');
        const xpProgressFillEl = document.getElementById('xp-progress-fill');
        const xpTextEl = document.getElementById('xp-text');
        const goldValueEl = document.getElementById('gold-value');
        
        if (levelValueEl) {
            levelValueEl.textContent = this.level;
        }
        
        if (xpProgressFillEl) {
            const progressPercent = (this.xpForCurrentLevel / this.xpNeededForNextLevel) * 100;
            xpProgressFillEl.style.width = `${Math.min(progressPercent, 100)}%`;
        }
        
        if (xpTextEl) {
            xpTextEl.textContent = `${this.xpForCurrentLevel}/${this.xpNeededForNextLevel} XP`;
        }
        
        if (goldValueEl) {
            goldValueEl.textContent = this.gold.toLocaleString();
        }
    }

    // Level-Up Event
    onLevelUp() {
        // Optional: Animation oder Notification
        console.log(`Level Up! Du bist jetzt Level ${this.level}!`);
    }

    // XP-Timer starten
    startXPTimer() {
        // Berechne vergangene Zeit seit letztem Update
        const now = Date.now();
        const timeDiff = (now - this.lastUpdateTime) / 1000; // in Sekunden
        
        if (timeDiff > 0) {
            // Füge XP für vergangene Zeit hinzu (maximal 5 Minuten offline)
            const maxOfflineTime = 300; // 5 Minuten
            const offlineTime = Math.min(timeDiff, maxOfflineTime);
            this.addXP(Math.floor(offlineTime * this.xpPerSecond));
        }
        
        // Starte Timer für kontinuierliche XP
        this.intervalId = setInterval(() => {
            this.addXP(this.xpPerSecond);
        }, 1000);
    }

    // Timer stoppen
    stopXPTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.saveToStorage();
    }

    // Initialisierung
    init() {
        // Warte bis Header geladen ist
        const checkHeader = setInterval(() => {
            const levelValueEl = document.getElementById('level-value');
            if (levelValueEl) {
                clearInterval(checkHeader);
                this.updateUI();
                this.startXPTimer();
                
                // Speichere beim Verlassen der Seite
                window.addEventListener('beforeunload', () => {
                    this.stopXPTimer();
                });
                
                // Speichere auch bei Tab-Wechsel (optional)
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        this.stopXPTimer();
                    } else {
                        this.startXPTimer();
                    }
                });
            }
        }, 100);
    }
}

// Level System initialisieren
let levelSystem;

function initLevelSystem() {
    if (!levelSystem) {
        levelSystem = new LevelSystem();
    }
}

// Initialisierung beim DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // Warte kurz, damit Header geladen werden kann
    setTimeout(() => {
        initLevelSystem();
    }, 200);
});

