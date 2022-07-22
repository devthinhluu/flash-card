import React from "react";

export default function CardsList({ cards }) {
	const cardsElements = cards.map((card) => (
		<li className='list-group-item list-group-item-action' key={card.id}>
			<div className='row'>
				<p className='col'>{card.front}</p>
				<p className='col'>{card.back}</p>
				<section className='card-op-buttons'>
					<a href='#' className='btn btn-secondary mr-2'>
						Edit Card
					</a>
					<button className='btn btn-danger mr-2'>Delete Card</button>
				</section>
			</div>
		</li>
	));
	return (
		<ul className='list-group'>
			<li class='list-group-item active pb-1'>
				<h4>Cards</h4>
			</li>
			{cardsElements}
		</ul>
	);
}
