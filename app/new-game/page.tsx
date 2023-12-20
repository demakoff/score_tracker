'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import GameForm from '@/components/GameForm';
import type { Game, CreateGameRequestData } from '@/utils/types';
import { CreateGameMutation } from '@/graphql/Game/client-entities';

export default function NewGamePage() {
    const router = useRouter();

    const [gameData, setGameData] = useState<CreateGameRequestData>({
        teamOneName: '',
        teamTwoName: '',
        teamOneScore: 0,
        teamTwoScore: 0,
    });

    const [createGame, { loading }] = useMutation<{ id: Game['id'] }, CreateGameRequestData>(CreateGameMutation, {
        onCompleted: () => router.push('/'),
        onError: (error) => console.error(error)
    });

    const createNewGame: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const variables: CreateGameRequestData = {
            teamOneName: gameData.teamOneName,
            teamTwoName: gameData.teamTwoName,
        };

        if (gameData.teamOneScore === 10) {
            variables.teamOneScore = gameData.teamOneScore;
            variables.teamTwoScore = gameData.teamTwoScore;
            variables.winner = gameData.teamOneName;
        }

        if (gameData.teamTwoScore === 10) {
            variables.teamOneScore = gameData.teamOneScore;
            variables.teamTwoScore = gameData.teamTwoScore;
            variables.winner = gameData.teamTwoName;
        }

        await createGame({ variables });
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
