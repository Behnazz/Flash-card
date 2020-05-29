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
  //add to DOM 
  cardsEl.push(card);

  cardContainer.appendChild(card);
};

createCards()
