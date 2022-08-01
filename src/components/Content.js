import React, { Component } from 'react';
import {db} from "./FirebaseConfig";
import { ref , onValue, set } from 'firebase/database';

export class Content extends Component{
    allProducts=[];
    state={
        categories:[],
        products:[],
        quantity:0
    };


    handleCategory=(cat)=>
    {
        if(cat==="All categories")
       { 
            this.setState({products:this.allProducts})
       }
            else
        {

            this.state.products=this.allProducts;
             const products=this.state.products.filter((product)=>
                product['category']===cat
            )
            this.setState({products:products});
        }
        

    }
    handleAdd=(pro)=>
    {
        let productid=(Math.random()*99999000).toFixed();
        let cartid=localStorage.getItem('cartid');
        if(cartid==null)
        {
            let cartid=(Math.random()*99999000).toFixed();
            const reference=ref(db,'Shoping-cart/'+cartid+'/items/'+productid);
            set(reference,{
                'product':pro,
                'quantity':Number(this.state.quantity)
            });
            localStorage.setItem('cartid',cartid);

        }
        else
        {
            //let cartid=(Math.random()*99999000).toFixed();
            const reference=ref(db,'Shoping-cart/'+cartid+'/items/'+productid);
            set(reference,{
                'product':pro,
                'quantity':Number(this.state.quantity)
            });
            //localStorage.setItem('cartid':cartid);


        }
    }
    handleSelect=(quantity)=>
    {
        this.setState({quantity:quantity});

    }
    componentDidMount(){
        this.getCategories();
        this.getProducts();
    }
    getCategories=()=>
    {
            const refer=ref(db,'category');
            onValue(refer,snapshot=>{
            let category=snapshot.val();
            this.setState({categories:category});
            console.log(this.state.categories);
            });
    
    
    }
    getProducts=()=>
    {
        const refer2=ref(db,'product');
            onValue(refer2,snapshot=>{
            let products=snapshot.val();
            this.setState({products:products});
            this.allProducts=products;
            
            console.log(this.state.products);

            });
        

    }
    render()
    {
        return(<div className='bg-dark m-3'>
            <div className='row'>
                <div className='col-3 ' >
                <ul className="list-group bg-info"  style={{ position: "sticky", top:55, zIndex:1}}>
                    <li key={1} className="list-group-item active" aria-current="true"  onClick={()=>{this.handleCategory("All categories")}}>All categories</li>
                {this.state.categories.map(category=>(<li onClick={()=>{this.handleCategory(category['categoryname'])}}  className="list-group-item" key={category['categoryname']}>{category['categoryname']}</li>))}    
                    
                </ul>

                </div>
                <div className='col-9'>
                    <div className='row' >
                     {this.state.products.map(product=>(
                        <div className='col-4'>
                        <div className="card" key={product['title']} style={{width: '18rem', marginBottom:4}}>
                        <img src={product['imageUrl']} className="card-img-top" />
                        <div className="card-body">
                        <h5 className="card-title">{product['title']}</h5>
                        <h5 className="card-text">{product['price']}</h5>
                        
                        <div className='row' >
                        <div className='col-6'>
                        <select className="form-select" aria-label="Default select example" key={product['title']} onClick={(e)=>this.handleSelect(e.target.value)} >
                        <option selected>Quantity</option>
                        <option key={1} value="1">1</option>
                        <option key={2} value="2">2</option>
                        <option key={3} value="3">3</option>
                        <option key={4} value="4">4</option>
                        <option key={5} value="5">5</option>
                        </select>
                        </div>
                        <div className='col-6'>
                        <button className="btn btn-primary" onClick={()=>{this.handleAdd(product)}}>Add to Cart</button>
                        </div>
                        </div>

                        </div>
                        </div>
                        </div>
                     ))}   
                     
                    </div>
                </div>
            </div>
        </div>);
    }
}







