import { builder } from '../builder';
import prisma from '@/prisma/prisma';
import type { CreateGameRequestData } from '@/utils/types';

builder.prismaObject('Game', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        createdAt: t.expose('createdAt', { type: 'Date', }),
        teamOneName: t.exposeString('teamOneName'),
        teamTwoName: t.exposeString('teamTwoName'),
        teamOneScore: t.exposeInt('teamOneScore'),
        teamTwoScore: t.exposeInt('teamTwoScore'),
        winner: t.exposeString('winner', { nullable: true }),
    })
});

builder.queryField('activeGame', (t) =>
    t.prismaField({
        type: 'Game',
        nullable: true,
        resolve: () => prisma.game.findFirst({ where: { winner: null } })
    })
);

builder.mutationField('createGame', (t) =>
    t.prismaField({
        type: 'Game',
        args: {
            teamOneName: t.arg.string({ required: true }),
            teamTwoName: t.arg.string({ required: true }),
            teamOneScore: t.arg.int(),
            teamTwoScore: t.arg.int(),
            winner: t.arg.string(),
        },
        resolve: async (query, _parent, args) => {
            const { teamOneName, teamTwoName, teamOneScore, teamTwoScore, winner } = args;

            const data: CreateGameRequestData = {
                teamOneName,
                teamTwoName,
            };

            if (typeof teamOneScore === 'number'
                && typeof teamTwoScore === 'number'
                && winner) {

                data.teamOneScore = teamOneScore;
                data.teamTwoScore = teamTwoScore;
                data.winner = winner;
            }

            return prisma.game.create({ data });
        }
    })
);

builder.mutationField('updateGame', (t) =>
    t.prismaField({
        type: 'Game',
        args: {
            id: t.arg.int({ required: true }),
            teamOneScore: t.arg.int({ required: true }),
            teamTwoScore: t.arg.int({ required: true }),
            winner: t.arg.string(),
        },
        resolve: async (query, _parent, args) => {
            const { id, teamOneScore, teamTwoScore, winner } = args;

            return prisma.game.update({
                where: {
                    id
                },
                data: {
                    teamOneScore,
                    teamTwoScore,
                    winner
                }
            });
        }
    })
);