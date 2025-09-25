(() => {
    const arena = document.getElementById("arena");
    const startBtn = document.getElementById("startBtn");
    const remainingEl = document.getElementById("remaining");
    const hitsEl = document.getElementById("hits");
    const missesEl = document.getElementById("misses");
    const timeEl = document.getElementById("time");
    const resultEl = document.getElementById("result");
    const targetsCountSel = document.getElementById("targetsCount");
    const targetSizeSel = document.getElementById("targetSize");

    let targetsTotal = 20;
    let targetSize = 60;
    let hits = 0;
    let misses = 0;
    let remaining = 0;
    let startTime = null;
    let timer = null;

    function rnd(min, max) {
        return Math.random() * (max - min) + min;
    }

    function spawnTarget() {
        clearTargets();

        if (remaining <= 0) {
            endSession();
            return;
        }

        const el = document.createElement("div");
        el.className = "target";
        el.style.width = targetSize + "px";
        el.style.height = targetSize + "px";
        el.style.background = "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0 18%, transparent 19%), #e23e3e";

        const rect = arena.getBoundingClientRect();
        const x = rnd(0, rect.width - targetSize);
        const y = rnd(0, rect.height - targetSize);
        el.style.left = x + "px";
        el.style.top = y + "px";

        // ターゲットをクリックしたらヒット
        el.addEventListener("click", (ev) => {
            ev.stopPropagation(); // 親のクリック（ミス判定）を止める
            onHit();
        });

        arena.appendChild(el);
    }

    function clearTargets() {
        [...arena.querySelectorAll(".target")].forEach(t => t.remove());
    }

    function onHit() {
        hits++;
        remaining--;
        updateHUD();
        spawnTarget();
    }

    function onArenaClick(e) {
        if (!startTime) return;
        misses++;
        remaining--;
        updateHUD();
        spawnTarget();
    }

    function updateHUD() {
        remainingEl.textContent = remaining;
        hitsEl.textContent = hits;
        missesEl.textContent = misses;
    }

    function startTimer() {
        startTime = performance.now();
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            const elapsed = (performance.now() - startTime) / 1000;
            timeEl.textContent = elapsed.toFixed(2);
        }, 50);
    }

    function stopTimerAndSync() {
        if (!startTime) return;
        const elapsed = (performance.now() - startTime) / 1000;
        timeEl.textContent = elapsed.toFixed(2);
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function startSession() {
        targetsTotal = parseInt(targetsCountSel.value, 10);
        targetSize = parseInt(targetSizeSel.value, 10);
        hits = 0;
        misses = 0;
        remaining = targetsTotal;
        resultEl.innerHTML = "";
        updateHUD();
        startTimer();
        spawnTarget();
        arena.focus();
    }

    function endSession() {
        stopTimerAndSync();
        clearTargets();
        const elapsed = parseFloat(timeEl.textContent);
        resultEl.innerHTML =
            `<div>終了！ タイム: ${elapsed.toFixed(2)} 秒 / ヒット: ${hits} / ミス: ${misses}</div>
             <div id="restart-message">スペースキーを押すと再スタート！</div>`;
        startTime = null;
    }

    startBtn.addEventListener("click", () => startSession());
    arena.addEventListener("click", onArenaClick);

    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            e.preventDefault();
            if (!startTime) startSession();
        }
    });

    // 初期値
    updateHUD();
    timeEl.textContent = "0.00";
})();
