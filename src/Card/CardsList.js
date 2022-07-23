import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";

// Component that displays a list of card for in deck view
export default function CardsList({ deckId }) {
	const [currentCards, setCurrentCards] = useState([]);

	useEffect(() => {
		let cards = localStorage.getItem("cards");
		if (cards) {
			cards = JSON.parse(cards);
			const currentCards = cards.filter(
				(card) => card.deckId === Number(deckId)
			);
			setCurrentCards(currentCards);
		}
	}, []);
	const cardsElements = currentCards.map((card) => <Card card={card} />);
	return <ul className='list-group'>{cardsElements}</ul>;
}
