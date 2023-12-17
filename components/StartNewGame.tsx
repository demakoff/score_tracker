import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

export const StartNewGame = ({ text }: { text: string }) => {
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