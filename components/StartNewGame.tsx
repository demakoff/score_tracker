import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

export const StartNewGame = ({ text }: { text?: string }) => {
    const router = useRouter();
    return (
        <div className="pt-2 text-4xl">
            {text ? <p className="my-4">{text}</p> : null}
            <Button
                color="primary"
                className="my-4 text-3xl w-full h-16"
                onClick={() => router.push('/new-game')}
            >
                Start new game
            </Button>
        </div>
    );
};