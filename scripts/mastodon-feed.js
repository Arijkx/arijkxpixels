// Mastodon Feed Embed
class MastodonFeed {
    constructor() {
        this.instance = 'https://mastodon.social';
        this.username = 'arijkx';
        this.maxPosts = 5;
    }

    async loadFeed() {
        try {
            // Get account ID first
            const accountInfo = await this.getAccountInfo();
            if (!accountInfo) {
                this.showError('Could not load account information');
                return;
            }

            // Get statuses (posts) for the account
            const statuses = await this.getAccountStatuses(accountInfo.id);
            if (!statuses || statuses.length === 0) {
                this.showError('No posts found');
                return;
            }

            // Display posts
            this.displayPosts(statuses);
        } catch (error) {
            console.error('Error loading Mastodon feed:', error);
            this.showError('Failed to load feed. Please try again later.');
        }
    }

    async getAccountInfo() {
        try {
            const response = await fetch(`${this.instance}/api/v1/accounts/lookup?acct=${this.username}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Account not found');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching account info:', error);
            // Fallback: Try using RSS feed or embed widget
            this.showFallbackEmbed();
            return null;
        }
    }

    async getAccountStatuses(accountId) {
        try {
            const response = await fetch(`${this.instance}/api/v1/accounts/${accountId}/statuses?limit=${this.maxPosts}&exclude_replies=true`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch statuses');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching statuses:', error);
            return null;
        }
    }

    showFallbackEmbed() {
        const container = document.getElementById('mastodon-feed-container');
        if (!container) return;

        container.innerHTML = `
            <div class="mastodon-embed-fallback">
                <iframe src="https://mastodon.social/@arijkx/embed" 
                        class="mastodon-embed" 
                        style="max-width: 100%; border: 0; width: 100%; min-height: 600px;" 
                        allowfullscreen="allowfullscreen">
                </iframe>
                <script src="https://mastodon.social/embed.js" async="async"></script>
                <p style="text-align: center; margin-top: 10px; color: #809e9f; font-size: 12px;">
                    <a href="https://mastodon.social/@arijkx" target="_blank" rel="noopener noreferrer" style="color: #befeff;">
                        View full profile on Mastodon
                    </a>
                </p>
            </div>
        `;
    }

    displayPosts(posts) {
        const container = document.getElementById('mastodon-feed-container');
        if (!container) return;

        container.innerHTML = '';

        posts.forEach(post => {
            const postElement = this.createPostElement(post);
            container.appendChild(postElement);
        });
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'mastodon-post';

        // Format date
        const postDate = new Date(post.created_at);
        const formattedDate = postDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Process content (remove HTML tags for security, but keep basic formatting)
        let content = this.sanitizeContent(post.content);

        // Build post HTML
        postDiv.innerHTML = `
            <div class="mastodon-post-header">
                <div class="mastodon-post-author">
                    <strong>@${post.account.username}</strong>
                </div>
                <div class="mastodon-post-date">${formattedDate}</div>
            </div>
            <div class="mastodon-post-content">${content}</div>
            ${post.media_attachments && post.media_attachments.length > 0 ? this.createMediaHTML(post.media_attachments) : ''}
            <div class="mastodon-post-footer">
                <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="mastodon-post-link">View on Mastodon</a>
            </div>
        `;

        return postDiv;
    }

    sanitizeContent(content) {
        // Remove script tags and other potentially dangerous elements
        const div = document.createElement('div');
        div.innerHTML = content;
        
        // Remove script tags
        const scripts = div.querySelectorAll('script');
        scripts.forEach(script => script.remove());
        
        // Allow basic formatting (p, br, a, strong, em)
        return div.innerHTML;
    }

    createMediaHTML(mediaAttachments) {
        let mediaHTML = '<div class="mastodon-post-media">';
        mediaAttachments.forEach(media => {
            if (media.type === 'image') {
                mediaHTML += `<img src="${media.preview_url || media.url}" alt="${media.description || 'Post image'}" class="mastodon-post-image">`;
            }
        });
        mediaHTML += '</div>';
        return mediaHTML;
    }

    showError(message) {
        const container = document.getElementById('mastodon-feed-container');
        if (container) {
            container.innerHTML = `<div class="mastodon-error">${message}</div>`;
        }
    }

    init() {
        // Wait for container to be ready
        const checkContainer = setInterval(() => {
            const container = document.getElementById('mastodon-feed-container');
            if (container) {
                clearInterval(checkContainer);
                this.loadFeed();
            }
        }, 100);
    }
}

// Initialize when DOM is ready
let mastodonFeed;
document.addEventListener('DOMContentLoaded', () => {
    mastodonFeed = new MastodonFeed();
    mastodonFeed.init();
});

