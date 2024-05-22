import axios from 'axios'

export const handleCreateProduct = (data, productImage) => async dispatch => {
    const formData = new FormData()
    formData.append('productImage',productImage)
    formData.append('name', data.name)
    formData.append('keywords', data.keywords)
    formData.append('desc', data.desc)
    formData.append('brand', data.brand)
    formData.append('price', data.price)
    formData.append('categories', data.categories)
    formData.append('status', data.status)
    
    await axios.post('/api/admin/p/create', formData)
    .then(async resp => {
        if(resp.status === 200){
            console.log(resp.data)
            return dispatch({
                type:'PMS_PUBLISH',
                payload:resp.data
              });
        }else if(resp.status === 404 && resp.data && resp.data.err){
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

export const handleUpdateProduct = (data, productImage) => async dispatch => {
    const formData = new FormData()
    formData.append('productImage',productImage)
    formData.append('name', data.name)
    formData.append('keywords', data.keywords)
    formData.append('desc', data.desc)
    formData.append('brand', data.brand)
    formData.append('price', data.price)
    formData.append('categories', data.categories)
    formData.append('status', data.status)
    var id = data.id
    
    await axios.put('/api/admin/p/update/'+id, formData)
    .then(async resp => {
        if(resp.status === 200){
            console.log(resp.data)
            return dispatch({
                type:'PMS_PUBLISH',
                payload:resp.data
              });
        }else if(resp.status === 404 && resp.data && resp.data.err){
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

export const handleSearch = (data) => async dispatch => {
    
    await axios.get('/api/admin/p/search', {params:{searchTerm:data}})
    .then(async resp => {
        if(resp.status === 200){
            // console.log(resp.data)
            return dispatch({
                type:'PMS_SEARCH_RESULTS',
                payload:resp.data
              });
        }else if(resp.status === 404 && resp.data && resp.data.err){
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

export const handlePublish = (data) => async dispatch => {
    await axios.post('/api/admin/p/publish', {id:data})
    .then(async resp => {
        if(resp.status === 200){
            // console.log(resp.data)
            dispatch({
                type:'PMS_PUBLISH_SUCCESSFULLY',
                payload:''
              });
            return dispatch({
                type:'INFO_ALERT',
                payload:{alertMsg:resp.data.msg}
              });
        }else if(resp.status === 404 && resp.data && resp.data.err){
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

export const fetchProductFromSite = id => {
    //console.log(path.pathname)
    return axios.get('/api/admin/p/site/product/'+id);
}

