const state = {
  page: 1,
  counter: 0,
};

const actionBtn = document.getElementById('action-btn');
const skipBtn = document.getElementById('skip-btn');
const counterDisplay = document.getElementById('counter-display');
const counterValueEl = document.getElementById('counter-value');
const progressPage = document.getElementById('progress-page');
const pagerDots = Array.from(document.querySelectorAll('.pager-dot'));

const pageConfig = {
  1: {
    actionText: 'ابدأ',
    skipText: 'التالي',
    showCounter: false,
    counterLimit: 0,
  },
  2: {
    actionText: 'اضغط',
    skipText: 'التالي',
    showCounter: true,
    counterLimit: 33,
  },
  3: {
    actionText: 'اضغط',
    skipText: 'التالي',
    showCounter: true,
    counterLimit: 33,
  },
  4: {
    actionText: 'اضغط',
    skipText: 'إعادة',
    showCounter: true,
    counterLimit: 34,
  },
};

function setScreen(page) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.toggle('hidden', screen.dataset.page !== String(page));
  });

  const config = pageConfig[page];
  actionBtn.textContent = config.actionText;
  skipBtn.textContent = page === 4 ? 'إعادة' : 'التالي';
  skipBtn.style.display = config.showSkip ? 'inline-flex' : 'none';
  counterDisplay.classList.toggle('hidden', !config.showCounter);
  progressPage.textContent = `الصفحة ${page} من 4`;
  pagerDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === page - 1);
  });
}

function updateCounter() {
  counterValueEl.textContent = state.counter;
}

function advance() {
  if (state.page === 1) {
    state.page = 2;
    state.counter = 0;
  } else {
    state.counter += 1;
    const limit = pageConfig[state.page].counterLimit;
    if (limit > 0 && state.counter >= limit) {
      state.page += 1;
      state.counter = 0;
      if (state.page > 4) {
        state.page = 1;
      }
    }
  }

  setScreen(state.page);
  updateCounter();
}

function nextPage() {
  state.page = state.page === 4 ? 1 : state.page + 1;
  state.counter = 0;
  setScreen(state.page);
  updateCounter();
}

actionBtn.addEventListener('click', advance);
skipBtn.addEventListener('click', nextPage);

setScreen(state.page);
updateCounter();
