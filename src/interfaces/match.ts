import { Schema } from "mongoose";

export interface IMatch {
    _id?: string;
    title: string;
    subtitle?: string;
    oponents: IOponent[],
    eventCode?: string ,
    img: string,
    votes: number

}

export interface IOponent {
    _id?: string,
    name: string,
    votes: number,
}