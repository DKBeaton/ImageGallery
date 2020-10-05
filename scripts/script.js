// Variables
const gallery = document.querySelector('.gallery');
const overlay = document.querySelector('.overlay');
const overlayImage = document.querySelector('.overlay-img');
const overlayBtn = document.querySelector('.btn-close');
const gapBtn = document.querySelector('.gapBtn');
const stackedBtn = document.querySelector('.stackedBtn');
const waterfallBtn = document.querySelector('svg');
const defaultClassList = [];

// Generate HTML
const digits = Array.from({length: 50}, () => [randomNumber(4), randomNumber(4)]).concat([[1,1], [1, 1], [1, 1]]);
const html = digits.map(generatorHTML).join("");
gallery.innerHTML = html;

// Parse each item and save the default values
const items = document.querySelectorAll('.item');
items.forEach(item => defaultClassList.push([].slice.call(item.classList)))

// Event Listeners
items.forEach(item => item.addEventListener('click', clickFunction));

overlay.addEventListener('click', () => {
  overlay.classList.remove('open');
})

overlayBtn.addEventListener('click', () => {
  overlay.classList.remove('open');
});

stackedBtn.addEventListener('click', () => {

  // Remove gap class
  gallery.classList.remove('gap');

  //Make stacked button active
  stackedBtn.classList.add('active');

  // Remove other classes from other buttons
  gapBtn.classList.remove('active');
})

waterfallBtn.addEventListener('click', () => {

  if (waterfallBtn.classList.contains('active')) {
    waterfallBtn.classList.remove('filled', 'active');
    unWaterfallEffect();
  }
  else {
    waterfallBtn.classList.add('filled', 'active');
    imageLoading();
  }

})

gapBtn.addEventListener('click', () => {

  // Add gap class into gallery
  gallery.classList.add('gap');

  // Make gap button active
  gapBtn.classList.add('active');

  // Remove other classes from other buttons
  stackedBtn.classList.remove('active');
})

// Functions
function clickFunction (e) {
  const src = e.currentTarget.querySelector('img').src;
  overlayImage.src = src;
  overlay.classList.add('open');
}

function generatorHTML([h,v]) {
  return `
    <div class="item h${h} v${v}">
      <img src="https://source.unsplash.com/random/400x${randomNumber(8,3) * 100}?sig=${randomNumber(100)}">
      <div class="item-overlay">
        <button>View →</button>
      </div>
    </div>
  `;
}

function imageLoading() {
  let imgItems = document.querySelectorAll('.item');

  // Need to wait for image to load for .naturalHeight to work
  // This is prob not the best way to do this, maybe look into async, wait and promise
  imgItems.forEach(item => {
    waterfallEffect(item)
  });
}

function unWaterfallEffect() {
  let items = document.querySelectorAll('.item');
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove(...items[i].classList);
    items[i].classList.add(...defaultClassList[i]);
  }
}

function waterfallEffect(item) {
  let rowSpan = Math.ceil(item.querySelector('img').naturalHeight / 100);
  item.classList.remove(...item.classList);
  item.classList.add('item', 'h' + 2, 'v' + rowSpan);
}

function randomNumber(max, min) {
  if (min === undefined) {
    return Math.floor(Math.random() * max);
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}



