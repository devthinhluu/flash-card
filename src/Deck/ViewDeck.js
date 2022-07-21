import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import CardsList from "../Card/CardsList";

export default function ViewDeck({ deck, cards }) {
	const { url } = useRouteMatch();
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
				<a href='#' className='btn btn-info mr-2'>
					Edit
				</a>
				<a href='#' className='btn btn-primary mr-2'>
					Study
				</a>
				<a href={`${url}/cards/new`} className='btn btn-secondary'>
					Add Cards
				</a>
				<a href='#' className='btn btn-danger float-right'>
					Delete Deck
				</a>
			</section>
			<section className='cardsList mt-3'>
				<h3>Cards</h3>
				<CardsList cards={cards} />
			</section>
		</div>
	) : (
		<h1>Page not found</h1>
	);
}
