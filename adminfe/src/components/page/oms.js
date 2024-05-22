import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

import Menubar from './../Menubar'
import AlertBar from './../Alertbar'
import {loadOrders, loadOrder} from '../../action/omsAction'
import {OrderInfoSec, OrderList} from '../orderComp'

import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
//import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';


class OMSPage extends Component {

    constructor(props){
        super(props)
        this.handleOrderLists = this.handleOrderLists.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleOrderDownload = this.handleOrderDownload.bind(this)
        this.loadOrder=this.loadOrder.bind(this)
        this.state = {
            msg:'<b>Please selet time periods, for order lists</b>',
            list:true,
            orders:[],
            order:{},
            downloadLink:''
        }
    }

    handleOrderDownload(){
        console.log('download');
        axios.get(this.state.downloadLink, {responseType: 'blob'}).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Orders.xlsx');
            document.body.appendChild(link);
            link.click();
        }).catch((error) => console.log(error));
    }

    handleBack(e){
        e.preventDefault();
        this.setState({list:true});
    }

    handleOrderLists(event) {
        // Prevent default behavior
        event.preventDefault();
        const data = new FormData(event.target);
        var dateRange = data.get('orderDate')
        this.props.loadOrders(dateRange)
    }

    loadOrder(e) {
        // Prevent default behavior
        e.preventDefault();
        // console.log(e.target.id)
        var orderId=e.currentTarget.id;
        console.log(e.currentTarget.id);
        this.props.loadOrder(orderId)
    }

    componentWillMount(){
        
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.oms);
    }


     render() {
       return(<span>            
        <Menubar/>
        <AlertBar/>
        <br/>
        <div className="row justify-content-center">
            <div className="col col-md-5 col-11" style={{paddingLeft:'0px'}}>
                <form onSubmit={this.handleOrderLists}> Order Range : 
                    <DateRangePicker initialSettings={{ startDate: new Date(), endDate: new Date() }}>
                       <input name="orderDate" className="custom-file-upload " style={{boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} width="100%"/>
                    </DateRangePicker>
                    <span className="input-group-btn" style={{paddingLeft:'10px'}}>
                        <button className="btn btn-default" type="submit" style={{borderColor:'black', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} >Go!</button>
                    </span>
                </form>
            </div>
        </div>
        <br/>
            <span dangerouslySetInnerHTML={{ __html: this.state.msg }} />
            {this.state.list && this.state.orders && this.state.orders.length > 0 && <OrderList orders={this.state.orders} loadOrder={this.loadOrder} handleOrderDownload={this.handleOrderDownload}/>}
            {(!this.state.list) && <OrderInfoSec order={this.state.order} handleBack={this.handleBack}/>}
        <br/><br/>
        </span> 
       )
     }
}

function mapStateToProps(state){
    // console.log('mapStateToProps')
    // console.log(state)
    return {oms:state.oms};
  }

export default connect(mapStateToProps,{loadOrders, loadOrder})(withRouter(OMSPage));
