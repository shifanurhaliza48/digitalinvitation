document.addEventListener('DOMContentLoaded', function() {
    // ---- Auto Update Tanggal dan Waktu ----
    function updateDateTime() {
        const dateTimeElement = document.getElementById('tanggal-waktu');
        const now = new Date();

        const options = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        };
        dateTimeElement.textContent = now.toLocaleDateString('id-ID', options);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // ---- Hitung Mundur Pernikahan ----
    const targetDate = new Date('2025-12-31T10:00:00').getTime(); // Ganti dengan tanggal dan waktu pernikahan Anda

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById('hitung-mundur');
        if (distance < 0) {
            countdownElement.textContent = "Acara Telah Berlangsung!";
        } else {
            countdownElement.textContent = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ---- Live Peta (Leaflet JS) ----
    const latitude = -6.2088; // Contoh: Monas
    const longitude = 106.8456; // Contoh: Monas

    const map = L.map('map').setView([latitude, longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Lokasi Acara Pernikahan')
        .openPopup();

    // ---- Musik Latar Belakang ----
    const audio = document.getElementById('background-audio');
    const playPauseButton = document.getElementById('play-pause-button');

    let isPlaying = false;
    playPauseButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playPauseButton.textContent = 'Putar Musik';
            isPlaying = false;
        } else {
            audio.play().then(() => {
                playPauseButton.textContent = 'Jeda Musik';
                isPlaying = true;
            }).catch(error => {
                console.log("Autoplay blocked, user interaction needed:", error);
                alert("Browser Anda mungkin memblokir pemutaran musik otomatis. Silakan klik tombol 'Putar Musik'.");
                playPauseButton.textContent = 'Putar Musik';
                isPlaying = false;
            });
        }
    });

    // ---- Penanganan Formulir Ucapan (Baru) ----
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form dari reload halaman
        
        const nama = document.getElementById('nama').value;
        const ucapan = document.getElementById('ucapan').value;
        
        // Ganti email@anda.com dengan alamat email Anda
        const emailTujuan = 'email@anda.com'; 
        const subjekEmail = `Ucapan dari ${nama}`;
        const isiEmail = `Ucapan dari: ${nama}\n\nIsi Ucapan:\n${ucapan}`;
        
        // Membuat tautan mailto:
        const mailtoLink = `mailto:${emailTujuan}?subject=${encodeURIComponent(subjekEmail)}&body=${encodeURIComponent(isiEmail)}`;
        
        // Membuka aplikasi email pengguna
        window.location.href = mailtoLink;
        
        alert("Terima kasih atas ucapan dan doanya! Aplikasi email Anda akan terbuka untuk mengirim pesan.");
        
        // Mengosongkan formulir setelah dikirim
        rsvpForm.reset();
    });
});