
export const format_artist = name=>{
    if (name.length > 15){
        return name.substring(0, 15) + " ..."
    }
    return name
}
