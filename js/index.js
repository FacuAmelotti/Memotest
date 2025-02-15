let moves = 0;
let correctGuesses = 0;
let time = 0;
let timer = null;
let canFlip = true;
let flippedCards = [];
let cards = [];

document.querySelector('.restart-button').addEventListener('click', resetGame);

function initializeGame() {
    const cardValues = [1, 2, 3, 4, 5, 6, 7, 8];
    cards = [...cardValues, ...cardValues]
        .sort(() => Math.random() - 0.5)
        .map(value => ({ value, isFlipped: false }));
    
    renderCards();
    startTimer();
}

function renderCards() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `card${card.isFlipped ? ' flipped' : ''}`;
        cardElement.innerHTML = `
            <div class="card-front">${card.isFlipped ? card.value : '❓'}</div>
        `;
        cardElement.addEventListener('click', () => handleCardClick(index));
        board.appendChild(cardElement);
    });
}

function handleCardClick(index) {
    if (!canFlip || cards[index].isFlipped || flippedCards.length === 2) return;
    
    cards[index].isFlipped = true;
    flippedCards.push({ index, value: cards[index].value });
    renderCards();
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    canFlip = false;
    const [card1, card2] = flippedCards;
    
    setTimeout(() => {
        if (card1.value === card2.value) {
            correctGuesses++;
            document.getElementById('correctGuesses').textContent = correctGuesses;
            checkVictory();
        } else {
            cards[card1.index].isFlipped = false;
            cards[card2.index].isFlipped = false;
        }
        
        flippedCards = [];
        canFlip = true;
        renderCards();
    }, 1000);
}

function checkVictory() {
    if (cards.every(card => card.isFlipped)) {
        clearInterval(timer);
        document.getElementById('victoryMessage').style.display = 'block';
    }
}

function startTimer() {
    clearInterval(timer);
    time = 0;
    timer = setInterval(() => {
        time++;
        document.getElementById('timer').textContent = 
            `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;
    }, 1000);
}

function resetGame() {
    moves = 0;
    correctGuesses = 0;
    flippedCards = [];
    document.getElementById('moves').textContent = '0';
    document.getElementById('correctGuesses').textContent = '0';
    document.getElementById('victoryMessage').style.display = 'none';
    initializeGame();
}

// Iniciar el juego al cargar
initializeGame();