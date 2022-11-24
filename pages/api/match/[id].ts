import type { NextApiRequest, NextApiResponse } from 'next'
import Match from '../../../src/models/match';
import { IMatch } from '../../../src/interfaces/match';
import { isValidObjectId } from 'mongoose';

type Data = {
    name: string
} | any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            getMatchById(req, res);
            break;
        
        default:
            res.status(200).json({ name: 'Example' })
    }

}

async function getMatchById(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { id = '' } = req.query;
    
    if(!isValidObjectId(id)) {
        return res.status(404).json( { message : 'invalid id'} )

    }

    const result = await Match.findById( id
    )
    if ( result ){

    return res.status(200).json( result )
}
    else
    {
        return res.status(404).json( { message : 'not found'} )
    }

}


