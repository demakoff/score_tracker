'use client';

import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import type { Team } from '@/utils/types';
import { CreateTeamMutation, GetAllTeamsQuery } from '@/graphql/Team/client-entities';
import { Button, Input } from '@nextui-org/react';
import { StartNewGame } from '@/components/StartNewGame';
import TeamsList from '../TeamsList';

export default function NewTeam() {

    const [name, setName] = useState<Team['name']>('');

    const {
        data: createdTeams,
        refetch
    } = useQuery<{ teams: Team[] }>(GetAllTeamsQuery, {
        fetchPolicy: 'network-only',
    });

    const [createTeam, { loading }] = useMutation<{ createTeam: { id: Team['id'] } }, { name: Team['name'] }>(CreateTeamMutation, {
        onCompleted: () => {
            setName('');
            refetch();
        },
        onError: (error) => console.error(error)
    });

    return (
        <div className="py-2 text-4xl">
            <Input
                type="text"
                className="my-2"
                classNames={{
                    label: 'text-xl',
                    input: 'text-2xl',
                }}
                label="Team Name"
                size="lg"
                variant="underlined"
                value={name}
                onValueChange={setName}
            />
            <Button
                color="primary"
                className="my-2 text-3xl w-full h-16"
                onClick={() => createTeam({ variables: { name } })}
                isDisabled={!name || loading}
            >
                {loading ? 'Creating' : 'Create'} new team
            </Button>

            <StartNewGame />

            {createdTeams ? <TeamsList data={createdTeams.teams} /> : (null)}
        </div>
    );
}
