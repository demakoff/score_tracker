import { Game } from '@utils/types';

export async function GET() {
    try {
        const data: Game = {
            id: 1,
            createdAt: new Date(),
            teamOneName: 'Team 1',
            teamTwoName: 'Team 2',
            teamOneScore: 0,
            teamTwoScore: 0,
        };

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch active game', { status: 500 });
    }
}
