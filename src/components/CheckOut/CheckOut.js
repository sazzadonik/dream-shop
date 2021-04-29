import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';
import "./CheckOut.css"




const CheckOut = () => {
    const [cart, setCart] = useState([]);
    const { productId } = useParams()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let total = 0;
    const history = useHistory();
    useEffect(() => {
        const userInfo = {
            id: productId,
            user: loggedInUser.email
        }

        fetch(`https://fierce-ridge-34437.herokuapp.com/addToCart`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert("Product Add To Cart")
                };
            })
    }, [productId]);

    useEffect(() => {
        fetch(`https://fierce-ridge-34437.herokuapp.com/myCart/${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCart(data)
            })
    }, [productId]);


    cart.forEach(element => {
        total = total + +element.price;
    })


    const handleOrder = () => {
        const user = loggedInUser.email;
        fetch(`https://fierce-ridge-34437.herokuapp.com/placeOrder`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({ user })
        }).then(res => res.json()).then(data => {
            if (data) {
                history.push("/myOrders")
            }
        })
    }

    return (
        <div className="CheckOutTable">
            {/* <h1>CheckOut for:{productId}</h1> */}
            <h3>My cart</h3>
            <table id="customers">
                <tr>
                    <th>Product name</th>
                    <th>Weight</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>

                {
                    cart.map(product => <tr>
                        <td>{product.name}</td>
                        <td>{product.weight}</td>
                        <td>{product.quantity}</td>
                        <td>${product.price}</td>
                    </tr>)
                }
                <tr>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td>{total}</td>
                </tr>
            </table>

            <Button variant="contained" onClick={handleOrder} color="secondary">Check Out</Button>
        </div>

    );
};

export default CheckOut;