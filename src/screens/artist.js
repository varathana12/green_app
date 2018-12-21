import React, { Component } from 'react';
import { StyleSheet, View, Text,Image } from 'react-native';
import GridView from 'react-native-super-grid';

export class Artist extends Component {
    render() {
        // Taken from https://flatuicolors.com/
        const list = [
            {title:"Shape of You",status:"Latest Job Opening",src:"https://prodrumloops.com/wp-content/uploads/2017/01/shape-of-me.jpg"},
            {title:"Closer ",status:"Latest Job Opening",src:"https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/cc/82/22/cc82226c-bbc3-05fd-681f-a3b3a9c4001e/886446218915.jpg/268x0w.jpg"},
            {title:"I am a mess",status:"Latest Job Opening",src:"https://pmcvariety.files.wordpress.com/2018/06/bebe-rexha.jpg"},
            {title:"love me like you do!",status:"Latest Job Opening",src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYLgp4TTwFWnx4ZHsax0dFh5aK5dVB5MAwNWmFhqKlwaUJidLo_g"},
            {title:"call me maybe",status:"Latest Job Opening",src:"https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Carly_Rae_Jepsen_-_Call_Me_Maybe.png/220px-Carly_Rae_Jepsen_-_Call_Me_Maybe.png"},
            {title:"perfect",status:"Latest Job Opening",src:"https://t2.genius.com/unsafe/221x221/https%3A%2F%2Fimages.genius.com%2F76fee527d5d6bc775d4918d44ad1b929.720x720x1.jpg"},
            {title:"end game",status:"Latest Job Opening",src:"https://66.media.tumblr.com/0e4be3c54d2a8d430f73c572dc53bda8/tumblr_p2iidwSca01wp403ho1_500.jpg"},
            {title:"solo",status:"Latest Job Opening",src:"https://i.ytimg.com/vi/vK_hFfd2__w/maxresdefault.jpg"}
        ]

        return (
            <GridView
                itemDimension={130}
                items={list}
                style={styles.gridView}
                renderItem={item => (
                    <View style={[styles.itemContainer, { backgroundColor: "white",elevation:8,justifyContent:"flex-start", }]}>
                        <Image style={{width:"100%",resizeMode:"cover",height:140,borderRadius:8,opacity:0.8}}
                               source={{uri:item.src}} />
                    </View>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 8,
        height: 140,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});
