import React from "react";
import HomeDeck from "./HomeDeck";
import { useHistory } from "react-router-dom";
import { exampleDecks, exampleCards } from "../example";
import { useState, useEffect } from "react";

export default function HomeScreen() {
	const [decks, setDecks] = useState([]);

	const history = useHistory();

	useEffect(() => {
		const decks = localStorage.getItem("decks");

		if (decks) {
			setDecks(JSON.parse(decks));
		}
	}, []);

	function addExamples() {
		localStorage.setItem("cards", JSON.stringify(exampleCards));
		localStorage.setItem("decks", JSON.stringify(exampleDecks));
		window.location.reload();
	}

	// displaying the list of decks
	const deckList = decks.map((deck) => {
		return <HomeDeck deck={deck} key={deck.id} />;
	});

	return (
		<div className='home-screen container'>
			<a href='/decks/new' className='btn btn-outline-primary'>
				<i className='fa-solid fa-plus'></i>
				{" Create New Deck"}
			</a>
			<ul className='list-group mt-3'>{deckList}</ul>
			{decks.length === 0 && <button onClick={addExamples}>Examples</button>}
		</div>
	);
}
