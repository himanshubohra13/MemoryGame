import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "img/helmet-1.png", matched: false },
  { "src": "img/potion-1.png", matched: false },
  { "src": "img/ring-1.png", matched: false },
  { "src": "img/scroll-1.png", matched: false },
  { "src": "img/shield-1.png", matched: false },
  { "src": "img/sword-1.png", matched: false }
]


function App() {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [cards, setCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const suffleCards = () => {


    const suffledCards = [...cardImages, ...cardImages]
      .sort(() => { return Math.random() - 0.5 })
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(suffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);

  }
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {
    suffleCards();
  }, [])
  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            else {
              return card;
            }
          })
        })
        resetTurn();
      }
      else {

        setTimeout(() => resetTurn(), 1000);
      }

    }

  }, [choiceOne, choiceTwo])
  const resetTurn = () => {
    setChoiceTwo(null);
    setChoiceOne(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={suffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
