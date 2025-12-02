// Unlock Rewards System
class UnlockRewards {
    constructor() {
        this.rewards = [
            {
                id: 'fallen_kingdom_standard',
                title: 'Fallen Kingdom Standard',
                description: 'Explore deeper into the mysterious ruins. The standard wallpaper.',
                image: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_wallpaper.png',
                price: 50,
                file: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_wallpaper.png',
                tags: ['1280x720', 'wallpaper', 'PNG',]
            },
            {
                id: 'fallen_kingdom_blue_portal',
                title: 'Fallen Kingdom Blue Portal',
                description: 'Explore deeper into the mysterious ruins. With a blue portal.',
                image: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_wallpaper_2.png',
                price: 75,
                file: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_wallpaper_2.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'fallen_kingdom_red_portal',
                title: 'Fallen Kingdom Red Portal',
                description: 'Explore deeper into the mysterious ruins. With a red portal.',
                image: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_wallpaper_5.png',
                price: 75,
                file: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_wallpaper_5.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'fallen_kingdom_blue_portal_shield',
                title: 'Fallen Kingdom B. Portal & Shield',
                description: 'Explore deeper into the mysterious ruins. With a blue portal and a shield.',
                image: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_wallpaper_3.png',
                price: 75,
                file: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_wallpaper_3.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'fallen_kingdom_red_portal_shield',
                title: 'Fallen Kingdom R. Portal & Shield',
                description: 'Explore deeper into the mysterious ruins. With a red portal and a shield.',
                image: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_wallpaper_4.png',
                price: 75,
                file: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_wallpaper_4.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'fallen_kingdom_light_portal_shield',
                title: 'Fallen Kingdom Light Portal & Shield',
                description: 'An epic sci-fi pixel art scene of Martian invasion. Earth strikes back.',
                image: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_portal&shield_3840x2160.png',
                price: 80,
                file: 'wallpaper/arijkx_pixels_wallpaper_fallen_kingdom_portal&shield_3840x2160.png',
                tags: ['3840x2160', 'wallpaper', 'PNG']
            },
            {
                id: 'invasion_mars',
                title: 'Invasion on Mars - Earth strikes back',
                description: 'An epic sci-fi pixel art scene of Martian invasion. Earth strikes back.',
                image: 'wallpaper/arijkx_pixels_wallpaper_INVASION_ON_MARS_1280x720_Original_SIZE.png',
                price: 80,
                file: 'wallpaper/arijkx_pixels_wallpaper_INVASION_ON_MARS_1280x720_Original_SIZE.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'mars_city_1',
                title: 'Mars City before the invasion Part 1',
                description: 'A futuristic pixel art cityscape on Mars. Explore the red planet\'s urban landscape.',
                image: 'wallpaper/arijkx_pixels_wallpaper_1280x720p_mars_city1.png',
                price: 70,
                file: 'wallpaper/arijkx_pixels_wallpaper_1280x720p_mars_city1.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'mars_city_2',
                title: 'Mars City before the invasion Part 2',
                description: 'A futuristic pixel art cityscape on Mars. Explore the red planet\'s urban landscape.',
                image: 'wallpaper/arijkx_pixels_wallpaper_1280x720p_mars_city2.png',
                price: 70,
                file: 'wallpaper/arijkx_pixels_wallpaper_1280x720p_mars_city2.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'mars_city_3',
                title: 'Mars City before the invasion Part 3',
                description: 'A futuristic pixel art cityscape on Mars. Explore the red planet\'s urban landscape.',
                image: 'wallpaper/arijkx_pixels_wallpaper_1280x720p_mars_city3.png',
                price: 70,
                file: 'wallpaper/arijkx_pixels_wallpaper_1280x720p_mars_city3.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            }
        
        ];
        
        this.purchasedRewards = this.loadPurchasedRewards();
    }
    
    loadPurchasedRewards() {
        const saved = localStorage.getItem('purchasedRewards');
        return saved ? JSON.parse(saved) : [];
    }
    
    savePurchasedRewards() {
        localStorage.setItem('purchasedRewards', JSON.stringify(this.purchasedRewards));
    }
    
    isPurchased(rewardId) {
        return this.purchasedRewards.includes(rewardId);
    }
    
    purchaseReward(rewardId) {
        const reward = this.rewards.find(r => r.id === rewardId);
        if (!reward) return false;
        
        if (this.isPurchased(rewardId)) {
            return true; // Already purchased
        }
        
        if (!levelSystem) {
            alert('Level System not loaded!');
            return false;
        }
        
        if (levelSystem.gold < reward.price) {
            this.showNotEnoughGoldPopup(reward.price, levelSystem.gold);
            return false;
        }
        
        // Deduct gold
        levelSystem.gold -= reward.price;
        levelSystem.saveToStorage();
        levelSystem.updateUI();
        
        // Add to purchased list
        this.purchasedRewards.push(rewardId);
        this.savePurchasedRewards();
        
        return true;
    }
    
    downloadReward(rewardId) {
        const reward = this.rewards.find(r => r.id === rewardId);
        if (!reward) return false;
        
        if (!this.isPurchased(rewardId)) {
            alert('You need to unlock this reward first!');
            return false;
        }
        
        // Create download link
        const link = document.createElement('a');
        link.href = reward.file;
        link.download = reward.file.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
    }
    
    updateUI() {
        const container = document.getElementById('wallpaper-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.rewards.forEach(reward => {
            const card = document.createElement('div');
            card.className = 'wallpaper-card';
            
            const isPurchased = this.isPurchased(reward.id);
            
            if (isPurchased) {
                card.classList.add('purchased');
            }
            
            card.innerHTML = `
                <div class="wallpaper-image-container">
                    <div class="wallpaper-expand-icon" onclick="unlockRewards.showPreview('${reward.id}')" title="Click to expand">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                        </svg>
                    </div>
                    <img src="${reward.image}" alt="${reward.title}" class="wallpaper-image" onclick="unlockRewards.showPreview('${reward.id}')" style="cursor: pointer;" draggable="false" oncontextmenu="return false;" onselectstart="return false;">
                    ${isPurchased ? '<div class="purchased-badge">Purchased</div>' : ''}
                </div>
                <div class="wallpaper-info">
                    <h3 class="wallpaper-title">${reward.title}</h3>
                    ${reward.description ? `<p class="wallpaper-description">${reward.description}</p>` : ''}
                    <div class="wallpaper-meta">
                        <div class="wallpaper-tags">
                            ${reward.tags ? reward.tags.map(tag => {
                                if (tag === 'PNG') {
                                    return `<div class="wallpaper-format">${tag}</div>`;
                                } else {
                                    return `<div class="wallpaper-type-badge">${tag}</div>`;
                                }
                            }).join('') : ''}
                        </div>
                        <div class="wallpaper-price-container">
                            <div class="wallpaper-price-label">Price</div>
                            <div class="wallpaper-price-badge">${reward.price} Gold</div>
                        </div>
                    </div>
                    ${isPurchased 
                        ? `<button class="wallpaper-button download-button" onclick="unlockRewards.downloadReward('${reward.id}')">Download</button>`
                        : `<button class="wallpaper-button buy-button" onclick="unlockRewards.buyReward('${reward.id}')">Unlock</button>`
                    }
                </div>
            `;
            
            // Additional protection: prevent right-click and drag on preview images
            const cardImage = card.querySelector('.wallpaper-image');
            if (cardImage) {
                cardImage.addEventListener('contextmenu', (e) => e.preventDefault());
                cardImage.addEventListener('dragstart', (e) => e.preventDefault());
                cardImage.addEventListener('selectstart', (e) => e.preventDefault());
            }
            
            container.appendChild(card);
        });
    }
    
    buyReward(rewardId) {
        if (this.purchaseReward(rewardId)) {
            this.updateUI();
            // Show success notification
            this.showNotification(`Reward unlocked! You can now download it.`, 'success');
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `wallpaper-notification ${type}`;
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
    
    showNotEnoughGoldPopup(requiredGold, currentGold) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'wallpaper-popup-overlay';
        
        // Create popup
        const popup = document.createElement('div');
        popup.className = 'wallpaper-popup';
        
        popup.innerHTML = `
            <div class="wallpaper-popup-content">
                <h2 class="wallpaper-popup-title">Not Enough Gold!</h2>
                <div class="wallpaper-popup-message">
                    <p>You need <span class="gold-highlight">${requiredGold} Gold</span> to unlock this reward.</p>
                    <p>You currently have <span class="gold-highlight">${currentGold} Gold</span>.</p>
                    <p class="wallpaper-popup-difference">You need <span class="gold-highlight">${requiredGold - currentGold} more Gold</span>.</p>
                </div>
                <button class="wallpaper-popup-button" onclick="this.closest('.wallpaper-popup-overlay').remove()">OK</button>
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
                this.closePopup(overlay);
            }
        });
        
        // Close on ESC key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closePopup(overlay);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    closePopup(overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            if (overlay.parentNode) {
                document.body.removeChild(overlay);
            }
        }, 300);
    }
    
    showPreview(rewardId) {
        const reward = this.rewards.find(r => r.id === rewardId);
        if (!reward) return;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'wallpaper-preview-overlay';
        
        // Create preview popup
        const preview = document.createElement('div');
        preview.className = 'wallpaper-preview-popup';
        
        preview.innerHTML = `
            <div class="wallpaper-preview-content">
                <button class="wallpaper-preview-close" onclick="unlockRewards.closePreview(this.closest('.wallpaper-preview-overlay'))">×</button>
                <img src="${reward.image}" alt="${reward.title}" class="wallpaper-preview-image" draggable="false" oncontextmenu="return false;" onselectstart="return false;">
                <div class="wallpaper-preview-info">
                    <h3 class="wallpaper-preview-title">${reward.title}</h3>
                    ${reward.description ? `<p class="wallpaper-preview-description">${reward.description}</p>` : ''}
                </div>
            </div>
        `;
        
        // Additional protection: prevent right-click and drag
        const previewImage = preview.querySelector('.wallpaper-preview-image');
        if (previewImage) {
            previewImage.addEventListener('contextmenu', (e) => e.preventDefault());
            previewImage.addEventListener('dragstart', (e) => e.preventDefault());
            previewImage.addEventListener('selectstart', (e) => e.preventDefault());
        }
        
        // Prevent drag on the entire preview content
        const previewContent = preview.querySelector('.wallpaper-preview-content');
        if (previewContent) {
            previewContent.addEventListener('dragstart', (e) => e.preventDefault());
            previewContent.addEventListener('selectstart', (e) => e.preventDefault());
        }
        
        overlay.appendChild(preview);
        document.body.appendChild(overlay);
        
        // Animate in
        setTimeout(() => {
            overlay.classList.add('show');
        }, 10);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closePreview(overlay);
            }
        });
        
        // Close on ESC key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closePreview(overlay);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    closePreview(overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            if (overlay.parentNode) {
                document.body.removeChild(overlay);
            }
        }, 300);
    }
    
    init() {
        // Wait for level system to load
        const checkLevelSystem = setInterval(() => {
            if (levelSystem) {
                clearInterval(checkLevelSystem);
                this.updateUI();
            }
        }, 100);
    }
}

// Initialize when DOM is ready
let unlockRewards;
document.addEventListener('DOMContentLoaded', () => {
    unlockRewards = new UnlockRewards();
    unlockRewards.init();
});

