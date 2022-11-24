import { Schema } from "mongoose";
import { IEvent } from './event';
import { IScheduledEvent } from "./scheduledEvent";

export interface IMatch {
    _id?: string;
    title: string;
    subtitle?: string;
    oponents: IOponent[],
    eventCode?: string ,
    img: string,
    votes: number
    event?: IScheduledEvent

}

export interface IOponent {
    _id?: string,
    name: string,
    votes: number,
}