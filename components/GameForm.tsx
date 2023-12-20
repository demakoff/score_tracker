import { Button, Input, Checkbox, Slider } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CreateGameRequestData } from '@/utils/types';

export default function GameForm(
    { action, gameData, setGameData, isLoading, handleSubmit }: {
        action: string,
        gameData: CreateGameRequestData,
        setGameData: React.Dispatch<React.SetStateAction<CreateGameRequestData>>,
        isLoading: boolean,
        handleSubmit: React.FormEventHandler<HTMLFormElement>
    }) {

    const router = useRouter();

    const [gameFinished, setGameFinished] = useState(false);

    return (
        <section className='w-full text-center'>
            <h1 className='text-center text-4xl py-4'>{action} Game</h1>

            <form
                onSubmit={handleSubmit}
                className='mt-5 w-full flex flex-col gap-7'
            >
                <div className='flex flex-row gap-2'>
                    <div className='flex-auto w-4'>
                        <Input
                            type="text"
                            classNames={{
                                label: 'text-xl',
                                input: 'text-2xl',
                            }}
                            label="First Team Name"
                            size="lg"
                            variant="underlined"
                            value={gameData.teamOneName}
                            onChange={(e) => setGameData({ ...gameData, teamOneName: e.target.value })}
                        />
                    </div>
                    <div className='flex-auto w-4'>
                        <Input
                            type="text"
                            classNames={{
                                label: 'text-xl',
                                input: 'text-2xl'
                            }}
                            label="Second Team Name"
                            size="lg"
                            variant="underlined"
                            value={gameData.teamTwoName}
                            onChange={(e) => setGameData({ ...gameData, teamTwoName: e.target.value })}
                        />
                    </div>
                </div>

                <Checkbox
                    classNames={{
                        label: 'text-xl',
                    }}
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
                        className='flex-auto text-gray-500 text-2xl'
                        color="primary"
                        variant="light"
                        size="lg"
                        onClick={() => router.push('/')}
                    >
                        Cancel
                    </Button>

                    <Button
                        type='submit'
                        className='flex-auto text-2xl'
                        color="primary"
                        variant="shadow"
                        size="lg"
                        isDisabled={
                            !(gameData.teamOneName && gameData.teamTwoName)
                            || gameData.teamOneName === gameData.teamTwoName
                            || isLoading
                            || gameFinished && (gameData.teamOneScore === 10 && gameData.teamTwoScore === 10)
                            || gameFinished && (gameData.teamOneScore !== 10 && gameData.teamTwoScore !== 10)
                        }
                    >
                        {isLoading ? `${action}ing...` : action} game
                    </Button>
                </div>
            </form>
        </section>

    );
}
