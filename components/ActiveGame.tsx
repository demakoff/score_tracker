'use client';

import { Button, Spinner } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Game } from '@utils/types';

const StartNewGame = ({ text }: { text: string }) => {
    const router = useRouter();
    return (
        <div className="py-4 text-4xl">
            <p className="my-4">{text}</p>
            <Button
                color="primary"
                className="my-4 text-3xl w-full h-20"
                onClick={() => router.push('/new-game')}
            >
                Start new game
            </Button>
        </div>
    );
};

export default function ActiveGame() {
    const [gameData, setGameData] = useState<Game | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchActiveGame = async () => {
        try {
            const response = await fetch('/api/active-game');
            const data = await response.json();
            setGameData(data);
        } catch (error) {
            console.error(error);
            setGameData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchActiveGame();
    }, []);

    const updateScore = async ({
        scoreProp,
        teamNameProp,
    }: {
        scoreProp: 'teamOneScore' | 'teamTwoScore';
        teamNameProp: 'teamOneName' | 'teamTwoName';
    }) => {
        if (!gameData || gameData.winner) return;

        let updatedGameData;

        if (gameData[scoreProp] === 9) {
            updatedGameData = {
                ...gameData,
                [scoreProp]: 10,
                winner: gameData[teamNameProp],
            };
            confetti();
        } else {
            updatedGameData = {
                ...gameData,
                [scoreProp]: gameData[scoreProp] + 1,
            };
        }

        const response: Response = await fetch('/api/game/update', {
            method: 'PUT',
            body: JSON.stringify(updatedGameData),
        });

        setGameData(await response.json());
    };

    return (
        <section className="text-center">
            {isLoading ? (<Spinner size="lg" className="mt-40" color="primary" />)
                : (
                    <div className={`flex-col ${isLoading ? 'hidden' : ''}`}>
                        {gameData ?
                            (<>
                                <div className="py-4 text-5xl">
                                    {gameData.teamOneName} <span className="text-xl">vs</span>{' '}
                                    {gameData.teamTwoName}
                                </div>
                                <div className="py-4 text-9xl">
                                    {gameData.teamOneScore} : {gameData.teamTwoScore}
                                </div>

                                {gameData.winner ? (
                                    <div className="py-4 text-4xl">
                                        <p>
                                            {' '}
                                            Woohoo! <b>{gameData.winner}</b> won this game!
                                        </p>
                                        <StartNewGame text="One more?" />
                                    </div>
                                ) : (
                                    <div className="flex space-x-4 py-4">
                                        <Button
                                            className="flex-auto text-4xl h-20"
                                            color="success"
                                            size="md"
                                            onClick={() =>
                                                updateScore({
                                                    scoreProp: 'teamOneScore',
                                                    teamNameProp: 'teamOneName',
                                                })
                                            }
                                        >
                                            GOAL
                                        </Button>
                                        <Button
                                            className="flex-auto text-4xl h-20"
                                            color="success"
                                            size="md"
                                            onClick={() =>
                                                updateScore({ scoreProp: 'teamTwoScore', teamNameProp: 'teamTwoName', })
                                            }
                                        >
                                            GOAL
                                        </Button>
                                    </div>
                                )}
                            </>) : (
                                <StartNewGame text="No active games so far" />
                            )}
                    </div>
                )}
        </section>
    );
}
