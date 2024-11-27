
document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById('game-board');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');
    const icons = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥥'];
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;

    function startGame() {
        gameBoard.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedPairs = 0;

        
        const shuffledIcons = shuffle([...icons, ...icons]);

       
        shuffledIcons.forEach(icon => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.icon = icon;
            card.addEventListener('click', handleCardClick);
            gameBoard.appendChild(card);
            cards.push(card);
        });

        message.textContent = 'Find all pairs!';
    }

    function handleCardClick(e) {
        const card = e.target;

       
        if (card.classList.contains('flipped') || flippedCards.length === 2) {
            return;
        }

        card.textContent = card.dataset.icon;
        card.classList.add('flipped');
        flippedCards.push(card);

       
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.icon === card2.dataset.icon) {
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === icons.length) {
                message.textContent = 'You found all pairs! 🎉';
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
                flippedCards = [];
            }, 1000);
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    restartButton.addEventListener('click', startGame);

    startGame();
});
