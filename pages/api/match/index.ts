import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IMatch } from '../../../src/interfaces/match';
import Match from '../../../src/models/match';

type Data = {
    name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createMatch(req,res);
        case 'PUT':
            return updateMatch( req, res );
        case 'DELETE':
            return deleteMatch( req, res );
    
        default:
            return res.status(404).json({ name: 'Not Found' })

    }

}

async function createMatch(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const newMatch: IMatch = req.body ;
    
   
    try {
        const match = new Match( newMatch )
        await match.save();
    
    
        return res.status(200).json(match)
        
    } catch (error) {
        return res.status(400).json({ name: 'Error al guardar' })
        
    }

}

const updateMatch = async(req: NextApiRequest, res: NextApiResponse<any>) => {
    
    const { body: newMatch } = req as { body : IMatch};
    
        const match = await Match.findById( newMatch._id );

        if(!match)
        {
            return res.status(400).json( { message : 'No existe lucha con ese Id'} )

        }
        try {
            const result = await Match.findByIdAndUpdate(newMatch._id, newMatch, {new: true})
            return res.status(200).json( result )
            
        } catch (error) {
           
            return res.status(400).json( { message : 'Error en el servidor'} )
            
        }
    
}
    
async function deleteMatch(req: NextApiRequest, res: NextApiResponse<any>) {
    
    const { body: match } = req as { body : IMatch};
    
        const matchExists = await Match.findById( match._id );
        
        if(!matchExists)
        {
            return res.status(400).json( { message : 'No existe lucha con ese Id'} )

        }
        try {
            await Match.findByIdAndDelete(match._id)
            return res.status(204).json( { message: 'Eliminación exitosa' } )
            
        } catch (error) {
        
            return res.status(400).json( { message : 'Error en el servidor'} )
            
        }
    


}