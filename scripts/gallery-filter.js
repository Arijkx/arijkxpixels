document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.asset-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const selectedTag = this.getAttribute('data-tag');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (selectedTag === 'all') {
                    item.style.display = '';
                } else {
                    const itemTags = item.getAttribute('data-tags').split(' ');
                    if (itemTags.includes(selectedTag)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
});