import React from "react";
import { useState, useEffect } from "react";

export default function AddCard({ deck }) {
	const [front, setFront] = useState("");
	const [back, setBack] = useState("");
	const [cards, setCards] = useState([]);
	const newCardID = cards[cards.length - 1] ? cards[cards.length - 1].id : 0;

	useEffect(() => {
		const cards = localStorage.getItem("cards");
		if (cards) setCards(JSON.parse(cards));
	}, []);

	function handleSubmit(e) {
		//e.preventDefault();
		localStorage.setItem(
			"cards",
			JSON.stringify([
				...cards,
				{
					id: newCardID + 1,
					front,
					back,
					deckId: deck.id,
				},
			])
		);
		console.log("card added", front, back);
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
						Add Card
					</li>
				</ol>
			</nav>
			<h4>{deck.title}: Add Card</h4>
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
				<a href={`/decks/${deck.id}`} className='btn btn-secondary mr-2'>
					Done
				</a>
				<button className='btn btn-primary' type='submit'>
					Save
				</button>
			</form>
		</div>
	);
}
