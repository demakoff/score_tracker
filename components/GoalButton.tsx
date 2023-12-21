import { Button } from '@nextui-org/react';
import { MouseEventHandler } from 'react';

export default function GoalButton({ handleClick, testId }: {
    handleClick: MouseEventHandler<HTMLButtonElement>,
    testId: string
}) {
    return (
        <Button
            className="flex-auto text-4xl h-20"
            color="success"
            size="md"
            onClick={handleClick}
            data-testid={testId}
        >
            GOAL
        </Button>
    );
}