import React from 'react'
import {View,Text,ScrollView,Image,Dimensions,TouchableWithoutFeedback,StyleSheet,
    TouchableNativeFeedvack,Animated} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import {icon} from "./constant/variable";
import {theme} from "./constant/color";
import {format_artist} from "./init/init";
import {music} from "./action";
import {mini_player_height} from "./constant/variable";

var { width, height } = Dimensions.get('window');
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import Ripple from 'react-native-material-ripple';
import {Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import { MaterialDialog } from 'react-native-material-dialog';
import StarRating from 'react-native-star-rating';
import {connect} from "react-redux";
import {isClose} from "./action";
const list = [
    {title:"Shape of You",artist:"Ed Sheeran",src:"https://prodrumloops.com/wp-content/uploads/2017/01/shape-of-me.jpg"},
    {title:"Closer ",artist:"The Chainsmokers & Halsey",src:"https://is2-ssl.mzstatic.com/image/thumb/Music71/v4/cc/82/22/cc82226c-bbc3-05fd-681f-a3b3a9c4001e/886446218915.jpg/268x0w.jpg"},
    {title:"I am a mess",artist:"Bebe Rexha",src:"https://pmcvariety.files.wordpress.com/2018/06/bebe-rexha.jpg"},
    {title:"love me like you do",artist:"Ellie Goulding",src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYLgp4TTwFWnx4ZHsax0dFh5aK5dVB5MAwNWmFhqKlwaUJidLo_g"},
    {title:"call me maybe",artist:"Carly Rae Jepsen",src:"https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Carly_Rae_Jepsen_-_Call_Me_Maybe.png/220px-Carly_Rae_Jepsen_-_Call_Me_Maybe.png"},
    {title:"perfect",artist:"Ed Sheeran",src:"https://t2.genius.com/unsafe/221x221/https%3A%2F%2Fimages.genius.com%2F76fee527d5d6bc775d4918d44ad1b929.720x720x1.jpg"},
    {title:"end game",artist:"Latest Job Opening",src:"https://66.media.tumblr.com/0e4be3c54d2a8d430f73c572dc53bda8/tumblr_p2iidwSca01wp403ho1_500.jpg"},
    {title:"solo",artist:"Latest Job Opening",src:"https://i.ytimg.com/vi/vK_hFfd2__w/maxresdefault.jpg"}
]

class ListMenu extends React.Component{
    state = {
        elevation:8,
        counterItem1: 0,
        counterItem2: 0,
        visible: false,
        content:{},
        starCount: 3.5



    }
    constructor(props){
        super(props)
        this.handleModal = this.handleModal.bind(this)
    }

    _showDialog = (res) => {
        this.setState({ visible: true,content:res });
    }

    _hideDialog = () => this.setState({ visible: false });
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    handleModal(){
        const {content}  = this.state
        return (
            <MaterialDialog
                title={content.title}
                visible={this.state.visible}
                titleColor={"gray"}
                colorAccent={theme}
                okLabel={"Download"}
                cancelLabel={"Close"}
                onOk={() => this.setState({ visible: false })}
                onCancel={() => this.setState({ visible: false })}>
                <View>
                    <View style={{flexDirection:"row"}}>
                    <View style={{width:100,height:80,opacity:0.9}}>
                        <Image style={{width:"100%",resizeMode:"cover",height:80,borderRadius:8,opacity:0.8}}
                               source={{uri:content.src}} />
                    </View>
                        <View style={{flexDirection:"column",paddingLeft:10,minWidth:280-142,justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",justifyContent:"space-around",minWidth:280-142,marginBottom:10}}>
                                <View style={{flexDirection:"column",alignItems:"center"}}>
                                    <IconAwesome
                                        style={{fontWeight:300,paddingRight:3,paddingTop:2}}
                                        name={"headphones"}
                                        color={theme}
                                        size={18}
                                    />
                                    <Text style={{fontSize:14,color:"gray",opacity:0.8,paddingTop:2}}>30</Text>
                                </View>
                                <View style={{flexDirection:"column",alignItems:"center"}}>
                                    <IconAwesome
                                        style={{fontWeight:300,paddingRight:3,paddingTop:2,opacity:0.8}}
                                        name={"arrow-circle-down"}
                                        color={theme}
                                        size={18}
                                    />
                                    <Text style={{fontSize:14,color:"gray",opacity:0.8,paddingTop:2}}>254</Text>
                                </View>



                            </View>
                            <View style={{flexDirection:"row",justifyContent:"center",minWidth:280-142}}>
                                <StarRating
                                    starSize={18}
                                    buttonStyle={{paddingHorizontal:5,opacity:0.8}}
                                    disabled={false}
                                    maxStars={5}
                                    animation={"flash"}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    fullStarColor={theme}
                                />
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            marginTop:10,
                            marginLeft:-10,
                            marginRight:-10,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            opacity:0.5
                        }}
                    />
                </View>


            </MaterialDialog>
        )
   }

    renderList(){

        return list.map((res,index)=>{
            return (
                    <View key={index} style={{backgroundColor:"white",
                        flexDirection:"row",borderRadius:8,elevation:8,width:width-24,
                        marginBottom:6,marginLeft:12,marginTop:6,
                        height:100,

                    }}>
                   <Ripple
                       onPress={()=>this.animatedPlay(res)}
                       rippleDuration={300}
                       rippleSize={width}
                       key={index} rippleColor={theme} style={{backgroundColor:"white",flexDirection:'row',
                alignItems:"center",width:"90%",borderRadius:8}}>

                <Image style={{width:60,height:60, borderRadius:60,

                    justifyContent:"flex-start",marginLeft:10}}
                       source={{uri:res.src}} />
                <View style={{padding:20,flexDirection:'column',alignItems:'flex-start',justifyContent:"center"}}>
                    <View style={{flexDirection:"row",flexWrap:"wrap",flex:1,width:"90%"}}>
                        <Text style={{fontSize:12,fontWeight:'200',color:theme}}>{res.title.toUpperCase()}</Text>
                    </View>

                    <View style={{flexDirection:"row",paddingTop:15}}>
                        <View style={{width:"55%",justifyContent:"center"}}>
                            <IconAwesome
                                style={{fontWeight:300,paddingTop:2}}
                                name={"microphone"}
                                color={theme}
                                size={12}
                            />
                            <View style={{flexDirection:"row",flexWrap:"wrap",flex:1}}>
                                <Text style={{color:"#778ca3",fontSize:11,flexWrap: 'wrap'}}>
                                    {res.artist.toLowerCase()}</Text>
                            </View>

                        </View>
                        <View style={{width:"16%",justifyContent:"center",alignItems:"center"}}>
                            <IconAwesome
                                style={{fontWeight:300,paddingTop:2}}
                                name={"headphones"}
                                color={theme}
                                size={12}
                            />
                            <Text style={{color:"#778ca3",fontSize:11}}>12 </Text>
                        </View>

                        <View style={{width:"16%",justifyContent:"center",alignItems:"center"}}>
                            <IconAwesome
                                style={{fontWeight:300,paddingTop:2}}
                                name={"arrow-circle-down"}
                                color={theme}
                                size={12}
                            />
                            <Text style={{color:"#778ca3",fontSize:11}}>125</Text>
                        </View>

                    </View>

                </View>
                   </Ripple>
                       <Ripple
                           onPressIn={()=>this._showDialog(res)}
                           rippleSize={60}
                           rippleDuration={50}
                           rippleCentered={true}
                           style={{ flex: 1, alignItems: 'center', justifyContent: 'center',borderRadius:60,width:"10%" }}>

                                       <IconAwesome
                                           style={{fontWeight:300,padding:15,paddingTop:40,paddingBottom:40}}
                                           name={"ellipsis-v"}
                                           color={theme}
                                           size={20}
                                       />
                </Ripple>



                    </View>
                )
        })
    }
    animatedPlay(content){
        const {is_close,Music} =this.props
        //alert(content.title)
        Music(content)
        Animated.parallel([
            Animated.spring(is_close.y, {
                toValue: mini_player_height,
                duration:0,
            }),
            Animated.spring(is_close.x, {
                toValue: 0,
                duration:0,
            })
        ]).start()


    }


    render(){
        return(
            <ScrollView style={{width:width,backgroundColor:"#f7f7f7",flex:1,marginTop:8}}>
                {this.renderList()}
                {this.handleModal()}
            </ScrollView>
        )
    }
}
const triggerStyles = {
    triggerText: {
        color: 'white',
    },
    triggerOuterWrapper: {
        backgroundColor: 'white',
        borderRadius:5,
        flex: 1,
    },
    triggerWrapper: {
        backgroundColor: 'white',
        padding:10,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    triggerTouchable: {
        underlayColor: theme,
        activeOpacity: 0,
        style : {
            flex: 1,
        },
    },
    TriggerTouchableComponent:TouchableNativeFeedvack
};
const mapDispatchToProps = dispatch =>{
    return {
        Music: content =>(dispatch(music(content))),
    }
}
const mapStateToProps = state =>{
    return {
        is_close:state.is_close,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListMenu)

