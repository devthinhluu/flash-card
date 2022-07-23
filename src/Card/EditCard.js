import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
// what do we need?
// we need the card id to edit the card (useparams to get this)
// we also need card id to set front and back of card
export default function EditCard({ deck, url }) {
	const [allCards, setAllCards] = useState([]);
	const [front, setFront] = useState("");
	const [back, setBack] = useState("");
	const { cardId } = useParams("cardId");
	const history = useHistory();

	// getting all cards from localstorage and current card to set front and back state
	useEffect(() => {
		let cards = localStorage.getItem("cards");
		if (cards) {
			cards = JSON.parse(cards);
			const currentCard = cards.find((card) => card.id === Number(cardId));
			console.log(currentCard, "from edit card");
			setAllCards(cards);
			setFront(currentCard.front);
			setBack(currentCard.back);
		}
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		const newCards = allCards.map((card) => {
			if (card.id === Number(cardId)) {
				return { ...card, front, back };
			} else {
				return card;
			}
		});

		localStorage.setItem("cards", JSON.stringify(newCards));
		history.push(url);
	}

	return (
		<div className='container'>
			{/*Bread crumb nav bar */}
			<nav aria-label='breadcrumb'>
				<ol className='breadcrumb'>
					<li className='breadcrumb-item'>
						<a href='/'>
							<i className='fa-solid fa-house'></i>
							{" Home"}
						</a>
					</li>
					<li className='breadcrumb-item'>
						<a href={`/decks/${deck.id}`}>{deck.title}</a>
					</li>
					<li className='breadcrumb-item active' aria-current='page'>
						Edit Card
					</li>
				</ol>
			</nav>
			<h4>Edit Card</h4>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='card-front'>Front</label>
					<textarea
						value={front}
						className='form-control'
						id='card-front'
						rows='2'
						placeholder='Front of the card'
						required
						onChange={(e) => {
							setFront(e.target.value);
						}}
					></textarea>
				</div>
				<div className='form-group'>
					<label htmlFor='card-back'>Back</label>
					<textarea
						value={back}
						className='form-control'
						id='card-back'
						rows='2'
						placeholder='Back of the card'
						required
						onChange={(e) => {
							setBack(e.target.value);
						}}
					></textarea>
				</div>
				<button className='btn btn-primary mr-2' type='submit'>
					Save
				</button>
				<a href={`/decks/${deck.id}`} className='btn btn-secondary mr-2'>
					Cancel
				</a>
			</form>
		</div>
	);
}
