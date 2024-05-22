const initState = {}

export default function (state = initState, action) {
    // console.log(action)
    switch(action.type) {
        case 'OMS_ORDERS':
            return {msg:'', 
            list:true, 
            orders:action.payload.orders, 
            downloadLink:action.payload.downloadLink, 
            order:{}
        };
        case 'OMS_ORDER':
            return {msg:'', list:false, orders:state.orders, order:action.payload};
        default:
            return state;
    }      
}