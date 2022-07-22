import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import AddCard from "./AddCard";

export default function CardOps() {
	const { path } = useRouteMatch();
	return (
		<section>
			<Switch>
				<Route path={`${path}/new`}>
					<AddCard />
				</Route>
			</Switch>
		</section>
	);
}
