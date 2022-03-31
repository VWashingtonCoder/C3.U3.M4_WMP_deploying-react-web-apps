import React, { useState, useEffect } from 'react';
import Card from "./components/Card";
import "./App.css"

//Set up card images
const cardImages = [
  {"src": require("./images/backCard1.png"), matched: false},
  {"src": require("./images/backCard2.png"), matched: false},
  {"src": require("./images/backCard3.png"), matched: false},
  {"src": require("./images/backCard4.png"), matched: false},
  {"src": require("./images/backCard5.png"), matched: false},
  {"src":require("./images/backCard6.png"), matched: false}
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [message, setMessage] = useState("")
  const [disabled, setDisabled] = useState(false);
  
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}));
    setChoice1(null);
    setChoice2(null);
    setCards(shuffledCards);
    setTurns(0);
    setMessage("")
  }

  // handle a choice
  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  }

  // compare cards
  useEffect(() => {
    if (choice1 && choice2) {
      setDisabled(true);
      if (choice1.src === choice2.src){
        setCards(prevCards => {
          return prevCards.map(card =>{
            if(card.src === choice1.src){
              setMessage("It's a Match!")
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setMessage("Sorry...Not A Match")
        resetTurn()
      }
    }
  }, [choice1, choice2])
  
  //reset choices and increase turn
  const resetTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }
  //Start new Game Automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  console.log(cards)
  
  return (
    <div className='App'>
      <h1>Memory Blast (Chibi Edition)</h1>
      <div className='turnBar'>
        <div className='turns'>Moves: {turns}</div>
        <div className='message'>{message}</div>
        <button onClick={shuffleCards}>New Game</button>
      </div>
    
      

      <div className='card-grid'>
        {
          cards.map((card) => (
            <Card 
              card={card} 
              key={card.id} 
              handleChoice={handleChoice}
              flipped={card === choice1 || card === choice2 || card.matched}
              disabled={disabled}
            />
          ))
        }
      </div>
    </div>
  );
}
export default App;
