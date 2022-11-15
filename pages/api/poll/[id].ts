import type { NextApiRequest, NextApiResponse } from 'next'
import Match from '../../../src/models/match';

type Data = {
    name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            newVote(req, res);
            break;
    
        default:
            res.status(200).json({ name: 'Example' })
    }

}

async function newVote(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { idMatch,
        oponentId } = req.body;
    const result = await Match.findOneAndUpdate( { _id:idMatch, 'oponents._id': oponentId}, 
    // {'$set': {
    //     'oponents.$.votes': 200}},
    { $inc: { 'oponents.$.votes': 1 } } 
    )
    console.log(result)

    return res.status(200).json({ name: 'Example' })

}
