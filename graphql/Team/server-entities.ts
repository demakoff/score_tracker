import { builder } from '../builder';
import prisma from '@/prisma/prisma';

builder.prismaObject('Team', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        name: t.exposeString('name'),
    })
});

builder.queryField('teams', (t) =>
    t.prismaField({
        type: ['Team'],
        nullable: true,
        resolve: (query) => prisma.team.findMany({ ...query, orderBy: { id: 'desc' } })
    })
);

builder.mutationField('createTeam', (t) =>
    t.prismaField({
        type: 'Team',
        args: {
            name: t.arg.string({ required: true }),
        },
        resolve: async (query, _parent, args) => {
            const { name } = args;

            return prisma.team.create({ data: { name } });
        }
    })
);