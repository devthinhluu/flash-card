import React from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import CardsList from "../Card/CardsList";

export default function ViewDeck({ cards }) {
	const [allDecks, setAllDecks] = useState([]);
	const [currentDeck, setCurrentDeck] = useState([]);
	const { deckId } = useParams("deckId");
	const { url } = useRouteMatch();
	const history = useHistory();
	const allCards = JSON.parse(localStorage.getItem("cards")) || [];

	useEffect(() => {
		let decksFromStorage = localStorage.getItem("decks");
		if (decksFromStorage) {
			decksFromStorage = JSON.parse(decksFromStorage);
			setAllDecks(decksFromStorage);
			setCurrentDeck(
				decksFromStorage.find((deck) => deck.id === Number(deckId))
			);
		}
	}, []);

	function handleDeleteDeck() {
		if (
			window.confirm("Do you want to delete this deck? It cannot be recovered.")
		) {
			const newDecks = allDecks.filter(
				(oldDeck) => oldDeck.id !== Number(deckId)
			);
			const newCardsList = allCards.filter(
				(card) => card.deckId !== Number(deckId)
			);
			localStorage.setItem("decks", JSON.stringify(newDecks));
			localStorage.setItem("cards", JSON.stringify(newCardsList));
			history.push("/");
		}
	}
	console.log(currentDeck.title, currentDeck.desc, "from view");
	return currentDeck ? (
		<div className='container'>
			{/* Bread crumb nav bar */}
			<nav aria-label='breadcrumb'>
				<ol className='breadcrumb'>
					<li className='breadcrumb-item'>
						<a href='/'>Home</a>
					</li>
					<li className='breadcrumb-item active' aria-current='page'>
						{currentDeck.title}
					</li>
				</ol>
			</nav>
			<h5>{currentDeck.title}</h5>
			<p>{currentDeck.desc}</p>
			<section className='deck-operation-links'>
				<a href={`${url}/edit`} className='btn btn-info mr-2'>
					Edit
				</a>
				<a href={`${url}/study`} className='btn btn-primary mr-2'>
					Study
				</a>
				<a href={`${url}/cards/new`} className='btn btn-secondary'>
					Add Cards
				</a>
				<button
					onClick={handleDeleteDeck}
					className='btn btn-danger float-right'
				>
					Delete Deck
				</button>
			</section>
			<section className='cardsList mt-4'>
				<CardsList cards={cards} />
			</section>
		</div>
	) : (
		<h1>Page not found</h1>
	);
}
