import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function EditDeck({ deck, url }) {
	const [decks, setDecks] = useState([]);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const history = useHistory();
	const { deckId } = useParams("deckId");

	// load previous decks from localstorage and store it in state
	useEffect(() => {
		let decks = localStorage.getItem("decks");
		if (decks) {
			decks = JSON.parse(decks);
			const currentDeck = decks.find((deck) => deck.id === Number(deckId));
			setTitle(currentDeck.title);
			setDesc(currentDeck.desc);
			setDecks(decks);
		}
	}, [deckId]);

	function handleSubmit(e) {
		e.preventDefault();
		const newDecks = decks.map((deck) => {
			if (deck.id === Number(deckId)) {
				return { ...deck, title, desc };
			} else {
				return deck;
			}
		});
		console.log(newDecks, "from edit");
		localStorage.setItem("decks", JSON.stringify(newDecks));
		history.push(url);
	}

	return (
		<div className='container'>
			{/* Bread crumb nav bar */}
			<nav aria-label='breadcrumb'>
				<ol className='breadcrumb'>
					<li className='breadcrumb-item'>
						<a href='/'>
							<i class='fa-solid fa-house'></i>
							{" Home"}
						</a>
					</li>
					<li className='breadcrumb-item'>
						<a href={`/decks/${deck.id}`}>{deck.title}</a>
					</li>
					<li className='breadcrumb-item active' aria-current='page'>
						Edit Deck
					</li>
				</ol>
			</nav>
			<h4>Edit Deck</h4>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='deck-title'>Title</label>
					<input
						value={title}
						type='text'
						className='form-control'
						id='deck-title'
						placeholder='Deck Title'
						required
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='deck-desc'>Description</label>
					<textarea
						value={desc}
						className='form-control'
						id='deck-desc'
						rows='5'
						placeholder='Write a description for this deck'
						required
						onChange={(e) => {
							setDesc(e.target.value);
						}}
					></textarea>
				</div>
				<a href={`/decks/${deck.id}`} className='btn btn-secondary mr-2'>
					Cancel
				</a>
				<button className='btn btn-primary' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
}
