import React from 'react';
import ModalWrapper from './modalWrapper.jsx';
import { StaticRouter ,BrowserRouter, Route, Link,Redirect } from "react-router-dom";



class Login extends React.Component{



responseGoogle = () => {
   
    return(<Redirect to={'/auth/google'}>Login</Redirect>);
      }

    render(){
            let production= true;
            let redirect;
            if (production== false){
                redirect = 'http://localhost:3001/auth/google';
            }
            else{
                redirect= 'https://afternoon-lowlands-60554.herokuapp.com/auth/google';
            }
        return(
            <div >
          
            <ModalWrapper {...this.props} showOk={false} width={400}>
           <div className="googlebutton">
<a href={redirect}>Login with Google</a>
</div>
             <p>{this.props.credentialFail}</p>
           </ModalWrapper>
            
</div>
        );
    }
}

export default Login;