const cardContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// keep track of current card 
let currentActiveCard = 0;

//store DOM cards
const cardsEl = [];


//store card data
const cardData = async () => {
  const res = await fetch('https://jservice.io/api/random?count=10')
  const data = await res.json()
  return data.map(item => ({question:item.question, answer:item.answer}))
}


//create all cards
const createCards = async () => {
  const cardsData = await cardData()
  cardsData.forEach((data, index) => {
  createCard(data,index)
  })
 
}

// create a single card in the DoM
const createCard = (data, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  if (index === 0) {
    card.classList.add('active')
  }
  card.innerHTML = `
  <section class="inner-card">
    <section class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </section>
    <section class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </section>
  </section>
  `;

  card.addEventListener('click', () => {
    card.classList.toggle('show-answer')
  })
  //add to DOM 
  cardsEl.push(card);
  cardContainer.appendChild(card);

  updateCurrentText();

};

//show numbers of cards
const updateCurrentText = () => {
  currentEl.innerText = ` ${currentActiveCard + 1}/${cardsEl.length}`
}

createCards()

//next button event listener
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

//previous button event listener
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = 'card active';
  
  updateCurrentText();
});

// show add container
showBtn.addEventListener('click', () => {
  addContainer.classList.add('show')
});

//hide add container
hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

//add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
 
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');
  };
});

clearBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].innerHTML = '';

  updateCurrentText() -1;
})
