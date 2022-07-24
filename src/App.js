import React from "react";
// import CartItem from "./CartItem";
import Cart from "./Cart";
import Navbar from "./Navbar";
// import firebase from "firebase/compat/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    };
    this.db=firebase.firestore();
  }
  componentDidMount(){
    // firebase
    // .firestore()
    // .collection('products')
    // .get()
    // .then(snapshot =>{
    //   snapshot.docs.map((doc) =>{
    //    console.log(doc.data()) 

    //   });
    //   const products =snapshot.docs.map(doc =>{
    //     const data=doc.data();
    //     data['id']=doc.id;
    //    return  data;
    //   })
    //   this.setState({
    //     products,
    //     loading: false
    //   })

    // })
    // firebase
    // .firestore()
    this.db
    .collection('products')
    // .where('price','>=',999)
    // .where('title','==','mug')
    // .orderBy('price','desc')
    .onSnapshot(snapshot =>{
      // snapshot.docs.map((doc) =>{
      //  console.log(doc.data()) 

      // });
      const products =snapshot.docs.map(doc =>{
        const data=doc.data();
        data['id']=doc.id;
       return  data;
      })
      this.setState({
        products,
        loading: false
      })
  })
}
  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index] = products.indexOf((product));
    // products[index].qty += 1;
    // this.setState({
    //   products: products,
    // });
    const docRef=this.db.collection('products').doc(products[index].id);

    docRef.update({
      qty: products[index].qty+1
    })
    .then(()=>{
      console.log('updated Sucessfully');
    })
    .catch(error=>{
      console('error',error);
    })
  };
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index] = products.indexOf((product));
    if (products[index].qty == 0) {
      return;
    }
    // products[index].qty -= 1;
    // this.setState({
    //   products: products,
    // });
    const docRef=this.db.collection('products').doc(products[index].id);

    docRef.update({
      qty: products[index].qty-1
    })
    .then(()=>{
      console.log('updated Sucessfully');
    })
    .catch(error=>{
      console('error',error);
    })
  };
  handleDeleteProduct = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id != id); //{[]}
    // this.setState({
    //   products: items,
    // });
    const docRef=this.db.collection('products').doc(id);
        docRef.delete()
         .then(()=>{
          console.log('deleted sucessfully');
         })
         .catch((error)=>{
          console.log('error',error);
         })
  };
  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  };
  getCartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;
    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price;
    });
    return cartTotal;
  };
  addProduct=() =>{
    this.db
    .collection('products')
    .add({
      img:'',
      price: 100,
      qty:3,
      title:'charger'
    })
    .then((docRef)=>{
      console.log('product has been added');
      
    })
    .catch(error =>{
      console.log('error :',error);
    })
    
  }
  render() {
    const { products ,loading} = this.state;

    return (
      <div className="app">
        {/* <h1>Cart</h1> */}
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding:20,fontSize:20}}>Add a product</button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ fontSize: 20, padding: 10 }}>
          Total:{this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
