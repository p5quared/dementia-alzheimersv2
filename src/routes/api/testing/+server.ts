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

export async function POST() {
	count += 1;

	const data = {
		count: count
	};

	if (!data) {
		throw new Error('ERROR in POST: Data not found');
	}

	return new Response(JSON.stringify(data));
}
