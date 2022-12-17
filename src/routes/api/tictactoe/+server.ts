import type { RequestEvent } from '@sveltejs/kit';

let serverState = {
	//default board... empty
	history: [
		{
			board: Array(9).fill('')
		}
	],
	xIsNext: true,
	stepNumber: 0
};

export async function GET() {
	const data = {
		gameState: serverState,
		msg: 'hello world'
	};

	if (!data) {
		throw new Error('Error in GET: Data not found...');
	}

	return new Response(JSON.stringify(data));
}

export async function POST({ request }: RequestEvent) {
	serverState = await request.json();

	return new Response(JSON.stringify({ serverState }));
}
