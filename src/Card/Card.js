import React from "react";

/* 
Individual card that are used to render a list of cards when you view the deck 
*/

export default function Card({ card }) {
	const allCards = JSON.parse(localStorage.getItem("cards"));

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
					<a href='#' className='btn btn-secondary mr-2'>
						Edit Card
					</a>
					<button className='btn btn-danger mr-2' onClick={handleDeleteCard}>
						Delete Card
					</button>
				</section>
			</div>
		</li>
	);
}
