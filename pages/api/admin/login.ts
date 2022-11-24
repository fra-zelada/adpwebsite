import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '../../../src/interfaces/user';
import User from '../../../src/models/user';

type Data = {
    message: string
} | any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
                loginUser(req, res);
            break;
        case 'GET':
            registerExampleUser(req, res);
            break;
    
        default:
            res.status(404).json({ message: 'Not Found' })
            break;
    }
    
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    

    const {username, password} = req.body


    const userRegistred  = await User.findOne({email: username, password }) 
    
    // console.log({username, password})
    if ( userRegistred  )
    {
        return res.status(200).json( userRegistred )

    }
    else
    {
        return res.status(400).json({ message: 'Credenciales incorrectas' })
    }
    
    

}

async function registerExampleUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    try {
        
    const newUser = new User({email : 'email',
    password: 'pass',
    name: 'pass',
    avatar: '123'})

await newUser.save();
return res.status(200).json({ message: 'OK' })
    } catch (error) {
       return res.status(400).json({ message: 'error' })
    }

    
    

}
