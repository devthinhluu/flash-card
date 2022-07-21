import React from "react";
import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

const MIN_CARDS = 3;

export default function StudyDeck({ deck, cards }) {
	const [currentCard, setCurrentCard] = useState(0);
	const [isStarted, setisStarted] = useState(false);
	const [isFlipped, setIsFlipped] = useState(false);
	const { url } = useRouteMatch();

	//console.log(cards);
	// useEffect(() => {
	// 	let cards = localStorage.getItem("cards");
	// 	if (cards) {
	// 		cards = JSON.parse(cards);
	// 		const decksCards = cards.filter((card) => card.deckId === deckId);
	// 		setCards(decksCards);
	// 	}
	// 	console.log("from useEffect");
	// }, []);

	function handleFlipCard() {
		setIsFlipped((prevFront) => !prevFront);
		setisStarted(true);
	}

	function handleNext() {
		if (currentCard < cards.length - 1) {
			setCurrentCard((prevCurrentCard) => prevCurrentCard + 1);
			setisStarted(false);
			setIsFlipped(false);
		}
	}

	return (
		<div className='container'>
			<h2>{deck.title}: Study</h2>
			{cards.length >= MIN_CARDS ? (
				<div class='card'>
					<div class='card-body'>
						<h5 class='card-title'>{`Card ${currentCard + 1} of ${
							cards.length
						}`}</h5>
						<p class='card-text'>
							{isFlipped ? cards[currentCard].front : cards[currentCard].back}
						</p>
						<button className='btn btn-secondary' onClick={handleFlipCard}>
							Flip
						</button>
						{isStarted && (
							<button class='btn btn-primary ml-2' onClick={handleNext}>
								Next
							</button>
						)}
					</div>
				</div>
			) : (
				<div>
					<h3>Not enough cards.</h3>
					<p>{`You need at least 3 cards. You current have ${cards.length} cards.`}</p>
					<a href={`/decks/${deck.id}/cards/new`} className='btn btn-secondary'>
						Add Cards
					</a>
				</div>
			)}
		</div>
	);
}
