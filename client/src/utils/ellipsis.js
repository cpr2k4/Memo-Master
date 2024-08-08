export const ellipsis = (text)=>{
    if(text.length>400){
        let shortText = `${text.substring(0,400)}...`;
        return shortText;
    }
    else{
        return text;
    }
}