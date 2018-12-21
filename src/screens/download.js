import React from 'react'
import {View,Text} from 'react-native'
import {Slide} from "../slider";

export class Download extends React.Component{

    render(){
        return(
            <View style={{flex:1}}>
                <Text>Artist</Text>
                <Slide/>
            </View>
        )
    }

}
