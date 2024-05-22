import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initalReviewLoad, submitOrder} from '../../../action/checkoutAction'
import Utils from '../../../utils/utils'
import LocalStorageService from "../../../utils/localStorageService";
import axios from 'axios'

// LocalstorageService
const localStorageService = LocalStorageService.getService();

const PaymentSection = (data) => {
    return <span>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Payment Information</h5>
                <hr/>
            </div>                                                               
        </div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                    <span>{data.paymentInfo.type}</span>
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
}

const BillingSection = (data) => {
    return <span>
        <div className="row justify-content-md-center" >
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Billing Information</h5>
                <hr/>
            </div>                                                              
        </div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                    <span dangerouslySetInnerHTML={{ __html: data.billingAdd.address.InnerHTML}} />
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
}


const ShippingTypeSection = (data) => {
    var shippingType = (data.shippingAdd && data.shippingAdd.shippingMethods)?data.shippingAdd.shippingMethods:undefined;
    
    return <span>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Shipping Type</h5>
                <hr/>
            </div>                                                              
        </div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                    <span> {(data.shippingOption.filter(e=>e.id === shippingType))[0].label} </span>
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>

}

const ShippingSection = (data) => {
    return <span>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Shipping Information</h5>
                <hr/>
            </div>                                                               
        </div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                    <span dangerouslySetInnerHTML={{ __html: data.shippingAdd.address.InnerHTML}} />
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
}

const PersonalSection = (data) => {
    return <span>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Personal Information</h5>
                <hr/>
            </div>                                            
        </div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                    <span dangerouslySetInnerHTML={{ __html: data.personalInfo.PersonalDataInnerHTML}} />
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
}

const OrderInfo = (data) => {
    return <span>
        <div className="row justify-content-center" style={{ fontWeight: 'bold' }}>
            <div className="col col-6" >Sku</div>
            <div className="col col-3" >Quantity</div>
            <div className="col col-3" >Price</div>
        </div>
        {data.order.ItemList.map((e, i) => {
            return <div className="row justify-content-center" key={i}>
                <div className="col col-6" >{e.itemInfo.name}</div>
                <div className="col col-3" >{e.quantity}</div>
                <div className="col col-3" >₹{new Utils().roundToTwo(e.priceInfo.totalItemPrice)}</div>
            </div>
        })}
        <hr />
        <div style={{ minWidth: '100%', textAlign: 'right' }}>
            Sub Total : ₹{new Utils().roundToTwo(data.order.PriceInfo.orderSubTotal)}<br />
            {/* Total Saving : ₹{new Utils().roundToTwo(data.order.PriceInfo.orderItemSaving)}<br/> */}
            Shipping : ₹{new Utils().roundToTwo(data.order.PriceInfo.orderShippingTotal)}<br />
            {/* Tax Amount : ₹{new Utils().roundToTwo(data.order.PriceInfo.orderTaxAmount)}<br/> */}
            <hr />
            Order Total : ₹{new Utils().roundToTwo(data.order.PriceInfo.orderTotal)}<br /><br />
        </div>
    </span>
}


class Reviewpage extends Component {

    constructor(props){
        super(props)
        // this.submitOrder = this.submitOrder.bind(this)
        this.pay = this.pay.bind(this)
        this.rpay = this.rpay.bind(this)
        this.ppay = this.ppay.bind(this)
        this.state =  null
    }

    rpay = ()=>{
        console.log('Pay by Razorpay.')
        const payment_amount= this.state.order.PriceInfo.orderTotal;
        // const payment_amount= 1;
        const name = this.state.order.PersonalInfo.fname+' '+this.state.order.PersonalInfo.lname
        const email = this.state.order.PersonalInfo.email
        const phoneNumber = this.state.order.PersonalInfo.phoneNumber
        const self = this;
        var access = localStorageService.getAccessToken();
        
        const options = {
          key: '<razorpay_key>',
          amount: payment_amount*100,
          name: 'Payments',
          description: 'Pay for Order :' +self.state.order.Order_id,
    
          handler(response) {
            const paymentId = response.razorpay_payment_id;
            const url = '/api/o/pay/rzp_capture/'+paymentId+'/'+payment_amount;
            // Using my server endpoints to capture the payment
            fetch(url, {
              method: 'get',
              headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Authorization": "Bearer " + access
              }
            })
            .then(resp =>  resp.json())
            .then(function (data) {
                self.props.submitOrder(self.props.history)
            })
            .catch(function (error) {            
              console.log('Request failed', error);
              alert('Error while payment processing, Please contact agent with transaction number '+response.razorpay_payment_id)
              return false
            });
          },
    
          prefill: {
            name: name,
            email: email,
            contact: phoneNumber
          },
          notes: {
            address: self.state.order.BillingInfo.address.city+' ,India - ' + self.state.order.BillingInfo.address.pincode,
            Order : self.state.order.Order_id
          },
          theme: {
            color: '#540008',
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();

    }




    ppay = async() =>{
        console.log('Pay by Paytm.')
        var request = {
            url:'/api/o/pay/generate_checksum',
            method:'post'
        }
        const response = await axios(request)
        // const trx = await response.json;
        // console.log(response)
        var details = {
            action: 'https://securegw.paytm.in/order/process',
            params: response.data
        }
        new Utils().post(details);
    }

    pay = event => {
        if(this.state.order.PaymentInfo.type && this.state.order.PaymentInfo.type==='RazorPay'){
            this.rpay()
        }
        else{
           this.ppay() 
        }

    }

// submitOrder = event => {
//     //this.props.history.push('/review')
//     this.props.submitOrder(this.props.history)
// }

    componentDidMount = () => {
        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        document.body.appendChild(script);
        
        this._asyncRequest = initalReviewLoad().then(
            externalData => {
              this._asyncRequest = null;
              if(externalData.data.REDIRECT_URL != null){
                this.props.history.push(externalData.data.REDIRECT_URL)
              } else {
                this.setState({order:externalData.data})
              }
            }
        );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.checkout.order){
            this.setState({order:nextProps.checkout.order})
        }
    }

     render() {
       return(this.state && this.state.order &&
           <div>
               <br/><br/><br/>
               <div className="row justify-content-center">
                   <div className="col col-lg-8 col-10 order-2 order-lg-1" style={{boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                        <PersonalSection personalInfo={this.state.order.PersonalInfo}/>
                        <br/>
                        <ShippingSection shippingAdd={this.state.order.ShippingInfo}/>
                        <br/>
                        {/* <ShippingTypeSection shippingAdd={this.state.order.ShippingInfo} shippingOption={this.state.order.shippingOption}/> */}
                        <br/>
                        <BillingSection  billingAdd={this.state.order.BillingInfo}/>
                        <br/>
                        <PaymentSection  paymentInfo={this.state.order.PaymentInfo}/>
                        <br/><br/>

                        {(this.state.order.review === true) && <div style={{minWidth:'60%', textAlign:'right'}}>
                                <button type="button" onClick={this.pay} className="btn-sitewide btn-bottom btn-bottom-lg" >Pay and Submit Order</button>
                            </div>}
                        <br/>
                    </div>
                    <div className="col col-lg-3 col-10 offset-lg-1 order-1">
                       <div className="row justify-content-center" style={{ borderBottom: 'black solid 1px' }}>
                            <div className="col col-lg-12" style={{textAlign:'left'}}>
                                <h5>Order Information</h5>
                            </div>                                                          
                        </div>
                        <div className="row justify-content-md-center" style={{boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                            <div className="col col-lg-12" style={{textAlign:'left'}}>
                                <OrderInfo order={this.state.order}/>
                            </div>                                                               
                        </div>
                    </div>
                </div>
                <br/><br/>
           </div>
       )
     }
}

function mapStateToProps(state){
    return {checkout:state.checkout};
  }


export default connect(mapStateToProps,{submitOrder})(withRouter(Reviewpage));
