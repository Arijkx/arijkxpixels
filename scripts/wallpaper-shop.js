// Wallpaper Shop System
class WallpaperShop {
    constructor() {
        this.wallpapers = [
            {
                id: 'fallen_kingdom_standard',
                title: 'Fallen Kingdom Standard',
                description: 'Explore deeper into the mysterious ruins. The standard wallpaper.',
                image: 'wallpaper/fallen_kingdom_wallpaper.png',
                price: 50,
                file: 'wallpaper/fallen_kingdom_wallpaper.png',
                tags: ['1280x720', 'wallpaper', 'PNG',]
            },
            {
                id: 'fallen_kingdom_blue_portal',
                title: 'Fallen Kingdom Blue Portal',
                description: 'Explore deeper into the mysterious ruins. With a blue portal.',
                image: 'wallpaper/fallen_kingdom_wallpaper_2.png',
                price: 75,
                file: 'wallpaper/fallen_kingdom_wallpaper_2.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'fallen_kingdom_red_portal',
                title: 'Fallen Kingdom Red Portal',
                description: 'Explore deeper into the mysterious ruins. With a red portal.',
                image: 'wallpaper/fallen_kingdom_wallpaper_5.png',
                price: 75,
                file: 'wallpaper/fallen_kingdom_wallpaper_5.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'fallen_kingdom_blue_portal_shield',
                title: 'Fallen Kingdom B. Portal & Shield',
                description: 'Explore deeper into the mysterious ruins. With a blue portal and a shield.',
                image: 'wallpaper/fallen_kingdom_wallpaper_3.png',
                price: 75,
                file: 'wallpaper/fallen_kingdom_wallpaper_3.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'fallen_kingdom_red_portal_shield',
                title: 'Fallen Kingdom R. Portal & Shield',
                description: 'Explore deeper into the mysterious ruins. With a red portal and a shield.',
                image: 'wallpaper/fallen_kingdom_wallpaper_4.png',
                price: 75,
                file: 'wallpaper/fallen_kingdom_wallpaper_4.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            },
            {
                id: 'invasion_mars',
                title: 'Invasion on Mars - Earth strikes back',
                description: 'An epic sci-fi pixel art scene of Martian invasion. Earth strikes back.',
                image: 'wallpaper/INVASION_ON_MARS_1280x720_Original_SIZE.png',
                price: 80,
                file: 'wallpaper/INVASION_ON_MARS_1280x720_Original_SIZE.png',
                tags: ['1280x720', 'wallpaper', 'PNG']
            }
        ];
        
        this.purchasedWallpapers = this.loadPurchasedWallpapers();
    }
    
    loadPurchasedWallpapers() {
        const saved = localStorage.getItem('purchasedWallpapers');
        return saved ? JSON.parse(saved) : [];
    }
    
    savePurchasedWallpapers() {
        localStorage.setItem('purchasedWallpapers', JSON.stringify(this.purchasedWallpapers));
    }
    
    isPurchased(wallpaperId) {
        return this.purchasedWallpapers.includes(wallpaperId);
    }
    
    purchaseWallpaper(wallpaperId) {
        const wallpaper = this.wallpapers.find(w => w.id === wallpaperId);
        if (!wallpaper) return false;
        
        if (this.isPurchased(wallpaperId)) {
            return true; // Already purchased
        }
        
        if (!levelSystem) {
            alert('Level System not loaded!');
            return false;
        }
        
        if (levelSystem.gold < wallpaper.price) {
            this.showNotEnoughGoldPopup(wallpaper.price, levelSystem.gold);
            return false;
        }
        
        // Deduct gold
        levelSystem.gold -= wallpaper.price;
        levelSystem.saveToStorage();
        levelSystem.updateUI();
        
        // Add to purchased list
        this.purchasedWallpapers.push(wallpaperId);
        this.savePurchasedWallpapers();
        
        return true;
    }
    
    downloadWallpaper(wallpaperId) {
        const wallpaper = this.wallpapers.find(w => w.id === wallpaperId);
        if (!wallpaper) return false;
        
        if (!this.isPurchased(wallpaperId)) {
            alert('You need to purchase this wallpaper first!');
            return false;
        }
        
        // Create download link
        const link = document.createElement('a');
        link.href = wallpaper.file;
        link.download = wallpaper.file.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
    }
    
    updateUI() {
        const container = document.getElementById('wallpaper-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.wallpapers.forEach(wallpaper => {
            const card = document.createElement('div');
            card.className = 'wallpaper-card';
            
            const isPurchased = this.isPurchased(wallpaper.id);
            
            if (isPurchased) {
                card.classList.add('purchased');
            }
            
            card.innerHTML = `
                <div class="wallpaper-image-container">
                    <div class="wallpaper-expand-icon" onclick="wallpaperShop.showPreview('${wallpaper.id}')" title="Click to expand">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                        </svg>
                    </div>
                    <img src="${wallpaper.image}" alt="${wallpaper.title}" class="wallpaper-image" onclick="wallpaperShop.showPreview('${wallpaper.id}')" style="cursor: pointer;" draggable="false" oncontextmenu="return false;" onselectstart="return false;">
                    ${isPurchased ? '<div class="purchased-badge">Purchased</div>' : ''}
                </div>
                <div class="wallpaper-info">
                    <h3 class="wallpaper-title">${wallpaper.title}</h3>
                    ${wallpaper.description ? `<p class="wallpaper-description">${wallpaper.description}</p>` : ''}
                    <div class="wallpaper-meta">
                        <div class="wallpaper-tags">
                            ${wallpaper.tags ? wallpaper.tags.map(tag => {
                                if (tag === 'PNG') {
                                    return `<div class="wallpaper-format">${tag}</div>`;
                                } else {
                                    return `<div class="wallpaper-type-badge">${tag}</div>`;
                                }
                            }).join('') : ''}
                        </div>
                        <div class="wallpaper-price-container">
                            <div class="wallpaper-price-label">Price</div>
                            <div class="wallpaper-price-badge">${wallpaper.price} Gold</div>
                        </div>
                    </div>
                    ${isPurchased 
                        ? `<button class="wallpaper-button download-button" onclick="wallpaperShop.downloadWallpaper('${wallpaper.id}')">Download</button>`
                        : `<button class="wallpaper-button buy-button" onclick="wallpaperShop.buyWallpaper('${wallpaper.id}')">Unlock</button>`
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
    
    buyWallpaper(wallpaperId) {
        if (this.purchaseWallpaper(wallpaperId)) {
            this.updateUI();
            // Show success notification
            this.showNotification(`Wallpaper purchased! You can now download it.`, 'success');
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
                    <p>You need <span class="gold-highlight">${requiredGold} Gold</span> to purchase this wallpaper.</p>
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
    
    showPreview(wallpaperId) {
        const wallpaper = this.wallpapers.find(w => w.id === wallpaperId);
        if (!wallpaper) return;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'wallpaper-preview-overlay';
        
        // Create preview popup
        const preview = document.createElement('div');
        preview.className = 'wallpaper-preview-popup';
        
        preview.innerHTML = `
            <div class="wallpaper-preview-content">
                <button class="wallpaper-preview-close" onclick="wallpaperShop.closePreview(this.closest('.wallpaper-preview-overlay'))">×</button>
                <img src="${wallpaper.image}" alt="${wallpaper.title}" class="wallpaper-preview-image" draggable="false" oncontextmenu="return false;" onselectstart="return false;">
                <div class="wallpaper-preview-info">
                    <h3 class="wallpaper-preview-title">${wallpaper.title}</h3>
                    ${wallpaper.description ? `<p class="wallpaper-preview-description">${wallpaper.description}</p>` : ''}
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
let wallpaperShop;
document.addEventListener('DOMContentLoaded', () => {
    wallpaperShop = new WallpaperShop();
    wallpaperShop.init();
});

