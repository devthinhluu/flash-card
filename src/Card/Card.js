import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";

/* 
Individual card that are used to render a list of cards when you view the deck 
*/

export default function Card({ card }) {
	const [allCards, setAllCards] = useState([]);
	const { url } = useRouteMatch();

	useEffect(() => {
		let cards = localStorage.getItem("cards");
		if (cards) {
			cards = JSON.parse(cards);
			setAllCards(cards);
		}
	}, []);

	function handleDeleteCard() {
		if (
			window.confirm("Do you want to delete this card? It cannot be recovered.")
		) {
			const newCardsList = allCards.filter((oldCard) => oldCard.id !== card.id);
			localStorage.setItem("cards", JSON.stringify(newCardsList));
			window.location.reload();
		}
	}
	return (
		<li className='list-group-item list-group-item-action' key={card.id}>
			<div className='row'>
				<p className='col'>{card.front}</p>
				<p className='col'>{card.back}</p>
				<section className='card-op-buttons'>
					<a
						href={`${url}/cards/${card.id}/edit`}
						className='btn btn-outline-info mr-2'
					>
						<i class='fa-solid fa-pencil'></i>
						{" Edit"}
					</a>
					<button className='btn btn-danger mr-2' onClick={handleDeleteCard}>
						<i class='fa-solid fa-trash-can'></i>
					</button>
				</section>
			</div>
		</li>
	);
}
