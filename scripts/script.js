// Variables
const gallery = document.querySelector('.gallery');
const overlay = document.querySelector('.overlay');
const overlayImage = document.querySelector('.overlay-img');
const overlayBtn = document.querySelector('.btn-close');
const gapBtn = document.querySelector('.gapBtn');
const stackedBtn = document.querySelector('.stackedBtn');

const digits = Array.from({length: 50}, () => [randomNumber(4), randomNumber(4)]).concat([[1,1], [1, 1], [1, 1]]);
const html = digits.map(generatorHTML).join("");

gallery.innerHTML = html;

const items = document.querySelectorAll('.item');
items.forEach(item => item.addEventListener('click', clickFunction));

overlay.addEventListener('click', () => {
  overlay.classList.remove('open');
})

overlayBtn.addEventListener('click', () => {
  overlay.classList.remove('open');
});

// Stacked button event listener
stackedBtn.addEventListener('click', () => {

  // Remove gap class
  gallery.classList.remove('gap');

  //Make stacked button active
  stackedBtn.classList.add('active');

  // Remove other classes from other buttons
  gapBtn.classList.remove('active');
})

// Gap button event listener
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
      <img src="https://source.unsplash.com/random/300x300?sig=${randomNumber(100)}">
      <div class="item-overlay">
        <button>View →</button>
      </div>
    </div>
  `;
}

function randomNumber(max, min) {
  if (min === undefined) {
    return Math.floor(Math.random() * max);
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}



