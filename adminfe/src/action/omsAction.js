import axios from 'axios'

export const loadOrders = (data) => async dispatch => {
    axios.get('/api/admin/o/orders', {params:{'range':data}})
    .then(async resp => {
        // console.log(resp)
        if(resp.status === 200){
            return dispatch({
                type:'OMS_ORDERS',
                payload:resp.data
            });
        }
    }).catch(err => {
        // console.log(err.response)
        if(err.response.status === 404 
            && err.response.data && err.response.data.msg){
            return dispatch({
                type:'ERR_ALERT',
                payload:{alertMsg:err.response.data.msg}
            });
        } else{
            return dispatch({
                type:'ERR_ALERT',
                payload:{alertMsg:'Opps..!! Something went wrong.'}
            });
        }
    })
}

export const loadOrder = (data) => async dispatch => {
    axios.get('/api/admin/o/order', {params:{'orderId':data}})
    .then(async resp => {
        // console.log(resp)
        if(resp.status === 200){
            return dispatch({
                type:'OMS_ORDER',
                payload:resp.data.order
            });
        }
    }).catch(err => {
        // console.log(err.response)
        if(err.response.status === 404 
            && err.response.data && err.response.data.msg){
            return dispatch({
                type:'ERR_ALERT',
                payload:{alertMsg:err.response.data.msg}
            });
        } else{
            return dispatch({
                type:'ERR_ALERT',
                payload:{alertMsg:'Opps..!! Something went wrong.'}
            });
        }
    })
}