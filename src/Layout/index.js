import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import HomeScreen from "../Home/HomeScreen";
import CreateDeck from "../Deck/CreateDeck";
import DeckOps from "../Deck/DeckOps";

export default function Layout() {
	return (
		<div>
			<Header />
			<div className='container mb-3'>
				{/* TODO */}
				<Switch>
					<Route path='/decks/new'>
						<CreateDeck />
					</Route>
					<Route path='/decks/:deckId'>
						<DeckOps />
					</Route>
					<Route exact path='/'>
						<HomeScreen />
					</Route>
					<NotFound />
				</Switch>
			</div>
		</div>
	);
}
