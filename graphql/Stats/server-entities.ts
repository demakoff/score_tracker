import { builder } from '../builder';
import prisma from '@/prisma/prisma';
import '../Team/server-entities';
import '../Game/server-entities';
import { TeamStat } from '@/utils/types';

const TeamStatRef = builder.objectType(TeamStat, {
    name: 'TeamStat',
    description: 'General teams statistics',
    fields: (t) => ({
        id: t.exposeInt('id'),
        name: t.exposeString('name'),
        gamesPlayed: t.exposeInt('gamesPlayed'),
        wins: t.exposeInt('wins'),
        loses: t.exposeInt('loses'),
        winRatio: t.exposeFloat('winRatio'),
        goalsFor: t.exposeInt('goalsFor'),
        goalsAgainst: t.exposeInt('goalsAgainst'),
        goalsDiff: t.exposeInt('goalsDiff'),
    }),
});

builder.queryField('teamStats', (t) =>
    t.field({
        type: [TeamStatRef],
        nullable: true,
        resolve: async () => {
            const teams = await prisma.team.findMany();

            return teams.map(async (team) => {
                const games = await prisma.game.findMany({
                    where: { OR: [{ teamOne: team.id }, { teamTwo: team.id }] }
                });

                const stats = games.reduce((acc, game) => {
                    acc.goalsFor += game.teamOne === team.id ? game.teamOneScore : game.teamTwoScore;
                    acc.goalsAgainst += game.teamOne === team.id ? game.teamTwoScore : game.teamOneScore;

                    if (game.winner === team.id) {
                        acc.wins++;
                    }
                    return acc;
                }, {
                    wins: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                });

                const gamesPlayed = games.length;
                const wins = stats.wins;
                const loses = gamesPlayed - wins;
                const winRatio = gamesPlayed ? parseFloat((wins / gamesPlayed).toFixed(2)) : 0;
                const goalsFor = stats.goalsFor;
                const goalsAgainst = stats.goalsAgainst;
                const goalsDiff = goalsFor - goalsAgainst;

                return {
                    id: team.id,
                    name: team.name,
                    gamesPlayed,
                    wins,
                    loses,
                    winRatio,
                    goalsFor,
                    goalsAgainst,
                    goalsDiff,
                };
            });
        }
    }),
);
