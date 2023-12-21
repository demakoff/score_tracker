'use client';

import { useState } from 'react';
import { Spinner } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { useQuery, useMutation } from '@apollo/client';

import { Game, UpdateGameRequestData } from '@/utils/types';
import { ActiveGameQuery, UpdateGameMutation } from '@/graphql/Game/client-entities';
import { StartNewGame } from '@/components/StartNewGame';
import GoalButton from '@/components/GoalButton';

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

    const updateScore = async ({ scoreProp, teamProp }: {
        scoreProp: 'teamOneScore' | 'teamTwoScore';
        teamProp: 'teamOne' | 'teamTwo';
    }) => {
        if (!gameData || gameData.winner) return;

        const updatedScore = gameData[scoreProp] + 1;

        const variables: UpdateGameRequestData = {
            id: gameData.id,
            teamOneScore: { ...gameData, [scoreProp]: updatedScore }['teamOneScore'],
            teamTwoScore: { ...gameData, [scoreProp]: updatedScore }['teamTwoScore'],
        };

        if (updatedScore === 10) {
            variables.winner = gameData[teamProp].name;
        }

        await updateGame({ variables });

        if (updatedScore === 10) confetti();
    };

    if (error) return (<p>Oh no... Cannot retrieve active game. {error.message}</p>);
    if (activeGameLoading) return (<Spinner data-testid="spinner" size="lg" className="mt-40" color="primary" />);

    return (
        <section className="text-center">
            <div className={`flex-col ${activeGameLoading ? 'hidden' : ''}`}>
                {gameData ?
                    (<>
                        <div className="flex flex-row items-center py-4 text-5xl" >
                            <span className="flex-auto w-4 text-right">{gameData.teamOne.name}</span>
                            <div className="flex-none text-xl px-3">vs</div>
                            <div className="flex-auto w-4 text-left">{gameData.teamTwo.name}</div>
                        </div>
                        <div className="py-4 text-9xl">
                            <span data-testid="team-one-score">{gameData.teamOneScore}</span> : <span data-testid="team-two-score">
                                {gameData.teamTwoScore}</span>
                        </div>

                        {gameData.winner ? (
                            <div className="py-4 text-4xl">
                                <p>&quot;{gameData.winner.name}&quot; is a winner!</p>
                                <StartNewGame text="One more time?" />
                            </div>
                        ) : (
                            <div className="flex space-x-4 py-4">
                                <GoalButton
                                    handleClick={() => updateScore({
                                        scoreProp: 'teamOneScore',
                                        teamProp: 'teamOne',
                                    })}
                                    testId="team-one-goal-button"
                                />
                                <GoalButton
                                    handleClick={() => updateScore({
                                        scoreProp: 'teamTwoScore',
                                        teamProp: 'teamTwo',
                                    })}
                                    testId="team-two-goal-button"
                                />
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
