import React from "react";
import Card from "./Card";

// Component that displays a list of card for in deck view
export default function CardsList({ cards }) {
	const cardsElements = cards.map((card) => <Card card={card} />);
	return (
		<ul className='list-group'>
			<li class='list-group-item active pb-1'>
				<h4>Cards</h4>
			</li>
			{cardsElements}
		</ul>
	);
}
