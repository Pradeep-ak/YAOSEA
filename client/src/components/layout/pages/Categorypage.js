import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCategory } from '../../../action/categoryAction'
import { updateCategory } from '../../../action/categoryAction'
import { addToBag } from '../../../action/productAction'

const PaginationPanel = (data) => {
    var currentPg = '', nextPg='', prevPg='';
    if(data.pgInfo && (data.pgInfo.previousPage || data.pgInfo.nextPage)){
        currentPg = <div style={{float:"right"}}><b>{data.pgInfo.currentPage}</b>,</div>
    }
    if(data.pgInfo && data.pgInfo.nextPage){
        nextPg = <div style={{float:"right"}}><a href={data.pgInfo.nextPageUrl} onClick={data.updatePage}><b>{data.pgInfo.nextPage}</b></a></div>
    }
    if(data.pgInfo && data.pgInfo.previousPage){
        prevPg = <div style={{float:"right"}}><a href={data.pgInfo.previousPageUrl} onClick={data.updatePage}><b>{data.pgInfo.previousPage}</b></a>,</div>
    }
return <span>{nextPg}{currentPg}{prevPg}</span>
}

const Quantity = () => {
    var optionHtml = [...Array(16).keys()].map((ele,k)=>{
        if(ele===0){
            return
        }
        return <option key={k} value={ele} >{ele}</option>
    })
    return <div style={{verticalAlign:'middle', width:'100%', textAlign:'center'}}>
        <label htmlFor="exampleFormControlSelect1" style={{textTransform: "capitalize"}}>Quantity : </label>
        <select className="form-control" id="exampleFormControlSelect1" style={{width:'50%', display:'inline'}} name="quantity">
            {optionHtml}
        </select>
    </div>
}

class Categorypage extends Component {
    constructor(){
        super()
        this.state={
            Department:'',
            CategoryName:'',
            ProductCount:0,
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
            ]
        }
        // this.onClick = this.onClick.bind(this);
        // this.selectLabel=this.selectLabel.bind(this);
        this.onUpdatePage = this.onUpdatePage.bind(this);
        this.addToBag = this.addToBag.bind(this);
    }

    // onClick(e){
    //     this.setState({'sort':e.target.value})
    //     console.log('==> '+ e.target.value)
    // }

    onUpdatePage(e){
        e.preventDefault();
        let path = e.target.parentElement.getAttribute('href');
        this.props.updateCategory(path, this.props.history);
    }

    addToBag(e){
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        var quat = data.get('quantity')
        var product = data.get('prod')
        // var sku_id = this.state['skus'][0]['id']
        this.props.addToBag(product, quat)
    }

    // selectLabel(e){
    //     console.log('==> '+ e.target.checked)
    //     this.props.updateCategory(e.target.value, this.props.history);
    // }

    componentDidMount = ()=> {
        this._asyncRequest = fetchCategory(this.props.location).then(
            externalData => {
              this._asyncRequest = null;
              console.log(externalData.data)
              this.setState(externalData.data);
            }
          );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
    }

    componentWillReceiveProps = nextProps => {
        this.setState(nextProps.cat);
    }


    render() {
        return (
            <div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-12">
                        <br />
                        <h1 style={{textTransform: "capitalize"}}>{this.state.CategoryName}</h1>
                        <br />
                    </div>
                </div>
                <div className="row" style={{paddingBottom:'5px'}}>
                    <div className="col-11 offset-1" style={{textAlign:"left"}}>
                        {this.state.ProductCount} products found.
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-12 col-md-10" style={{textAlign:"right", padding:'0'}}>
                        <ul className="list-group justify-content-center justify-content-md-left" style={{display:'flex', flexWrap:'wrap', flexDirection:'inherit'}}>
                            {this.state.Products.sort((a,b)=>a.index>b.index).map((e,i)=>{
                                return <li style={{listStyle:'none', margin:'5px', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} key={i}>
                                    {/* <a href={e.productLink} alttxt={e.Name} style={{color:'black', textDecoration: 'none'}}> */}
                                        <div className="card" style={{maxWidth:'18rem', textAlign:'justify', alignItems:'center', border:'0px',width:'18rem', height:'100%' }}>
                                            <img src={e.PrimImg.link} className="card-img-top" alt={e.PrimImg.alttxt} style={{maxWidth:'18rem' , maxHeight:'18rem', width:'150px', height:'150px' }} />
                                            <div className="card-body" style={{width:'100%'}}>
                                                <div>
                                                {e.skuImg.length > 0 &&
                                                    <ul style={{display:'flex', flexWrap:'wrap', flexDirection:'inherit'}}>
                                                        {e.skuImg.map((f,j)=>{
                                                            return <li style={{listStyle:'none', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)', padding:'5px'}} key={j}>
                                                                <img src={f.img} alt={f.alttxt}/>
                                                            </li>
                                                        })}
                                                        
                                                    </ul>
                                                }
                                                </div>
                                                <p className="card-text prod-name" style={{fontWeight:'lighter'}}>{e.Name}</p>
                                                {e.IsPirce === true && <span>
                                                    <h5 style={{textAlign:'center', fontWeight:'bolder'}}>{e.Maxprice===e.Minprice?"₹"+e.Minprice:"₹"+e.Maxprice+" - ₹"+e.Minprice}</h5>
                                                </span>
                                                }
                                                {e.IsPirce === false && <span>
                                                    <h5 style={{textAlign:'center', fontWeight:'bolder'}}>{e.Minprice}</h5>
                                                </span>
                                                }
                                                <form onSubmit={this.addToBag}>
                                                    <Quantity/><br/>
                                                    <input type='hidden' name='prod' value={e.id}/>
                                                    <input type='submit' name='Add_to_Bag' value="Add to Bag" style={{width:'100%'}}/>
                                                </form>
                                            </div>
                                        </div>
                                    {/* </a> */}
                            </li>
                            })}
                        </ul>
                    </div>
                </div>         
                <div className="row">
                    <div className="col col-11" style={{textAlign:'end'}}>
                        <PaginationPanel pgInfo={this.state.paginationInfo} updatePage={this.onUpdatePage}/>
                    </div>
                </div>
                <br/><br/><br/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {cat:state.cat};
}

export default withRouter(connect(mapStateToProps, {updateCategory, addToBag})(Categorypage));
