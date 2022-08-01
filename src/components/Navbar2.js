import { onAuthStateChanged, signOut ,signInWithRedirect ,GoogleAuthProvider} from 'firebase/auth';
import { onValue, remove } from 'firebase/database';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from './FirebaseConfig';
import { db } from './FirebaseConfig';
import { ref } from 'firebase/database';
//import { onValue } from 'firebase/database';
export class Navbar2 extends Component{
    state={
            loginstatus:'',
            productCount:0
    };
        /*here we have kept loginstatus empty, here we will have true or false value \
        hamne blank isliye rakha hai kyu ki hame pta nahi ki jab pahli bar app chalu hoga to login hai ya nahi
        aur isi login status ka use hamne render ke return me b karvaya hai..
        yane login ya logout me se ek hi component hame dikhe..
        jab person login ho to status true rahe aur logout ka option dikhe aur 
        jab person logout ho to status false hoke login ka option dikhe..
        lekin ye ye login aur logout ka status hamesha componentdidmount me hoga..
        yaha onAuthstatechanged ye fuction Auth ki state dega..
        ye hamse 2 chije lega... 1. kis app ke liye chalna hai uska object yane yaha pe auth
        2. ye khud hi hame user deta hai yane agar user hua to user milega ya nahi hua to usme 
        null milega.. aur isi hisab se humne state set ki hai
        */
    componentDidMount(){
            onAuthStateChanged(auth,(user)=>
            {
                if(user)
                this.setState({loginstatus:true})
                else
                this.setState({loginstatus:false})
            })
            
            let cartid=localStorage.getItem('cartid');
            if(cartid!==null)
            {
                const reference=ref(db,'Shoping-cart/'+cartid+'/items');
                onValue(reference,(snapshot)=>{
                  const productCount=snapshot.val();
                  if(productCount!==null)
                  this.setState({productCount:Object.keys(productCount).length});
                  else
                  {
                    this.state.productCount=0;
                    this.setState({productCount:this.state.productCount});
                  }
                
                
                
                
                
                })


            }
    }
    handleLogin()
    {
        signInWithRedirect(auth,new GoogleAuthProvider());
        /* signInWithRedirect do chije lega ek to is app ka object dusra googleAuthProvider ka new object 
        google ka object is liye lagega kyu ki hum google se login karne wale hai
        soo.. jab hum login karna chahe to hume google Auth pe redirect kia jata hai aur jaise hi login hue to hum 
        hamre pahile page pe aa jate hai..
        pahle page pe aneke liye humne auth provide kia tha */
    }
    handleLogout()
    {
      
      let cartid=localStorage.getItem('cartid');
      remove(ref(db,'Shoping-cart/'+cartid));
            signOut(auth);
            /* sign out function hamse sirf ek hi object lega yane jis app ko logout karna hai uska object */
    }
   
    render()
    {
        return(
            <div style={{position:"sticky", top: 0 , zIndex:2}} >
                <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{position:"sticky"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Your Mart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link  className='btn btn-warning' to="/shopingcart">Shoping-Cart
          <span className='ms-3 badge bg-danger'>{this.state.productCount}</span></Link>
        </li>


        <li  className="nav-item">
          { !(this.state.loginstatus) && <a className="nav-link"  onClick={this.handleLogin}>Login</a>}
        </li>
        <li  className="nav-item">
          { this.state.loginstatus && <a className="nav-link" onClick={this.handleLogout}>Logout</a>}
        </li>
      </ul>
      
    </div>
  </div>
</nav>
            </div>
        );

    }
}/* 
{ !(this.state.loginstatus) && <a className="nav-link"  onClick={this.handleLogin()}>Login</a>}
        </li>
        <li  className="nav-item">
          { this.state.loginstatus && <a className="nav-link" onClick={this.handleLogout()}>Logout</a>}
        </ 
        
in do lines ka use karke hum yato login ya logout dikhaye ye decide karte hai..
        
        */