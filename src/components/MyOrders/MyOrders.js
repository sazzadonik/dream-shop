import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import "./MyOrders.css"


const MyOrders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [order, setOrder] = useState([]);


    useEffect(() => {
        fetch(`https://fierce-ridge-34437.herokuapp.com/myOrders/${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOrder(data)
            })
    }, []);

    console.log("My Order", order)
    return (

        <div className="CheckOutTable">
            {/* <h1>CheckOut for:{productId}</h1> */}
            <h3>My Orders</h3>
            <table id="customers">
                <tr>
                    <th>Product name</th>
                    <th>Weight</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>

                {
                    order.map(product => <tr>
                        <td>{product.name}</td>
                        <td>{product.weight}</td>
                        <td>{product.quantity}</td>
                        <td>${product.price}</td>
                    </tr>)
                }
            </table>


        </div>
    );
};

export default MyOrders;