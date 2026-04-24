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
        history: []
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
    
    document.querySelector('.avatar-emoji').textContent = userData.avatar;
    
    document.getElementById('sortScore').textContent = userData.gameScores.sort;
    document.getElementById('mixScore').textContent = userData.gameScores.mix;
    document.getElementById('quizScore').textContent = userData.gameScores.quiz;
    
    updateModuleProgress();
    updateBadges();
    updateStreakUI();
}

// Update module progress and unlock next modules
function updateModuleProgress() {
    // Loop melalui semua modul yang sudah selesai
    userData.completedModules.forEach(moduleNum => {
        const card = document.querySelector(`[data-module="${moduleNum}"]`);
        if (card) {
            const progressFill = card.querySelector('.progress-fill');
            const progressText = card.querySelector('.progress-text');
            const badge = card.querySelector('.module-badge');
            if (progressFill) progressFill.style.width = '100%';
            if (progressText) progressText.textContent = '100% selesai';
            if (badge) badge.classList.remove('locked');
        }
        
        // Buka modul berikutnya (moduleNum + 1)
        const nextCard = document.querySelector(`[data-module="${moduleNum + 1}"]`);
        if (nextCard) {
            const nextBtn = nextCard.querySelector('.btn-module');
            const nextBadge = nextCard.querySelector('.module-badge');
            const nextProgressText = nextCard.querySelector('.progress-text');
            
            if (nextBtn) {
                nextBtn.disabled = false;
                nextBtn.classList.remove('locked');
                nextBtn.innerHTML = 'Mulai Belajar';
            }
            if (nextBadge) nextBadge.classList.remove('locked');
            if (nextProgressText && nextProgressText.textContent === 'Terkunci') {
                nextProgressText.textContent = '0% selesai';
            }
        }
    });
    
    // Jika tidak ada modul selesai, pastikan modul 1 bisa diakses (seharusnya sudah bisa)
    const firstCard = document.querySelector(`[data-module="1"]`);
    if (firstCard) {
        const firstBtn = firstCard.querySelector('.btn-module');
        if (firstBtn) {
            firstBtn.disabled = false;
            firstBtn.classList.remove('locked');
            firstBtn.innerHTML = 'Mulai Belajar';
        }
    }
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
    if (badges[index]) badges[index].classList.remove('locked');
    showNotification(`🏆 Badge Baru: ${name}!`);
}

// Update badges display
function updateBadges() {
    const badgeNames = ['pemula', 'ilmuwan', 'ahli', 'master'];
    const badges = document.querySelectorAll('.badge-item');
    
    userData.badges.forEach(badge => {
        const index = badgeNames.indexOf(badge);
        if (index !== -1 && badges[index]) {
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
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Tutup hamburger menu jika sedang terbuka
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Module Content (sama seperti sebelumnya - tidak diubah)
const moduleContents = { ... }; // Saya tidak tulis ulang karena panjang, gunakan yang sudah ada

let currentModule = 1;
let currentContent = 0;

function openModule(moduleNum) {
    // Periksa apakah modul sudah terbuka (tidak terkunci)
    const card = document.querySelector(`[data-module="${moduleNum}"]`);
    const btn = card?.querySelector('.btn-module');
    if (btn && btn.disabled) {
        showNotification('🔒 Selesaikan modul sebelumnya terlebih dahulu!');
        return;
    }
    
    currentModule = moduleNum;
    currentContent = 0;
    
    const modal = document.getElementById('moduleModal');
    const content = document.getElementById('moduleContent');
    
    if (moduleContents[moduleNum]) {
        content.innerHTML = moduleContents[moduleNum][currentContent].content;
        modal.style.display = 'block';
        updateNavigationButtons();
    } else {
        showNotification('Modul belum tersedia.');
    }
}

function closeModule() {
    document.getElementById('moduleModal').style.display = 'none';
}

function nextContent() {
    const moduleData = moduleContents[currentModule];
    if (currentContent < moduleData.length - 1) {
        currentContent++;
        document.getElementById('moduleContent').innerHTML = moduleData[currentContent].content;
        updateNavigationButtons();
    } else {
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

// Games (sama seperti sebelumnya, tidak diubah - gunakan kode game yang sudah ada)
// ... (semua fungsi game: startSortGame, startMixGame, startQuiz, dll tetap sama)

// Streak System (sama seperti sebelumnya)
// ... (fungsi streak tetap sama)

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
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Initialize on load
window.addEventListener('load', () => {
    loadUserData();
    checkStreak();
    if (!userData.streak.playedToday && userData.streak.current > 0) {
        setTimeout(() => {
            showNotification('🔥 Jangan lupa main game hari ini untuk jaga streak!');
        }, 2000);
    }
    
    // Animate stats
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

// ========== GAME FUNCTIONS ==========
// (Salin semua fungsi game dari script.js asli di sini)
// Mulai dari function startSortGame(), initSortGame(), endSortGame(), 
// startMixGame(), checkMixture(), startQuiz(), initQuiz(), answerQuiz(), endQuiz()
// Jangan lupa juga variabel global seperti sortGameScore, wasteData, dll.
