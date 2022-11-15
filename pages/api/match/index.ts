import type { NextApiRequest, NextApiResponse } from 'next'
import { IMatch } from '../../../src/interfaces/match';
import Match from '../../../src/models/match';

type Data = {
    name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            createMatch(req,res);
            break;
    
        default:
            return res.status(404).json({ name: 'Not Found' })

    }

}

async function createMatch(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const newMatch: IMatch = req.body ;
    const match = new Match( newMatch )
    console.log(newMatch)
    await match.save();


    throw new Error('Function not implemented.');
}
