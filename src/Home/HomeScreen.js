import React from "react";
import HomeDeck from "./HomeDeck";
import { Switch, Route } from "react-router-dom";
import { exampleDecks } from "../example";
import { useState, useEffect } from "react";

export default function HomeScreen() {
	const [decks, setDecks] = useState([]);

	useEffect(() => {
		const decks = localStorage.getItem("decks");
		if (decks) setDecks(JSON.parse(decks));
	}, []);
	//const decks = JSON.parse(localStorage.getItem("decks")) || [];
	console.log(exampleDecks);

	function createExamples() {
		localStorage.setItem("decks", JSON.stringify(exampleDecks));
	}

	// displaying the list of decks
	const deckList = decks.map((deck) => {
		return <HomeDeck deck={deck} key={deck.id} decks={decks} />;
	});

	return (
		<div className='home-screen container'>
			<a href='/decks/new' className='btn btn-secondary'>
				<i class='fa-solid fa-plus'></i>
				{" Create Deck"}
			</a>
			<ul className='list-group mt-3'>{deckList}</ul>
			{deckList.length === 0 && (
				<section>
					<button className='btn btn-info' onClick={createExamples}>
						<i class='fa-solid fa-plus'></i>
						{" Add Examples"}
					</button>
				</section>
			)}
		</div>
	);
}
