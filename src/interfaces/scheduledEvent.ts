import { IEvent } from './event';
export interface IScheduledEvent {
    _id?: string;
    date: string;
    event?: IEvent;
    slug: string;
}