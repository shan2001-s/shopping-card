 import React from 'react'
// Types
import { CartItemType } from '../App';

// Material Ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

 // style
 import {Body} from './item.style'
import { color } from '@mui/system';
 
 type Props = {
    item: CartItemType;
    handleAddClick: (clickedItem: CartItemType) => void;
  };
  const Item: React.FC<Props> = ({ item,handleAddClick }) => (
  
         <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', width:'100%' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '2px',
                    }}
                    image={item.image}
                    height='200'
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    <strong> {item.title}</strong>
                    </Typography>
                    <Typography>
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ml:3 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                     Price - <strong> ${item.price} </strong>
                    </Typography>
                   
                    
                  </CardActions>
                  <CardActions>
                 
                  <Button variant="contained" onClick={()=> handleAddClick (item)} fullWidth>Contained</Button>
                  </CardActions>
                </Card>

   
  
  );




 export default Item;