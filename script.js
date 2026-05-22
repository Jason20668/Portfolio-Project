const TOTAL_SPREADS = 8;
let current = 1;

const coverScreen = document.getElementById('cover-screen');
const bookViewer = document.getElementById('book-viewer');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const spreadLabel = document.getElementById('spread-label');
const dotsContainer = document.getElementById('dots');

// Build dots
for (let i = 1; i <= TOTAL_SPREADS; i++) {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 1 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
}

// Open book
document.getElementById('book-cover-btn').addEventListener('click', () => {
  coverScreen.classList.add('hidden');
  bookViewer.classList.remove('hidden');
  updateUI();
});

// TOC chapter links
document.querySelectorAll('.toc-list li').forEach(li => {
  li.addEventListener('click', () => {
    const target = parseInt(li.getAttribute('data-target'));
    if (target) goTo(target);
  });
});

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

function goTo(n) {
  if (n < 1 || n > TOTAL_SPREADS) return;
  document.querySelector(`.spread[data-spread="${current}"]`).classList.add('hidden');
  current = n;
  document.querySelector(`.spread[data-spread="${current}"]`).classList.remove('hidden');
  updateUI();
}

function updateUI() {
  spreadLabel.textContent = `Spread ${current} of ${TOTAL_SPREADS}`;
  prevBtn.disabled = current === 1;
  nextBtn.disabled = current === TOTAL_SPREADS;
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i + 1 === current);
  });
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (bookViewer.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowLeft')  goTo(current - 1);
});

updateUI();