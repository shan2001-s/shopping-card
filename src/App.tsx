import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { listenerCount } from 'process';


// Material Ui
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';

import Stack from '@mui/material/Stack';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LinearProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';

// Components
import Item from './Item/item'
import RightCart from './RightCart/RightCart'

// parent of Item and Cart




export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
await (await fetch('https://fakestoreapi.com/products')).json();
 
const App=() => {
  
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [cartOpen, setCartOpen] = useState(false);
   const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  if(isLoading) return <LinearProgress />
  console.log(data);

const GetTotalItems=(items:CartItemType[])=>
  items.reduce((prevItem: number, item)=> prevItem + item.amount,0)


const HandleAddClick=(clickedItem: CartItemType)=>{
  console.log(clickedItem)

  setCartItems(prev => {
    const isPrevItem=prev.find(item=> item.id == clickedItem.id)

      if(isPrevItem){
        return prev.map(
          item=> item.id == clickedItem.id
          ?{ ...item,amount: item.amount +1}
          : item
          )
      }
    return [...prev, { ...clickedItem, amount: 1 }]
  });

}
const HandleRemoveClick=(clickedItem: CartItemType)=>{
  console.log(clickedItem)

  
  setCartItems(prev =>
    prev.reduce((previous, current) => {
      if (current.id === clickedItem.id) {
        if (current.amount === 1) return previous;
        
        return [...previous, { ...current, amount: current.amount - 1 }];
      } else {
        return [...previous,current];
      }
    }, [] as CartItemType[])


  );;

}

console.log(cartItems);
console.log(GetTotalItems(cartItems))

const right="right";



  return (
    <div className="App">
      
        <Container sx={{ p:'10px' }}>
          {/* When click ShoppingIcon,  appear card. */}
      <Drawer anchor={right} open={cartOpen} onClose={() => setCartOpen(false)}>
        <RightCart
          cartItems={cartItems}
          handleAddClick={HandleAddClick}
          handleRemoveClick={HandleRemoveClick}
         
        />
      </Drawer>
    
          <div className='shopping-icon' onClick={() => setCartOpen(true)}>
    
          <Badge badgeContent={GetTotalItems(cartItems)} color="primary">
            <AddShoppingCartIcon color="action" />
          </Badge>
          </div>
          


            <Grid container spacing={3}>
            
            {data?.map(item => (
              <Grid item xs={12} sm={6} md={4}>
                <Item item={item} handleAddClick={HandleAddClick}/>
              </Grid>
            ))}
            
            
          </Grid>
  
       
        </Container>
      
    


    

  
     
      </div>
  
  );
}

export default App;
