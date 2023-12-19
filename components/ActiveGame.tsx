'use client';

import { useState } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { useQuery, useMutation } from '@apollo/client';

import { Game, UpdateGameRequestData } from '@/utils/types';
import { ActiveGameQuery, UpdateGameMutation } from '@/graphql/Game/client-entities';
import { StartNewGame } from './StartNewGame';

export default function ActiveGame() {

    const [gameData, setGameData] = useState<Game>();

    const {
        loading: activeGameLoading,
        error
    } = useQuery<{ activeGame: Game }>(ActiveGameQuery, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => setGameData(data.activeGame),
    });

    const [updateGame] = useMutation<{ updateGame: Game }, UpdateGameRequestData>(UpdateGameMutation, {
        onCompleted: (data) => setGameData(data.updateGame),
        onError: (error) => console.error(error),
    });

    if (error) return <p>Oh no... Ccnnot retrieve active game. {error.message}</p>;

    const updateScore = async ({
        scoreProp,
        teamNameProp,
    }: {
        scoreProp: 'teamOneScore' | 'teamTwoScore';
        teamNameProp: 'teamOneName' | 'teamTwoName';
    }) => {
        if (!gameData || gameData.winner) return;

        if (gameData[scoreProp] === 9) {
            await updateGame({
                variables: {
                    id: gameData.id,
                    teamOneScore: { ...gameData, [scoreProp]: 10 }['teamOneScore'],
                    teamTwoScore: { ...gameData, [scoreProp]: 10 }['teamTwoScore'],
                    winner: gameData[teamNameProp],
                }
            });
            confetti();
        } else {
            const updatedScore = gameData[scoreProp] + 1;
            await updateGame({
                variables: {
                    id: gameData.id,
                    teamOneScore: { ...gameData, [scoreProp]: updatedScore }['teamOneScore'],
                    teamTwoScore: { ...gameData, [scoreProp]: updatedScore }['teamTwoScore'],
                }
            });
        }
    };

    if (activeGameLoading) return (<Spinner data-testid="spinner" size="lg" className="mt-40" color="primary" />);

    return (
        <section className="text-center">
            <div className={`flex-col ${activeGameLoading ? 'hidden' : ''}`}>
                {gameData ?
                    (<>
                        <div className="flex flex-row items-center py-4 text-5xl" >
                            <span className="flex-auto w-4 text-right" data-testid="team-one-name">{gameData.teamOneName}</span>
                            <div className="flex-none text-xl px-3">vs</div>
                            <div className="flex-auto w-4 text-left" data-testid="team-two-name">{gameData.teamTwoName}</div>
                        </div>
                        <div className="py-4 text-9xl">
                            <span data-testid="team-one-score">{gameData.teamOneScore}</span> : <span data-testid="team-two-score">
                                {gameData.teamTwoScore}</span>
                        </div>

                        {gameData.winner ? (
                            <div className="py-4 text-4xl">
                                <p>
                                    &quot;{gameData.winner}&quot; is a winner!
                                </p>
                                <StartNewGame text="One more time?" />
                            </div>
                        ) : (
                            <div className="flex space-x-4 py-4">
                                <Button
                                    className="flex-auto text-4xl h-20"
                                    color="success"
                                    size="md"
                                    onClick={() => updateScore({
                                        scoreProp: 'teamOneScore',
                                        teamNameProp: 'teamOneName',
                                    })}
                                    data-testid="team-one-goal-button"
                                >
                                    GOAL
                                </Button>
                                <Button
                                    className="flex-auto text-4xl h-20"
                                    color="success"
                                    size="md"
                                    onClick={() => updateScore({
                                        scoreProp: 'teamTwoScore',
                                        teamNameProp: 'teamTwoName',
                                    })}
                                    data-testid="team-two-goal-button"

                                >
                                    GOAL
                                </Button>
                            </div>
                        )}
                    </>) : (
                        <div data-testid="start-new-game">
                            <StartNewGame text="No active games so far" />
                        </div>
                    )}
            </div>
        </section>
    );
}
