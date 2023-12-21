import { Button, Checkbox, Slider, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';

import type { Game, CreateGameRequestData, Team } from '@/utils/types';
import { CreateGameMutation, GetAllTeamsQuery } from '@/graphql/Game/client-entities';

export default function NewGame() {

    const router = useRouter();

    const [teams, setTeams] = useState<Team[]>([]);
    const [gameFinished, setGameFinished] = useState(false);
    const [gameData, setGameData] = useState<CreateGameRequestData>({
        teamOne: '',
        teamTwo: '',
        teamOneScore: 0,
        teamTwoScore: 0,
    });

    const {
        loading: teamsLoading,
    } = useQuery<{ teams: Team[] }>(GetAllTeamsQuery, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => setTeams(data.teams),
    });

    const [
        createGame,
        { loading: createGameLoading }
    ] = useMutation<{ id: Game['id'] }, CreateGameRequestData>(CreateGameMutation, {
        onCompleted: () => router.push('/'),
        onError: (error) => console.error(error)
    });

    const isLoading = teamsLoading || createGameLoading;

    const createNewGame: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const variables: CreateGameRequestData = {
            teamOne: gameData.teamOne,
            teamTwo: gameData.teamTwo,
        };

        if (gameFinished) {
            variables.teamOneScore = gameData.teamOneScore;
            variables.teamTwoScore = gameData.teamTwoScore;
            variables.winner = gameData.teamOneScore === 10 ? gameData.teamOne : gameData.teamTwo;
        }

        await createGame({ variables });
    };

    return (
        <section className='w-full text-center'>
            <h1 className='text-center text-4xl py-4'>Create Game</h1>

            <form
                onSubmit={createNewGame}
                className='mt-5 w-full flex flex-col gap-7'
            >
                <div className='flex flex-row gap-2'>
                    <div className='flex-auto w-4'>
                        <Select
                            placeholder="Select a team"
                            classNames={{ value: 'text-xl' }}
                            variant='underlined'
                            selectedKeys={[gameData.teamOne]}
                            onChange={(e) => setGameData({ ...gameData, teamOne: e.target.value })}
                        >
                            {teams.filter(item => item.name !== gameData.teamTwo).map((team) => (
                                <SelectItem key={team.name} value={team.name}>
                                    {team.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className='flex-auto w-4'>
                        <Select
                            placeholder="Select a team"
                            classNames={{ value: 'text-xl' }}
                            variant='underlined'
                            selectedKeys={[gameData.teamTwo]}
                            onChange={(e) => setGameData({ ...gameData, teamTwo: e.target.value })}
                        >
                            {teams.filter(item => item.name !== gameData.teamOne).map((team) => (
                                <SelectItem key={team.name} value={team.name}>
                                    {team.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <Checkbox
                    classNames={{ label: 'text-xl' }}
                    isSelected={gameFinished}
                    onValueChange={setGameFinished}
                >Finished game</Checkbox>

                {gameFinished ? (
                    <div className='flex flex-row gap-2'>
                        <div className='flex-auto w-4'>
                            <Slider
                                label="Team one score"
                                step={1}
                                maxValue={10}
                                minValue={0}
                                className="max-w-md"
                                classNames={{
                                    label: 'text-xl',
                                    value: 'text-2xl',
                                }}
                                value={gameData.teamOneScore}
                                onChange={(value) => setGameData({ ...gameData, teamOneScore: value as number })}
                            />
                        </div>
                        <div className='flex-auto w-4'>
                            <Slider
                                label="Team two score"
                                step={1}
                                maxValue={10}
                                minValue={0}
                                className="max-w-md"
                                classNames={{
                                    label: 'text-xl',
                                    value: 'text-2xl',
                                }}
                                value={gameData.teamTwoScore}
                                onChange={(value) => setGameData({ ...gameData, teamTwoScore: value as number })}
                            />
                        </div>
                    </div>
                ) : null}

                <div className='flex w-full py-5 gap-4'>
                    <Button
                        className='flex-auto text-gray-500 text-2xl w-4'
                        color="primary"
                        variant="light"
                        size="lg"
                        onClick={() => router.push('/')}
                    >
                        Cancel
                    </Button>

                    <Button
                        type='submit'
                        className='flex-auto text-2xl w-4'
                        color="primary"
                        variant="shadow"
                        size="lg"
                        isDisabled={
                            !(gameData.teamOne && gameData.teamTwo)
                            || gameData.teamOne === gameData.teamTwo
                            || isLoading
                            || gameFinished && (gameData.teamOneScore === 10 && gameData.teamTwoScore === 10)
                            || gameFinished && (gameData.teamOneScore !== 10 && gameData.teamTwoScore !== 10)
                        }
                    >
                        {isLoading ? 'Creating...' : 'Create'} game
                    </Button>
                </div>
            </form>
        </section >

    );
}
