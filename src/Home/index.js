import { Switch, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";

export default function Home() {
	return (
		<section>
			<Switch>
				<Route path='/'>
					<HomeScreen />
				</Route>
				<Route path={"/decks/:deckID/study"}>hello from study</Route>
				<Route path={"/decks/:deckID"}>hello from view</Route>
			</Switch>
		</section>
	);
}
