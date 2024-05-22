import React from 'react';
import Utils from '../utils/utils'

export const PersonalInfoSec = (props) => {
   return (<span>
        <div className="row justify-content-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Personal Information</h5>
                <hr style={{margin:'0px'}}/>
            </div>                                            
        </div>
        <div className="row justify-content-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} >
                {props.personalInfo.fname} {props.personalInfo.lname}<br/>
                {props.personalInfo.email}<br/>
                {props.personalInfo.phoneNumber}<br/>
                <br/>                
            </div>                                                              
        </div>
    </span>);
}

export const ShippingInfoSec = (props) => {
    console.log(props.shippingAddress)
    return (<span>
        <div className="row justify-content-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Shipping Information</h5>
                <hr style={{margin:'0px'}}/>
            </div>                                                               
        </div>
        <div className="row justify-content-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                    <span>
                        {props.shippingAddress.address1}<br/>
                        {props.shippingAddress.address2}<br/>
                        {props.shippingAddress.city}<br/>
                        {props.shippingAddress.state}, {props.shippingAddress.country} - {props.shippingAddress.pincode}<br/>
                        <b>Note</b> : {props.shippingAddress.additional}
                    </span>
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>);
 }

 export const ShippingTypeSec = (props) => {
    var shippingType = (props.shippingAdd && props.shippingAdd.shippingMethods)?props.shippingAdd.shippingMethods:undefined;
    return <span>
        <div className="row justify-content-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Shipping Type</h5>
                <hr style={{margin:'0px'}}/>
            </div>                                                              
        </div>
        <div className="row justify-content-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                    <span> {(props.shippingOption.filter(e=>e.id === shippingType))[0].label} </span>
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
 }

 export const BillingSection = (props) => {
    return <span>
        <div className="row justify-content-center" >
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Billing Information</h5>
                <hr style={{margin:'0px'}}/>
            </div>                                                              
        </div>
        <div className="row justify-content-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                    <span>
                        {props.billingAdd.address1}<br/>
                        {props.billingAdd.address2}<br/>
                        {props.billingAdd.city}<br/>
                        {props.billingAdd.state}, {props.billingAdd.country} - {props.billingAdd.pincode}<br/>
                        <b>Note</b> : {props.billingAdd.additional}
                    </span>
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
}

export const PaymentSection = (props) => {
    return <span>
        <div className="row justify-content-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Payment Information</h5>
                <hr style={{margin:'0px'}}/>
            </div>                                                               
        </div>
        <div className="row justify-content-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                    <span>COD (<i>Cash on Delivery</i>)</span>
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
}

export const PriceInfoSec = (props) => {
    return (<React.Fragment>
    <div className="row justify-content-center" style={{borderBottom:'black solid 1px'}}>
        <div className="col col-lg-10" style={{textAlign:'left'}}>
            <h5>Order Information</h5>
        </div>                                                             
    </div>    
    <div className="row justify-content-center" style={{boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
        <div className="col col-lg-12" style={{textAlign:'left'}}>
            <span>
                <div style={{fontWeight:'bold'}}>
                    <div style={{minWidth:'60%', float:'left'}} >Sku</div>
                    <div style={{minWidth:'15%', float:'left'}}>Quantity</div>
                    <div style={{minWidth:'15%', textAlign:'right'}}>Price</div>
                </div>
                {props.order.ItemList.map((e, i) => {
                    return <div key={i}>
                        <div style={{minWidth:'70%', float:'left'}} >{e.sku}</div>
                        <div style={{minWidth:'10%', float:'left'}}>{e.quantity}</div>
                        <div style={{minWidth:'10%', textAlign:'right'}} >${Utils.roundToTwo(e.priceInfo.totalItemPrice)}</div>
                    </div>
                })}
                <hr style={{margin:'0px'}}/>
                <div style={{minWidth:'100%', textAlign:'right'}}>
                    Sub Total : ${Utils.roundToTwo(props.order.PriceInfo.orderSubTotal)}<br/>
                    Total Saving : ${Utils.roundToTwo(props.order.PriceInfo.orderItemSaving)}<br/>
                    Shipping : ${Utils.roundToTwo(props.order.PriceInfo.orderShippingTotal)}<br/>
                    Tax Amount : ${Utils.roundToTwo(props.order.PriceInfo.orderTaxAmount)}<br/>
                    <hr style={{margin:'0px'}}/>
                    Order Total : ${Utils.roundToTwo(props.order.PriceInfo.orderTotal)}<br/><br/>
                </div>
            </span>
        </div>
    </div> 
    </React.Fragment>);
 }

 export const OrderInfoSec = (props) => {
    return <React.Fragment>
        <div className="row justify-content-center">
            <div className="col col-11" style={{textAlign:'left', borderBottom:'black solid 1px'}}>
                <h5 style={{cursor:'pointer'}} onClick={props.handleBack}>Back</h5>
            </div>                                                                
        </div>
        <div className="row justify-content-center">
            <div className="col col-lg-5 col-10 order-2 order-lg-1">
                <PersonalInfoSec personalInfo={props.order.PersonalInfo}/><br/>
                <ShippingInfoSec shippingAddress={props.order.ShippingInfo.address}/><br/>
                {/* <ShippingTypeSec shippingAdd={props.order.ShippingInfo}/><br/> */}
                <BillingSection billingAdd={props.order.BillingInfo.address}/><br/>
                <PaymentSection/>
            </div>
            <div className="col col-lg-3 col-10 offset-lg-1 order-1">
                <PriceInfoSec order={props.order}/><br/>
            </div>
        </div>
    </React.Fragment>
 }

 export const OrderList =(data)=>{
    return (<span>
        <div className="row justify-content-center">
            <div className="col col-5" style={{textAlign:'left', borderBottom:'black solid 1px'}}>
                <h5>Orders - {data.orders.length}</h5>
            </div>
            <div className="col col-5" style={{textAlign:'right', borderBottom:'black solid 1px'}}>
                <h5 style={{cursor:'pointer'}} onClick={data.handleOrderDownload}>Download</h5>
            </div>                                                                
        </div>
        <div className="row justify-content-center">
            <div className="col col-md-9 col-11" style={{textAlign:'left'}}>
                {data.orders.map((e,i)=>{
                    return  <React.Fragment key={i}>
                        <br/>
                        <div style={{borderRadius:'15px', border:'black solid 1px', padding: '10px', cursor:'pointer'}} id={e.order_id} onClick={data.loadOrder} >
                            <div className="row justify-content-center">
                                <div className="col col-11 col-md-5" style={{textAlign:'left'}}>
                                    <span style={{wordBreak:'break-all'}}>Order Number : <b>{e.order_id}</b></span><br/>
                                    <span>Items : {e.items}</span><br/>
                                    <span>Total : ₹{Utils.roundToTwo(e.total)}</span><br/>
                                    <span>Placed On : {Utils.epochToDate(e.submitted*1000).toDateString()}</span>
                                </div>
                                <div className="col col-11 col-md-5" style={{textAlign:'left'}}>
                                    <i>{e.shippingAddress.fName} {e.shippingAddress.lName}</i><br/>
                                    <b>Address : </b>{e.shippingAddress.address1}<br/>
                                    {e.shippingAddress.address2}<br/>
                                    {e.shippingAddress.city}<br/>
                                    {e.shippingAddress.state}, {e.shippingAddress.country} - {e.shippingAddress.pincode}<br/>
                                    Phone Number : {e.shippingAddress.phoneNumber}
                                </div>                                 
                            </div>
                        </div>
                    </React.Fragment>
                })}
            </div>                                                               
        </div>
    </span>);
}
