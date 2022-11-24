import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import Match from '../../../src/models/match';
import mongoose from 'mongoose';

type Data = {
    message: string
} | any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getEventMatches(req, res);
    
        default:
            return res.status(404).json({ message: 'Ruta incorrecta' })
    }

}

async function getEventMatches(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { slug } = req.query;
    if(!isValidObjectId(slug)){
        return res.status(400).json( {message: 'Invalid ID'} )
    }
    console.log(slug)
    try {
        
        const result = await Match.find( {
            event : new mongoose.Types.ObjectId(`${slug}`)
            } 
        ).populate('event')
        console.log(result)
        return res.status(200).json( result )

    } catch (error) {
        console.log('error getEventMatches')
        console.log(error)
        return res.status(404).json( {message: 'Error'} )

    }



}
