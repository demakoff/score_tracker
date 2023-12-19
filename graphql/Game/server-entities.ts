import { builder } from '../builder';
import prisma from '@/prisma/prisma';

builder.prismaObject('Game', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        createdAt: t.expose('createdAt', {
            type: 'Date',
        }),
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
        },
        resolve: async (query, _parent, args) => {
            const { teamOneName, teamTwoName } = args;

            return prisma.game.create({
                data: {
                    teamOneName,
                    teamTwoName,
                }
            });
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