import { error } from '@sveltejs/kit';

export async function GET() {
    const product = {
        name: 'sticker',
        price: '$10'
    };
    if (!product) {
        throw error(400, 'No product exists.');
    }
    return new Response(JSON.stringify(product));
}
