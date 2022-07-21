import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function HomeDeck({ deck }) {
	const { id, title, desc } = deck;
	const cards = JSON.parse(localStorage.getItem("cards")) || [];
	const decksCards = cards.filter((card) => card.deckId === id);
	const { url } = useRouteMatch();

	return (
		<li className='list-group-item list-group-item-action'>
			<div className='d-flex w-100 justify-content-between'>
				<h5 className='mb-1'>{title}</h5>
				<small>{decksCards.length} cards</small>
			</div>
			<p className='mb-2'>{desc}</p>
			<a href={`${url}decks/${id}`} className='btn btn-primary mr-2'>
				View
			</a>
			<a href={`${url}decks/${id}/study`} className='btn btn-secondary'>
				Study
			</a>
			<button className='btn btn-outline-danger float-right'>
				Delete Deck
			</button>
		</li>
	);
}
