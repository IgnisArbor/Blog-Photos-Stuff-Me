function toggleNode(node) {
    const children = node.querySelector('ul');
    if (children) {
        children.classList.toggle('hidden');
    }
}

function toggleNode(node) {
    const children = node.querySelector('ul');
    if (children) {
        children.classList.toggle('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openFullScreen(img.src);
        });
    });
});

function openFullScreen(src) {
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.classList.add('full-screen');
    fullScreenDiv.innerHTML = `
        <div class="full-screen-content">
            <img src="${src}" alt="Full Screen Image">
        </div>
    `;
    fullScreenDiv.addEventListener('click', () => {
        document.body.removeChild(fullScreenDiv);
    });
    document.body.appendChild(fullScreenDiv);
}

function toggleNode(node) {
    const children = node.querySelector('ul');
    if (children) {
        children.classList.toggle('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.photo-gallery img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openFullScreen(img.src);
        });
    });
});

function openFullScreen(src) {
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.classList.add('full-screen');
    fullScreenDiv.innerHTML = `
        <div class="full-screen-content">
            <img src="${src}" alt="Full Screen Image">
        </div>
    `;
    fullScreenDiv.addEventListener('click', () => {
        document.body.removeChild(fullScreenDiv);
    });
    document.body.appendChild(fullScreenDiv);
}

document.addEventListener('DOMContentLoaded', () => {
    const treeNodes = document.querySelectorAll('.tree li');

    treeNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            const url = node.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            } else {
                const children = node.querySelector('ul');
                if (children) {
                    children.classList.toggle('hidden');
                }
            }
            e.stopPropagation();
        });
    });

    const galleryImages = document.querySelectorAll('.gallery img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openFullScreen(img.src);
        });
    });
});

function openFullScreen(src) {
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.classList.add('full-screen');
    fullScreenDiv.innerHTML = `
        <div class="full-screen-content">
            <img src="${src}" alt="Full Screen Image">
        </div>
    `;
    fullScreenDiv.addEventListener('click', () => {
        document.body.removeChild(fullScreenDiv);
    });
    document.body.appendChild(fullScreenDiv);
}

document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openFullScreen(img.src, img.alt);
        });

        img.addEventListener('mouseover', () => {
            const altText = document.createElement('div');
            altText.className = 'alt-text';
            altText.innerText = img.alt;
            img.parentElement.appendChild(altText);
        });

        img.addEventListener('mouseout', () => {
            const altText = img.parentElement.querySelector('.alt-text');
            if (altText) {
                img.parentElement.removeChild(altText);
            }
        });
    });
});

function openFullScreen(src, alt) {
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.classList.add('full-screen');
    fullScreenDiv.innerHTML = `
        <div class="full-screen-content">
            <img src="${src}" alt="${alt}">
            <p>${alt}</p>
        </div>
    `;
    fullScreenDiv.addEventListener('click', () => {
        document.body.removeChild(fullScreenDiv);
    });
    document.body.appendChild(fullScreenDiv);
}
