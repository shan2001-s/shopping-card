
import { CartItemType } from '../App';
import Item from '../Item/item';
import './RightCart.css'
import { useState } from 'react';

// material Ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';


type Props = {
  cartItems: CartItemType[];
  handleAddClick: (clickedItem: CartItemType) => void;
  handleRemoveClick: (clickedItem: CartItemType) => void;

};

const RightCart: React.FC<Props> = ({ cartItems , handleAddClick, handleRemoveClick }) => {

  const getTotalPrice = (items: CartItemType[]) =>
    items.reduce((previtem: number, item) => previtem + item.amount * item.price, 0)

   

    const [isDesktop, setDesktop] = useState(window.innerWidth >= 768);
  



  return (
    <div className=    {isDesktop ? (
      'CartLargeBody'
    ) : (
      'CartMediumBody'
    )} >
     
      <Container >
 
      <h2>Your Shopping Cart</h2>

      <p>All Total Price : ${getTotalPrice(cartItems)} </p>

      {cartItems.map(item => (
        <Box
          sx={{
            mt: 2,

          }}
        >
          <Card sx={{ minWidth: 275 }} >

            <CardContent>
              <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                {item.title}<Stack alignItems="start" >
      <Stack  spacing={1}>
        <Chip label={" $ "+item.price} color="primary" variant="outlined" />
        
      </Stack>
      
     </Stack>
              </Typography>
              {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
              <Grid sx={{ flexGrow: 1 }} container spacing={5}>
                <Grid item xs={5}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100, height: 150 }}
                    image={item.image}
                    alt="Live from space album cover"
                  />
                </Grid>
                <Grid item xs={7}  >



                  <div style={{ display: 'inline-flex', justifyContent: 'space-around', marginRight: '2px' }}>
                    <div>
                      <Button onClick={()=> handleAddClick (item)}  sx={{ mr: 1, mb: -5, }} style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} variant="contained" color="success" size="small">
                        +
                      </Button>
                    </div>
                    <div>
                      <TextField
                        sx={{ width: 50 }}
                        inputProps={{ min: 0, style: { textAlign: 'center' } }}

                        label="Amount"
                        variant="standard"
                        color="success"
                        value={item.amount }
                        focused
                      />
                    </div>
                    <div >
                      <Button onClick={()=> handleRemoveClick (item)} sx={{ ml: 3, mb: -5 }} style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} variant="contained" color="success" size="small">
                        -
                      </Button>
                    </div>
                    
                  </div>
                  <Stack alignItems="center" >
      
      <Stack  spacing={1} sx={{mt: 3}}>
       
        <Chip label={"Total Price : $ "+item.price * item.amount} sx={{p:2 ,}} color='secondary'  />
      </Stack>
     </Stack>



                </Grid>

              </Grid>

              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography> */}


            </CardContent>

            <CardActions>
             

            </CardActions>
            
          </Card>
 
        </Box>
      ))}

      
      <Button variant="contained" >
      All Total Price: $ {getTotalPrice(cartItems)} 
      </Button>
      </Container>

    </div>
  );
};

export default RightCart;
