import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';

import { CreateGameRequestData } from '@utils/types';

export default function GameForm(
    { action, gameData, setGameData, isLoading, handleSubmit }: {
        action: string,
        gameData: CreateGameRequestData,
        setGameData: React.Dispatch<React.SetStateAction<CreateGameRequestData>>,
        isLoading: boolean,
        handleSubmit: React.FormEventHandler<HTMLFormElement>
    }) {

    const router = useRouter();

    return (
        <section className='w-full text-center'>
            <h1 className='text-center text-4xl py-4'>{action} Game</h1>

            <form
                onSubmit={handleSubmit}
                className='mt-5 w-full flex flex-col gap-7'
            >
                <Input
                    type="text"
                    classNames={{
                        label: 'text-xl',
                        input: 'text-2xl'
                    }}
                    label="First Team Name"
                    size="lg"
                    variant="underlined"
                    value={gameData.teamOneName}
                    onChange={(e) => setGameData({ ...gameData, teamOneName: e.target.value })}
                />

                <Input
                    type="text"
                    classNames={{
                        label: 'text-xl',
                        input: 'text-2xl'
                    }}
                    size="lg"
                    variant="underlined"
                    label="Second Team Name"
                    value={gameData.teamTwoName}
                    onChange={(e) => setGameData({ ...gameData, teamTwoName: e.target.value })}
                />

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
                        isDisabled={!(gameData.teamOneName && gameData.teamTwoName)
                            || gameData.teamOneName === gameData.teamTwoName
                            || isLoading}
                    >
                        {isLoading ? `${action}ing...` : action} game
                    </Button>
                </div>
            </form>
        </section>

    );
}
