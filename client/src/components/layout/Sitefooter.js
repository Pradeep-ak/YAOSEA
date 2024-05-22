import React, {Component} from 'react'

import Phoneicon from '../../svg/phoneicon.svg'
import Sendmailicon from '../../svg/send-mail.svg'
import CustomerServiceicon from '../../svg/customer-service.svg'
import Policyicon from '../../svg/policy.svg'
// import twittericon from '../../svg/twitter.svg'

class Sitefooter extends Component{
    render(){
        return(
            <div style={{paddingTop:'0px'}}>
               <div className="row justify-content-center" style={{background: '#666666'}}>
               <ul className="list-group list-group-horizontal max-width-xs" style={{font:'normal 10px/10px Open Sans,arial,sans-serifcc', paddingTop: '02px', paddingBottom: '02px'}}>
                    <li className="list-group-item">
                        <a href="tel:+919972687910" style={{color:'black', textDecoration: 'none'}}>
                            <img src={Phoneicon} style={{width:'20px', height:'20px'}} alt=""/>
                            <span data-automation-id="help-sectiontext-block">
                                <span style={{display:'block'}}>Give us a call </span>
                                <strong data-automation-id="help-text-0" className="_3qnsk">+919972687910</strong>
                            </span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="mailto:sendmailto@gmail.com" style={{color:'black', textDecoration: 'none'}}>
                            <img src={Sendmailicon} style={{width:'20px', height:'20px'}} alt=""/>
                            <span data-automation-id="help-sectiontext-block">
                                <strong style={{display:'block'}}>Send us an email</strong>
                            </span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="https://wa.me/919972687910?text=Hi" target="_blank" style={{color:'black', textDecoration: 'none'}}>
                            <img src={CustomerServiceicon} style={{width:'20px', height:'20px'}} alt=""/>
                            <span data-automation-id="help-sectiontext-block">
                                <span style={{display:'block'}}>Need help?</span>
                                <strong data-automation-id="help-text-0" className="_3qnsk">WhatsApp us</strong>
                            </span>
                        </a>
                    </li>
                    <li className="list-group-item">
                        
                            <img src={Policyicon} style={{width:'20px', height:'20px'}} alt=""/><br/>
                            <span data-automation-id="help-sectiontext-block">
                                <a href="/m/refund" target="_blank" style={{color:'black'}}>
                                    Return & Refund
                                </a><br/>
                                <a href="/m/tnc" target="_blank" style={{color:'black'}}>
                                    Terms & Condition
                                </a>
                            </span>
                    </li>
                    {/* <li className="list-group-item">
                        <a href="#" style={{colorpwd:'black', textDecoration: 'none'}}>
                            <img src={twittericon} style={{width:'20px', height:'20px'}} alt=""/>
                            <span data-automation-id="help-sectiontext-block">
                                <span style={{display:'block'}}>Ask us on Twitter</span>
                                <strong data-automation-id="help-text-0" className="_3qnsk">@askPKEcom</strong>
                            </span>
                        </a>
                    </li> */}
                </ul>
               </div>
          </div>
        )
    }
}

export default Sitefooter