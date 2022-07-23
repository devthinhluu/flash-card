import React from "react";
import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

const MIN_CARDS = 3;

export default function StudyDeck({ deck, cards }) {
	const [cardIndex, setCardIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);

	function handleFlipCard() {
		setIsFlipped((prevFront) => !prevFront);
	}

	function handleNext() {
		setCardIndex((prevCardIndex) => prevCardIndex + 1);
	}
	function handlePrev() {
		setCardIndex((prevCardIndex) => prevCardIndex - 1);
	}

	return (
		<div className='container'>
			<section>
				{/* Bread crumb nav bar */}
				<nav aria-label='breadcrumb'>
					<ol className='breadcrumb'>
						<li className='breadcrumb-item'>
							<a href='/'>
								<i class='fa-solid fa-house'></i>
								{" Home"}
							</a>
						</li>
						<li className='breadcrumb-item' aria-current='page'>
							<a href={`/decks/${deck.id}`}>{deck.title}</a>
						</li>
						<li className='breadcrumb-item active' aria-current='page'>
							Study
						</li>
					</ol>
				</nav>
			</section>
			<h3>{deck.title}: Study</h3>
			{cards.length >= MIN_CARDS ? (
				<div class='card'>
					<div class='card-body'>
						<h5 class='card-title'>{`Card ${cardIndex + 1} of ${
							cards.length
						}`}</h5>
						<p class='card-text'>
							{isFlipped ? cards[cardIndex].front : cards[cardIndex].back}
						</p>
						<button
							className='btn btn-outline-primary mr-2'
							disabled={cardIndex <= 0}
							onClick={handlePrev}
						>
							<i class='fa-solid fa-left-long'></i>
						</button>
						<button className='btn btn-primary mr-2' onClick={handleFlipCard}>
							Flip
						</button>
						<button
							className='btn btn-outline-primary m2-2'
							disabled={cardIndex >= cards.length - 1}
							onClick={handleNext}
						>
							<i class='fa-solid fa-right-long'></i>
						</button>
					</div>
				</div>
			) : (
				<div>
					<h4>Not enough cards.</h4>
					<p>{`You need at least 3 cards. You current have ${cards.length} cards.`}</p>
					<a
						href={`/decks/${deck.id}/cards/new`}
						className='btn btn-outline-secondary'
					>
						<i class='fa-solid fa-plus'></i>
						{" Add Cards"}
					</a>
				</div>
			)}
		</div>
	);
}
