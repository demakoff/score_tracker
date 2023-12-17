'use client';

import GameForm from '@components/GameForm';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import type { Game, CreateGameRequestData } from '@utils/types';
import { CreateGameMutation } from '@graphql/Game/client-entities';

export default function NewGamePage() {
    const router = useRouter();

    const [gameData, setGameData] = useState({ teamOneName: '', teamTwoName: '' });

    const [createGame, { loading }] = useMutation<{ id: Game['id'] }, CreateGameRequestData>(CreateGameMutation, {
        onCompleted: () => router.push('/'),
        onError: (error) => console.error(error)
    });

    const createNewGame: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        await createGame({
            variables: {
                teamOneName: gameData.teamOneName,
                teamTwoName: gameData.teamTwoName,
            }
        }
        );
    };

    return (
        <GameForm
            action='Create'
            gameData={gameData}
            setGameData={setGameData}
            isLoading={loading}
            handleSubmit={createNewGame}
        />
    );
}
