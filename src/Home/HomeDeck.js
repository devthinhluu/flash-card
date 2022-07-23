import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomeDeck({ deck }) {
	const [decks, setDecks] = useState([]);
	const { id, title, desc } = deck;
	const cards = JSON.parse(localStorage.getItem("cards")) || [];
	const decksCards = cards.filter((card) => card.deckId === id);
	const { url } = useRouteMatch();
	const history = useHistory();

	useEffect(() => {
		const decks = localStorage.getItem("decks");
		if (decks) setDecks(JSON.parse(decks));
	}, []);

	function handleDeleteDeck() {
		if (
			window.confirm("Do you want to delete this deck? It cannot be recovered.")
		) {
			const newDecks = decks.filter((oldDeck) => oldDeck.id !== deck.id);
			const newCardsList = cards.filter((card) => card.deckId !== deck.id);
			localStorage.setItem("decks", JSON.stringify(newDecks));
			localStorage.setItem("cards", JSON.stringify(newCardsList));
			window.location.reload();
		}
	}

	return (
		<li className='list-group-item list-group-item-action'>
			<div className='d-flex w-100 justify-content-between'>
				<h5 className='mb-1'>{title}</h5>
				<small>{decksCards.length} cards</small>
			</div>
			<p className='mb-2'>{desc}</p>

			<a href={`${url}decks/${id}/study`} className='btn btn-primary mr-2'>
				<i class='fa-solid fa-book-open'></i>
				{" Study"}
			</a>
			<a href={`${url}decks/${id}`} className='btn btn-outline-secondary mr-2'>
				<i class='fa-solid fa-eye'></i>
				{" View"}
			</a>
			<button className='btn btn-danger float-right' onClick={handleDeleteDeck}>
				<i class='fa-solid fa-trash-can'></i>
			</button>
		</li>
	);
}
