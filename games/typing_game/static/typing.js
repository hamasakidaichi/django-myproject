(function(){
timer = null;
inputEl.value = '';
inputEl.disabled = true;
timeEl.textContent = '時間: 0.00s';
wpmEl.textContent = 'WPM: 0';
accEl.textContent = '正確度: 100%';
renderTarget();
}


function updateStats() {
const now = performance.now();
const elapsed = (now - startTime) / 1000;
timeEl.textContent = '時間: ' + elapsed.toFixed(2) + 's';
const charsTyped = inputEl.value.length;
const words = charsTyped / 5;
const wpm = elapsed > 0 ? Math.round((words / (elapsed/60))) : 0;
wpmEl.textContent = 'WPM: ' + wpm;


// accuracy
let correct = 0;
for (let i = 0; i < inputEl.value.length; i++) {
const ch = inputEl.value[i];
const span = targetEl.querySelector('span[data-index="' + i + '"]');
if (!span) break;
if (ch === span.textContent) {
span.classList.add('correct');
span.classList.remove('incorrect');
correct += 1;
} else {
span.classList.add('incorrect');
span.classList.remove('correct');
}
}
const acc = inputEl.value.length ? Math.round((correct / inputEl.value.length) * 100) : 100;
accEl.textContent = '正確度: ' + acc + '%';


// finish detection
if (inputEl.value === text) {
clearInterval(timer);
inputEl.disabled = true;
alert('完了！\n時間: ' + elapsed.toFixed(2) + 's\nWPM: ' + wpm + '\n正確度: ' + acc + '%');
}
}


startBtn.addEventListener('click', function(){ if (!timer) start(); });
resetBtn.addEventListener('click', reset);
inputEl.addEventListener('input', function(){ if (!startTime && inputEl.value.length>0) start(); });


// 初期表示
renderTarget();
inputEl.disabled = true;
})();