// Quest System - Achievement Tracking and XP Rewards
class QuestSystem {
    constructor() {
        this.notificationQueue = [];
        this.isShowingNotification = false;
        this.quests = [
            {
                id: 'first_visit',
                title: 'First Visit',
                description: 'Welcome to the pixel art universe! You\'ve taken your first step into this creative world. Explore and discover what awaits you.',
                xpReward: 50,
                goldReward: 5,
                completed: false
            },
            {
                id: 'level_5',
                title: 'Reach Level 5',
                description: 'You\'re getting the hang of it! Keep exploring and spending time on the website to reach Level 5 and unlock new achievements.',
                xpReward: 200,
                goldReward: 20,
                completed: false
            },
            {
                id: 'level_10',
                title: 'Reach Level 10',
                description: 'You\'re becoming a pixel art enthusiast! Continue your journey and reach Level 10 by exploring all the content this website has to offer.',
                xpReward: 500,
                goldReward: 50,
                completed: false
            },
            {
                id: 'level_20',
                title: 'Reach Level 20',
                description: 'You\'re a true pixel art veteran! Reach the impressive Level 20 by dedicating time to explore and engage with all the creative content.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'complete_5_quests',
                title: 'Quest Master',
                description: 'You\'re on a roll! Complete 5 different quests to prove your dedication and earn the title of Quest Master.',
                xpReward: 300,
                goldReward: 30,
                completed: false
            },
            {
                id: 'complete_all_quests',
                title: 'Completion',
                description: 'The ultimate achievement! Complete every single quest on the website to prove you\'ve explored every corner of this pixel art universe.',
                xpReward: 2000,
                goldReward: 200,
                completed: false
            },
            {
                id: 'explore_about',
                title: 'About Me',
                description: 'Get to know the artist behind the pixels! Learn about Arijkx\'s journey, inspiration, and passion for pixel art and game development.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'explore_artists',
                title: 'Discover Artists',
                description: 'Meet the pixel art masters! Explore the gallery of talented artists who inspire and share their incredible pixel art creations.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'explore_assets',
                title: 'Browse Assets',
                description: 'Dive into a collection of retro game assets! Browse through pixel art sprites, tiles, and resources perfect for your game projects.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'explore_development',
                title: 'Explore Development',
                description: 'Peek behind the scenes! Discover the game development projects, tools, and creative process that bring pixel art to life.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'explore_shop',
                title: 'Visit Shop',
                description: 'Check out the marketplace! Browse through available game assets, wallpapers, and pixel art merchandise in the shop.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_kofi',
                title: 'Support on Ko-fi',
                description: 'Show your appreciation! Click the donate button on the dashboard to visit Ko-fi and support the artist\'s creative journey with a tip.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_livespirits',
                title: 'Try LiveSpirits',
                description: 'Enhance your streaming experience! Click the free trial button on the dashboard to explore LiveSpirits, a platform for stream companions.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'check_trusted_partners',
                title: 'Check Trusted Partners',
                description: 'Explore the network! Visit the Trusted Partners page to discover talented artists, developers, and creators in the pixel art community.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'explore_contact',
                title: 'Visit Contact',
                description: 'Get in touch! Visit the Contact page to find ways to connect with the artist, join the community, or reach out for collaborations and commissions.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'explore_rewards',
                title: 'Check Rewards',
                description: 'Unlock exclusive content! Visit the Rewards page to see available wallpapers and unlockable content that you can purchase with your earned Gold.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'explore_quests',
                title: 'View Quests',
                description: 'Track your progress! Visit the Quests page to see all available achievements, track your completion status, and discover new challenges to complete.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'explore_services',
                title: 'View Services',
                description: 'Check out what\'s available! Visit the Services page to see commissions, web design, server design, and profile design offerings.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'explore_feed',
                title: 'Check News Feed',
                description: 'Stay up to date! Visit the News Feed page to see the latest updates, posts, and announcements from Arijkx.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'explore_tools',
                title: 'Check Tools',
                description: 'Discover helpful tools and utilities! Explore a collection of free web-based tools designed to enhance your creative workflow.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_myprofileforge',
                title: 'My Profile Forge',
                description: 'Create and manage your profiles! Open the My Profile Forge tool from the Tools page - your all-in-one platform for profile creation.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_tradingcard',
                title: 'Trading Card Builder',
                description: 'Design your own trading cards! Open the Trading Card Builder tool to create custom trading cards for your favorite games and characters.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_webpconverter',
                title: 'WebP Converter',
                description: 'Convert images effortlessly! Open the WebP Converter tool to transform your images into the modern WebP format - it\'s free and easy to use.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_note8',
                title: 'Note 8',
                description: 'Keep your notes organized! Open the Note 8 tool from the Tools page - a handy browser-based note-taking tool to keep your thoughts accessible.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'join_discord',
                title: 'Join Discord',
                description: 'Become part of the community! Click the Discord link on the Contact page to join the server, chat with fellow artists, and get support.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_twitch',
                title: 'Follow on Twitch',
                description: 'Watch the magic happen live! Visit the Twitch channel from the Contact page to watch live art creation streams and interact with the community.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_instagram',
                title: 'Follow on Instagram',
                description: 'Stay connected with the latest pixel art! Click the Instagram link in the header or footer to follow and see daily pixel art creations and behind-the-scenes content.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_twitter',
                title: 'Follow on Twitter',
                description: 'Join the conversation! Click the Twitter/X link in the header or footer to follow for updates, pixel art posts, and community interactions.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_youtube',
                title: 'Subscribe on YouTube',
                description: 'Watch pixel art tutorials and content! Click the YouTube link in the header or footer to subscribe and never miss new videos, tutorials, and pixel art showcases.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_reddit',
                title: 'Follow on Reddit',
                description: 'Join the community on Reddit! Click the Reddit link in the footer to follow and stay connected with pixel art discussions and updates.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            },
            {
                id: 'open_mastodon',
                title: 'Follow on Mastodon',
                description: 'Connect on Mastodon! Click the Mastodon link in the footer to follow and see the latest pixel art posts and updates on the fediverse.',
                xpReward: 1000,
                goldReward: 100,
                completed: false
            }
 
        ];
        
        this.loadFromStorage();
        this.init();
    }

    // Load data from Local Storage
    loadFromStorage() {
        const saved = localStorage.getItem('questSystem');
        if (saved) {
            const savedQuests = JSON.parse(saved);
            // Merge saved quests with default quests
            this.quests = this.quests.map(quest => {
                const savedQuest = savedQuests.find(q => q.id === quest.id);
                return savedQuest ? { ...quest, completed: savedQuest.completed } : quest;
            });
        }
    }

    // Save data to Local Storage
    saveToStorage() {
        const questData = this.quests.map(q => ({
            id: q.id,
            completed: q.completed
        }));
        localStorage.setItem('questSystem', JSON.stringify(questData));
    }

    // Mark quest as completed
    completeQuest(questId, delayNotification = false) {
        const quest = this.quests.find(q => q.id === questId);
        if (quest && !quest.completed) {
            quest.completed = true;
            this.saveToStorage();
            
            // Add XP
            if (levelSystem) {
                levelSystem.addXP(quest.xpReward);
            }
            
            // Add Gold (check for both existence and value > 0)
            if (levelSystem && quest.goldReward !== undefined && quest.goldReward !== null && quest.goldReward > 0) {
                levelSystem.addGold(quest.goldReward);
            }
            
            // Update UI
            this.updateUI();
            
            // Quest-Complete Animation
            if (delayNotification) {
                // Store quest info for notification on next page
                sessionStorage.setItem('pendingQuestNotification', JSON.stringify({
                    title: quest.title,
                    xpReward: quest.xpReward,
                    goldReward: quest.goldReward || 0
                }));
            } else {
                this.showQuestCompleteNotification(quest);
            }
            
            // Check dependent quests
            this.checkDependentQuests();
            
            return true;
        }
        return false;
    }

    // Check dependent quests (e.g. "Complete 5 quests")
    checkDependentQuests() {
        // Get only regular quests (excluding meta quests)
        const regularQuests = this.quests.filter(q => q.id !== 'complete_5_quests' && q.id !== 'complete_all_quests');
        const completedRegularQuests = regularQuests.filter(q => q.completed);
        const completedCount = completedRegularQuests.length;
        
        // Check "Complete 5 quests"
        if (completedCount >= 5 && !this.quests.find(q => q.id === 'complete_5_quests')?.completed) {
            this.completeQuest('complete_5_quests');
        }
        
        // Check "Complete all quests" - all regular quests must be completed
        if (completedCount === regularQuests.length && !this.quests.find(q => q.id === 'complete_all_quests')?.completed) {
            this.completeQuest('complete_all_quests');
        }
        
        // Check level quests
        if (levelSystem) {
            if (levelSystem.level >= 5 && !this.quests.find(q => q.id === 'level_5')?.completed) {
                this.completeQuest('level_5');
            }
            if (levelSystem.level >= 10 && !this.quests.find(q => q.id === 'level_10')?.completed) {
                this.completeQuest('level_10');
            }
            if (levelSystem.level >= 20 && !this.quests.find(q => q.id === 'level_20')?.completed) {
                this.completeQuest('level_20');
            }
        }
    }

    // Show Quest-Complete Notification
    showQuestCompleteNotification(quest) {
        // Check if tab is visible/active
        if (document.hidden) {
            // Tab is in background, store notification and show when tab becomes visible
            sessionStorage.setItem('pendingQuestNotification', JSON.stringify({
                title: quest.title,
                xpReward: quest.xpReward,
                goldReward: quest.goldReward || 0
            }));
            return;
        }
        
        // Add to queue
        this.notificationQueue.push(quest);
        
        // Start processing queue if not already showing
        if (!this.isShowingNotification) {
            this.processNotificationQueue();
        }
    }
    
    // Process notification queue one by one
    processNotificationQueue() {
        if (this.notificationQueue.length === 0) {
            this.isShowingNotification = false;
            return;
        }
        
        this.isShowingNotification = true;
        const quest = this.notificationQueue.shift();
        
        // Delay to ensure page transition is complete
        setTimeout(() => {
            // Check if document.body exists (page is loaded)
            if (!document.body) {
                // If body doesn't exist yet, wait a bit more
                setTimeout(() => {
                    this.notificationQueue.unshift(quest); // Put back at front
                    this.processNotificationQueue();
                }, 100);
                return;
            }
            
            // Double-check tab is still visible
            if (document.hidden) {
                // Tab became hidden, store for later
                sessionStorage.setItem('pendingQuestNotification', JSON.stringify({
                    title: quest.title,
                    xpReward: quest.xpReward,
                    goldReward: quest.goldReward || 0
                }));
                // Continue with next notification
                this.processNotificationQueue();
                return;
            }
            
            const notification = document.createElement('div');
            notification.className = 'quest-notification';
            // Handle both full quest objects and questInfo objects from sessionStorage
            const goldReward = quest.goldReward !== undefined ? quest.goldReward : null;
            const goldText = (goldReward !== null && goldReward > 0) ? `<p class="quest-gold-reward">+${goldReward} Gold</p>` : '';
            notification.innerHTML = `
                <div class="quest-notification-content">
                    <h3>Quest Completed!</h3>
                    <p>${quest.title}</p>
                    <p class="quest-xp-reward">+${quest.xpReward} XP</p>
                    ${goldText}
                </div>
            `;
            document.body.appendChild(notification);
            
            // Animation
            setTimeout(() => {
                if (!document.hidden && notification.parentNode) {
                    notification.classList.add('show');
                }
            }, 10);
            
            // Remove after 7 seconds (only if tab is still visible)
            setTimeout(() => {
                if (!document.hidden && notification.parentNode) {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            document.body.removeChild(notification);
                        }
                        // Process next notification in queue
                        this.processNotificationQueue();
                    }, 500);
                } else if (notification.parentNode) {
                    // Tab was hidden, remove immediately
                    document.body.removeChild(notification);
                    // Process next notification in queue
                    this.processNotificationQueue();
                } else {
                    // Process next notification in queue
                    this.processNotificationQueue();
                }
            }, 5000);
        }, 300); // 300ms delay to ensure page transition is complete
    }

    // Update UI
    updateUI() {
        const questContainer = document.getElementById('quest-list');
        if (!questContainer) return;
        
        // Remove only quest items, keep the header container
        const existingQuests = questContainer.querySelectorAll('.quest-item');
        existingQuests.forEach(quest => quest.remove());
        
        this.quests.forEach(quest => {
            const questElement = document.createElement('div');
            questElement.className = `quest-item ${quest.completed ? 'completed' : ''}`;
            const goldDisplay = quest.goldReward ? `<span class="quest-gold">+${quest.goldReward} Gold</span>` : '';
            questElement.innerHTML = `
                <div class="quest-header">
                    <h3 class="quest-title">${quest.title}</h3>
                    <div class="quest-rewards">
                        <span class="quest-xp">+${quest.xpReward} XP</span>
                        ${goldDisplay}
                    </div>
                </div>
                <p class="quest-description">${quest.description}</p>
                ${quest.completed ? '<div class="quest-badge quest-badge-completed">Completed</div>' : '<div class="quest-badge quest-badge-uncompleted">Uncompleted</div>'}
            `;
            questElement.style.display = 'block';
            questContainer.appendChild(questElement);
        });
        
        // Update statistics
        this.updateStats();
    }

    // Update statistics
    updateStats() {
        const completedCount = this.quests.filter(q => q.completed).length;
        const totalQuests = this.quests.length;
        const totalXPEarned = this.quests
            .filter(q => q.completed)
            .reduce((sum, q) => sum + q.xpReward, 0);
        
        const statsElement = document.getElementById('quest-stats');
        if (statsElement) {
            // Calculate total gold earned from completed quests
            const totalGoldEarned = this.quests
                .filter(quest => quest.completed && quest.goldReward)
                .reduce((sum, quest) => sum + quest.goldReward, 0);
            
            statsElement.innerHTML = `
                <div class="stat-item">
                    <span class="stat-label">Completed:</span>
                    <span class="stat-value">${completedCount}/${totalQuests}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">XP earned:</span>
                    <span class="stat-value">${totalXPEarned} XP</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Gold earned:</span>
                    <span class="stat-value" id="quest-gold-earned">${totalGoldEarned} Gold</span>
                </div>
            `;
        }
    }

    // Initialization
    init() {
        // Check for pending quest notification from previous page
        this.checkPendingNotification();
        
        // Listen for tab visibility changes to show pending notifications
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // Tab became visible, check for pending notifications
                this.checkPendingNotification();
            }
        });
        
        // Wait until Level System is loaded
        const checkLevelSystem = setInterval(() => {
            if (levelSystem) {
                clearInterval(checkLevelSystem);
                
                // Check level quests
                this.checkDependentQuests();
                
                // Update UI
                this.updateUI();
                
                // Check Level-Up Events
                const originalAddXP = levelSystem.addXP.bind(levelSystem);
                levelSystem.addXP = (amount) => {
                    originalAddXP(amount);
                    setTimeout(() => {
                        this.checkDependentQuests();
                    }, 100);
                };
            }
        }, 100);
        
        // Check page visits
        this.checkPageVisits();
        
        // Setup link listeners after a delay to ensure DOM is ready
        setTimeout(() => {
            this.setupLinkListeners();
        }, 500);
        
        // Also setup listeners when header is loaded (if header loads dynamically)
        const checkHeader = setInterval(() => {
            if (document.querySelector('a[href*="discord.com"]') || document.querySelector('a[href*="ko-fi.com"]')) {
                this.setupLinkListeners();
                clearInterval(checkHeader);
            }
        }, 200);
    }
    
    // Check for pending quest notification from previous page or when tab becomes visible
    checkPendingNotification() {
        // Only check if tab is visible
        if (document.hidden) {
            return;
        }
        
        const pending = sessionStorage.getItem('pendingQuestNotification');
        if (pending) {
            try {
                const questInfo = JSON.parse(pending);
                sessionStorage.removeItem('pendingQuestNotification');
                
                // Show notification after a short delay to ensure page is ready
                setTimeout(() => {
                    // Double-check tab is still visible before showing
                    if (!document.hidden) {
                        // Add to queue instead of showing directly
                        this.notificationQueue.push(questInfo);
                        if (!this.isShowingNotification) {
                            this.processNotificationQueue();
                        }
                    } else {
                        // Tab became hidden again, restore to storage
                        sessionStorage.setItem('pendingQuestNotification', JSON.stringify(questInfo));
                    }
                }, 300);
            } catch (e) {
                console.error('Error parsing pending quest notification:', e);
            }
        }
    }

    // Check page visits
    checkPageVisits() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // First visit
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
            localStorage.setItem('hasVisited', 'true');
            this.completeQuest('first_visit');
        }
        
        // Specific page quests
        const pageQuests = {
            'about.html': 'explore_about',
            'artists.html': 'explore_artists',
            'assets.html': 'explore_assets',
            'development.html': 'explore_development',
            'shop.html': 'explore_shop',
            'tools.html': 'explore_tools',
            'contact.html': 'explore_contact',
            'rewards.html': 'explore_rewards',
            'quests.html': 'explore_quests',
            'partner.html': 'check_trusted_partners',
            'services.html': 'explore_services',
            'feed.html': 'explore_feed'
        };
        
        if (pageQuests[currentPage]) {
            this.completeQuest(pageQuests[currentPage]);
        }
        
        // Setup link click listeners for external links
        this.setupLinkListeners();
    }
    
    // Setup listeners for external link clicks
    setupLinkListeners() {
        // Discord link (Contact page)
        const discordLinks = document.querySelectorAll('a[href*="discord.com/invite/bwdKzauM83"]');
        discordLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('join_discord');
            });
        });
        
        // Twitch link (Contact page)
        const twitchLinks = document.querySelectorAll('a[href*="twitch.tv/arijkx"]');
        twitchLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_twitch');
            });
        });
        
        // Ko-fi link (Index page - donate button)
        const kofiLinks = document.querySelectorAll('a[href*="ko-fi.com/arijkx"]');
        kofiLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_kofi');
            });
        });
        
        // LiveSpirits link (Index page - free trial button)
        const livespiritsLinks = document.querySelectorAll('a[href*="livespirits.gg"]');
        livespiritsLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_livespirits');
            });
        });
        
        // My Profile Forge (Tools page)
        const myprofileforgeLinks = document.querySelectorAll('a[href*="myprofileforge.com"]');
        myprofileforgeLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_myprofileforge');
            });
        });
        
        // Trading Card Builder (Tools page)
        const tradingcardLinks = document.querySelectorAll('a[href*="TradingCardBuilder"]');
        tradingcardLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_tradingcard');
            });
        });
        
        // WebP Converter (Tools page)
        const webpconverterLinks = document.querySelectorAll('a[href*="FreeWepConverter"]');
        webpconverterLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_webpconverter');
            });
        });
        
        // Note 8 (Tools page)
        const note8Links = document.querySelectorAll('a[href*="Node8"]');
        note8Links.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_note8');
            });
        });
        
        // Internal page links (for immediate quest completion on click)
        // Use delayNotification=true so notification shows on the new page
        const aboutLinks = document.querySelectorAll('a[href*="about.html"]');
        aboutLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_about', true);
            });
        });
        
        const artistsLinks = document.querySelectorAll('a[href*="artists.html"]');
        artistsLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_artists', true);
            });
        });
        
        const assetsLinks = document.querySelectorAll('a[href*="assets.html"]');
        assetsLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_assets', true);
            });
        });
        
        const developmentLinks = document.querySelectorAll('a[href*="development.html"]');
        developmentLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_development', true);
            });
        });
        
        const shopLinks = document.querySelectorAll('a[href*="shop.html"]');
        shopLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_shop', true);
            });
        });
        
        const toolsLinks = document.querySelectorAll('a[href*="tools.html"]');
        toolsLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_tools', true);
            });
        });
        
        const partnerLinks = document.querySelectorAll('a[href*="partner.html"]');
        partnerLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('check_trusted_partners', true);
            });
        });

        const contactLinks = document.querySelectorAll('a[href*="contact.html"]');
        contactLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_contact', true);
            });
        });

        const rewardsLinks = document.querySelectorAll('a[href*="rewards.html"]');
        rewardsLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_rewards', true);
            });
        });

        const questsLinks = document.querySelectorAll('a[href*="quests.html"]');
        questsLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_quests', true);
            });
        });

        const servicesLinks = document.querySelectorAll('a[href*="services.html"]');
        servicesLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_services', true);
            });
        });

        const feedLinks = document.querySelectorAll('a[href*="feed.html"]');
        feedLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('explore_feed', true);
            });
        });
        
        // Instagram link (Header and Footer)
        const instagramLinks = document.querySelectorAll('a[href*="instagram.com/arijkx"]');
        instagramLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_instagram');
            });
        });
        
        // Twitter/X link (Header and Footer)
        const twitterLinks = document.querySelectorAll('a[href*="x.com/arijkx"]');
        twitterLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_twitter');
            });
        });
        
        // YouTube link (Header and Footer)
        const youtubeLinks = document.querySelectorAll('a[href*="youtube.com/@arijkx"]');
        youtubeLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_youtube');
            });
        });
        
        // Reddit link (Footer)
        const redditLinks = document.querySelectorAll('a[href*="reddit.com/user/Arijkx"]');
        redditLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_reddit');
            });
        });
        
        // Mastodon link (Footer)
        const mastodonLinks = document.querySelectorAll('a[href*="mastodon.social/@arijkx"]');
        mastodonLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.completeQuest('open_mastodon');
            });
        });
    }
}

// Initialize Quest System
let questSystem;

function initQuestSystem() {
    if (!questSystem) {
        questSystem = new QuestSystem();
    }
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        initQuestSystem();
    }, 300);
});

