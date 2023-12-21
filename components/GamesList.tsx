import { Game } from '@/utils/types';

export default function GamesList({ data }: { data: Game[] }) {
    return (
        <div className='flex flex-col py-4'>
            {data.map((game) => (
                <div key={game.id} className='flex flex-row items-center text-2xl gap-2' >
                    <span className='flex-auto w-24 text-right'>{game.teamOne.name}</span>
                    <span className='flex-auto w-1 text-right'>{game.teamOneScore}</span> :
                    <span className='flex-auto w-1 text-left'>{game.teamTwoScore}</span>
                    <span className='flex-auto w-24 text-left'>{game.teamTwo.name}</span>
                </div>
            ))}
        </div>
    );
}