const initState = {
    display:true,
    type:'Info',
    alertMsg:''
}
export default function alertReducer (state = initState, action) {
    switch(action.type){
        case 'INFO_ALERT':
            return {
                display:true,
                type:'Info',
                alertMsg:action.payload.alertMsg
            };
        case 'ERR_ALERT':
            return {
                display:true,
                type:'Error',
                alertMsg:action.payload.alertMsg
            }
        case 'REMOVE_ALERT':
            return {
                display:false,
                type:'Info',
                alertMsg:action.payload.alertMsg
            }
        default:
            return state;
    }      
}