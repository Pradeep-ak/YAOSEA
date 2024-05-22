import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadCartPage, updateCart, removeCartItem } from '../../../action/commonAction'
import Utils from '../../../utils/utils'


const PriceInfo = (data) => {
    return <div style={{verticalAlign:'top'}}>
        <span>
            ₹{new Utils().roundToTwo(data.priceInfo.eachItemPrice)} Each<br/>
            Total Amount: ₹{new Utils().roundToTwo(data.priceInfo.totalItemPrice)}<br/>
            {data.priceInfo.totalSaving===0?'':'Saving : ₹'+ new Utils().roundToTwo(data.priceInfo.totalSaving)}<br/>
            <b style={{color:'red'}}>{data.priceInfo.priceType==='ORIGINAL'?'':data.priceInfo.priceType}</b>
        </span>
    </div>
}

const Quantity = (data) => {
    var optionHtml = [...Array(16).keys()].map((ele,k)=>{
        if(ele===0){
            return
        }
        return <option key={k} value={ele}>{ele}</option>
    })
    return <div style={{verticalAlign:'middle'}}>
        {/* <label htmlFor="exampleFormControlSelect1" style={{textTransform: "capitalize"}}>Quantity : </label> */}
        <select className="form-control" id="exampleFormControlSelect1" style={{width:'50%', display:'inline'}} name={data.id} onChange={data.onselect} value={data.quantity}>
            {optionHtml}
        </select>
        <div style={{textAlign:'right', display:'inline', paddingLeft:'5px'}}>
            <input type="button" value="X" name={data.id} onClick={data.removeItem} className="btn-sitewide" />
        </div>
    </div>
}


class Cartpage extends Component {

    constructor(props){
        super(props)
        this.updateCart = this.updateCart.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.loadCheckout = this.loadCheckout.bind(this)
        // this.openProductPage = this.openProductPage.bind(this)
        this.state = {            
        }
    }

    // openProductPage = (e) => {
    //     var sku = e.currentTarget.itemNumber
    //     console.log(sku)
    //     if(sku && sku.length === 11){
    //         var product = sku.match(/(.{1,7})/g);
    //         console.log(product)
    //         this.props.history.push('/p/cart?id=' + product[0])
    //     }
    // }

    loadCheckout = (e) => {
        this.props.history.push('/checkout')
    }

    removeItem = (e) => {
        this.props.removeCartItem(e.target.name)
    }
    
    updateCart = (e) => {
        var skuUpdated = e.target.name
        var updatedQuantity = e.target.value
        this.props.updateCart(skuUpdated, updatedQuantity)
    }

    componentDidMount = ()=> {
        this._asyncRequest = loadCartPage(this.props.location).then(
            externalData => {
                this._asyncRequest = null;
                this.setState(externalData.data);
            }
        );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.common.type === 'cart_details'){
            this.setState(nextProps.common.cart);
        }
    }

     render() {
        var isCartEmpty = Object.keys(this.state).length > 0 && this.state.ItemList && this.state.ItemList.length > 0;
        //console.log('isCartEmpty = ' + isCartEmpty)
       return(
           <div><br/><br/><br/>
                {isCartEmpty === false && <div>
                    <br/><br/>
                    <h3>Your Cart is Empty, Please continue Shopping <a href="/">Here</a></h3>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>}
                {isCartEmpty === true && <div className="row justify-content-center">
                        <ul className="list-unstyled col col-sm-10 col-12">
                            {this.state.ItemList.map((e, i)=>{
                                return <div className="row justify-content-center" style={{paddingBottom:'1%'}} key={i}>
                                    <div className="col col-sm-3 col-12">
                                        <img src={'/prdimg/'+e.itemInfo.productImage} alt={e.sku} style={{maxWidth:'18rem' , maxHeight:'18rem', width:'150px', height:'150px' }}/>
                                    </div>
                                    {/* <div className="media-body" style={{textAlign:'justify'}}> */}
                                        <div className="col col-sm-3 col-12 cart-labels-sm cart-labels-xs" style={{verticalAlign:'middle'}}>
                                            <span itemNumber={e.sku}><h5>{e.itemInfo.name}</h5></span>
                                                {e.itemInfo.attributes && e.itemInfo.attributes.map((y, key) => {
                                                return <span key={key}>
                                                    <span><b>{y.name}</b> : {y.value}</span><br/>
                                                </span>
                                                })}
                                        </div>
                                        <div className="col col-sm-3 col-10 order-2 order-sm-1">
                                            <Quantity quantity={e.quantity} id={e.sku} onselect={this.updateCart} removeItem={this.removeItem}/> 
                                        </div>
                                        <div className="col col-sm-3 col-10 order-1 order-sm-2">
                                            <PriceInfo priceInfo={e.priceInfo}/>
                                        </div>
                                    {/* </div> */}
                                    <hr/>
                                </div>
                            })}
                            <hr/>
                            {/* <li className="media" style={{padding: '1px'}}> */}
                            <div className="row justify-content-center">
                                <div className="col col-12 col-sm-4 offset-sm-9">
                                    Sub Total : ₹{new Utils().roundToTwo(this.state.PriceInfo.orderSubTotal)}<br/>
                                    {/* Total Saving : ₹{new Utils().roundToTwo(this.state.PriceInfo.orderItemSaving)}<br/> */}
                                    Order Total : ₹{new Utils().roundToTwo(this.state.PriceInfo.orderSubTotal)}<br/>
                                    <hr/>
                                </div>
                            </div>
                            {/* </li> */}
                            <li className="media" style={{padding: '1px'}}>
                                <div className="media-body" style={{textAlign:'justify'}}>
                                    <div style={{display:'inline-block', verticalAlign:'middle', float:'right', minWidth:'300px'}}>
                                        <input type="button" value="Checkout" 
                                        style={{backgroundColor: '#29b363', width: '70%', height: '40px', border: 'black solid 0.5px', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}
                                        onClick={this.loadCheckout}/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <br/><br/><br/><br/><br/><br/>
                    </div>}
           </div>
       )
    }
}

function mapStateToProps(state){
    return {common:state.common};
}

export default connect(mapStateToProps,{updateCart, removeCartItem})(withRouter(Cartpage));
