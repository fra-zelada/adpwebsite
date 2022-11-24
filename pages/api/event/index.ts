import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IEvent } from '../../../src/interfaces/event';
import { IScheduledEvent } from '../../../src/interfaces/scheduledEvent';
import Event from '../../../src/models/event';
import ScheduledEvent from '../../../src/models/scheduledEvent';

type Data = {
    message: string
} | any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return createScheduledEvent(req, res);
        case 'GET':
            return getScheduledEvents(req,res);
        case 'PUT':
            return updateScheduledEvent(req,res);
        default:
            return res.status(200).json({ message: 'Ruta incorrecta' })
    }

}

const createScheduledEvent = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const newScheduledEvent: IScheduledEvent = req.body ;
    
    try {
        const yearEvent =  moment( newScheduledEvent.date,'DD-MM-YYYY');
        
        
        
        const eventExists = await ScheduledEvent.find({ 
            event: newScheduledEvent.event
            , 
            date: {
                $gt: moment(newScheduledEvent.date).startOf('day').toDate(),
                $lt: moment(newScheduledEvent.date).endOf('day').toDate(),
                }
        });
        if( eventExists.length > 0)
        return res.status(409).json({ message: 'Event already exists' })

        
        const scheduledEvent = new ScheduledEvent( newScheduledEvent )
        const resp = await (await scheduledEvent.save()).populate('event')
        
        
    
        return res.status(200).json(resp)
    
    } catch (error) {
        return res.status(400).json({ message: 'Error al guardar' })
    
    }

}

const getScheduledEvents = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    
    
    try {
        const scheduledEvents = await ScheduledEvent.find().populate('event').sort('date').lean()
        // const scheduledEvents = await ScheduledEvent.find().populate('event').sort('date');
        // const scheduledEvents = await ScheduledEvent.find().populate('event').sort('date');
    
        return res.status(200).json(scheduledEvents)
    
    } catch (error) {
        return res.status(400).json({ message: 'Error al obtener eventos' })
    
    }

}

const updateScheduledEvent = async(req: NextApiRequest, res: NextApiResponse<any>) => {

  
    const { body: newScheduledEvent } = req as { body : IScheduledEvent};
    
    const scheduledEvent = await ScheduledEvent.findById( newScheduledEvent._id );
   
    if(!scheduledEvent)
    {
        return res.status(400).json( { message : 'No existe ScheduledEvent con ese Id'} )

    }
    try {
        const result = await ScheduledEvent.findByIdAndUpdate(newScheduledEvent._id, newScheduledEvent, {new: true}).populate('event');
        return res.status(200).json( result )
    
    } catch (error) {
        return res.status(400).json( { message : 'Error en el servidor'} )
    
    }
    
}