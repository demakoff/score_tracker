import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { DateTimeResolver } from 'graphql-scalars';

import prisma from '@prisma/prisma';

export const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes,
    Scalars: {
        Date: {
            Input: Date;
            Output: Date;
        };
    };
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma,
    }
});

builder.queryType({
    fields: (t) => ({
        ok: t.boolean({
            resolve: () => true,
        }),
    }),
});

builder.mutationType({});
builder.addScalarType('Date', DateTimeResolver, {});