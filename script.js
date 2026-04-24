// Data User & Progres
let userData = {
    name: "EcoWarrior",
    level: 1,
    xp: 0,
    completedModules: [],
    streak: { current: 0, playedToday: false }
};

// DATA MATERI LENGKAP & MENDALAM (MODUL 1 - 4)
const moduleData = {
    1: {
        title: "Pengenalan & Sejarah Ecoenzim",
        pages: [
            { 
                content: `
                <h3>Apa itu Ecoenzim?</h3>
                <p>Ecoenzim adalah cairan multifungsi yang dihasilkan melalui proses fermentasi dari campuran <strong>sisa sampah organik</strong> (seperti kulit buah dan potongan sayur), <strong>gula</strong> (gula merah/molase), dan <strong>air</strong>.</p>
                <div class='info-box'>
                    <strong>💡 Sejarah Penemuan:</strong>
                    <p>Cairan ajaib ini pertama kali diformulasikan oleh <strong>Dr. Rosukon Poompanvong</strong> dari Thailand, pendiri Asosiasi Pertanian Organik Thailand. Beliau mendedikasikan lebih dari 30 tahun penelitiannya untuk mengembangkan ecoenzim dan membagikan resep ini secara gratis demi menyelamatkan bumi. Resep ini kemudian dipopulerkan secara global oleh Dr. Joean Oon dari Malaysia.</p>
                </div>`
            },
            { 
                content: `
                <h3>Mengapa Kita Harus Membuatnya?</h3>
                <p>Setiap hari, sisa makanan dan dapur menyumbang lebih dari 50% total sampah di Tempat Pembuangan Akhir (TPA). Saat sampah organik membusuk di TPA yang kedap udara (anaerob), mereka menghasilkan <strong>Gas Metana</strong>, salah satu gas rumah kaca yang 21 kali lebih berbahaya daripada CO2 dalam memicu pemanasan global.</p>
                <p>Dengan membuat ecoenzim, kita mencegah sampah ini masuk ke TPA dan mengubahnya menjadi cairan pembersih yang bebas dari bahan kimia sintetis yang merusak ekosistem air.</p>`
            }
        ],
        quiz: { question: "Gas berbahaya apa yang dihasilkan oleh tumpukan sampah organik di TPA?", options: ["Oksigen", "Metana", "Nitrogen", "Helium"], answer: 1 }
    },
    2: {
        title: "Segudang Manfaat Ecoenzim",
        pages: [
            { 
                content: `
                <h3>Pembersih Rumah Tangga (Bebas Kimia)</h3>
                <p>Ecoenzim memiliki sifat antibakteri dan antijamur. Berikut adalah takaran penggunaannya:</p>
                <ul>
                    <li><strong>Mengepel Lantai (1:1000):</strong> 1 tutup botol ecoenzim dicampur 1 ember air. Lantai bersih dan serangga pergi.</li>
                    <li><strong>Mencuci Piring/Baju (1:1:5):</strong> 1 bagian ecoenzim : 1 bagian sabun cuci : 5 bagian air. Membantu mengurangi penggunaan sabun kimia.</li>
                    <li><strong>Pembersih Kaca (1:10):</strong> 1 bagian ecoenzim dan 10 bagian air ke dalam botol spray.</li>
                    <li><strong>Pembersih Kloset/Saluran Air:</strong> Tuang murni (tanpa air) untuk membunuh kuman dan melancarkan saluran mampet.</li>
                </ul>`
            },
            { 
                content: `
                <h3>Manfaat untuk Pertanian & Lingkungan</h3>
                <p>Tidak hanya untuk rumah, ecoenzim adalah sahabat alam:</p>
                <ul>
                    <li><strong>Pupuk Tanaman (1:1000):</strong> Campurkan 1 ml ecoenzim dengan 1 Liter air. Siramkan ke tanah atau semprot ke daun untuk merangsang pertumbuhan.</li>
                    <li><strong>Pestisida Alami (1:500):</strong> Semprotkan ke area tanaman yang terkena hama atau kutu daun secara rutin.</li>
                    <li><strong>Penjernih Air:</strong> Jika dituang ke selokan atau sungai yang tercemar, enzim ini akan memecah zat kimia berbahaya dan memulihkan ekosistem air (1 liter ecoenzim bisa memurnikan hingga 1000 liter air sungai).</li>
                </ul>`
            }
        ],
        quiz: { question: "Berapa rasio campuran Ecoenzim : Sabun : Air untuk mencuci piring?", options: ["1:1:1", "1:10:100", "1:1:5", "3:1:10"], answer: 2 }
    },
    3: {
        title: "Panduan Membuat Ecoenzim",
        pages: [
            { 
                content: `
                <h3>Persiapan Bahan & Wadah</h3>
                <p><strong>1. Wadah:</strong> Gunakan wadah <strong>PLASTIK</strong> bermulut lebar (seperti toples/ember). <em>Jangan gunakan kaca</em> karena gas fermentasi bisa membuatnya pecah/meledak.</p>
                <p><strong>2. Bahan Organik:</strong> Gunakan sisa buah (kulit jeruk, nanas, apel, mangga) dan sisa sayur segar. <em>DILARANG</em> menggunakan sisa daging, tulang, sisa makanan berminyak, atau sampah yang sudah berjamur/busuk.</p>
                <p><strong>3. Gula:</strong> Gunakan gula merah tebu, gula aren, atau molase. <em>Jangan</em> gunakan gula putih (gula pasir) karena kandungan zat kimianya bisa mengganggu bakteri baik.</p>`
            },
            { 
                content: `
                <h3>Rumus Baku 3:1:10</h3>
                <div class='formula-card' style='background: #e8f5e9; padding: 10px; border-radius: 8px;'>
                    <p>Contoh perhitungan untuk wadah 10 Liter:</p>
                    <ul>
                        <li><strong>Air (10 bagian) = 6 Liter</strong> (Maksimal 60% dari wadah)</li>
                        <li><strong>Sampah Organik (3 bagian) = 1,8 Kg</strong> (30% dari wadah)</li>
                        <li><strong>Gula Merah (1 bagian) = 600 gram</strong> (10% dari wadah)</li>
                        <li>Sisa ruang 20% di wadah wajib dibiarkan kosong untuk menampung gas.</li>
                    </ul>
                </div>`
            },
            {
                content: `
                <h3>Langkah-langkah & Perawatan</h3>
                <ol>
                    <li>Larutkan gula dan air di dalam wadah plastik.</li>
                    <li>Masukkan potongan sampah organik. Pastikan semua sampah terendam air (bisa ditekan/diberi pemberat).</li>
                    <li>Tutup rapat wadah dan beri label tanggal pembuatan (Panen = 3 bulan kemudian).</li>
                    <li><strong>Perawatan Penting:</strong> Selama 1 bulan pertama, buka tutup wadah <em>setiap hari selama 1 detik</em> untuk membuang gas, lalu tutup rapat kembali. Bulan ke-2 dan ke-3 tidak perlu dibuka lagi.</li>
                </ol>`
            }
        ],
        quiz: { question: "Mengapa kita TIDAK BOLEH menggunakan wadah kaca untuk membuat ecoenzim?", options: ["Bakterinya mati", "Gas fermentasi bisa membuat kaca meledak", "Warnanya tidak terlihat", "Ecoenzim akan membeku"], answer: 1 }
    },
    4: {
        title: "Panen, Tips & Troubleshooting",
        pages: [
            { 
                content: `
                <h3>Kriteria Panen & Ciri Keberhasilan</h3>
                <p>Setelah 3 bulan, ecoenzim siap dipanen! Berikut cirinya:</p>
                <ul>
                    <li><strong>Aroma:</strong> Asam manis yang segar, mirip cuka atau tape (karena perpaduan buah dan fermentasi).</li>
                    <li><strong>pH (Tingkat Keasaman):</strong> Jika diukur dengan kertas lakmus, pH berada di bawah 4.0.</li>
                    <li><strong>Jamur Pitera (Mama Enzyme):</strong> Sering muncul lapisan jamur putih menyatu di permukaan cairan. Ini sangat bagus dan bisa digunakan untuk masker wajah alami!</li>
                </ul>`
            },
            { 
                content: `
                <h3>Troubleshooting (Mengatasi Masalah)</h3>
                <p>Jangan panik jika terjadi masalah, ecoenzim bisa diselamatkan:</p>
                <ul>
                    <li><strong>Berbau Busuk (Got) / Berjamur Hitam:</strong> Artinya fermentasi terkontaminasi atau kurang gula. <strong>Solusi:</strong> Tambahkan gula sebanyak takaran awal, aduk rata, dan tutup rapat kembali selama 1 bulan.</li>
                    <li><strong>Muncul Belatung/Lalat:</strong> Artinya tutup wadah kurang rapat sehingga lalat bertelur di dalam. <strong>Solusi:</strong> Tambahkan gula setara takaran awal, aduk rata, dan pastikan tutup dilapisi plastik agar benar-benar kedap udara.</li>
                </ul>`
            },
            {
                content: `
                <h3>Bagaimana dengan Ampasnya?</h3>
                <p>Setelah cairan ecoenzim disaring, jangan buang ampas sisa buah/sayurnya! Ampas ini masih sangat berguna:</p>
                <ol>
                    <li>Blender ampas dan tuangkan ke kloset (diamkan semalaman sebelum disiram) untuk membersihkan septic tank.</li>
                    <li>Jemur ampas hingga kering, lalu blender menjadi bubuk untuk dicampur ke tanah sebagai pupuk padat.</li>
                    <li>Gunakan sebagian ampas (maksimal 10%) sebagai "starter" untuk pembuatan batch ecoenzim berikutnya agar fermentasi lebih cepat.</li>
                </ol>`
            }
        ],
        quiz: { question: "Berapa tingkat pH (keasaman) ecoenzim yang menandakan keberhasilan fermentasi?", options: ["Di atas 7", "Tepat di angka 7", "Di bawah 4", "Di atas 10"], answer: 2 }
    }
};

let currentModule = 0;
let currentPage = 0;

// FUNGSI MEMBUKA MODUL
function openModule(moduleNum) {
    currentModule = moduleNum;
    currentPage = 0;
    const modal = document.getElementById('moduleModal');
    modal.style.display = 'block';
    renderContent();
}

function renderContent() {
    const contentDiv = document.getElementById('moduleContent');
    const pages = moduleData[currentModule].pages;
    
    if (currentPage < pages.length) {
        contentDiv.innerHTML = `<h2>${moduleData[currentModule].title}</h2>` + pages[currentPage].content;
        document.getElementById('nextBtn').textContent = "Selanjutnya ➡️";
    } else {
        renderQuiz();
    }
    
    document.getElementById('prevBtn').style.display = currentPage === 0 ? 'none' : 'block';
}

function nextContent() {
    if (currentPage <= moduleData[currentModule].pages.length) {
        currentPage++;
        if (currentPage > moduleData[currentModule].pages.length) {
            // Cek jawaban kuis
            const selected = document.querySelector('input[name="quiz"]:checked');
            if (selected && parseInt(selected.value) === moduleData[currentModule].quiz.answer) {
                alert("🎉 Jawaban Benar! Modul Selesai.");
                completeModule(currentModule);
                closeModule();
            } else {
                alert("❌ Jawaban salah. Silakan coba lagi!");
                currentPage = moduleData[currentModule].pages.length; // Kembali ke kuis
                renderQuiz();
            }
        } else {
            renderContent();
        }
    }
}

function renderQuiz() {
    const quiz = moduleData[currentModule].quiz;
    let html = `<h2>Kuis Modul ${currentModule}</h2><p><strong>${quiz.question}</strong></p><br>`;
    quiz.options.forEach((opt, i) => {
        html += `<label class="quiz-option" style="display:block; margin: 10px 0; cursor: pointer; padding: 10px; background: #f9f9f9; border-radius: 5px;">
                    <input type="radio" name="quiz" value="${i}"> ${opt}
                 </label>`;
    });
    document.getElementById('moduleContent').innerHTML = html;
    document.getElementById('nextBtn').textContent = "Kirim Jawaban ✅";
    document.getElementById('prevBtn').style.display = 'block';
}

// LOGIKA UNLOCK MODUL
function completeModule(num) {
    if (!userData.completedModules.includes(num)) {
        userData.completedModules.push(num);
        
        // Update UI modul yang baru diselesaikan
        const currentCard = document.querySelector(`[data-module="${num}"]`);
        if (currentCard) {
            currentCard.querySelector('.progress-fill').style.width = '100%';
            currentCard.querySelector('.progress-text').textContent = '100% Selesai';
        }
        
        // Unlock Modul Berikutnya
        const nextNum = num + 1;
        const nextCard = document.querySelector(`[data-module="${nextNum}"]`);
        if (nextCard) {
            const btn = nextCard.querySelector('.btn-module');
            btn.disabled = false;
            btn.classList.remove('locked');
            btn.innerHTML = 'Mulai Belajar';
            btn.setAttribute('onclick', `openModule(${nextNum})`);
            nextCard.querySelector('.progress-text').textContent = '0% selesai';
        }
        saveData();
    }
}

function closeModule() {
    document.getElementById('moduleModal').style.display = 'none';
}

function prevContent() {
    if (currentPage > 0) {
        currentPage--;
        renderContent();
    }
}

function saveData() {
    localStorage.setItem('ecoQuestData', JSON.stringify(userData));
}

// Load data saat pertama buka
window.onload = () => {
    const saved = localStorage.getItem('ecoQuestData');
    if (saved) {
        userData = JSON.parse(saved);
        userData.completedModules.forEach(m => completeModule(m));
    }
};

// --- LOGIKA HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Fungsi untuk membuka/menutup menu saat hamburger diklik
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fungsi otomatis menutup menu saat salah satu link diklik
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
