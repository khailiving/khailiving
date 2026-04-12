// Initialize Lucide Icons
lucide.createIcons();

/* =========================================
   DATABASE GALERI (Bisa banyak gambar per kategori)
========================================= */
const galleryData = [
    {
        title: "Kamar Tidur",
        images: [
            "/Assets/Galeri/kamar-tidur-1.jpg",
            "/Assets/Galeri/kamar-tidur-2.jpg"
        ],
        isWide: true
    },
    {
        title: "Area Depan",
        images: [
            "/Assets/Galeri/area-depan-1.jpg",
            "/Assets/Galeri/area-depan-2.jpg"
        ],
        isWide: false
    },
    {
        title: "Dapur",
        images: [
            "/Assets/Galeri/dapur.jpg"
        ],
        isWide: false
    },
    {
        title: "Ruang Bersama",
        images: [
            "/Assets/Galeri/ruang-bersama-2.jpg"
        ],
        isWide: false
    },
    {
        title: "Tampak Luar Bangunan",
        images: [
            "/Assets/Galeri/luar-bangunan-1.jpg",
            "/Assets/Galeri/luar-bangunan-2.jpg"
        ],
        isWide: false
    }
];

/* =========================================
   FUNGSI RENDER GALERI & DOTS SLIDER
========================================= */
function renderGallery() {
    const container = document.getElementById('galeri-container');
    if (!container) return;

    container.innerHTML = ''; // Bersihkan container

    galleryData.forEach((item, index) => {
        const spanClass = item.isWide ? 'col-span-2' : '';
        
        let imagesHtml = '';
        item.images.forEach(imgSrc => {
            imagesHtml += `
                <div class="w-full h-full flex-shrink-0 snap-center relative group">
                    <img src="${imgSrc}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    <div class="absolute inset-0 bg-brandDark/20 group-hover:bg-brandDark/0 transition duration-500 pointer-events-none"></div>
                </div>
            `;
        });

        let dotsHtml = '';
        if (item.images.length > 1) {
            dotsHtml = `<div class="absolute bottom-2.5 md:bottom-3.5 right-2.5 md:right-3.5 flex space-x-1.5 z-20">`;
            item.images.forEach((_, i) => {
                const activeClass = i === 0 ? 'bg-accentGold w-3' : 'bg-white/70 w-1.5';
                dotsHtml += `<div class="h-1.5 rounded-full transition-all duration-300 ${activeClass} dot-indicator-${index}" data-index="${i}"></div>`;
            });
            dotsHtml += `</div>`;
        }

        const html = `
            <div class="h-32 md:h-48 rounded-xl md:rounded-2xl relative overflow-hidden shadow-sm bg-surface ${spanClass}">
                
                <div class="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing gallery-scroll-container" data-gallery-index="${index}">
                    ${imagesHtml}
                </div>
                
                <div class="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-brandLight/90 backdrop-blur-sm px-2 py-1 md:px-3 rounded-full text-[8px] md:text-[9px] font-bold font-sans text-brandDark shadow-sm tracking-wide pointer-events-none z-20">
                    ${item.title}
                </div>

                ${dotsHtml}
            </div>
        `;
        
        container.innerHTML += html;
    });

    // Mendaftarkan Event Listener agar titik berubah warna saat gambar digeser
    const scrollContainers = document.querySelectorAll('.gallery-scroll-container');
    scrollContainers.forEach(scrollEl => {
        scrollEl.addEventListener('scroll', (e) => {
            const galleryIndex = e.target.getAttribute('data-gallery-index');
            const dots = document.querySelectorAll(`.dot-indicator-${galleryIndex}`);
            if (!dots.length) return;

            const scrollLeft = e.target.scrollLeft;
            const clientWidth = e.target.clientWidth;
            const activeIndex = Math.round(scrollLeft / clientWidth);

            dots.forEach((dot, i) => {
                if (i === activeIndex) {
                    dot.classList.add('bg-accentGold', 'w-3');
                    dot.classList.remove('bg-white/70', 'w-1.5');
                } else {
                    dot.classList.remove('bg-accentGold', 'w-3');
                    dot.classList.add('bg-white/70', 'w-1.5');
                }
            });
        });
    });
}

// Panggil fungsi renderGaleri
renderGallery();

/* =========================================
   AUTO-SCROLL GALERI (Fungsi Baru)
========================================= */
function autoScrollGallery() {
    const galleryContainers = document.querySelectorAll('.gallery-scroll-container');
    galleryContainers.forEach(container => {
        // Hanya jalankan fungsi geser JIKA gambar di dalam kotak lebih dari 1
        if (container.scrollWidth > container.clientWidth + 10) {
            const cardWidth = container.clientWidth;
            
            // Jika sudah mentok di kanan (gambar terakhir), kembali ke awal (gambar pertama)
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Geser ke gambar selanjutnya
                container.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }
    });
}

// Atur jeda waktu geser otomatis (3000 = 3 detik)
setInterval(autoScrollGallery, 3000);


/* =========================================
   MENU MOBILE
========================================= */
const btn = document.getElementById('mobile-menu-btn');
const fullMenu = document.getElementById('mobile-menu-fullscreen');
const mobileLinks = document.querySelectorAll('.mobile-link');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');
const menuFooter = document.getElementById('mobile-menu-footer');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        fullMenu.classList.remove('translate-x-full');
        fullMenu.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
        iconMenu.classList.add('hidden');
        iconClose.classList.remove('hidden');

        mobileLinks.forEach((link, index) => {
            setTimeout(() => {
                link.classList.remove('opacity-0', 'translate-y-8');
                link.classList.add('opacity-100', 'translate-y-0');
            }, 100 + (index * 50));
        });

        setTimeout(() => {
            menuFooter.classList.remove('opacity-0', 'translate-y-8');
            menuFooter.classList.add('opacity-100', 'translate-y-0');
        }, 300);

    } else {
        fullMenu.classList.remove('translate-x-0');
        fullMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
        iconClose.classList.add('hidden');
        iconMenu.classList.remove('hidden');

        mobileLinks.forEach(link => {
            link.classList.remove('opacity-100', 'translate-y-0');
            link.classList.add('opacity-0', 'translate-y-8');
        });
        
        menuFooter.classList.remove('opacity-100', 'translate-y-0');
        menuFooter.classList.add('opacity-0', 'translate-y-8');
    }
}

btn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

/* =========================================
   FAQ TOGGLE
========================================= */
const faqBtns = document.querySelectorAll('.faq-btn');
faqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        const isOpen = content.classList.contains('grid-rows-[1fr]');

        document.querySelectorAll('.faq-content').forEach(c => {
            c.classList.remove('grid-rows-[1fr]');
            c.classList.add('grid-rows-[0fr]');
        });
        document.querySelectorAll('.faq-btn i').forEach(i => {
            i.classList.remove('rotate-180');
        });

        if (!isOpen) {
            content.classList.remove('grid-rows-[0fr]');
            content.classList.add('grid-rows-[1fr]');
            icon.classList.add('rotate-180');
        }
    });
});

/* =========================================
   AUTO-SCROLL TESTIMONI
========================================= */
const testimoniSlider = document.getElementById('testimoni-slider');

function autoScrollTestimoni() {
    if (!testimoniSlider) return;
    const firstCard = testimoniSlider.querySelector('.testimoni-card');
    if(!firstCard) return;
    
    const gap = parseInt(window.getComputedStyle(testimoniSlider).gap) || 16;
    const cardWidth = firstCard.offsetWidth + gap; 
    
    if (testimoniSlider.scrollLeft + testimoniSlider.clientWidth >= testimoniSlider.scrollWidth - 10) {
        testimoniSlider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        testimoniSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
}

setInterval(autoScrollTestimoni, 3500);

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));