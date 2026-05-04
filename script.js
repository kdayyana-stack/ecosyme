let userData = {
    name: "EcoWarrior", level: 1, xp: 0, avatar: "🌱", completedModules: [],
    gameScores: { sort: 0, mix: 0, quiz: 0 }, badges: [],
    streak: { current: 0, longest: 0, lastPlayDate: null, playedToday: false, history: [] }
};

function loadUserData() {
    const saved = localStorage.getItem('ecoQuestData');
    if (saved) { userData = JSON.parse(saved); updateUI(); }
}
function saveUserData() { localStorage.setItem('ecoQuestData', JSON.stringify(userData)); }

function updateUI() {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userLevel').textContent = `Level ${userData.level}`;
    let xpNeeded = userData.level * 100;
    let xpProgress = (userData.xp / xpNeeded) * 100;
    document.getElementById('xpFill').style.width = xpProgress + '%';
    document.getElementById('currentXP').textContent = userData.xp;
    document.getElementById('nextLevelXP').textContent = xpNeeded;
    document.querySelector('.avatar-emoji').textContent = userData.avatar;
    document.getElementById('sortScore').textContent = userData.gameScores.sort;
    document.getElementById('mixScore').textContent = userData.gameScores.mix;
    document.getElementById('quizScore').textContent = userData.gameScores.quiz;
    updateModuleProgress();
    updateBadges();
    updateStreakUI();  // ini akan memanggil checkAndResetStreak
}

function updateModuleProgress() {
    userData.completedModules.forEach(mod => {
        let card = document.querySelector(`[data-module="${mod}"]`);
        if(card) {
            card.querySelector('.progress-fill').style.width = '100%';
            card.querySelector('.progress-text').textContent = '100% selesai';
            card.querySelector('.module-badge').classList.remove('locked');
            let nextCard = document.querySelector(`[data-module="${mod+1}"]`);
            if(nextCard) {
                let nextBtn = nextCard.querySelector('.btn-module');
                nextBtn.disabled = false;
                nextBtn.classList.remove('locked');
                nextBtn.innerHTML = 'Mulai Belajar';
                nextBtn.setAttribute('onclick', `openModule(${mod+1})`);
                nextCard.querySelector('.progress-text').textContent = '0% selesai';
                nextCard.querySelector('.module-badge').classList.remove('locked');
            }
        }
    });
}

function addXP(amount) {
    userData.xp += amount;
    let xpNeeded = userData.level * 100;
    if(userData.xp >= xpNeeded) {
        userData.level++;
        userData.xp -= xpNeeded;
        showNotification(`🎉 Naik Level! Sekarang Level ${userData.level}!`);
        checkBadges();
    }
    saveUserData();
    updateUI();
}

function checkBadges() {
    if(userData.level>=2 && !userData.badges.includes('pemula')) { userData.badges.push('pemula'); unlockBadge(0,'Pemula'); }
    if(userData.level>=5 && !userData.badges.includes('ilmuwan')) { userData.badges.push('ilmuwan'); unlockBadge(1,'Ilmuwan'); }
    if(userData.level>=10 && !userData.badges.includes('ahli')) { userData.badges.push('ahli'); unlockBadge(2,'Ahli Eco'); }
    if(userData.level>=20 && !userData.badges.includes('master')) { userData.badges.push('master'); unlockBadge(3,'Master'); }
}
function unlockBadge(index, name) { document.querySelectorAll('.badge-item')[index].classList.remove('locked'); showNotification(`🏆 Badge Baru: ${name}!`); }
function updateBadges() { ['pemula','ilmuwan','ahli','master'].forEach((b,i)=>{ if(userData.badges.includes(b)) document.querySelectorAll('.badge-item')[i].classList.remove('locked'); }); }

function startLearning() { document.getElementById('materi').scrollIntoView({behavior:'smooth'}); }
function goToGame() { document.getElementById('game').scrollIntoView({behavior:'smooth'}); }

// ===================== MODULE CONTENTS (1-4) =====================
const moduleContents = {
    1: [
        { title:"Apa itu Ecoenzim?", content:`<div class="module-content"><h2>🌿 Mengenal Ecoenzim</h2><p>Ecoenzim adalah cairan hasil fermentasi sampah organik (kulit buah, sayur) dengan gula merah dan air.</p><div style="background:#e8f5e9; padding:20px; border-radius:15px;"><h3>💡 Tahukah Kamu?</h3><p>Setiap hari, rata-rata rumah tangga menghasilkan 0.5-1 kg sampah organik.</p></div><h3>Sejarah Singkat</h3><p>Dikembangkan oleh Dr. Rosukon Poompanvong dari Thailand.</p><div style="text-align:center; margin:30px 0;"><div style="font-size:120px;">🧪</div><p>Sampah Organik + Gula + Air = Cairan Ajaib!</p></div></div>` },
        { title:"Proses Fermentasi", content:`<div class="module-content"><h2>⏰ Proses Fermentasi</h2><p>Waktu 3 bulan.</p><ul><li>Minggu 1-2: Buka tutup setiap hari</li><li>Bulan 1: Warna kecoklatan</li><li>Bulan 2: Aroma asam manis</li><li>Bulan 3: Siap panen 🎉</li></ul><div style="background:#e3f2fd; padding:20px; border-radius:15px;"><h3>⚠️ Tips</h3><p>Simpan di tempat sejuk, jangan kena sinar matahari langsung.</p></div></div>` },
        { title:"Kuis Modul 1", content:`<div class="module-content"><h2>📝 Kuis</h2><div id="quizModule1"><h3>Berapa lama waktu fermentasi ecoenzim?</h3><div style="display:grid; gap:10px;"><button class="quiz-option" onclick="checkAnswer(1,'wrong')">1 minggu</button><button class="quiz-option" onclick="checkAnswer(1,'wrong')">1 bulan</button><button class="quiz-option" onclick="checkAnswer(1,'correct')">3 bulan</button><button class="quiz-option" onclick="checkAnswer(1,'wrong')">6 bulan</button></div></div><div id="quizResult1" style="display:none;"></div></div>` }
    ],
    2: [
        { title:"Manfaat untuk Rumah", content:`<div class="module-content"><h2>🏠 Manfaat Ecoenzim di Rumah</h2><div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:20px;"><div style="background:#e8f5e9; padding:20px; border-radius:15px;"><div style="font-size:48px;">🧼</div><h3>Pembersih Serbaguna</h3><p>1:10 dengan air untuk lantai, kaca</p></div><div style="background:#fff3e0; padding:20px; border-radius:15px;"><div style="font-size:48px;">🚽</div><h3>Pembersih Toilet</h3><p>Membunuh bakteri & menghilangkan bau</p></div><div style="background:#e3f2fd; padding:20px; border-radius:15px;"><div style="font-size:48px;">👕</div><h3>Pelembut Pakaian</h3><p>Alami & wangi</p></div></div><div style="background:#f3e5f5; padding:20px; border-radius:15px;"><h3>💰 Hemat Biaya</h3><p>Estimasi penghematan Rp100-200 ribu per bulan!</p></div></div>` },
        { title:"Manfaat Lingkungan", content:`<div class="module-content"><h2>🌍 Untuk Lingkungan</h2><ul><li>♻️ Mengurangi sampah organik ke TPA</li><li>💧 Membersihkan air dari bahan kimia</li><li>🌿 Pupuk tanaman (1:500)</li><li>🐛 Mengusir hama secara alami</li></ul><div style="text-align:center; margin-top:30px;"><h3>Dampak 1000 keluarga</h3><p>3 Ton sampah berkurang, 1000 L ecoenzim</p></div></div>` },
        { title:"Kuis Modul 2", content:`<div class="module-content"><h2>📝 Kuis</h2><div id="quizModule2"><h3>Berapa perbandingan ecoenzim dengan air untuk membersihkan lantai?</h3><div style="display:grid; gap:10px;"><button class="quiz-option" onclick="checkAnswer(2,'wrong')">1:1</button><button class="quiz-option" onclick="checkAnswer(2,'wrong')">1:5</button><button class="quiz-option" onclick="checkAnswer(2,'correct')">1:10</button><button class="quiz-option" onclick="checkAnswer(2,'wrong')">1:20</button></div></div><div id="quizResult2" style="display:none;"></div></div>` }
    ],
    3: [
        { title:"Bahan & Alat", content:`<div class="module-content"><h2>📋 Bahan dan Alat</h2><div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;"><div style="background:#e8f5e9; padding:20px;"><h3>🥗 Bahan</h3><ul><li>Sampah organik (3 bagian)</li><li>Gula merah (1 bagian)</li><li>Air (10 bagian)</li></ul></div><div style="background:#fff3e0; padding:20px;"><h3>🔧 Alat</h3><ul><li>Wadah plastik/kaca bertutup</li><li>Pisau, talenan</li><li>Corong & saringan</li></ul></div></div><p><strong>Contoh 1 liter:</strong> 300g sampah, 100g gula, 1000ml air.</p></div>` },
        { title:"Langkah Membuat", content:`<div class="module-content"><h2>👨‍🍳 Langkah-langkah</h2><ol><li>Siapkan wadah bersih</li><li>Potong kecil sampah organik</li><li>Larutkan gula dalam air</li><li>Campur semua bahan, pastikan terendam</li><li>Tutup rapat, beri label tanggal</li><li>Buka tutup setiap hari di minggu pertama, fermentasi 3 bulan</li></ol><div style="background:#fffde7; padding:15px; border-radius:15px;"><h3>⚠️ Hindari</h3><p>Jangan gunakan sampah busuk, jangan isi penuh, jangan lupa buka tutup.</p></div></div>` },
        { title:"Kuis Modul 3", content:`<div class="module-content"><h2>📝 Kuis</h2><div id="quizModule3"><h3>Apa rasio yang benar untuk membuat ecoenzim?</h3><div style="display:grid; gap:10px;"><button class="quiz-option" onclick="checkAnswer(3,'wrong')">1:1:1</button><button class="quiz-option" onclick="checkAnswer(3,'correct')">3:1:10</button><button class="quiz-option" onclick="checkAnswer(3,'wrong')">2:1:5</button><button class="quiz-option" onclick="checkAnswer(3,'wrong')">5:2:10</button></div></div><div id="quizResult3" style="display:none;"></div></div>` }
    ],
    4: [
        { title:"Ciri Berhasil", content:`<div class="module-content"><h2>✅ Ciri Ecoenzim Berhasil</h2><ul><li>Aroma asam manis (tidak busuk)</li><li>Warna coklat kekuningan</li><li>Cairan jernih dengan sedikit ampas</li><li>pH 3-4 (asam)</li></ul><div style="background:#fff3e0; padding:15px;"><h3>🔍 Lapisan Putih?</h3><p>Normal, aduk perlahan.</p></div></div>` },
        { title:"Troubleshooting", content:`<div class="module-content"><h2>🔧 Mengatasi Masalah</h2><div style="background:#ffebee; padding:15px; margin-bottom:15px;"><h3>😷 Bau Busuk</h3><p>Solusi: tambah gula, buka tutup lebih sering.</p></div><div style="background:#fff9c4; padding:15px; margin-bottom:15px;"><h3>🐛 Belatung</h3><p>Solusi: saring segera, wadah lebih rapat.</p></div><div style="background:#e1f5fe; padding:15px;"><h3>💥 Wadah menggelembung</h3><p>Buka tutup perlahan untuk keluarkan gas.</p></div></div>` },
        { title:"Kuis Modul 4", content:`<div class="module-content"><h2>📝 Kuis Akhir</h2><div id="quizModule4"><h3>Apa yang harus dilakukan jika ecoenzim berbau busuk?</h3><div style="display:grid; gap:10px;"><button class="quiz-option" onclick="checkAnswer(4,'wrong')">Tambahkan air</button><button class="quiz-option" onclick="checkAnswer(4,'correct')">Tambahkan gula & buka tutup lebih sering</button><button class="quiz-option" onclick="checkAnswer(4,'wrong')">Tutup rapat</button><button class="quiz-option" onclick="checkAnswer(4,'wrong')">Panaskan wadah</button></div></div><div id="quizResult4" style="display:none;"></div></div>` }
    ]
};

let currentModule=1, currentContent=0;
function openModule(moduleNum) {
    if(moduleNum>1 && !userData.completedModules.includes(moduleNum-1)) { showNotification("Selesaikan modul sebelumnya dulu!"); return; }
    currentModule=moduleNum; currentContent=0;
    if(moduleContents[moduleNum]) { document.getElementById('moduleContent').innerHTML = moduleContents[moduleNum][0].content; document.getElementById('moduleModal').style.display='block'; updateNavigationButtons(); }
}
function closeModule() { document.getElementById('moduleModal').style.display='none'; }
function nextContent() {
    if(currentContent < moduleContents[currentModule].length-1) { currentContent++; document.getElementById('moduleContent').innerHTML = moduleContents[currentModule][currentContent].content; updateNavigationButtons(); }
    else completeModule(currentModule);
}
function prevContent() { if(currentContent>0) { currentContent--; document.getElementById('moduleContent').innerHTML = moduleContents[currentModule][currentContent].content; updateNavigationButtons(); } }
function updateNavigationButtons() {
    let prevBtn=document.getElementById('prevBtn'), nextBtn=document.getElementById('nextBtn');
    prevBtn.style.display = currentContent>0 ? 'block' : 'none';
    nextBtn.textContent = (currentContent === moduleContents[currentModule].length-1) ? 'Selesai ✓' : 'Selanjutnya ➡️';
}
function checkAnswer(moduleNum, result) {
    let resultDiv = document.getElementById(`quizResult${moduleNum}`);
    let quizDiv = document.getElementById(`quizModule${moduleNum}`);
    if(quizDiv) quizDiv.style.display='none';
    resultDiv.style.display='block';
    if(result==='correct') {
        resultDiv.innerHTML = `<div style="background:#e8f5e9; padding:30px; border-radius:15px; text-align:center;"><div style="font-size:64px;">🎉</div><h3>Benar!</h3><button class="btn btn-primary" onclick="nextContent()">Lanjutkan</button></div>`;
        addXP(50);
    } else {
        resultDiv.innerHTML = `<div style="background:#ffebee; padding:30px; border-radius:15px; text-align:center;"><div style="font-size:64px;">😔</div><h3>Kurang tepat</h3><button class="btn btn-secondary" onclick="retryQuiz(${moduleNum})">Coba Lagi</button></div>`;
    }
}
function retryQuiz(moduleNum) { document.getElementById(`quizResult${moduleNum}`).style.display='none'; document.getElementById(`quizModule${moduleNum}`).style.display='block'; }
function completeModule(moduleNum) {
    if(!userData.completedModules.includes(moduleNum)) { userData.completedModules.push(moduleNum); addXP(100); showNotification(`🎊 Modul ${moduleNum} Selesai! +100 XP`); saveUserData(); updateUI(); }
    closeModule();
}

// ===================== GAME SORTIR =====================
let sortGameScore=0, sortGameTime=60, sortGameInterval;
const wasteData = [
    { name:"🍊 Kulit Jeruk", organic:true }, { name:"🥬 Sisa Sayur", organic:true }, { name:"🍌 Kulit Pisang", organic:true },
    { name:"🍎 Kulit Apel", organic:true }, { name:"🥕 Batang Wortel", organic:true }, { name:"🍃 Daun Kering", organic:true },
    { name:"🍖 Daging", organic:false }, { name:"🦴 Tulang", organic:false }, { name:"🧴 Plastik", organic:false },
    { name:"🛢️ Minyak", organic:false }, { name:"🥫 Kaleng", organic:false }, { name:"📄 Kertas", organic:false }
];
function startSortGame() {
    let modal=document.getElementById('gameModal'), content=document.getElementById('gameContent');
    content.innerHTML=`<div class="game-container"><h2>🗑️ Game Sortir Sampah</h2><p>Pilih sampah organik yang tepat!</p><div style="background:#fff3e0; padding:20px; border-radius:15px;"><div style="display:flex; justify-content:space-between;"><strong>Skor:</strong> <span id="gameScore">0</span> &nbsp; <strong>Waktu:</strong> <span id="gameTime">60</span> detik</div></div><div id="wasteItems" style="display:grid; grid-template-columns:repeat(3,1fr); gap:15px; margin:30px 0;"></div><div style="background:#e3f2fd; padding:20px; border-radius:15px;"><h4>💡 Ingat!</h4><p>Pilih HANYA sampah organik segar: kulit buah, sisa sayuran, daun.<br>❌ Daging, tulang, minyak, plastik.</p></div></div>`;
    modal.style.display='block';
    sortGameScore=0; sortGameTime=60;
    document.getElementById('gameScore').textContent=sortGameScore;
    if(sortGameInterval) clearInterval(sortGameInterval);
    sortGameInterval = setInterval(()=>{ sortGameTime--; document.getElementById('gameTime').textContent=sortGameTime; if(sortGameTime<=0) endSortGame(); },1000);
    displayWasteItems();
}
function displayWasteItems() {
    let container=document.getElementById('wasteItems');
    let shuffled = [...wasteData].sort(()=>Math.random()-0.5).slice(0,6);
    container.innerHTML='';
    shuffled.forEach(item=>{
        let btn=document.createElement('button');
        btn.style.cssText='padding:20px; border:3px solid #ddd; border-radius:15px; background:white; cursor:pointer; font-size:18px; transition:0.3s;';
        btn.textContent=item.name;
        btn.onclick=()=>checkWaste(item.organic,btn);
        container.appendChild(btn);
    });
}
function checkWaste(isOrganic,btn) {
    if(isOrganic) { sortGameScore+=10; btn.style.background='#e8f5e9'; btn.style.borderColor='#43a047'; setTimeout(displayWasteItems,400); }
    else { sortGameScore-=5; btn.style.background='#ffebee'; btn.style.borderColor='#e53935'; }
    document.getElementById('gameScore').textContent=sortGameScore;
}
function endSortGame() {
    clearInterval(sortGameInterval);
    if(sortGameScore > userData.gameScores.sort) userData.gameScores.sort = sortGameScore;
    let xpEarned = Math.floor(sortGameScore/2);
    addXP(xpEarned);
    let streakRecorded = recordDailyPlay();
    document.getElementById('gameContent').innerHTML=`<div style="text-align:center; padding:40px;"><div style="font-size:80px;">🏆</div><h2>Permainan Selesai!</h2><p style="font-size:24px;">Skor: <strong>${sortGameScore}</strong></p><p>XP: +${xpEarned}</p>${sortGameScore > userData.gameScores.sort - sortGameScore ? '<p style="color:#43a047;">🎉 Rekor Baru!</p>' : ''}${streakRecorded ? `<p style="color:#ff6b6b;">🔥 Streak ${userData.streak.current} Hari!</p>` : ''}<button class="btn btn-primary" onclick="closeGame()">Selesai</button><button class="btn btn-secondary" onclick="startSortGame()">Main Lagi</button></div>`;
    saveUserData();
    updateUI();
}

// ===================== GAME RACIK =====================
function startMixGame() {
    let modal=document.getElementById('gameModal'), content=document.getElementById('gameContent');
    content.innerHTML=`<div class="game-container"><h2>🧪 Game Racik Ecoenzim</h2><p>Campur bahan dengan rasio tepat (3:1:10)</p><div style="background:#fff3e0; padding:20px; border-radius:15px;"><strong>Target:</strong> Sampah 3 : Gula 1 : Air 10</div><div style="margin:30px 0;"><div><label>🥬 Sampah (gram)</label><input type="range" id="wasteSlider" min="0" max="500" value="0" oninput="updateMixValues()" style="width:100%"><div style="text-align:center;"><span id="wasteValue">0</span> gram</div></div><div><label>🍯 Gula (gram)</label><input type="range" id="sugarSlider" min="0" max="200" value="0" oninput="updateMixValues()" style="width:100%"><div style="text-align:center;"><span id="sugarValue">0</span> gram</div></div><div><label>💧 Air (ml)</label><input type="range" id="waterSlider" min="0" max="2000" value="0" oninput="updateMixValues()" style="width:100%"><div style="text-align:center;"><span id="waterValue">0</span> ml</div></div></div><button class="btn btn-primary" onclick="checkMixture()">Cek Racikan</button><div id="mixResult"></div></div>`;
    modal.style.display='block';
}
function updateMixValues() {
    document.getElementById('wasteValue').textContent=document.getElementById('wasteSlider').value;
    document.getElementById('sugarValue').textContent=document.getElementById('sugarSlider').value;
    document.getElementById('waterValue').textContent=document.getElementById('waterSlider').value;
}
function checkMixture() {
    let waste=parseInt(document.getElementById('wasteSlider').value);
    let sugar=parseInt(document.getElementById('sugarSlider').value);
    let water=parseInt(document.getElementById('waterSlider').value);
    let resultDiv=document.getElementById('mixResult');
    if(sugar===0) { resultDiv.innerHTML=`<div style="background:#fff3e0; padding:20px; text-align:center;">Masukkan gula terlebih dahulu!</div>`; return; }
    let wasteRatio = waste/sugar, waterRatio = water/sugar;
    let wasteOk = Math.abs(wasteRatio-3) <= 0.6;
    let waterOk = Math.abs(waterRatio-10) <= 1.5;
    if(wasteOk && waterOk && waste>0 && sugar>0 && water>0) {
        let score = 100 - Math.abs(wasteRatio-3)*10 - Math.abs(waterRatio-10)*2;
        score = Math.min(100, Math.max(0, Math.round(score)));
        if(score > userData.gameScores.mix) userData.gameScores.mix = score;
        addXP(50);
        let streakRecorded = recordDailyPlay();
        resultDiv.innerHTML=`<div style="background:#e8f5e9; padding:30px; border-radius:15px; text-align:center;"><div style="font-size:64px;">✅</div><h3>Racikan Sempurna!</h3><p>Skor: ${score}/100</p><p>Rasio: ${wasteRatio.toFixed(1)} : 1 : ${waterRatio.toFixed(1)}</p><p>+50 XP</p>${streakRecorded ? `<p>🔥 Streak ${userData.streak.current} Hari!</p>` : ''}</div>`;
        saveUserData(); updateUI();
    } else {
        resultDiv.innerHTML=`<div style="background:#fff3e0; padding:30px; border-radius:15px; text-align:center;"><div style="font-size:64px;">📊</div><h3>Perlu Penyesuaian</h3><p>Rasio saat ini: ${wasteRatio.toFixed(1)} : 1 : ${waterRatio.toFixed(1)}</p><p>Target: 3 : 1 : 10</p></div>`;
    }
}

// ===================== GAME KUIS =====================
const quizQuestions = [
    { question:"Berapa lama waktu fermentasi ecoenzim yang ideal?", options:["1 bulan","2 bulan","3 bulan","6 bulan"], correct:2 },
    { question:"Apa yang harus dilakukan di minggu pertama pembuatan ecoenzim?", options:["Tidak perlu dibuka","Buka tutup setiap hari","Dipanaskan","Ditaruh di kulkas"], correct:1 },
    { question:"Berapa rasio campuran untuk membuat ecoenzim?", options:["1:1:1","2:1:5","3:1:10","5:2:10"], correct:2 },
    { question:"Apa yang TIDAK boleh dimasukkan ke dalam ecoenzim?", options:["Kulit jeruk","Kulit pisang","Daging dan tulang","Sisa sayuran"], correct:2 },
    { question:"Untuk apa ecoenzim bisa digunakan?", options:["Hanya pembersih lantai","Hanya pupuk tanaman","Berbagai kegunaan rumah tangga","Tidak bermanfaat"], correct:2 }
];
let currentQuizQuestion=0, quizGameScore=0;
function startQuiz() {
    let modal=document.getElementById('gameModal'), content=document.getElementById('gameContent');
    content.innerHTML=`<div class="game-container"><h2>❓ Kuis Ecoenzim</h2><p>Uji pemahamanmu!</p><div style="background:#fff3e0; padding:20px; border-radius:15px;"><div style="display:flex; justify-content:space-between;"><strong>Pertanyaan:</strong> <span id="quizNumber">1</span>/5 &nbsp; <strong>Skor:</strong> <span id="quizScore">0</span></div></div><div id="quizQuestion"></div></div>`;
    modal.style.display='block';
    currentQuizQuestion=0; quizGameScore=0;
    showQuizQuestion();
}
function showQuizQuestion() {
    if(currentQuizQuestion >= quizQuestions.length) { endQuiz(); return; }
    let q = quizQuestions[currentQuizQuestion];
    document.getElementById('quizNumber').textContent = currentQuizQuestion+1;
    document.getElementById('quizScore').textContent = quizGameScore;
    document.getElementById('quizQuestion').innerHTML = `<div><h3>${q.question}</h3><div style="display:grid; gap:10px; margin-top:20px;">${q.options.map((opt,i)=>`<button class="quiz-option" onclick="answerQuiz(${i})" style="padding:15px; border:2px solid #ddd; border-radius:10px; background:white; cursor:pointer; text-align:left;">${opt}</button>`).join('')}</div></div>`;
}
function answerQuiz(selected) {
    let q = quizQuestions[currentQuizQuestion];
    let buttons = document.querySelectorAll('.quiz-option');
    buttons.forEach(btn=>btn.style.pointerEvents='none');
    if(selected === q.correct) { buttons[selected].style.background='#e8f5e9'; buttons[selected].style.borderColor='#43a047'; quizGameScore+=20; }
    else { buttons[selected].style.background='#ffebee'; buttons[selected].style.borderColor='#e53935'; buttons[q.correct].style.background='#e8f5e9'; buttons[q.correct].style.borderColor='#43a047'; }
    document.getElementById('quizScore').textContent = quizGameScore;
    setTimeout(()=>{ currentQuizQuestion++; showQuizQuestion(); },1500);
}
function endQuiz() {
    if(quizGameScore > userData.gameScores.quiz) userData.gameScores.quiz = quizGameScore;
    addXP(quizGameScore);
    let streakRecorded = recordDailyPlay();
    document.getElementById('gameContent').innerHTML = `<div style="text-align:center; padding:40px;"><div style="font-size:80px;">🎓</div><h2>Kuis Selesai!</h2><p style="font-size:24px;">Skor: ${quizGameScore}/100</p><p>XP: +${quizGameScore}</p>${quizGameScore===100 ? '<p style="color:#43a047;">🎉 Nilai Sempurna!</p>' : ''}${streakRecorded ? `<p>🔥 Streak ${userData.streak.current} Hari!</p>` : ''}<button class="btn btn-primary" onclick="closeGame()">Selesai</button><button class="btn btn-secondary" onclick="startQuiz()">Main Lagi</button></div>`;
    saveUserData(); updateUI();
}

// ===================== STREAK SYSTEM (DIPERBAIKI) =====================

function getTodayDateStr() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function checkAndResetStreak() {
    const todayStr = getTodayDateStr();
    const lastPlayStr = userData.streak.lastPlayDate ? new Date(userData.streak.lastPlayDate).toISOString().split('T')[0] : null;
    
    userData.streak.playedToday = (lastPlayStr === todayStr);
    
    if (!userData.streak.playedToday && lastPlayStr) {
        const lastDate = new Date(lastPlayStr);
        const todayDate = new Date(todayStr);
        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) {
            userData.streak.current = 0;
        }
    }
    
    if (userData.streak.current > userData.streak.longest) {
        userData.streak.longest = userData.streak.current;
    }
}

function recordDailyPlay() {
    if (userData.streak.playedToday) return false;
    
    const todayStr = getTodayDateStr();
    const lastPlayStr = userData.streak.lastPlayDate ? new Date(userData.streak.lastPlayDate).toISOString().split('T')[0] : null;
    
    let diffDays = 0;
    if (lastPlayStr) {
        const lastDate = new Date(lastPlayStr);
        const todayDate = new Date(todayStr);
        diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    }
    
    if (diffDays === 1) {
        userData.streak.current += 1;
    } else if (diffDays > 1 || !lastPlayStr) {
        userData.streak.current = 1;
    } else if (diffDays === 0) {
        return false;
    }
    
    userData.streak.lastPlayDate = new Date().toISOString();
    userData.streak.playedToday = true;
    if (!userData.streak.history) userData.streak.history = [];
    if (!userData.streak.history.includes(todayStr)) {
        userData.streak.history.push(todayStr);
    }
    
    if (userData.streak.current > userData.streak.longest) {
        userData.streak.longest = userData.streak.current;
    }
    
    saveUserData();
    updateUI();
    
    const bonusXP = userData.streak.current * 10;
    addXP(bonusXP);
    showNotification(`🔥 Streak ${userData.streak.current} hari! +${bonusXP} XP Bonus!`);
    
    return true;
}

function updateStreakUI() {
    checkAndResetStreak();
    
    const streakNumberElem = document.getElementById('streakNumber');
    if (streakNumberElem) streakNumberElem.textContent = userData.streak.current;
    
    const longestElem = document.getElementById('longestStreak');
    if (longestElem) longestElem.textContent = userData.streak.longest;
    
    const statusDiv = document.getElementById('streakStatus');
    const playBtn = document.getElementById('playTodayBtn');
    
    if (userData.streak.playedToday) {
        if (statusDiv) statusDiv.innerHTML = '<p>✅ Sudah bermain hari ini!</p>';
        if (playBtn) {
            playBtn.disabled = true;
            playBtn.textContent = '✓ Streak Hari Ini Selesai';
        }
    } else {
        if (statusDiv) statusDiv.innerHTML = '<p>⚡ Main sekarang untuk lanjutkan streak!</p>';
        if (playBtn) {
            playBtn.disabled = false;
            playBtn.textContent = '🔥 Main Game Hari Ini!';
        }
    }
    
    updateStreakCalendar();
}

function updateStreakCalendar() {
    const cal = document.getElementById('streakCalendar');
    if (!cal) return;
    cal.innerHTML = '';
    const today = new Date();
    const historySet = new Set(userData.streak.history || []);
    
    for (let i = 13; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        if (historySet.has(dateStr)) {
            dayDiv.classList.add('completed');
            dayDiv.textContent = '🔥';
        } else {
            dayDiv.textContent = '○';
        }
        if (i === 0) dayDiv.classList.add('today');
        cal.appendChild(dayDiv);
    }
}

function checkDailyPlay() {
    if (userData.streak.playedToday) {
        showNotification('✅ Kamu sudah bermain hari ini!');
    } else {
        document.getElementById('game').scrollIntoView({ behavior: 'smooth' });
    }
}

function changeAvatar() {
    const avatars = ["🌱","🌿","🍀","🌾","🌳","🌲","🌴","🌵","🌸","🌺","🌻","🌼"];
    let idx = avatars.indexOf(userData.avatar) + 1;
    if (idx >= avatars.length) idx = 0;
    userData.avatar = avatars[idx];
    saveUserData();
    updateUI();
}

function closeGame() { document.getElementById('gameModal').style.display='none'; updateUI(); }
function showNotification(msg) {
    let div=document.createElement('div');
    div.style.cssText='position:fixed; top:100px; right:30px; background:linear-gradient(135deg,#66bb6a,#43a047); color:white; padding:15px 25px; border-radius:15px; z-index:10000; font-weight:600; box-shadow:0 4px 15px rgba(0,0,0,0.2);';
    div.innerText=msg; document.body.appendChild(div);
    setTimeout(()=>div.remove(),3000);
}

window.addEventListener('load',()=>{
    loadUserData();
    if(!userData.streak.playedToday && userData.streak.current>4) setTimeout(()=>showNotification('🔥 Jangan lupa main game hari ini untuk jaga streak!'),2000);
    document.querySelectorAll('.stat-number').forEach(stat=>{
        let target=parseInt(stat.innerText.replace(/,/g,''));
        let curr=4, inc=target/50;
        let timer=setInterval(()=>{ curr+=inc; if(curr>=target){ stat.innerText=target.toLocaleString(); clearInterval(timer); } else stat.innerText=Math.floor(curr).toLocaleString(); },20);
    });
    let hamburger=document.getElementById('hamburger'), navMenu=document.getElementById('navMenu');
    if(hamburger){
        hamburger.addEventListener('click',()=>{ navMenu.classList.toggle('active'); hamburger.classList.toggle('active'); });
        document.querySelectorAll('.nav-link').forEach(link=>link.addEventListener('click',()=>{ navMenu.classList.remove('active'); hamburger.classList.remove('active'); }));
    }
});
window.onclick = function(e) { if(e.target.classList.contains('modal')) e.target.style.display='none'; };
