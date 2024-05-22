import { CATEGORY_INIT_REQUEST } from './../action/'
import { CATEGORY_UPDATE_REQUEST } from './../action/'

const initState={
    sort:'Featured',
    Department:'Men',
    CategoryName:'Jeans',
    ProductCount:12,
    Dim:[
        {
            index:1,
            dimName:'Shirt Type',
            dimVal:[
                {
                    label:'Button-front shirts',
                    selected:false,
                    count:637,
                    url:'/'
                }
            ]
        }
    ],
    Products:[
        {
            index:1,
            Name:'',
            PrimImg:{
                link:'',
                alttxt:''
            },
            skuImg:[
                {
                    
                },
                
            ],
            Maxprice:0,
            Minprice:0,
            Marketinglabel:'',
            productLink:''
        }
    ],
    sortOption:[
        'Featured',
        'Arrivals',
        'Best Sellers',
        'Price L-H',
        'Price H-L',
        'Rating H-L'
    ]
}

export default function(state = initState, action){
    switch( action.type) {
        case CATEGORY_INIT_REQUEST :
            return state;
        case CATEGORY_UPDATE_REQUEST :
                return action.payload;
        default:
            return state;
    }

}