
import {IS_CLOSE,MUSIC} from "../constant/action-type";
import {Animated} from 'react-native'
import {mini_player_height} from "../constant/variable";
import {width} from "../constant/variable";

const initialState = {
    is_close: new Animated.ValueXY({x:-width,y:mini_player_height}),
    music_content: {}
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type){
        case MUSIC:
            return {...state, music_content:action.payload}
        default:
            return state
    }
}

export default rootReducer
