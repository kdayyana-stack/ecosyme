// Data Management
let userData = {
    name: "EcoWarrior",
    level: 1,
    xp: 0,
    avatar: "🌱",
    completedModules: [],
    gameScores: {
        sort: 0,
        mix: 0,
        quiz: 0
    },
    badges: [],
    streak: {
        current: 0,
        longest: 0,
        lastPlayDate: null,
        playedToday: false,
        history: [] // Array of dates when user played
    }
};

// Load data from localStorage
function loadUserData() {
    const saved = localStorage.getItem('ecoQuestData');
    if (saved) {
        userData = JSON.parse(saved);
        updateUI();
    }
}

// Save data to localStorage
function saveUserData() {
    localStorage.setItem('ecoQuestData', JSON.stringify(userData));
}

// Update UI with user data
function updateUI() {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userLevel').textContent = `Level ${userData.level}`;
    
    const xpNeeded = userData.level * 100;
    const xpProgress = (userData.xp / xpNeeded) * 100;
    document.getElementById('xpFill').style.width = xpProgress + '%';
    document.getElementById('currentXP').textContent = userData.xp;
    document.getElementById('nextLevelXP').textContent = xpNeeded;
    
    // Update avatar
    document.querySelector('.avatar-emoji').textContent = userData.avatar;
    
    // Update game scores
    document.getElementById('sortScore').textContent = userData.gameScores.sort;
    document.getElementById('mixScore').textContent = userData.gameScores.mix;
    document.getElementById('quizScore').textContent = userData.gameScores.quiz;
    
    // Update module progress
    updateModuleProgress();
    
    // Update badges
    updateBadges();
    
    // Update streak
    updateStreakUI();
}

// Update module progress
function updateModuleProgress() {
    userData.completedModules.forEach((moduleNum, index) => {
        const card = document.querySelector(`[data-module="${moduleNum}"]`);
        if (card) {
            card.querySelector('.progress-fill').style.width = '100%';
            card.querySelector('.progress-text').textContent = '100% selesai';
            card.querySelector('.module-badge').classList.remove('locked');
            
            // Unlock next module
            const nextCard = document.querySelector(`[data-module="${moduleNum + 1}"]`);
            if (nextCard) {
                nextCard.querySelector('.btn-module').disabled = false;
                nextCard.querySelector('.btn-module').classList.remove('locked');
                nextCard.querySelector('.btn-module').innerHTML = 'Mulai Belajar';
                nextCard.querySelector('.progress-text').textContent = '0% selesai';
            }
        }
    });
}

// Add XP
function addXP(amount) {
    userData.xp += amount;
    const xpNeeded = userData.level * 100;
    
    if (userData.xp >= xpNeeded) {
        userData.level++;
        userData.xp = userData.xp - xpNeeded;
        showNotification(`🎉 Naik Level! Sekarang Level ${userData.level}!`);
        checkBadges();
    }
    
    saveUserData();
    updateUI();
}

// Check and award badges
function checkBadges() {
    if (userData.level >= 2 && !userData.badges.includes('pemula')) {
        userData.badges.push('pemula');
        unlockBadge(0, 'Pemula');
    }
    if (userData.level >= 5 && !userData.badges.includes('ilmuwan')) {
        userData.badges.push('ilmuwan');
        unlockBadge(1, 'Ilmuwan');
    }
    if (userData.level >= 10 && !userData.badges.includes('ahli')) {
        userData.badges.push('ahli');
        unlockBadge(2, 'Ahli Eco');
    }
    if (userData.level >= 20 && !userData.badges.includes('master')) {
        userData.badges.push('master');
        unlockBadge(3, 'Master');
    }
}

// Unlock badge
function unlockBadge(index, name) {
    const badges = document.querySelectorAll('.badge-item');
    badges[index].classList.remove('locked');
    showNotification(`🏆 Badge Baru: ${name}!`);
}

// Update badges display
function updateBadges() {
    const badgeNames = ['pemula', 'ilmuwan', 'ahli', 'master'];
    const badges = document.querySelectorAll('.badge-item');
    
    userData.badges.forEach(badge => {
        const index = badgeNames.indexOf(badge);
        if (index !== -1) {
            badges[index].classList.remove('locked');
        }
    });
}

// Navigation
function startLearning() {
    document.getElementById('materi').scrollIntoView({ behavior: 'smooth' });
}

function goToGame() {
    document.getElementById('game').scrollIntoView({ behavior: 'smooth' });
}

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Module Content
const moduleContents = {
    1: [
        {
            title: "Apa itu Ecoenzim?",
            content: `
                <div class="module-content">
                    <h2>🌿 Mengenal Ecoenzim</h2>
                    <p>Ecoenzim adalah cairan hasil fermentasi sampah organik (seperti kulit buah dan sayur) yang dicampur dengan gula merah dan air.</p>
                    
                    <div style="background: #e8f5e9; padding: 20px; border-radius: 15px; margin: 20px 0;">
                        <h3>💡 Tahukah Kamu?</h3>
                        <p>Setiap hari, rata-rata rumah tangga menghasilkan 0.5-1 kg sampah organik. Bayangkan jika semua sampah ini bisa diubah jadi cairan bermanfaat!</p>
                    </div>
                    
                    <h3>Sejarah Singkat</h3>
                    <p>Ecoenzim pertama kali dikembangkan oleh Dr. Rosukon Poompanvong dari Thailand. Beliau menemukan bahwa fermentasi sampah organik dapat menghasilkan cairan yang sangat bermanfaat untuk lingkungan.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <div style="font-size: 120px;">🧪</div>
                        <p style="font-style: italic; color: #666;">Sampah Organik + Gula + Air = Cairan Ajaib!</p>
                    </div>
                </div>
            `
        },
        {
            title: "Proses Fermentasi",
            content: `
                <div class="module-content">
                    <h2>⏰ Proses Pembuatan Ecoenzim</h2>
                    <p>Ecoenzim dibuat melalui proses fermentasi yang memakan waktu <strong>3 bulan</strong>.</p>
                    
                    <div style="background: #fff3e0; padding: 20px; border-radius: 15px; margin: 20px 0;">
                        <h3>📅 Timeline Fermentasi</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 10px; margin: 10px 0; background: white; border-radius: 10px;">
                                <strong>Minggu 1-2:</strong> Wadah akan mengeluarkan gas, buka tutup setiap hari
                            </li>
                            <li style="padding: 10px; margin: 10px 0; background: white; border-radius: 10px;">
                                <strong>Bulan 1:</strong> Cairan mulai berubah warna menjadi kecoklatan
                            </li>
                            <li style="padding: 10px; margin: 10px 0; background: white; border-radius: 10px;">
                                <strong>Bulan 2:</strong> Aroma asam manis mulai tercium
                            </li>
                            <li style="padding: 10px; margin: 10px 0; background: white; border-radius: 10px;">
                                <strong>Bulan 3:</strong> Ecoenzim siap dipanen! 🎉
                            </li>
                        </ul>
                    </div>
                    
                    <div style="background: #e3f2fd; padding: 20px; border-radius: 15px; margin: 20px 0;">
                        <h3>⚠️ Tips Penting</h3>
                        <p>✓ Buka tutup wadah setiap hari di minggu pertama untuk mengeluarkan gas</p>
                        <p>✓ Jangan khawatir jika muncul lapisan putih di permukaan (itu normal!)</p>
                        <p>✓ Simpan di tempat sejuk dan terhindar dari sinar matahari langsung</p>
                    </div>
                </div>
            `
        },
        {
            title: "Kuis Modul 1",
            content: `
                <div class="module-content">
                    <h2>📝 Kuis Pemahaman</h2>
                    <p>Jawab pertanyaan berikut untuk melanjutkan!</p>
                    
                    <div id="quizModule1" style="margin-top: 30px;">
                        <div class="quiz-question">
                            <h3>Berapa lama waktu yang dibutuhkan untuk membuat ecoenzim?</h3>
                            <div style="display: grid; gap: 10px; margin-top: 20px;">
                                <button class="quiz-option" onclick="checkAnswer(1, 'wrong')">1 minggu</button>
                                <button class="quiz-option" onclick="checkAnswer(1, 'wrong')">1 bulan</button>
                                <button class="quiz-option" onclick="checkAnswer(1, 'correct')">3 bulan</button>
                                <button class="quiz-option" onclick="checkAnswer(1, 'wrong')">6 bulan</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="quizResult1" style="display: none; margin-top: 20px;"></div>
                </div>
            `
        }
    ],
    2: [
        {
            title: "Manfaat untuk Rumah",
            content: `
                <div class="module-content">
                    <h2>🏠 Manfaat Ecoenzim di Rumah</h2>
                    <p>Ecoenzim punya banyak kegunaan luar biasa untuk kebutuhan rumah tangga!</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
                        <div style="background: #e8f5e9; padding: 20px; border-radius: 15px;">
                            <div style="font-size: 48px; text-align: center;">🧼</div>
                            <h3>Pembersih Serbaguna</h3>
                            <p>Campurkan 1:10 dengan air untuk membersihkan lantai, kaca, dan perabotan</p>
                        </div>
                        
                        <div style="background: #fff3e0; padding: 20px; border-radius: 15px;">
                            <div style="font-size: 48px; text-align: center;">🚽</div>
                            <h3>Pembersih Toilet</h3>
                            <p>Tuangkan langsung ke toilet untuk membunuh bakteri dan menghilangkan bau</p>
                        </div>
                        
                        <div style="background: #e3f2fd; padding: 20px; border-radius: 15px;">
                            <div style="font-size: 48px; text-align: center;">👕</div>
                            <h3>Pelembut Pakaian</h3>
                            <p>Tambahkan saat mencuci untuk membuat pakaian lebih lembut dan wangi</p>
                        </div>
                        
                        <div style="background: #fce4ec; padding: 20px; border-radius: 15px;">
                            <div style="font-size: 48px; text-align: center;">🍽️</div>
                            <h3>Pencuci Piring</h3>
                            <p>Campurkan dengan air untuk mencuci piring secara alami</p>
                        </div>
                    </div>
                    
                    <div style="background: #f3e5f5; padding: 20px; border-radius: 15px; margin: 20px 0;">
                        <h3>💰 Hemat Biaya!</h3>
                        <p>Dengan ecoenzim, kamu bisa menghemat pengeluaran untuk:</p>
                        <ul>
                            <li>Pembersih lantai</li>
                            <li>Cairan pencuci piring</li>
                            <li>Pengharum ruangan</li>
                            <li>Pelembut pakaian</li>
                        </ul>
                        <p><strong>Estimasi penghematan: Rp 100.000 - 200.000 per bulan!</strong></p>
                    </div>
                </div>
            `
        },
        {
            title: "Manfaat untuk Lingkungan",
            content: `
                <div class="module-content">
                    <h2>🌍 Manfaat Ecoenzim untuk Lingkungan</h2>
                    <p>Ecoenzim adalah pahlawan lingkungan yang sesungguhnya!</p>
                    
                    <div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); padding: 30px; border-radius: 20px; margin: 20px 0;">
                        <h3 style="text-align: center; font-size: 24px; margin-bottom: 20px;">🌱 Dampak Positif Ecoenzim</h3>
                        
                        <div style="display: grid; gap: 15px;">
                            <div style="background: white; padding: 15px; border-radius: 10px;">
                                <strong>♻️ Mengurangi Sampah Organik</strong>
                                <p>Setiap 1 liter ecoenzim = 3 kg sampah organik teralihkan dari TPA</p>
                            </div>
                            
                            <div style="background: white; padding: 15px; border-radius: 10px;">
                                <strong>💧 Membersihkan Air</strong>
                                <p>Ecoenzim membantu menguraikan bahan kimia berbahaya di saluran air</p>
                            </div>
                            
                            <div style="background: white; padding: 15px; border-radius: 10px;">
                                <strong>🌿 Pupuk Tanaman</strong>
                                <p>Campurkan 1:500 dengan air untuk menyuburkan tanaman</p>
                            </div>
                            
                            <div style="background: white; padding: 15px; border-radius: 10px;">
                                <strong>🐛 Mengusir Hama</strong>
                                <p>Semprotkan ke tanaman untuk mengusir serangga secara alami</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <h3>🎯 Target Dampak</h3>
                        <p style="font-size: 18px;">Jika 1000 keluarga membuat ecoenzim:</p>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
                            <div style="background: #fff; padding: 20px; border-radius: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                <div style="font-size: 36px; color: #43a047; font-weight: bold;">3 Ton</div>
                                <div>Sampah Berkurang</div>
                            </div>
                            <div style="background: #fff; padding: 20px; border-radius: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                <div style="font-size: 36px; color: #43a047; font-weight: bold;">1000 L</div>
                                <div>Ecoenzim Diproduksi</div>
                            </div>
                            <div style="background: #fff; padding: 20px; border-radius: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                <div style="font-size: 36px; color: #43a047; font-weight: bold;">100 Jt</div>
                                <div>Rupiah Hemat</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: "Kuis Modul 2",
            content: `
                <div class="module-content">
                    <h2>📝 Kuis Pemahaman</h2>
                    
                    <div id="quizModule2" style="margin-top: 30px;">
                        <div class="quiz-question">
                            <h3>Berapa perbandingan ecoenzim dengan air untuk membersihkan lantai?</h3>
                            <div style="display: grid; gap: 10px; margin-top: 20px;">
                                <button class="quiz-option" onclick="checkAnswer(2, 'wrong')">1:1</button>
                                <button class="quiz-option" onclick="checkAnswer(2, 'wrong')">1:5</button>
                                <button class="quiz-option" onclick="checkAnswer(2, 'correct')">1:10</button>
                                <button class="quiz-option" onclick="checkAnswer(2, 'wrong')">1:20</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="quizResult2" style="display: none; margin-top: 20px;"></div>
                </div>
            `
        }
    ],
    3: [
        {
            title: "Bahan dan Alat",
            content: `
                <div class="module-content">
                    <h2>📋 Bahan dan Alat yang Dibutuhkan</h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;">
                        <div style="background: #e8f5e9; padding: 30px; border-radius: 20px;">
                            <h3>🥗 Bahan-bahan</h3>
                            <ul style="list-style: none; padding: 0;">
                                <li style="padding: 10px; margin: 10px 0; background: white; border-radius: 10px;">
                                    <strong>Sampah Organik (3 bagian)</strong><br>
                                    <small>Kulit buah, sisa sayuran segar</small>
                                </li>
                                <li style="padding: 10px; margin: 10px 0; background: white; border-radius: 10px;">
                                    <strong>Gula Merah (1 bagian)</strong><br>
                                    <small>Bisa diganti gula aren/kelapa</small>
                                </li>
                                <li style="padding: 10px; margin: 10px 0; background: white; border-radius: 10px;">
                                    <strong>Air (10 bagian)</strong><br>
                                    <small>Gunakan air bersih/matang</small>
                                </li>
                            </ul>
                        </div>
                        
                        <div style="background: #fff3e0; padding: 30px; border-radius: 20px;">
                            <h3>🔧 Alat-alat</h3>
                            <ul style="list-style: none; padding: 0;">
                                <li style="padding: 10px; margin: 10px 0; background: white; border-radius: 10px;">
                                    <strong>Wadah Plastik/Kaca</strong><br>
                                    <small>Berpenutup, volume 1-2 liter</small>
                                </li>
                                <li style="padding: 10px; margin: 10px 0; background: white; border-radius: 10px;">
                                    <strong>Pisau & Talenan</strong><br>
                                    <small>Untuk memotong sampah organik</small>
                                </li>
                                <li style="padding: 10px; margin: 10px 0; background: white; border-radius: 10px;">
                                    <strong>Corong & Saringan</strong><br>
                                    <small>Untuk menyaring hasil akhir</small>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="background: #e3f2fd; padding: 20px; border-radius: 15px;">
                        <h3>💡 Contoh Perhitungan</h3>
                        <p>Untuk membuat 1 liter ecoenzim:</p>
                        <ul>
                            <li>300 gram sampah organik (kulit jeruk, apel, nanas, dll)</li>
                            <li>100 gram gula merah</li>
                            <li>1000 ml air</li>
                        </ul>
                        <p style="background: #fff; padding: 15px; border-radius: 10px; margin-top: 15px;">
                            <strong>💰 Biaya Total: Rp 5.000 - 10.000</strong><br>
                            <small>(Gratis jika pakai sampah dapur sendiri!)</small>
                        </p>
                    </div>
                </div>
            `
        },
        {
            title: "Langkah Pembuatan",
            content: `
                <div class="module-content">
                    <h2>👨‍🍳 Langkah-langkah Pembuatan</h2>
                    
                    <div style="margin: 30px 0;">
                        <div style="background: #fff; padding: 25px; border-radius: 15px; margin-bottom: 20px; border-left: 5px solid #43a047;">
                            <h3 style="color: #43a047;">Step 1: Persiapan Wadah</h3>
                            <p>Siapkan wadah plastik atau kaca dengan penutup. Pastikan wadah bersih dan kering. Wadah harus memiliki ruang kosong 20% untuk ruang fermentasi.</p>
                        </div>
                        
                        <div style="background: #fff; padding: 25px; border-radius: 15px; margin-bottom: 20px; border-left: 5px solid #66bb6a;">
                            <h3 style="color: #66bb6a;">Step 2: Potong Sampah Organik</h3>
                            <p>Potong kecil-kecil sampah organik (ukuran 2-3 cm). Semakin kecil potongan, semakin cepat proses fermentasi. Hindari sampah yang sudah membusuk.</p>
                        </div>
                        
                        <div style="background: #fff; padding: 25px; border-radius: 15px; margin-bottom: 20px; border-left: 5px solid #8bc34a;">
                            <h3 style="color: #8bc34a;">Step 3: Larutkan Gula</h3>
                            <p>Larutkan gula merah dalam air hingga larut sempurna. Aduk sampai tidak ada gumpalan. Biarkan hingga suhu ruangan.</p>
                        </div>
                        
                        <div style="background: #fff; padding: 25px; border-radius: 15px; margin-bottom: 20px; border-left: 5px solid #9ccc65;">
                            <h3 style="color: #9ccc65;">Step 4: Masukkan Bahan</h3>
                            <p>Masukkan potongan sampah organik ke dalam wadah, lalu tuangkan larutan gula. Pastikan semua sampah terendam air.</p>
                        </div>
                        
                        <div style="background: #fff; padding: 25px; border-radius: 15px; margin-bottom: 20px; border-left: 5px solid #aed581;">
                            <h3 style="color: #aed581;">Step 5: Tutup & Beri Label</h3>
                            <p>Tutup wadah rapat-rapat. Beri label tanggal pembuatan. Simpan di tempat sejuk terhindar dari sinar matahari.</p>
                        </div>
                        
                        <div style="background: #fff; padding: 25px; border-radius: 15px; margin-bottom: 20px; border-left: 5px solid #c5e1a5;">
                            <h3 style="color: #c5e1a5;">Step 6: Perawatan Rutin</h3>
                            <p>Buka tutup setiap hari di minggu pertama untuk mengeluarkan gas. Setelah itu, cukup seminggu sekali. Tunggu 3 bulan untuk hasil terbaik!</p>
                        </div>
                    </div>
                    
                    <div style="background: #fffde7; padding: 20px; border-radius: 15px; border: 2px dashed #fbc02d;">
                        <h3>⚠️ Hal yang Harus Dihindari</h3>
                        <ul>
                            <li>❌ Jangan gunakan sampah yang sudah membusuk</li>
                            <li>❌ Jangan isi wadah sampai penuh (sisakan 20%)</li>
                            <li>❌ Jangan lupa membuka tutup di minggu pertama</li>
                            <li>❌ Jangan simpan di tempat panas atau terkena matahari</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            title: "Kuis Modul 3",
            content: `
                <div class="module-content">
                    <h2>📝 Kuis Pemahaman</h2>
                    
                    <div id="quizModule3" style="margin-top: 30px;">
                        <div class="quiz-question">
                            <h3>Apa rasio yang benar untuk membuat ecoenzim?</h3>
                            <div style="display: grid; gap: 10px; margin-top: 20px;">
                                <button class="quiz-option" onclick="checkAnswer(3, 'wrong')">Sampah:Gula:Air = 1:1:1</button>
                                <button class="quiz-option" onclick="checkAnswer(3, 'correct')">Sampah:Gula:Air = 3:1:10</button>
                                <button class="quiz-option" onclick="checkAnswer(3, 'wrong')">Sampah:Gula:Air = 5:2:10</button>
                                <button class="quiz-option" onclick="checkAnswer(3, 'wrong')">Sampah:Gula:Air = 2:1:5</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="quizResult3" style="display: none; margin-top: 20px;"></div>
                </div>
            `
        }
    ],
    4: [
        {
            title: "Ciri Ecoenzim Berhasil",
            content: `
                <div class="module-content">
                    <h2>✅ Ciri-ciri Ecoenzim yang Berhasil</h2>
                    
                    <div style="background: #e8f5e9; padding: 30px; border-radius: 20px; margin: 20px 0;">
                        <h3>🎯 Indikator Keberhasilan</h3>
                        <div style="display: grid; gap: 15px; margin-top: 20px;">
                            <div style="background: white; padding: 20px; border-radius: 10px;">
                                <strong>👃 Aroma</strong>
                                <p>Berbau asam manis seperti cuka fermentasi, BUKAN bau busuk</p>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 10px;">
                                <strong>🎨 Warna</strong>
                                <p>Coklat kekuningan atau coklat gelap tergantung bahan yang digunakan</p>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 10px;">
                                <strong>💧 Tekstur</strong>
                                <p>Cairan jernih dengan sedikit ampas di dasar wadah</p>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 10px;">
                                <strong>📊 pH</strong>
                                <p>pH antara 3-4 (asam), bisa diukur dengan kertas lakmus</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #fff3e0; padding: 20px; border-radius: 15px; margin: 20px 0;">
                        <h3>🔍 Muncul Lapisan Putih?</h3>
                        <p><strong>Jangan Panik!</strong> Lapisan putih di permukaan adalah jamur baik yang normal muncul. Ini tanda fermentasi berjalan baik.</p>
                        <p><strong>Solusi:</strong> Aduk perlahan dan tutup kembali. Jamur akan hilang dengan sendirinya.</p>
                    </div>
                </div>
            `
        },
        {
            title: "Mengatasi Masalah",
            content: `
                <div class="module-content">
                    <h2>🔧 Troubleshooting Ecoenzim</h2>
                    
                    <div style="margin: 30px 0;">
                        <div style="background: #ffebee; padding: 25px; border-radius: 15px; margin-bottom: 20px;">
                            <h3>😷 Masalah: Bau Busuk</h3>
                            <p><strong>Penyebab:</strong></p>
                            <ul>
                                <li>Sampah organik sudah membusuk sebelum difermentasi</li>
                                <li>Terlalu banyak air atau terlalu sedikit gula</li>
                                <li>Tidak dibuka tutupnya di minggu pertama</li>
                            </ul>
                            <p><strong>Solusi:</strong></p>
                            <ul>
                                <li>Tambahkan gula merah secukupnya (100-200 gram)</li>
                                <li>Buka tutup lebih sering untuk aerasi</li>
                                <li>Jika sudah terlanjur gagal, buang dan mulai ulang dengan bahan segar</li>
                            </ul>
                        </div>
                        
                        <div style="background: #fff9c4; padding: 25px; border-radius: 15px; margin-bottom: 20px;">
                            <h3>🐛 Masalah: Ada Belatung/Lalat</h3>
                            <p><strong>Penyebab:</strong></p>
                            <ul>
                                <li>Tutup wadah tidak rapat</li>
                                <li>Ada celah untuk lalat masuk</li>
                            </ul>
                            <p><strong>Solusi:</strong></p>
                            <ul>
                                <li>Saring ecoenzim segera</li>
                                <li>Gunakan wadah baru dengan tutup yang rapat</li>
                                <li>Lapisi tutup dengan plastik jika perlu</li>
                            </ul>
                        </div>
                        
                        <div style="background: #e1f5fe; padding: 25px; border-radius: 15px; margin-bottom: 20px;">
                            <h3>💥 Masalah: Wadah Menggelembung</h3>
                            <p><strong>Penyebab:</strong></p>
                            <ul>
                                <li>Penumpukan gas hasil fermentasi</li>
                                <li>Tutup terlalu rapat dan tidak pernah dibuka</li>
                            </ul>
                            <p><strong>Solusi:</strong></p>
                            <ul>
                                <li>Buka tutup perlahan-lahan untuk mengeluarkan gas</li>
                                <li>Lakukan ini setiap hari di minggu pertama</li>
                                <li>Setelah itu seminggu sekali sudah cukup</li>
                            </ul>
                        </div>
                        
                        <div style="background: #f3e5f5; padding: 25px; border-radius: 15px; margin-bottom: 20px;">
                            <h3>🧪 Masalah: Warna Terlalu Gelap/Hitam</h3>
                            <p><strong>Penyebab:</strong></p>
                            <ul>
                                <li>Terlalu banyak gula merah</li>
                                <li>Fermentasi terlalu lama (>6 bulan)</li>
                            </ul>
                            <p><strong>Solusi:</strong></p>
                            <ul>
                                <li>Ecoenzim masih bisa digunakan, hanya warnanya saja yang gelap</li>
                                <li>Untuk batch berikutnya, kurangi gula merah</li>
                                <li>Panen setelah 3 bulan untuk hasil optimal</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: "Kuis Modul 4",
            content: `
                <div class="module-content">
                    <h2>📝 Kuis Akhir</h2>
                    
                    <div id="quizModule4" style="margin-top: 30px;">
                        <div class="quiz-question">
                            <h3>Apa yang harus dilakukan jika ecoenzim berbau busuk?</h3>
                            <div style="display: grid; gap: 10px; margin-top: 20px;">
                                <button class="quiz-option" onclick="checkAnswer(4, 'wrong')">Tambahkan lebih banyak air</button>
                                <button class="quiz-option" onclick="checkAnswer(4, 'correct')">Tambahkan gula merah dan buka tutup lebih sering</button>
                                <button class="quiz-option" onclick="checkAnswer(4, 'wrong')">Tutup lebih rapat</button>
                                <button class="quiz-option" onclick="checkAnswer(4, 'wrong')">Panaskan wadah</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="quizResult4" style="display: none; margin-top: 20px;"></div>
                </div>
            `
        }
    ]
};

let currentModule = 1;
let currentContent = 0;

// Open module modal
function openModule(moduleNum) {
    currentModule = moduleNum;
    currentContent = 0;
    
    const modal = document.getElementById('moduleModal');
    const content = document.getElementById('moduleContent');
    
    if (moduleContents[moduleNum]) {
        content.innerHTML = moduleContents[moduleNum][currentContent].content;
        modal.style.display = 'block';
        updateNavigationButtons();
    }
}

// Close module modal
function closeModule() {
    document.getElementById('moduleModal').style.display = 'none';
}

// Navigate content
function nextContent() {
    const moduleData = moduleContents[currentModule];
    if (currentContent < moduleData.length - 1) {
        currentContent++;
        document.getElementById('moduleContent').innerHTML = moduleData[currentContent].content;
        updateNavigationButtons();
    } else {
        // Complete module
        completeModule(currentModule);
    }
}

function prevContent() {
    if (currentContent > 0) {
        currentContent--;
        document.getElementById('moduleContent').innerHTML = moduleContents[currentModule][currentContent].content;
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const moduleData = moduleContents[currentModule];
    
    prevBtn.style.display = currentContent > 0 ? 'block' : 'none';
    
    if (currentContent === moduleData.length - 1) {
        nextBtn.textContent = 'Selesai ✓';
        nextBtn.style.background = 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)';
    } else {
        nextBtn.textContent = 'Selanjutnya ➡️';
        nextBtn.style.background = 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)';
    }
}

// Check quiz answer
function checkAnswer(moduleNum, result) {
    const resultDiv = document.getElementById(`quizResult${moduleNum}`);
    const quizDiv = document.getElementById(`quizModule${moduleNum}`);
    
    quizDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    
    if (result === 'correct') {
        resultDiv.innerHTML = `
            <div style="background: #e8f5e9; padding: 30px; border-radius: 15px; text-align: center;">
                <div style="font-size: 64px;">🎉</div>
                <h3 style="color: #2e7d32;">Jawaban Benar!</h3>
                <p>Selamat! Kamu berhasil menjawab dengan tepat.</p>
                <button class="btn btn-primary" onclick="nextContent()" style="margin-top: 20px;">Lanjutkan</button>
            </div>
        `;
        addXP(50);
    } else {
        resultDiv.innerHTML = `
            <div style="background: #ffebee; padding: 30px; border-radius: 15px; text-align: center;">
                <div style="font-size: 64px;">😔</div>
                <h3 style="color: #c62828;">Jawaban Kurang Tepat</h3>
                <p>Jangan berkecil hati! Coba baca materinya lagi ya.</p>
                <button class="btn btn-secondary" onclick="retryQuiz(${moduleNum})" style="margin-top: 20px;">Coba Lagi</button>
            </div>
        `;
    }
}

function retryQuiz(moduleNum) {
    const resultDiv = document.getElementById(`quizResult${moduleNum}`);
    const quizDiv = document.getElementById(`quizModule${moduleNum}`);
    
    resultDiv.style.display = 'none';
    quizDiv.style.display = 'block';
}

// Complete module
function completeModule(moduleNum) {
    if (!userData.completedModules.includes(moduleNum)) {
        userData.completedModules.push(moduleNum);
        addXP(100);
        showNotification(`🎊 Modul ${moduleNum} Selesai! +100 XP`);
        saveUserData();
        updateUI();
    }
    closeModule();
}

// Games
function startSortGame() {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('gameContent');
    
    content.innerHTML = `
        <div class="game-container">
            <h2>🗑️ Game Sortir Sampah</h2>
            <p>Pilih sampah organik yang tepat untuk membuat ecoenzim!</p>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>Skor:</strong> <span id="gameScore">0</span>
                    </div>
                    <div>
                        <strong>Waktu:</strong> <span id="gameTime">60</span> detik
                    </div>
                </div>
            </div>
            
            <div id="wasteItems" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 30px 0;"></div>
            
            <div style="background: #e3f2fd; padding: 20px; border-radius: 15px; margin-top: 20px;">
                <h4>💡 Ingat!</h4>
                <p>Pilih HANYA sampah organik segar seperti:</p>
                <p>✅ Kulit buah, sisa sayuran, daun</p>
                <p>❌ Daging, tulang, minyak, plastik</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    initSortGame();
}

let sortGameScore = 0;
let sortGameTime = 60;
let sortGameInterval;

const wasteData = [
    { name: "🍊 Kulit Jeruk", organic: true },
    { name: "🥬 Sisa Sayur", organic: true },
    { name: "🍌 Kulit Pisang", organic: true },
    { name: "🍎 Kulit Apel", organic: true },
    { name: "🥕 Batang Wortel", organic: true },
    { name: "🍃 Daun Kering", organic: true },
    { name: "🍖 Daging", organic: false },
    { name: "🦴 Tulang", organic: false },
    { name: "🧴 Plastik", organic: false },
    { name: "🛢️ Minyak", organic: false },
    { name: "🥫 Kaleng", organic: false },
    { name: "📄 Kertas", organic: false }
];

function initSortGame() {
    sortGameScore = 0;
    sortGameTime = 60;
    document.getElementById('gameScore').textContent = sortGameScore;
    
    sortGameInterval = setInterval(() => {
        sortGameTime--;
        document.getElementById('gameTime').textContent = sortGameTime;
        
        if (sortGameTime <= 0) {
            endSortGame();
        }
    }, 1000);
    
    displayWasteItems();
}

function displayWasteItems() {
    const container = document.getElementById('wasteItems');
    const shuffled = wasteData.sort(() => Math.random() - 0.5).slice(0, 6);
    
    container.innerHTML = '';
    shuffled.forEach(item => {
        const button = document.createElement('button');
        button.style.cssText = `
            padding: 20px;
            border: 3px solid #ddd;
            border-radius: 15px;
            background: white;
            cursor: pointer;
            font-size: 18px;
            transition: all 0.3s ease;
        `;
        button.textContent = item.name;
        button.onclick = () => checkWaste(item.organic, button);
        container.appendChild(button);
    });
}

function checkWaste(isOrganic, button) {
    if (isOrganic) {
        sortGameScore += 10;
        button.style.background = '#e8f5e9';
        button.style.borderColor = '#43a047';
        setTimeout(() => {
            displayWasteItems();
        }, 500);
    } else {
        sortGameScore -= 5;
        button.style.background = '#ffebee';
        button.style.borderColor = '#e53935';
    }
    document.getElementById('gameScore').textContent = sortGameScore;
}

// Streak System
function updateStreakUI() {
    checkStreak();
    
    const streakNumber = document.getElementById('streakNumber');
    const streakStatus = document.getElementById('streakStatus');
    const playTodayBtn = document.getElementById('playTodayBtn');
    const longestStreak = document.getElementById('longestStreak');
    
    streakNumber.textContent = userData.streak.current;
    longestStreak.textContent = userData.streak.longest;
    
    if (userData.streak.playedToday) {
        streakStatus.innerHTML = '<p>✅ Sudah bermain hari ini! Kembali lagi besok!</p>';
        streakStatus.className = 'streak-status active';
        playTodayBtn.disabled = true;
        playTodayBtn.textContent = '✓ Streak Hari Ini Selesai';
    } else {
        const now = new Date();
        const lastPlay = userData.streak.lastPlayDate ? new Date(userData.streak.lastPlayDate) : null;
        
        if (lastPlay) {
            const diffDays = Math.floor((now - lastPlay) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                streakStatus.innerHTML = '<p>⚡ Main sekarang untuk lanjutkan streak!</p>';
                streakStatus.className = 'streak-status warning';
            } else if (diffDays > 1) {
                streakStatus.innerHTML = '<p>💔 Streak putus! Mulai lagi dari 0</p>';
                streakStatus.className = 'streak-status';
            }
        } else {
            streakStatus.innerHTML = '<p>🎮 Belum bermain hari ini</p>';
            streakStatus.className = 'streak-status';
        }
        
        playTodayBtn.disabled = false;
        playTodayBtn.textContent = '🔥 Main Game Hari Ini!';
    }
    
    updateStreakCalendar();
}

function checkStreak() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    
    const lastPlay = userData.streak.lastPlayDate ? new Date(userData.streak.lastPlayDate) : null;
    
    if (lastPlay) {
        lastPlay.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today - lastPlay) / (1000 * 60 * 60 * 24));
        
        // Check if played today
        const lastPlayStr = new Date(userData.streak.lastPlayDate).toISOString().split('T')[0];
        userData.streak.playedToday = (lastPlayStr === todayStr);
        
        // Reset streak if more than 1 day passed
        if (diffDays > 1) {
            userData.streak.current = 0;
        }
    }
}

function recordDailyPlay() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Check if already played today
    if (userData.streak.playedToday) {
        return false;
    }
    
    const lastPlay = userData.streak.lastPlayDate ? new Date(userData.streak.lastPlayDate) : null;
    
    if (lastPlay) {
        lastPlay.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today - lastPlay) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            // Consecutive day - increase streak
            userData.streak.current++;
        } else if (diffDays > 1) {
            // Streak broken - reset to 1
            userData.streak.current = 1;
        }
    } else {
        // First time playing
        userData.streak.current = 1;
    }
    
    // Update longest streak
    if (userData.streak.current > userData.streak.longest) {
        userData.streak.longest = userData.streak.current;
    }
    
    userData.streak.lastPlayDate = new Date().toISOString();
    userData.streak.playedToday = true;
    
    // Add to history
    if (!userData.streak.history.includes(todayStr)) {
        userData.streak.history.push(todayStr);
    }
    
    // Give streak bonus XP
    const bonusXP = userData.streak.current * 10;
    addXP(bonusXP);
    
    saveUserData();
    updateStreakUI();
    
    showNotification(`🔥 Streak ${userData.streak.current} hari! +${bonusXP} XP Bonus!`);
    
    return true;
}

function checkDailyPlay() {
    if (userData.streak.playedToday) {
        showNotification('✅ Kamu sudah bermain hari ini!');
        return;
    }
    
    // Scroll to game section
    document.getElementById('game').scrollIntoView({ behavior: 'smooth' });
    showNotification('🎮 Pilih game apapun untuk melanjutkan streak!');
}

function updateStreakCalendar() {
    const calendar = document.getElementById('streakCalendar');
    calendar.innerHTML = '';
    
    const today = new Date();
    
    // Show last 14 days
    for (let i = 13; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        
        if (userData.streak.history.includes(dateStr)) {
            dayDiv.classList.add('completed');
            dayDiv.textContent = '🔥';
        } else {
            dayDiv.textContent = '○';
        }
        
        if (i === 0) {
            dayDiv.classList.add('today');
        }
        
        calendar.appendChild(dayDiv);
    }
}

function endSortGame() {
    clearInterval(sortGameInterval);
    
    if (sortGameScore > userData.gameScores.sort) {
        userData.gameScores.sort = sortGameScore;
        saveUserData();
    }
    
    const xpEarned = Math.floor(sortGameScore / 2);
    addXP(xpEarned);
    
    // Record daily play for streak
    const streakRecorded = recordDailyPlay();
    
    document.getElementById('gameContent').innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 80px;">🏆</div>
            <h2>Permainan Selesai!</h2>
            <p style="font-size: 24px; margin: 20px 0;">Skor Akhir: <strong>${sortGameScore}</strong></p>
            <p style="font-size: 18px; color: #666;">XP yang didapat: +${xpEarned}</p>
            ${sortGameScore > userData.gameScores.sort - sortGameScore ? '<p style="color: #43a047; font-weight: bold;">🎉 Rekor Baru!</p>' : ''}
            ${streakRecorded ? `<p style="color: #ff6b6b; font-weight: bold;">🔥 Streak ${userData.streak.current} Hari!</p>` : ''}
            <button class="btn btn-primary" onclick="closeGame()" style="margin-top: 30px;">Selesai</button>
            <button class="btn btn-secondary" onclick="startSortGame()" style="margin-top: 30px;">Main Lagi</button>
        </div>
    `;
}

// Mix Game
function startMixGame() {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('gameContent');
    
    content.innerHTML = `
        <div class="game-container">
            <h2>🧪 Game Racik Ecoenzim</h2>
            <p>Campur bahan dengan rasio yang tepat!</p>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p><strong>Target Rasio:</strong> Sampah 3 : Gula 1 : Air 10</p>
            </div>
            
            <div style="display: grid; gap: 20px; margin: 30px 0;">
                <div>
                    <label style="display: block; margin-bottom: 10px;">🥬 Sampah Organik (gram)</label>
                    <input type="range" id="wasteSlider" min="0" max="500" value="0" 
                           oninput="updateMixValues()" style="width: 100%">
                    <div style="text-align: center; font-size: 20px; margin-top: 10px;">
                        <strong><span id="wasteValue">0</span> gram</strong>
                    </div>
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 10px;">🍯 Gula Merah (gram)</label>
                    <input type="range" id="sugarSlider" min="0" max="200" value="0" 
                           oninput="updateMixValues()" style="width: 100%">
                    <div style="text-align: center; font-size: 20px; margin-top: 10px;">
                        <strong><span id="sugarValue">0</span> gram</strong>
                    </div>
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 10px;">💧 Air (ml)</label>
                    <input type="range" id="waterSlider" min="0" max="2000" value="0" 
                           oninput="updateMixValues()" style="width: 100%">
                    <div style="text-align: center; font-size: 20px; margin-top: 10px;">
                        <strong><span id="waterValue">0</span> ml</strong>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="checkMixture()" style="width: 100%; margin-top: 20px;">
                Cek Racikan
            </button>
            
            <div id="mixResult" style="margin-top: 20px;"></div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function updateMixValues() {
    document.getElementById('wasteValue').textContent = document.getElementById('wasteSlider').value;
    document.getElementById('sugarValue').textContent = document.getElementById('sugarSlider').value;
    document.getElementById('waterValue').textContent = document.getElementById('waterSlider').value;
}

function checkMixture() {
    const waste = parseInt(document.getElementById('wasteSlider').value);
    const sugar = parseInt(document.getElementById('sugarSlider').value);
    const water = parseInt(document.getElementById('waterSlider').value);
    
    const resultDiv = document.getElementById('mixResult');
    
    // Hitung rasio (dengan toleransi ±10%)
    const idealWaste = 300;
    const idealSugar = 100;
    const idealWater = 1000;
    
    const wasteCorrect = Math.abs(waste - (sugar * 3)) <= sugar * 0.3;
    const waterCorrect = Math.abs(water - (sugar * 10)) <= sugar;
    
    if (waste > 0 && sugar > 0 && water > 0 && wasteCorrect && waterCorrect) {
        const score = 100 - Math.abs((waste/sugar - 3)) * 10 - Math.abs((water/sugar - 10));
        
        if (score > userData.gameScores.mix) {
            userData.gameScores.mix = Math.round(score);
            saveUserData();
        }
        
        addXP(50);
        
        // Record daily play for streak
        const streakRecorded = recordDailyPlay();
        
        resultDiv.innerHTML = `
            <div style="background: #e8f5e9; padding: 30px; border-radius: 15px; text-align: center;">
                <div style="font-size: 64px;">✅</div>
                <h3 style="color: #2e7d32;">Racikan Sempurna!</h3>
                <p>Skor: ${Math.round(score)}/100</p>
                <p style="margin-top: 15px;">Rasio kamu: ${(waste/sugar).toFixed(1)} : 1 : ${(water/sugar).toFixed(1)}</p>
                <p style="color: #666; margin-top: 10px;">+50 XP</p>
                ${streakRecorded ? `<p style="color: #ff6b6b; font-weight: bold; margin-top: 10px;">🔥 Streak ${userData.streak.current} Hari!</p>` : ''}
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div style="background: #fff3e0; padding: 30px; border-radius: 15px; text-align: center;">
                <div style="font-size: 64px;">📊</div>
                <h3 style="color: #f57c00;">Perlu Penyesuaian</h3>
                <p>Rasio kamu: ${sugar > 0 ? (waste/sugar).toFixed(1) : '?'} : 1 : ${sugar > 0 ? (water/sugar).toFixed(1) : '?'}</p>
                <p style="color: #666; margin-top: 10px;">Target: 3 : 1 : 10</p>
                <p style="margin-top: 15px;">Coba sesuaikan slider hingga mendekati rasio yang tepat!</p>
            </div>
        `;
    }
}

// Quiz Game
function startQuiz() {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('gameContent');
    
    content.innerHTML = `
        <div class="game-container">
            <h2>❓ Kuis Ecoenzim</h2>
            <p>Uji pemahamanmu tentang ecoenzim!</p>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between;">
                    <div><strong>Pertanyaan:</strong> <span id="quizNumber">1</span>/5</div>
                    <div><strong>Skor:</strong> <span id="quizScore">0</span></div>
                </div>
            </div>
            
            <div id="quizQuestion"></div>
        </div>
    `;
    
    modal.style.display = 'block';
    initQuiz();
}

const quizQuestions = [
    {
        question: "Berapa lama waktu fermentasi ecoenzim yang ideal?",
        options: ["1 bulan", "2 bulan", "3 bulan", "6 bulan"],
        correct: 2
    },
    {
        question: "Apa yang harus dilakukan di minggu pertama pembuatan ecoenzim?",
        options: ["Tidak perlu dibuka", "Buka tutup setiap hari", "Dipanaskan", "Ditaruh di kulkas"],
        correct: 1
    },
    {
        question: "Berapa rasio campuran untuk membuat ecoenzim?",
        options: ["1:1:1", "2:1:5", "3:1:10", "5:2:10"],
        correct: 2
    },
    {
        question: "Apa yang TIDAK boleh dimasukkan ke dalam ecoenzim?",
        options: ["Kulit jeruk", "Kulit pisang", "Daging dan tulang", "Sisa sayuran"],
        correct: 2
    },
    {
        question: "Untuk apa ecoenzim bisa digunakan?",
        options: ["Hanya pembersih lantai", "Hanya pupuk tanaman", "Berbagai kegunaan rumah tangga", "Tidak bermanfaat"],
        correct: 2
    }
];

let currentQuizQuestion = 0;
let quizGameScore = 0;

function initQuiz() {
    currentQuizQuestion = 0;
    quizGameScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizQuestion >= quizQuestions.length) {
        endQuiz();
        return;
    }
    
    const q = quizQuestions[currentQuizQuestion];
    const container = document.getElementById('quizQuestion');
    
    container.innerHTML = `
        <div style="margin: 30px 0;">
            <h3 style="margin-bottom: 20px;">${q.question}</h3>
            <div style="display: grid; gap: 10px;">
                ${q.options.map((opt, i) => `
                    <button class="quiz-option" onclick="answerQuiz(${i})"
                            style="padding: 15px; border: 2px solid #ddd; border-radius: 10px; 
                                   background: white; cursor: pointer; text-align: left;
                                   transition: all 0.3s ease;">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('quizNumber').textContent = currentQuizQuestion + 1;
    document.getElementById('quizScore').textContent = quizGameScore;
}

function answerQuiz(selected) {
    const q = quizQuestions[currentQuizQuestion];
    const buttons = document.querySelectorAll('.quiz-option');
    
    buttons.forEach(btn => btn.style.pointerEvents = 'none');
    
    if (selected === q.correct) {
        buttons[selected].style.background = '#e8f5e9';
        buttons[selected].style.borderColor = '#43a047';
        quizGameScore += 20;
    } else {
        buttons[selected].style.background = '#ffebee';
        buttons[selected].style.borderColor = '#e53935';
        buttons[q.correct].style.background = '#e8f5e9';
        buttons[q.correct].style.borderColor = '#43a047';
    }
    
    document.getElementById('quizScore').textContent = quizGameScore;
    
    setTimeout(() => {
        currentQuizQuestion++;
        showQuizQuestion();
    }, 1500);
}

function endQuiz() {
    if (quizGameScore > userData.gameScores.quiz) {
        userData.gameScores.quiz = quizGameScore;
        saveUserData();
    }
    
    const xpEarned = quizGameScore;
    addXP(xpEarned);
    
    // Record daily play for streak
    const streakRecorded = recordDailyPlay();
    
    document.getElementById('gameContent').innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 80px;">🎓</div>
            <h2>Kuis Selesai!</h2>
            <p style="font-size: 24px; margin: 20px 0;">Skor Akhir: <strong>${quizGameScore}/100</strong></p>
            <p style="font-size: 18px; color: #666;">XP yang didapat: +${xpEarned}</p>
            ${quizGameScore === 100 ? '<p style="color: #43a047; font-weight: bold;">🎉 Nilai Sempurna!</p>' : ''}
            ${streakRecorded ? `<p style="color: #ff6b6b; font-weight: bold;">🔥 Streak ${userData.streak.current} Hari!</p>` : ''}
            <button class="btn btn-primary" onclick="closeGame()" style="margin-top: 30px;">Selesai</button>
            <button class="btn btn-secondary" onclick="startQuiz()" style="margin-top: 30px;">Main Lagi</button>
        </div>
    `;
}

// Close game modal
function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
    updateUI();
}

// Change avatar
const avatars = ["🌱", "🌿", "🍀", "🌾", "🌳", "🌲", "🌴", "🌵", "🌸", "🌺", "🌻", "🌼"];
let currentAvatarIndex = 0;

function changeAvatar() {
    currentAvatarIndex = (currentAvatarIndex + 1) % avatars.length;
    userData.avatar = avatars[currentAvatarIndex];
    saveUserData();
    updateUI();
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on load
window.addEventListener('load', () => {
    loadUserData();
    
    // Check streak status and show reminder
    checkStreak();
    if (!userData.streak.playedToday && userData.streak.current > 0) {
        setTimeout(() => {
            showNotification('🔥 Jangan lupa main game hari ini untuk jaga streak!');
        }, 2000);
    }
    
    // Animate stats on scroll
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        });
    };
    
    setTimeout(animateStats, 500);
});

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
