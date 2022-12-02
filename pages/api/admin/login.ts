import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '../../../src/interfaces/user';
import User from '../../../src/models/user';
import bcrypt from 'bcrypt'
type Data = {
    message: string
} | any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return  loginUser(req, res);
        case 'GET':
            return registerExampleUser(req, res);
    
        default:
            res.status(404).json({ message: 'Not Found' })
            break;
    }
    
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    


    const {username, password} = req.body


    const userRegistred : IUser | null = await User.findOne({email: username }) ;
    
    
    if ( userRegistred  )
    {
        const {password :registredPass = ""}  = userRegistred;
        
        if(bcrypt.compareSync(password, registredPass))

            return res.status(200).json( userRegistred )

        else {
            return res.status(400).json({ message: 'Credenciales incorrectas' })

        }

    }
    else
    {
        return res.status(400).json({ message: 'Credenciales incorrectas' })
    }
    
    

}

async function registerExampleUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    try {
        const api_key = process.env.API_KEY || '';
        if( !api_key ) return res.status(500).json({ message: 'Unauthorized' })

        const {api_key_req = ""} = req.query;
        if (api_key !== api_key_req) return res.status(500).json({ message: 'Unauthorized' })
        

        const  { email = "", password= "", name= "", avatar="" , role="user"} = req.body;


    const newUser = new User({email ,
        password: bcrypt.hashSync(password, 10),
        name,
        avatar,
        role
        })

    const user:IUser = await newUser.save();
    
    return res.status(200).json({ email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role})

    } catch (error) {
       return res.status(400).json({ message: 'error' })
    }

    
    

}
