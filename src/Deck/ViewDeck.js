import React from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import CardsList from "../Card/CardsList";

export default function ViewDeck({ cards, decks, deck }) {
	const { deckId } = useParams("deckId");
	const { url } = useRouteMatch();
	const history = useHistory();
	const allCards = JSON.parse(localStorage.getItem("cards")) || [];

	function handleDeleteDeck() {
		if (
			window.confirm("Do you want to delete this deck? It cannot be recovered.")
		) {
			const newDecks = decks.filter((oldDeck) => oldDeck.id !== deck.id);
			const newCardsList = allCards.filter((card) => card.deckId !== deck.id);
			localStorage.setItem("decks", JSON.stringify(newDecks));
			localStorage.setItem("cards", JSON.stringify(newCardsList));
			history.push("/");
		}
	}
	console.log(deck.title, deck.desc, "from view");
	return deck ? (
		<div className='container'>
			{/* Bread crumb nav bar */}
			<nav aria-label='breadcrumb'>
				<ol className='breadcrumb'>
					<li className='breadcrumb-item'>
						<a href='/'>Home</a>
					</li>
					<li className='breadcrumb-item active' aria-current='page'>
						{deck.title}
					</li>
				</ol>
			</nav>
			<h5>{deck.title}</h5>
			<p>{deck.desc}</p>
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
