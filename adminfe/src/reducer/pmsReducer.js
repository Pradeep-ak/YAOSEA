const initState = {
    status:'new',//new|edit|publish|list   
    products:[{}],
    product:{}
}

export default function (state = initState, action) {
    // console.log(action)
    switch(action.type) {
        case 'PMS_PUBLISH':
            return {
                status:'publish',//new|edit|publish|list   
                product:action.payload
            };
        case 'PMS_SEARCH_RESULTS':
            return {
                status:'list',//new|edit|publish|list   
                products:action.payload,
                product:{}
            };
        case 'PMS_PUBLISH_SUCCESSFULLY':
            return {
                status:'list',//new|edit|publish|list   
                product:{}
            };
        default:
            return state;
    }      
}