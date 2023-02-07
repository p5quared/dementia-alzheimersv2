import type { RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

const game_states = {
	//default board... empty
	0: {
		history: [
			{
				board: Array(9).fill('')
			}
		],
		xIsNext: true,
		stepNumber: 0
	}
};

const game_exists = (id: number) => {
	return id in game_states;
};
export const GET = (({ url }) => {
	const id = Number(url.searchParams.get('id'));

	// @ ts-ignore
	const data = {
		global: game_states[0],
		private: null
	};

	if (id && game_exists(id)) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		data['private'] = game_states[id];
	}

	return new Response(JSON.stringify(data));
}) satisfies RequestHandler;

export async function POST({ request }: RequestEvent) {
	// should receieve a json object with the following properties:
	// global game status and a private game status (or null)
	const response = await request.json();
	game_states[0] = response.global;
	const priv = response.private;

	return new Response(JSON.stringify(game_states));
}
