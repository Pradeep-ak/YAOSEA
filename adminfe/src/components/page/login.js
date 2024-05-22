import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {handleLogin} from '../../action/loginAction'
import AlertBar from '../Alertbar'

class Loginpage extends Component {

    constructor(props){
        super(props)
        this.state = {}
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin(e){
        // Prevent default behavior
        e.preventDefault();
        console.log('handleLogin')
        const data = new FormData(e.target);
        // Access FormData fields with `data.get(fieldName)`
        var username=data.get('username');
        var password=data.get('password');
        this.props.handleLogin({"username":username,"password":password},this.props.history)
    }

    componentWillMount(){
        console.log('componentWillMount')
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps')
        this.setState(nextProps.login);
    }

    render() {
       return(
           <span>
               <br/><br/>
               <div className="row justify-content-center">
                    <div className="col col-10">
                        <h3>Admin Center</h3>
                    </div>
               </div>
               <br/><br/>
               <div className="row justify-content-center">
                   <div className="col col-md-4 col-11">
                       <div className="row">
                           <div className="col col-12" style={{background:'#28B463'}}><b>Login</b></div>
                       </div>
                       <div className="row">
                       <div className="col col-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                       <AlertBar/>
                        <br/>
                        <form onSubmit={this.handleLogin}>
                            <input type="text" name="username" placeholder="User Name" style={{minWidth:'90%'}} required maxLength='20'/><br/><br/>
                            <input type="password" name="password" placeholder="Password" style={{minWidth:'90%'}} required maxLength='10'/><br/><br/>
                            <div style={{minWidth:'50%', textAlign:'left'}}>
                                <input type="submit" name="Login" value="Login" style={{width:'90%'}}/>
                            </div>
                        </form>
                        <br/>
                    </div>
                       </div>
                   </div>
               </div>
               <br/><br/>
               <br/><br/><br/><br/>
               <br/><br/><br/>
            </span>               
       )
     }
}

function mapStateToProps(state){
    return {login:state.login};
  }

export default connect(mapStateToProps,{handleLogin})(withRouter(Loginpage));
