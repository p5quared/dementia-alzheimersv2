let count = 0;

export async function GET() {
	const data = {
		count: count
	};

	if (!data) {
		throw new Error('ERROR in GET: Data not found');
	}

	return new Response(JSON.stringify(data));
}

export async function POST({ request }) {
	const dataObject = await request.json();
	if (dataObject.reset) {
		count = 0;
		return new Response(JSON.stringify({ count }));
	}

	const quantity: number = dataObject.quantity;
	count += quantity;

	return new Response(JSON.stringify({ count }));
}
