import { builder } from '../builder';
import prisma from '@/prisma/prisma';
import '../Team/server-entities';

builder.prismaObject('Game', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        createdAt: t.expose('createdAt', { type: 'Date', }),
        teamOne: t.relation('Team_Game_teamOneToTeam'),
        teamTwo: t.relation('Team_Game_teamTwoToTeam'),
        teamOneScore: t.exposeInt('teamOneScore'),
        teamTwoScore: t.exposeInt('teamTwoScore'),
        winner: t.relation('Team_Game_winnerToTeam', { nullable: true }),
    })
});


builder.queryField('activeGame', (t) =>
    t.prismaField({
        type: 'Game',
        nullable: true,
        resolve: () => prisma.game.findFirst({ where: { winner: null } })
    })
);

builder.queryField('games', (t) =>
    t.prismaField({
        type: ['Game'],
        nullable: true,
        args: {
            teamId: t.arg.int(),
            teamTwoId: t.arg.int(),
            finished: t.arg.boolean(),
        },
        resolve: (query, _parent, args) => {
            let where: any = {};

            if (args.teamId) {
                if (args.teamTwoId) {
                    where = {
                        OR: [
                            { AND: [{ teamOne: args.teamId }, { teamTwo: args.teamTwoId }] },
                            { AND: [{ teamOne: args.teamTwoId }, { teamTwo: args.teamId }] }
                        ]
                    };
                } else {
                    where = { OR: [{ teamOne: args.teamId }, { teamTwo: args.teamId }] };
                }
            }

            if (args.finished) {
                where.NOT = { winner: null };
            }

            return prisma.game.findMany({ ...query, where, orderBy: { createdAt: 'desc' } });
        }
    })
);

builder.mutationField('createGame', (t) =>
    t.prismaField({
        type: 'Game',
        args: {
            teamOne: t.arg.string({ required: true }),
            teamTwo: t.arg.string({ required: true }),
            teamOneScore: t.arg.int(),
            teamTwoScore: t.arg.int(),
            winner: t.arg.string(),
        },
        resolve: async (query, _parent, args) => {
            const { teamOne, teamTwo, teamOneScore, teamTwoScore, winner } = args;

            const teamOneData = await prisma.team.findUniqueOrThrow({ where: { name: teamOne } });
            const teamTwoData = await prisma.team.findUniqueOrThrow({ where: { name: teamTwo } });

            const data: any = {
                teamOne: teamOneData.id,
                teamTwo: teamTwoData.id,
            };

            if (typeof teamOneScore === 'number'
                && typeof teamTwoScore === 'number'
                && winner) {

                const winnerData = await prisma.team.findUniqueOrThrow({ where: { name: winner } });

                data.teamOneScore = teamOneScore;
                data.teamTwoScore = teamTwoScore;
                data.winner = winnerData.id;
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

            const data: any = {
                teamOneScore,
                teamTwoScore,
            };

            if (winner) {
                const team = await prisma.team.findUniqueOrThrow({ where: { name: winner } });
                data.winner = team.id;
            }

            return prisma.game.update({
                where: { id },
                data,
            });
        }
    })
);
