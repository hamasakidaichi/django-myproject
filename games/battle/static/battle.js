// 最大HP設定
const playerMaxHP = 100;
const cpuMaxHP = 100;

// 現在HP
let playerHP = playerMaxHP;
let cpuHP = cpuMaxHP;

// プレイヤー技（日本語名＋ダメージ）
const playerSkills = [
    { name: "炎のバースト", damage: 20 },
    { name: "火の爪", damage: 15 },
    { name: "雷撃", damage: 25 },
    { name: "氷の波動", damage: 10 }
];

// CPU技（日本語名＋ダメージ、一撃必殺あり）
const cpuSkills = [
    { name: "ダークスラッシュ", damage: 18 },
    { name: "影の爪", damage: 22 },
    { name: "闇の波動", damage: 15 },
    { name: "必殺の一撃", damage: "KO" } // 一撃必殺
];

// 初期表示
window.onload = function() {
    // HPバーと数字初期化
    document.getElementById("player-hp-text").innerText = playerHP;
    document.getElementById("cpu-hp-text").innerText = cpuHP;
    document.getElementById("player-hp").style.width = "100%";
    document.getElementById("cpu-hp").style.width = "100%";

    // 中央勝敗表示用div作成
    if (!document.getElementById("battle-result")) {
        const resultDiv = document.createElement("div");
        resultDiv.id = "battle-result";
        resultDiv.style.position = "fixed";
        resultDiv.style.top = "50%";
        resultDiv.style.left = "50%";
        resultDiv.style.transform = "translate(-50%, -50%)";
        resultDiv.style.fontSize = "48px";
        resultDiv.style.fontWeight = "bold";
        resultDiv.style.color = "#fff";
        resultDiv.style.padding = "20px 40px";
        resultDiv.style.background = "rgba(0,0,0,0.7)";
        resultDiv.style.border = "3px solid #fff";
        resultDiv.style.borderRadius = "20px";
        resultDiv.style.display = "none";
        resultDiv.style.zIndex = "9999";
        document.body.appendChild(resultDiv);
    }

    // 技ボタン作成
    const skillsDiv = document.getElementById("skills");
    skillsDiv.innerHTML = ""; // 初期化

    // プレイヤー技ボタン4つ作成
    playerSkills.forEach((skill, index) => {
        const btn = document.createElement("button");
        btn.innerText = skill.name; // 日本語名
        btn.onclick = () => useSkill(index);
        btn.style.marginRight = "10px";
        skillsDiv.appendChild(btn);
    });

    // リセットボタン作成（初期は非表示）
    if (!document.getElementById("reset-btn")) {
        const resetBtn = document.createElement("button");
        resetBtn.id = "reset-btn";
        resetBtn.innerText = "もう一度戦う";
        resetBtn.style.display = "none";
        resetBtn.style.marginLeft = "20px";
        resetBtn.style.fontSize = "24px";
        resetBtn.style.padding = "10px 20px";
        resetBtn.addEventListener("click", resetBattle);
        skillsDiv.appendChild(resetBtn);
    }
}

// HPバー更新関数
function updateHP(hpId, hpTextId, newHP, targetImgId, maxHP) {
    const hpFill = document.getElementById(hpId);
    const hpText = document.getElementById(hpTextId);
    const targetImg = document.getElementById(targetImgId);

    const duration = 500;
    const frameRate = 20;
    const frames = duration / frameRate;
    const startHP = parseInt(hpText.innerText);
    const hpDiff = newHP - startHP;
    let frame = 0;

    const interval = setInterval(() => {
        frame++;
        const updatedHP = Math.round(startHP + hpDiff * (frame / frames));
        hpText.innerText = updatedHP < 0 ? 0 : updatedHP;
        hpFill.style.width = ((updatedHP < 0 ? 0 : updatedHP) / maxHP * 100) + "%";

        // HPバー色変更
        if (updatedHP > maxHP * 0.6) hpFill.style.background = "linear-gradient(to right, #4caf50, #2e7d32)";
        else if (updatedHP > maxHP * 0.3) hpFill.style.background = "linear-gradient(to right, #ffeb3b, #f57f17)";
        else hpFill.style.background = "linear-gradient(to right, #f44336, #b71c1c)";

        if (frame >= frames) clearInterval(interval);
    }, frameRate);

    // 画像揺れ
    targetImg.classList.add("shake");
    setTimeout(() => targetImg.classList.remove("shake"), duration);
}

// ログ表示
function logMessage(msg) {
    const log = document.getElementById('log');
    log.innerHTML = msg + '<br>' + log.innerHTML;
}

// 勝敗判定
function checkBattleResult() {
    if (playerHP <= 0 || cpuHP <= 0) {
        let resultMsg;
        if (playerHP <= 0 && cpuHP <= 0) resultMsg = "引き分け！";
        else if (playerHP <= 0) resultMsg = "CPUの勝ち！";
        else resultMsg = "プレイヤーの勝ち！";

        logMessage("=== " + resultMsg + " ===");

        // 中央勝敗表示
        const resultDiv = document.getElementById("battle-result");
        resultDiv.innerText = resultMsg;
        resultDiv.style.display = "block";

        // 技ボタン無効化
        const buttons = document.querySelectorAll("#skills button:not(#reset-btn)");
        buttons.forEach(btn => btn.disabled = true);

        // リセットボタン表示
        const resetBtn = document.getElementById("reset-btn");
        resetBtn.style.display = "inline-block";
    }
}

// リセット
function resetBattle() {
    playerHP = playerMaxHP;
    cpuHP = cpuMaxHP;

    updateHP("player-hp", "player-hp-text", playerHP, "player-monster-img", playerMaxHP);
    updateHP("cpu-hp", "cpu-hp-text", cpuHP, "cpu-monster-img", cpuMaxHP);

    const buttons = document.querySelectorAll("#skills button:not(#reset-btn)");
    buttons.forEach(btn => btn.disabled = false);

    document.getElementById("reset-btn").style.display = "none";
    document.getElementById("battle-result").style.display = "none";

    document.getElementById("log").innerHTML = "";
}

// プレイヤー技使用
window.useSkill = function(skillIndex) {
    if (playerHP <= 0 || cpuHP <= 0) return;

    const skill = playerSkills[skillIndex];
    cpuHP = Math.max(cpuHP - skill.damage, 0);
    updateHP("cpu-hp", "cpu-hp-text", cpuHP, "cpu-monster-img", cpuMaxHP);
    logMessage(`プレイヤーの${skill.name}！CPUは${skill.damage}ダメージ受けた！`);

    checkBattleResult();

    if (cpuHP > 0) setTimeout(cpuTurn, 1000);
}

// CPUターン
function cpuTurn() {
    if (playerHP <= 0 || cpuHP <= 0) return;

    let cpuSkill = cpuSkills[Math.floor(Math.random() * cpuSkills.length)];
    let damage = cpuSkill.damage;

    if (damage === "KO") damage = playerHP; // 一撃必殺

    playerHP = Math.max(playerHP - damage, 0);
    updateHP("player-hp", "player-hp-text", playerHP, "player-monster-img", playerMaxHP);
    logMessage(`CPUの${cpuSkill.name}！プレイヤーは${damage}ダメージ受けた！`);

    checkBattleResult();
}
