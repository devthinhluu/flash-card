import React from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ViewDeck from "./ViewDeck";
import AddCard from "../Card/AddCard";

export default function DeckOps() {
	const [deck, setDeck] = useState({});
	const [cards, setCards] = useState([]);
	const { deckId } = useParams("deckId");

	useEffect(() => {
		let decks = localStorage.getItem("decks");
		let cards = localStorage.getItem("cards");
		if (decks) {
			decks = JSON.parse(decks);
			const deckWanted = decks.find((deck) => deck.id === Number(deckId));
			setDeck(deckWanted);
		}
		if (cards) {
			cards = JSON.parse(cards);
			const decksCards = cards.filter((card) => card.deckId === Number(deckId));
			setCards(decksCards);
		}
	}, [deckId]);
	const { path } = useRouteMatch();

	// function addCard() {
	// 	localStorage.setItem("cards", [
	// 		{
	// 			id: newCardID + 1,
	// 			front,
	// 			back,
	// 		},
	// 		...cards,
	// 	]);
	// }

	return (
		<section>
			<Switch>
				<Route path={`${path}/cards/new`}>
					<AddCard deck={deck} />
				</Route>
				<Route path={path}>
					<ViewDeck deck={deck} cards={cards} />
				</Route>
			</Switch>
		</section>
	);
}
