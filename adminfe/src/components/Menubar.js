import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class MenuBar extends Component {
    constructor(){
        super()
        this.loadProduct=this.loadProduct.bind(this);
        this.loadOMS=this.loadOMS.bind(this);
        this.state = {
        }
    }

    loadOMS = (e) => {
        this.props.history.push('/admin/oms');
    }

    loadProduct = (e) =>{
        this.props.history.push('/admin/pms');
    }
    
    componentDidMount = ()=> {
        
    }
    
    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
      }

    componentWillReceiveProps = nextProps => {
        this.setState(nextProps.common);
      }

    render(){
        return <span>
            <div className="row justify-content-center">
                <div className="col col-10">
                    <h3>Localshop Admin Center</h3>
                </div>
            </div>
            <br/>
            <div className="row" >
                <div className="col col-6 col-md-3 offset-md-3" style={{paddingRight: '0px'}}>
                    <button style={{width:'100%'}} onClick={this.loadProduct}>Products</button>
                </div>
                <div className="col col-6 col-md-3" style={{paddingLeft:'0px'}}>
                    <button style={{width:'100%'}} onClick={this.loadOMS}>Order</button>
                </div>                
            </div>
        </span>;
    }
}

function mapStateToProps(state){
    return {
        common:state.common
    };
}

export default withRouter(connect(mapStateToProps, {})(MenuBar));
