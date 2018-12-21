import React from 'react'
import {View} from 'react-native'
import ListMenu from '../list_menu'

export class Home extends React.Component{

    render(){
        return(
            <View style={{marginTop:64,backgroundColor:"white",justifyContent:"center",flex:1}}>
            <ListMenu>

            </ListMenu>
            </View>
        )
    }

}
