import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    const data = await request.json();

    try {
        return new Response(JSON.stringify(data), {
            status: 201,
        });
    } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 });
    }
};
