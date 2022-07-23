import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function CreateDeck() {
	const [decks, setDecks] = useState([]);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const newDeckID = decks[decks.length - 1] ? decks[decks.length - 1].id : 0;
	console.log("from create deck");
	const history = useHistory();

	// load previous decks from localstorage and store it in state
	useEffect(() => {
		const decks = localStorage.getItem("decks");
		if (decks) setDecks(JSON.parse(decks));
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		const newDeck = [
			...decks,
			{
				id: newDeckID + 1,
				title,
				desc,
			},
		];

		localStorage.setItem("decks", JSON.stringify(newDeck));
		//console.log("after submitting new deck");
		history.push("/");
	}
	return (
		<div className='container'>
			{/* Bread crumb nav bar */}
			<nav aria-label='breadcrumb'>
				<ol className='breadcrumb'>
					<li className='breadcrumb-item'>
						<a href='/'>
							<i className='fa-solid fa-house'></i>
							{" Home"}
						</a>
					</li>
					<li className='breadcrumb-item active' aria-current='page'>
						Create Deck
					</li>
				</ol>
			</nav>
			<h4>Create Deck</h4>
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
				<a href='/' className='btn btn-secondary mr-2'>
					Cancel
				</a>
				<button className='btn btn-primary' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
}
