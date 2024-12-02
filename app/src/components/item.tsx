import { Button } from './ui/button';
import { 
    Card
} from './ui/card'

interface ItemProps {
    id: number;
    mail: string;
    date: string;
}


export function Item({ id, mail, date }: ItemProps ) {
    return (
        <Card className='flex px-8 py-4 justify-between items-center'>
            <div className='flex flex-row justify-between items-center gap-12'>
                <h1 className='text-base font-medium'>{date}</h1>
                <h1 className='text-base font-semibold'>{mail}</h1>
                <p>{id}</p>
            </div>
            <Button size='sm'>View</Button>
        </Card>
    )
}