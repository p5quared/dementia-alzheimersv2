let gameData = {}

export async function GET() {
    const data = {
        game: gameData
    }

    if (!data) {
        throw new Error('Error in GET: Data not found...')
    }

    return new Response(JSON.stringify(data))

}

export async function POST() {

    const data = {
        game: gameData
    }

}
