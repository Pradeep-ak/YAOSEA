import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import utils from '../utils/utils'
import localStoage from '../utils/localStorageService'

class Siteheader extends Component {

     constructor(){
          super()
          this.state = {}
          this.handleLogout=this.handleLogout.bind(this)
      }

     componentWillUnmount() {
          if (this._asyncRequest) {
            this._asyncRequest.cancel();
          }
        }
  
      componentWillReceiveProps = nextProps => {
          this.setState(nextProps.common);
        }
  
     componentWillMount(){
          if(utils.isloginRequried(this.props.location)
               && !localStoage.getName()){
               console.log('pushing to login page.')
               this.props.history.push('/admin/login')
          }
     }
     handleLogout = (e) => {
          localStoage.clearToken()
     }

     render() {
          var user = localStoage.getName();
          var display = utils.isloginRequried(this.props.location);
       return(
          <div>
               <div className="row" style={{background: 'black'}}>
                    <div className="col-sm" style={{maxHeight:'100%', textAlign:'right'}}>
                         {user && display && <span style={{color: 'white'}}>
                              <b>Welcome {user}</b> | <a href="/admin/login" onClick={this.handleLogout}>Logout</a>     
                         </span>}
                         {!user && <span style={{color: 'white'}}>
                              <a href="/admin/login">Login</a>     
                         </span>}
                    </div>
               </div>
          </div>
          
       )
     }
}

function mapStateToProps(state){
     return {common:state.common};
 }

export default withRouter(connect(mapStateToProps, {})(Siteheader));