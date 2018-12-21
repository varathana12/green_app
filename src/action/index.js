import {IS_CLOSE,MUSIC} from "../constant/action-type";

export const isClose = status =>({type:IS_CLOSE,payload:status})
export const music = content =>({type:MUSIC,payload:content})
