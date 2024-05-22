import axios from 'axios'
import localStorage from '../utils/localStorageService' 

export const handleLogin = (data, history) => async dispatch => {
    await axios.post('/api/admin/a/login', data, { validateStatus: false})
    .then(async resp => {
        console.log(resp.status)
        if(resp.status === 200){
            localStorage.setToken({'access_token':resp.data.token,'name':resp.data.name});
            history.push('/admin/oms')
            return
        }else if(resp.status === 404){
            return dispatch({
                type:'ERR_ALERT',
                payload:{alertMsg:resp.data.err}
              }); 
        } else{
            return dispatch({
                type:'ERR_ALERT',
                payload:{alertMsg:'Opps..!! Something went wrong.'}
              });
        }
    }).catch(err => {
        console.log(err)
        return dispatch({
            type:'ERR_ALERT',
            payload:{alertMsg:'Opps..!! Something went wrong.'}
        });
    })
}