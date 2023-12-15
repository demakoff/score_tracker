import prisma from '@prisma/prisma';

export const resolvers = {
    Query: {
        activeGame: () => {
            return prisma.games.findFirst({ where: { winner: null } });
        },
    },
};