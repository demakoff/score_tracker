'use client';

import GameForm from '@components/GameForm';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function NewGame() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [gameData, setGameData] = useState({ teamOneName: '', teamTwoName: '' });

    const createNewGame: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await fetch('/api/game/new', {
                method: 'POST',
                body: JSON.stringify({
                    teamOneName: gameData.teamOneName,
                    teamTwoName: gameData.teamTwoName,
                }),
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GameForm
            action='Create'
            gameData={gameData}
            setGameData={setGameData}
            isLoading={isLoading}
            handleSubmit={createNewGame}
        />
    );
}
