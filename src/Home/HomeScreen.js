import React from "react";
import HomeDeck from "./HomeDeck";
import { Switch, Route } from "react-router-dom";

export default function HomeScreen() {
	const decks = JSON.parse(localStorage.getItem("decks")) || [];

	// displaying the list of decks
	const deckList = decks.map((deck) => {
		return <HomeDeck deck={deck} key={deck.id} />;
	});

	return (
		<div className='home-screen container'>
			<a href='/decks/new' className='btn btn-secondary'>
				Create Deck
			</a>
			<ul className='list-group mt-3'>
				<li class='list-group-item active pb-1'>
					<h4>Decks</h4>
				</li>
				{deckList}
			</ul>
		</div>
	);
}
