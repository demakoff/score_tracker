import { render, screen, cleanup } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';

import { StartNewGame } from '@/components/StartNewGame';

describe('StartNewGame component', () => {
    beforeEach(() => {
        cleanup();
    });

    test('get rendered', async () => {
        render(<StartNewGame text="Test text" />);

        expect(await screen.getByRole('button')).toBeInTheDocument();
        expect(await screen.getByText('Test text')).toBeInTheDocument();
        expect(mockRouter).toMatchObject({ pathname: '/' });
    });

    test('navigates to new game route on button click', async () => {
        render(<StartNewGame text="Test text" />);

        await userEvent.click(screen.getByRole('button'));

        expect(mockRouter).toMatchObject({ pathname: '/new-game' });
    });


});

