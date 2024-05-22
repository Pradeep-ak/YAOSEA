import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

import Menubar from './../Menubar'
import AlertBar from './../Alertbar'
import {handleCreateProduct, handleSearch, handleUpdateProduct, handlePublish, fetchProductFromSite} from '../../action/pmsAction'
import {ProductForm, ProductList, ProductPublish, ProductEdit} from '../productComp'

class pmspage extends Component {

    constructor(props){
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleProductCreate=this.handleProductCreate.bind(this)
        this.handleNewFrom=this.handleNewFrom.bind(this)
        this.handleUpdateProduct=this.handleUpdateProduct.bind(this)
        this.handleProductEdit = this.handleProductEdit.bind(this)
        this.handlePublish=this.handlePublish.bind(this)
        this.handleDownload=this.handleDownload.bind(this)
        this.onChange = this.onChange.bind(this);
        this.state = {
            status:'list',//new|edit|publish|list|none   
            products:[],
            product:{},
            siteProduct:{},
            searchTerm:''
        }
    }

    onChange(e) {
        this.setState({ [e.target.name] : e.target.value});
    }    

    handleDownload(){
        console.log('Download')
        axios.get('/api/admin/p/download/'+this.state.searchTerm, {responseType: 'blob'}).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Products.xlsx');
            document.body.appendChild(link);
            link.click();
        }).catch((error) => console.log(error));
    }

    handleUpdateProduct(event){

        // Prevent default behavior
        event.preventDefault();
        const data = new FormData(event.target);
        // Access FormData fields with `data.get(fieldName)`
        // data.forEach(e=>{
        //     console.log(e)
        // })
        this.props.handleUpdateProduct({
            'name':data.get('name'),
            'keywords':data.get('keywords'),
            'desc':data.get('desc'),
            'brand':data.get('brand'),
            'price': data.get('price'),
            'categories':data.get('categories'),
            'status':data.get('status'),
            'id':data.get('id')     
        }, data.get('upload'));

    }

    handleProductCreate(event){
        // Prevent default behavior
        event.preventDefault();
        const data = new FormData(event.target);
        // Access FormData fields with `data.get(fieldName)`
        // data.forEach(e=>{
        //     console.log(e)
        // })
        this.props.handleCreateProduct({
            'name':data.get('name'),
            'keywords':data.get('keywords'),
            'desc':data.get('desc'),
            'brand':data.get('brand'),
            'price': data.get('price'),
            'categories':data.get('categories'),
            'status':data.get('status')
        }, data.get('upload'));
    }

    handleSearch(event) {
        // Prevent default behavior
        event.preventDefault();
        const data = new FormData(event.target);
        // Access FormData fields with `data.get(fieldName)`
        console.log(data.get('searchTerm'))        
        this.props.handleSearch(data.get('searchTerm'))
    }

    handlePublish(e){
        // Prevent default behavior
        e.preventDefault();
        const data = new FormData(e.target);
        this.props.handlePublish(data.get('id'))
    }

    handleNewFrom(e){
        // Prevent default behavior
        e.preventDefault();
        this.setState({
            status:'new',//none|new|edit|publish|list
        });
    }

    handleProductEdit(e){
        e.preventDefault();
        var productId=e.currentTarget.id;
        var product = this.state.products.filter(i => ((i.Id+'')===productId));
        console.log(product)
        this.setState({
            status:'edit',//none|new|edit|publish|list
            product:product[0]
        });
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.pms.status==='publish'){
            fetchProductFromSite(nextProps.pms.product.Id).then(
                externalData => {
                  console.log(externalData.data)
                  this.setState({'siteProduct':externalData.data});
                }
              );
        }
        this.setState(nextProps.pms);
    }

     render() {
       return(
        <span>            
            <Menubar/>
            <br/>
            <div className="row justify-content-center">
                <div className="col col-md-5 col-9" style={{paddingLeft:'0px'}}>
                    <form onSubmit={this.handleSearch}>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for..."  name="searchTerm"
                            value={this.state.searchTerm} onChange={this.onChange} required maxLength='50'/>
                            <span className="input-group-btn" style={{paddingLeft:'10px'}}>
                                <button className="btn btn-default" type="submit" style={{borderColor:'black', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} >Go!</button>
                            </span>
                        </div>
                    </form>
                </div>
                <div className="col col-1" style={{paddingLeft:'0px'}}>
                    <form onSubmit={this.handleNewFrom}>
                        <button className="btn btn-default" type="submit" style={{borderColor:'black',boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>New</button>
                    </form>
                </div>
            </div>
            <AlertBar/>
            <br/>
            {this.state.status==='new' && <ProductForm handleCreate={this.handleProductCreate}/>}
            {this.state.status==='list' && <ProductList products={this.state.products} handleProductEdit={this.handleProductEdit} handleDownload={this.handleDownload}/>}
            {this.state.status==='publish' && <ProductPublish product={this.state.product} siteProduct={this.state.siteProduct} handlePublish={this.handlePublish} />}
            {this.state.status==='edit' && <ProductEdit product={this.state.product} handleUpdateProduct={this.handleUpdateProduct}/>}
            <br/><br/>
        </span>               
       )
     }
}

function mapStateToProps(state){
    return {pms:state.pms};
  }

export default connect(mapStateToProps,{handleCreateProduct, handleSearch, handleUpdateProduct, handlePublish, fetchProductFromSite})(withRouter(pmspage));
