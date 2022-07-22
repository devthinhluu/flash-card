import React from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ViewDeck from "./ViewDeck";
import StudyDeck from "./StudyDeck";
import AddCard from "../Card/AddCard";

export default function DeckOps() {
	const [decks, setDecks] = useState([]);
	const [deck, setDeck] = useState({});
	const [cards, setCards] = useState([]);
	const { deckId } = useParams("deckId");

	useEffect(() => {
		let decks = localStorage.getItem("decks");
		let cards = localStorage.getItem("cards");
		if (decks) {
			decks = JSON.parse(decks);
			const deckWanted = decks.find((deck) => deck.id === Number(deckId));
			setDecks(decks);
			setDeck(deckWanted);
		}
		if (cards) {
			cards = JSON.parse(cards);
			const decksCards = cards.filter((card) => card.deckId === Number(deckId));
			setCards(decksCards);
			console.log("triggered");
		}
	}, []);
	//console.log(cards);
	const { path } = useRouteMatch();
	if (!deck || !cards) return <h1>Page not found</h1>;
	return (
		<section>
			<Switch>
				<Route path={`${path}/cards/new`}>
					<AddCard deck={deck} />
				</Route>
				<Route path={`${path}/study`}>
					<StudyDeck deck={deck} cards={cards} />
				</Route>
				<Route exact path={path}>
					<ViewDeck deck={deck} cards={cards} decks={decks} />
				</Route>
			</Switch>
		</section>
	);
}
