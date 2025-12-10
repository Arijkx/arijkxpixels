// Gallery Preview System
// Initialize gallery icons on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeGalleryIcons();
});

function initializeGalleryIcons() {
    const containers = document.querySelectorAll('.gallery-image-container');
    
    containers.forEach(container => {
        // Check if icon already exists
        if (container.querySelector('.gallery-expand-icon')) {
            return;
        }
        
        // Get preview data from data attributes
        const previewImage = container.getAttribute('data-preview-image');
        const previewTitle = container.getAttribute('data-preview-title') || 'Image Preview';
        const previewDescription = container.getAttribute('data-preview-description') || '';
        
        if (!previewImage) {
            return; // Skip if no preview image is defined
        }
        
        // Create expand icon
        const expandIcon = document.createElement('div');
        expandIcon.className = 'gallery-expand-icon';
        expandIcon.title = 'Click to expand';
        expandIcon.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
        `;
        
        // Add click handler
        expandIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            showGalleryPreview(previewImage, previewTitle, previewDescription);
        });
        
        // Insert icon as first child
        container.insertBefore(expandIcon, container.firstChild);
        
        // Make image clickable
        const image = container.querySelector('img');
        if (image) {
            image.style.cursor = 'pointer';
            image.addEventListener('click', function() {
                showGalleryPreview(previewImage, previewTitle, previewDescription);
            });
        }
    });
}

function showGalleryPreview(imagePath, title, description = '') {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'gallery-preview-overlay';
    
    // Create preview popup
    const preview = document.createElement('div');
    preview.className = 'gallery-preview-popup';
    
    preview.innerHTML = `
        <div class="gallery-preview-content">
            <button class="gallery-preview-close" onclick="closeGalleryPreview(this.closest('.gallery-preview-overlay'))">×</button>
            <div class="gallery-preview-zoom-controls">
                <button class="gallery-preview-zoom-btn" data-zoom="1" title="Zoom 1x">1x</button>
                <button class="gallery-preview-zoom-btn" data-zoom="2" title="Zoom 2x">2x</button>
                <button class="gallery-preview-zoom-btn" data-zoom="3" title="Zoom 3x">3x</button>
                <button class="gallery-preview-zoom-btn" data-zoom="4" title="Zoom 4x">4x</button>
            </div>
            <div class="gallery-preview-image-container">
                <img src="${imagePath}" alt="${title}" class="gallery-preview-image" draggable="false" oncontextmenu="return false;" onselectstart="return false;">
            </div>
            <div class="gallery-preview-controls">
                <button class="gallery-preview-control-btn" data-direction="up" title="Move up">↑</button>
                <button class="gallery-preview-control-btn" data-direction="left" title="Move left">←</button>
                <button class="gallery-preview-control-btn gallery-preview-center-btn" data-action="center" title="Center image">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="2" x2="12" y2="6"></line>
                        <line x1="12" y1="18" x2="12" y2="22"></line>
                        <line x1="2" y1="12" x2="6" y2="12"></line>
                        <line x1="18" y1="12" x2="22" y2="12"></line>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
                <button class="gallery-preview-control-btn" data-direction="right" title="Move right">→</button>
                <button class="gallery-preview-control-btn" data-direction="down" title="Move down">↓</button>
            </div>
        </div>
    `;
    
    overlay.appendChild(preview);
    document.body.appendChild(overlay);
    
    // Get image and container elements
    const imageContainer = preview.querySelector('.gallery-preview-image-container');
    const previewImage = preview.querySelector('.gallery-preview-image');
    
    // Initialize pan functionality
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Wait for image to load to get actual dimensions
    previewImage.onload = function() {
        initializePanFunctionality(imageContainer, previewImage, overlay);
    };
    
    // If image is already loaded
    if (previewImage.complete) {
        initializePanFunctionality(imageContainer, previewImage, overlay);
    }
    
    // Additional protection: prevent right-click and drag
    if (previewImage) {
        previewImage.addEventListener('contextmenu', (e) => e.preventDefault());
        previewImage.addEventListener('dragstart', (e) => e.preventDefault());
        previewImage.addEventListener('selectstart', (e) => e.preventDefault());
    }
    
    // Prevent drag on the entire preview content
    const previewContent = preview.querySelector('.gallery-preview-content');
    if (previewContent) {
        previewContent.addEventListener('dragstart', (e) => e.preventDefault());
        previewContent.addEventListener('selectstart', (e) => e.preventDefault());
    }
    
    // Animate in
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
    
    // Close on ESC key
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeGalleryPreview(overlay);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

function initializePanFunctionality(container, image, overlay) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentZoom = 1;
    
    // Get actual image dimensions (natural size)
    function getImageDimensions() {
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        // Use naturalWidth/naturalHeight for actual image size
        const naturalWidth = image.naturalWidth || image.offsetWidth || image.width;
        const naturalHeight = image.naturalHeight || image.offsetHeight || image.height;
        
        // Apply zoom
        const imageWidth = naturalWidth * currentZoom;
        const imageHeight = naturalHeight * currentZoom;
        
        return {
            containerWidth,
            containerHeight,
            imageWidth,
            imageHeight,
            naturalWidth,
            naturalHeight
        };
    }
    
    // Clamp position to boundaries
    function clampPosition() {
        const { containerWidth, containerHeight, imageWidth, imageHeight } = getImageDimensions();
        
        // Calculate maximum allowed movement
        const maxX = Math.max(0, imageWidth - containerWidth);
        const maxY = Math.max(0, imageHeight - containerHeight);
        
        // Clamp X position: can move from 0 (left edge) to -maxX (right edge)
        currentX = Math.max(-maxX, Math.min(0, currentX));
        // Clamp Y position: can move from 0 (top edge) to -maxY (bottom edge)
        currentY = Math.max(-maxY, Math.min(0, currentY));
        
        updateImagePosition();
    }
    
    function updateImagePosition() {
        image.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentZoom})`;
        image.style.transformOrigin = 'top left';
        updateControlButtons();
    }
    
    function setZoom(zoomLevel) {
        const { containerWidth, containerHeight, naturalWidth, naturalHeight } = getImageDimensions();
        const oldZoom = currentZoom;
        currentZoom = zoomLevel;
        
        // Adjust position to maintain center point when zooming
        const scaleFactor = currentZoom / oldZoom;
        const centerX = containerWidth / 2 - currentX;
        const centerY = containerHeight / 2 - currentY;
        
        currentX = containerWidth / 2 - (centerX * scaleFactor);
        currentY = containerHeight / 2 - (centerY * scaleFactor);
        
        updateImagePosition();
        clampPosition();
        updateZoomButtons();
    }
    
    function updateZoomButtons() {
        const zoomButtons = container.parentElement.querySelectorAll('.gallery-preview-zoom-btn');
        zoomButtons.forEach(btn => {
            const zoomLevel = parseFloat(btn.getAttribute('data-zoom'));
            if (zoomLevel === currentZoom) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    function updateControlButtons() {
        const { containerWidth, containerHeight, imageWidth, imageHeight } = getImageDimensions();
        
        const maxX = Math.max(0, imageWidth - containerWidth);
        const maxY = Math.max(0, imageHeight - containerHeight);
        
        const upBtn = container.parentElement.querySelector('[data-direction="up"]');
        const downBtn = container.parentElement.querySelector('[data-direction="down"]');
        const leftBtn = container.parentElement.querySelector('[data-direction="left"]');
        const rightBtn = container.parentElement.querySelector('[data-direction="right"]');
        
        if (upBtn) upBtn.disabled = currentY >= 0 || imageHeight <= containerHeight;
        if (downBtn) downBtn.disabled = currentY <= -maxY || imageHeight <= containerHeight;
        if (leftBtn) leftBtn.disabled = currentX >= 0 || imageWidth <= containerWidth;
        if (rightBtn) rightBtn.disabled = currentX <= -maxX || imageWidth <= containerWidth;
    }
    
    // Initialize position - start at top-left (0, 0)
    // If image is smaller than container, center it
    function initializePosition() {
        const { containerWidth, containerHeight, imageWidth, imageHeight } = getImageDimensions();
        
        if (imageWidth <= containerWidth) {
            // Center horizontally
            currentX = (containerWidth - imageWidth) / 2;
        } else {
            // Start at left edge
            currentX = 0;
        }
        
        if (imageHeight <= containerHeight) {
            // Center vertically
            currentY = (containerHeight - imageHeight) / 2;
        } else {
            // Start at top edge
            currentY = 0;
        }
        
        updateImagePosition();
    }
    
    // Mouse drag
    container.addEventListener('mousedown', (e) => {
        if (e.target === container || e.target === image) {
            isDragging = true;
            container.classList.add('dragging');
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;
            e.preventDefault();
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
            clampPosition();
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            container.classList.remove('dragging');
        }
    });
    
    // Touch drag
    container.addEventListener('touchstart', (e) => {
        if (e.target === container || e.target === image) {
            isDragging = true;
            container.classList.add('dragging');
            const touch = e.touches[0];
            startX = touch.clientX - currentX;
            startY = touch.clientY - currentY;
            e.preventDefault();
        }
    });
    
    container.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            currentX = touch.clientX - startX;
            currentY = touch.clientY - startY;
            clampPosition();
            e.preventDefault();
        }
    });
    
    container.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            container.classList.remove('dragging');
        }
    });
    
    // Zoom buttons
    const zoomButtons = container.parentElement.querySelectorAll('.gallery-preview-zoom-btn');
    zoomButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const zoomLevel = parseFloat(btn.getAttribute('data-zoom'));
            setZoom(zoomLevel);
        });
    });
    
    // Control buttons
    const controlButtons = container.parentElement.querySelectorAll('.gallery-preview-control-btn');
    controlButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const direction = btn.getAttribute('data-direction');
            const action = btn.getAttribute('data-action');
            
            if (action === 'center') {
                // Center the image
                const { containerWidth, containerHeight, imageWidth, imageHeight } = getImageDimensions();
                
                if (imageWidth <= containerWidth) {
                    // Center horizontally
                    currentX = (containerWidth - imageWidth) / 2;
                } else {
                    // Center horizontally (show middle of image)
                    currentX = -(imageWidth - containerWidth) / 2;
                }
                
                if (imageHeight <= containerHeight) {
                    // Center vertically
                    currentY = (containerHeight - imageHeight) / 2;
                } else {
                    // Center vertically (show middle of image)
                    currentY = -(imageHeight - containerHeight) / 2;
                }
                
                clampPosition();
            } else if (direction) {
                const step = 50;
                
                switch(direction) {
                    case 'up':
                        currentY += step;
                        break;
                    case 'down':
                        currentY -= step;
                        break;
                    case 'left':
                        currentX += step;
                        break;
                    case 'right':
                        currentX -= step;
                        break;
                }
                clampPosition();
            }
        });
    });
    
    // Initialize position after a short delay to ensure image is fully loaded
    setTimeout(() => {
        initializePosition();
        updateZoomButtons();
    }, 100);
    
    // Also initialize when image loads (in case it wasn't loaded yet)
    if (!image.complete) {
        image.addEventListener('load', () => {
            initializePosition();
            updateZoomButtons();
        }, { once: true });
    }
    
    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            clampPosition();
        }, 100);
    });
}

function closeGalleryPreview(overlay) {
    overlay.classList.remove('show');
    setTimeout(() => {
        if (overlay.parentNode) {
            document.body.removeChild(overlay);
        }
    }, 300);
}

