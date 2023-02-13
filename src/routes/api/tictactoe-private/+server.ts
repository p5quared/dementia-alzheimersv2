import type { RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const empty_game = {
	history: [
		{
			board: Array(9).fill('')
		}
	],
	xIsNext: true,
	stepNumber: 0
};

const private_games = {
	// id: { history: ... , xIsNext: ... , stepNumber: ... }
};

export const GET = (({ url }) => {
	const id = url.searchParams.get('id');

	if (id && id in private_games) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		console.log('game found');
		console.log('current server state in GET: ', JSON.stringify(private_games));
		console.log('STATE OF GAME: ', JSON.stringify(private_games[id]));
		return new Response(JSON.stringify(private_games[id]));
	}
	return new Response(null);
}) satisfies RequestHandler;

export async function POST({ request }: RequestEvent) {
	const { id, game_state } = await request.json();

	// if a game state was provided, we will update it
	if (game_state) {
		private_games[id] = game_state;
	} else {
		// we will just override the game if it already exists
		private_games[id] = empty_game;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return new Response(JSON.stringify(private_games[id]));
}
