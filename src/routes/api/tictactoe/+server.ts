import type { RequestEvent } from '@sveltejs/kit';

let global_game = {
	history: [
		{
			board: Array(9).fill('')
		}
	],
	xIsNext: true,
	stepNumber: 0
};

export const GET = () => {
	return new Response(JSON.stringify(global_game));
};

export async function POST({ request }: RequestEvent) {
	global_game = await request.json();
	return new Response(JSON.stringify(global_game));
}
