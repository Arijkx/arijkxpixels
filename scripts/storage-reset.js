// Storage Reset & Backup System
class StorageReset {
    constructor() {
        this.storageKeys = [
            'levelSystem',
            'questSystem',
            'purchasedRewards',
            'hasVisited' // Optional: first visit flag
        ];
    }

    // Get all current storage data
    getAllStorageData() {
        const data = {};
        this.storageKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value) {
                data[key] = value;
            }
        });
        return data;
    }

    // Reset all storage data
    resetAllData() {
        this.showResetPopup();
    }

    // Show reset confirmation popup
    showResetPopup() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'storage-reset-popup-overlay';

        // Create popup
        const popup = document.createElement('div');
        popup.className = 'storage-reset-popup';

        popup.innerHTML = `
            <div class="storage-reset-popup-content">
                <h2 class="storage-reset-popup-title">Reset All Data</h2>
                <div class="storage-reset-popup-message">
                    <p><strong style="color: #ff6b6b;">WARNING: This action cannot be undone!</strong></p>
                    <p>This will permanently delete ALL your saved data:</p>
                    <ul class="storage-reset-list">
                        <li>Your Level and all accumulated XP</li>
                        <li>All your Gold</li>
                        <li>All Quest progress (all quests will be reset to uncompleted)</li>
                        <li>All unlocked Rewards (you will need to unlock them again with Gold)</li>
                        <li>First visit flag</li>
                    </ul>
                    <p style="margin-top: 20px; color: #ff6b6b;"><strong>Are you absolutely sure you want to continue?</strong></p>
                </div>
                <div class="storage-reset-popup-buttons">
                    <button class="storage-reset-popup-button storage-reset-cancel" onclick="storageReset.closeResetPopup(this.closest('.storage-reset-popup-overlay'))">Cancel</button>
                    <button class="storage-reset-popup-button storage-reset-confirm" onclick="storageReset.confirmReset(this.closest('.storage-reset-popup-overlay'))">Reset All Data</button>
                </div>
            </div>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        // Animate in
        setTimeout(() => {
            overlay.classList.add('show');
        }, 10);

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeResetPopup(overlay);
            }
        });

        // Close on ESC key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeResetPopup(overlay);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    // Close reset popup
    closeResetPopup(overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            if (overlay.parentNode) {
                document.body.removeChild(overlay);
            }
        }, 300);
    }

    // Confirm reset
    confirmReset(overlay) {
        // Close popup first
        this.closeResetPopup(overlay);

        // Stop level system timer to prevent it from saving data on reload
        if (levelSystem && levelSystem.stopXPTimer) {
            levelSystem.stopXPTimer();
        }

        // Remove all storage keys immediately
        this.storageKeys.forEach(key => {
            localStorage.removeItem(key);
        });

        // Also clear sessionStorage for quest notifications
        sessionStorage.removeItem('pendingQuestNotification');

        // Set a flag to prevent level system from saving on beforeunload
        sessionStorage.setItem('resetInProgress', 'true');

        // Show success message
        this.showNotification('All data has been reset!', 'success');

        // Reload page immediately (no delay needed)
        // The sessionStorage flag will be checked on reload
        window.location.reload();
    }

    // Download backup
    downloadBackup() {
        // Ensure we get the latest data from level system before backing up
        if (levelSystem && levelSystem.saveToStorage) {
            levelSystem.saveToStorage();
        }

        const data = this.getAllStorageData();
        
        if (Object.keys(data).length === 0) {
            this.showNotification('No data to backup!', 'error');
            return;
        }

        // Add metadata
        const backup = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            data: data
        };

        // Create download
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `arijkxpixels-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showNotification('Backup downloaded successfully!', 'success');
    }

    // Upload and restore backup
    uploadBackup() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const backup = JSON.parse(event.target.result);
                    
                    // Validate backup structure
                    if (!backup.data || typeof backup.data !== 'object') {
                        throw new Error('Invalid backup file format');
                    }

                    // Confirm restore
                    if (!confirm('This will overwrite all current data with the backup. Are you sure?')) {
                        return;
                    }

                    // Stop level system timer before restoring
                    if (levelSystem && levelSystem.stopXPTimer) {
                        levelSystem.stopXPTimer();
                    }

                    // Restore data
                    Object.keys(backup.data).forEach(key => {
                        localStorage.setItem(key, backup.data[key]);
                    });

                    // Force level system to reload data if it exists
                    if (levelSystem && levelSystem.loadFromStorage) {
                        levelSystem.loadFromStorage();
                        if (levelSystem.updateUI) {
                            levelSystem.updateUI();
                        }
                    }

                    this.showNotification('Backup restored successfully!', 'success');

                    // Reload page after a short delay to apply changes
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);

                } catch (error) {
                    console.error('Error restoring backup:', error);
                    this.showNotification('Error: Invalid backup file!', 'error');
                }
            };

            reader.onerror = () => {
                this.showNotification('Error reading backup file!', 'error');
            };

            reader.readAsText(file);
        };

        input.click();
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `storage-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Initialize UI
    init() {
        // Wait for DOM to be ready
        const checkDOM = setInterval(() => {
            const resetButton = document.getElementById('reset-storage-button');
            const downloadButton = document.getElementById('download-backup-button');
            const uploadButton = document.getElementById('upload-backup-button');

            if (resetButton && downloadButton && uploadButton) {
                clearInterval(checkDOM);

                resetButton.addEventListener('click', () => {
                    this.resetAllData();
                });

                downloadButton.addEventListener('click', () => {
                    this.downloadBackup();
                });

                uploadButton.addEventListener('click', () => {
                    this.uploadBackup();
                });
            }
        }, 100);
    }
}

// Initialize when DOM is ready
let storageReset;
document.addEventListener('DOMContentLoaded', () => {
    storageReset = new StorageReset();
    storageReset.init();
});

