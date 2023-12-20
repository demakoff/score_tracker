'use client';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import type { Team } from '@/utils/types';
import { CreateTeamMutation } from '@/graphql/Game/client-entities';
import { Button, Input } from '@nextui-org/react';
import { StartNewGame } from '@/components/StartNewGame';

export default function NewTeam() {

    const [name, setName] = useState<Team['name']>('');

    const [createTeam, { loading }] = useMutation<{ createTeam: { id: Team['id'] } }, { name: Team['name'] }>(CreateTeamMutation, {
        onCompleted: () => setName(''),
        onError: (error) => console.error(error)
    });

    return (
        <div className="py-4 text-4xl">
            <Input
                type="text"
                className="my-4"
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
                className="my-4 text-3xl w-full h-20"
                onClick={() => createTeam({ variables: { name } })}
                isDisabled={loading}
            >
                {loading ? 'Creating' : 'Create'} new team
            </Button>

            <StartNewGame text="Let's play?" />
        </div>
    );
}
