import React from "react";

export default function CardsList({ cards }) {
	const cardsElements = cards.map((card) => (
		<li className='list-group-item list-group-item-action' key={card.id}>
			<div className='row'>
				<p className='col'>{card.front}</p>
				<p className='col'>{card.back}</p>
				<section className='card-op-buttons'>
					<a href='#' className='btn btn-secondary'>
						Edit Card
					</a>
					<button className='btn btn-danger ml-2'>Delete Card</button>
				</section>
			</div>
		</li>
	));
	return <ul className='list-group'>{cardsElements}</ul>;
}
