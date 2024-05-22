const initState = {
    error:false,
    msg: ''
}

export default function (state = initState, action) {
    switch(action.type){
        case 'ERR_LOGIN':
            return action.payload;
        default:
            return state;
    }      
}