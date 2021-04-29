import React, { createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "./Product.css"
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';


export const CartContext = createContext();
const Product = (props) => {
    const product = props.product;
    const { _id, name, image, price } = product;
    const history = useHistory();
    const handleCartProduct = (productId) => {
        history.push(`/checkout/${productId}`)
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(1),
            textAlign: '',
            color: theme.palette.text.secondary,
            backgroundColor: "#272C34",
            borderRadius: "10px"
        },
    }));
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={4}>
            <Paper className={classes.paper}>
                <img className="ProductImage" src={image} alt="" srcset="" />
                <p className="TitleProduct" >{name}</p>
                <div className="SpanBlock">
                    <div><p>${price}</p></div>
                    <div> <Button onClick={() => handleCartProduct(_id)} variant="contained" color="primary">Buy Now</Button></div>
                </div>
            </Paper>
        </Grid>
    );
};

export default Product;