// Efek navbar saat scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Efek hover pada link navigasi untuk menambahkan animasi tambahan
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.background = 'linear-gradient(45deg, rgba(111, 186, 84, 0.2), rgba(92, 166, 69, 0.2))';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.background = 'transparent';
    });
});

// Fungsi toggle menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Ubah ikon saat menu dibuka/ditutup
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.textContent = '✕';
            } else {
                mobileMenuToggle.textContent = '☰';
            }
        });
        
        // Sembunyikan menu saat klik di luar menu
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mobileMenuToggle.contains(event.target) || navLinks.contains(event.target);
            
            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            }
        });
    }
});

// Toggle mode malam
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Cek preferensi pengguna
if (darkModeToggle) {
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        // Ganti ikon menjadi matahari
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Simpan preferensi pengguna
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            // Ganti ikon menjadi matahari
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            // Ganti ikon menjadi bulan
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Testimonial Slider
let currentSlide = 0;
let testimonials;
let dots;
let autoSlideInterval;

// Inisialisasi setelah DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    testimonials = document.querySelectorAll('.testimonial-card');
    dots = document.querySelectorAll('.dot');
    
    console.log('Total testimoni:', testimonials.length); // Debug
    
    // Tambahkan kelas active ke testimonial pertama jika di mobile
    setTimeout(() => {
        updateForScreenSize();
    }, 100);
    
    if (testimonials.length > 0) {
        startAutoSlide();
    }
});

function showSlide(index) {
    // Reset jika index di luar range
    if (index >= testimonials.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = testimonials.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Cek apakah sedang di mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Di mobile, sembunyikan semua testimonial dan tampilkan hanya yang aktif
        testimonials.forEach((testimonial, i) => {
            if (i === currentSlide) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
    } else {
        // Di desktop, gunakan slider tradisional
        const wrapper = document.querySelector('.testimonials-wrapper');
        if (!wrapper) return;
        
        // Ambil lebar kartu testimonial untuk menghitung jumlah per slide
        const firstCard = testimonials[0];
        if (!firstCard) return;
        
        const cardWidth = firstCard.offsetWidth;
        const computedStyle = window.getComputedStyle(wrapper);
        const gapValue = parseInt(computedStyle.gap) || 120; // Gunakan gap yang dihitung atau default 120px
        
        // Geser slide dengan memperhitungkan lebar kartu aktual dan gap
        const slideWidth = cardWidth + gapValue;
        wrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
    
    // Update dots
    if (dots && dots.length > 0) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
}

// Fungsi untuk menyesuaikan ukuran slider saat resize window
function adjustSliderOnResize() {
    // Tunggu sebentar agar ukuran elemen sudah diperbarui
    setTimeout(() => {
        showSlide(currentSlide);
    }, 100);
}

// Tambahkan event listener untuk resize
window.addEventListener('resize', adjustSliderOnResize);

// Fungsi untuk update tampilan saat resize
function updateForScreenSize() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Di mobile, pastikan hanya testimonial yang aktif yang ditampilkan
        testimonials.forEach((testimonial, i) => {
            if (i === currentSlide) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
    } else {
        // Di desktop, pastikan semua testimonial ditampilkan
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
    }
    
    showSlide(currentSlide);
}

// Tambahkan event listener tambahan untuk perubahan ukuran layar
window.addEventListener('resize', updateForScreenSize);

function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoSlide();
}

function prevSlide() {
    showSlide(currentSlide - 1);
    resetAutoSlide();
}

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

// Auto slide setiap 5 detik
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (testimonials && testimonials.length > 0) {
            showSlide(currentSlide + 1);
        }
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Pause auto slide saat hover
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
});

// Fungsi untuk mengarahkan ke WhatsApp saat pendaftaran
function redirectToWhatsApp() {
    // Ambil nilai dari form
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const telepon = document.getElementById('telepon').value;
    const peran = document.querySelector('input[name="peran"]:checked');
    const kota = document.getElementById('kota').value;
    
    // Validasi formulir sebelum redirect
    if (!nama || !email || !peran || !kota) {
        alert('Mohon lengkapi semua field yang wajib diisi: Nama, Email, Peran, dan Kota.');
        return;
    }
    
    // Format pesan pendaftaran
    let pesan = `Halo CaterMoms!\n\nSaya ingin mendaftar sebagai:\n`;
    pesan += `Nama: ${nama}\n`;
    pesan += `Email: ${email}\n`;
    
    if (telepon) {
        pesan += `Telepon: ${telepon}\n`;
    }
    
    pesan += `Peran: ${peran.value === 'customer' ? 'Customer' : 'UMKM'}\n`;
    pesan += `Kota: ${kota}\n`;
    
    pesan += `\nPesan ini dikirim melalui formulir pendaftaran di website CaterMoms.`;
    
    // Format nomor WhatsApp (tanpa tanda +, 00, atau spasi di awal)
    const nomorWhatsApp = '6285788122883'; // Format internasional tanpa 0 di awal
    
    // Encode pesan agar bisa dikirim melalui URL
    const pesanTerencode = encodeURIComponent(pesan);
    
    // Buka WhatsApp dengan pesan otomatis
    window.open(`https://wa.me/${nomorWhatsApp}?text=${pesanTerencode}`, '_blank');
}