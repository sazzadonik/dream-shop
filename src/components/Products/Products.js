import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product';
import fakeData from '../../fakdeData.json';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import "./Products.css"

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        //setProducts(fakeData);
        fetch("https://fierce-ridge-34437.herokuapp.com/")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [products]);

    // console.log("My products", products)
    const useStyles = makeStyles((theme) => ({
        root: { flexGrow: 1, padding: "10px 50px", marginTop: "50px" }
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="circleSpinner">

                {
                    products.length === 0 ? <CircularProgress /> : ""
                }
            </div>
            <Grid container spacing={3}>
                {
                    products.map(product => <Product key={product._id} product={product} />)
                }
            </Grid>
        </div>
    );
};

export default Products;