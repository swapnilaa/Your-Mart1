import React, { Component } from 'react';
import { auth, db } from './FirebaseConfig';
import { ref, onValue, remove } from 'firebase/database';
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';

export class ShopingCart extends Component{

   // sum=+ this.Addition1();

   
  
   state={
            sum:0,
           products:{}
        };
            handleDelete=(pro)=>
            {
                let products={...this.state.products};
                delete products[pro];
                this.setState({products:products});
                let cartid=localStorage.getItem('cartid');
                remove(ref(db,'Shoping-cart/'+cartid+'/items/'+pro))
            };

        calSum=()=>
        {

          let y=0;
            Object.keys(this.state.products).forEach( x=>{

           y=y+this.state.products[x].product.price*this.state.products[x].quantity;
              
            })
          return y;
        }

        componentDidMount(){

    let cartid=localStorage.getItem('cartid');
    let reference=ref(db,'Shoping-cart/'+cartid+'/items');
    onValue(reference,(snapshot)=>
    {
        let items=snapshot.val();
        this.setState({products:items});
        //let Arr=Object.keys(items).filter(item=>item);
        
        //console.log(Arr);
        //console.log(this.state.products);
        //this.Addition1();
    });


}
handleCheck=()=>
{
  onAuthStateChanged(auth,(user)=>{
  if(user)
  {

  }
  else
  {
    signInWithRedirect(auth, new GoogleAuthProvider());

  }})
}
    render()
{           
        if(this.state.products===null)
        return(<div><h1>Cart is empty</h1></div>);
    
    return(<div className='container'>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nos</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Total Price</th>
              
            </tr>
          </thead>
          <tbody>
           {
           Object.keys(this.state.products).map((product,i)=>(
            
            <tr>
            
            <th scope="row">{i+1}</th>
            <td> {this.state.products[product].product.title}</td>
            <td> {this.state.products[product].product.price}</td>
            <td> {this.state.products[product].quantity}</td>
            <td>{this.state.products[product].quantity*this.state.products[product].product.price}</td>
            <td><button className='btn btn-danger ps-4 pe-4' onClick={()=>{this.handleDelete(product)}}>Delete</button></td>
          </tr>
            ))}
          </tbody>
           <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{this.calSum()}</td>
              <td><button className='btn btn-success pe-3 active' onClick={this.handleCheck}>CheckOut</button></td>
            </tr>
           </tfoot>
        </table>
        
                </div>);
        
           
          }
        }