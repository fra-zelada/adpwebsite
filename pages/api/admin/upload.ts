import  fs  from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { UploadClient } from '@uploadcare/upload-client'
import formidable from 'formidable'

type Data = {
    message: string
} | { url: string}

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {



    switch (req.method) {
        case 'POST':
            return createImage(req, res);
    
        default:
            break;
    }

    res.status(200).json({ message: 'Example' })

}

const createImage = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
        // console.log('uploading')
        // // console.log(req.body)
        // const {file} = req.body;
        // console.log(!!file)
    try {

        return new Promise( (resolve, reject) => {
        
            const form = new formidable.IncomingForm();
            form.parse( req, async( err, fields, files) => {
                
                // console.log(err, fields, files);
    
                if( err ) {
                    return reject(err);
                }
    
                const client = new UploadClient({ publicKey: process.env.UPLOADCARE_PUBLIC || '' });
                const file = files.file as formidable.File
                const data = fs.readFileSync( file.filepath );
                
                const resp = await client.uploadFile(data, {fileName:file.originalFilename || 'file'});
                return res.status(200).json({ url: resp.cdnUrl || '' })
            })
        })


    
    
    } catch (error) {
        // console.log(error)
        return res.status(400).json({ message: 'Error al guardar' })
    
    }

}