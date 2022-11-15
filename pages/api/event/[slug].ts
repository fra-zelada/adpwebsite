import type { NextApiRequest, NextApiResponse } from 'next'
import Match from '../../../src/models/match';

type Data = {
    name: string
} | any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            getEvents(req, res);
            break;
    
        default:
            res.status(200).json({ name: 'Example' })
    }

}

async function getEvents(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { slug } = req.query;
    console.log({slug})
    const result = await Match.find( {
        eventCode : slug
    } 
    )


    return res.status(200).json( result )

}
