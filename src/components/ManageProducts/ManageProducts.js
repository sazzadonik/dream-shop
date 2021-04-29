import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import "./ManageProducts.css"


const ManageProducts = () => {
    const [manageProducts, setManageProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch("https://fierce-ridge-34437.herokuapp.com/")
            .then(res => res.json())
            .then(data => setManageProducts(data))
    }, [manageProducts]);

    const handleProductDelete = (id) => {
        const productId = { id }
        fetch(`https://fierce-ridge-34437.herokuapp.com/deleteProduct`, {
            method: "DELETE",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify(productId)
        }).then(res => res.json()).then(data => {
            if (data) {
                alert("Deleted")
            }
        })
    }

    return (
        <div>
            <table id="customers">
                <tr>
                    <th>Product name</th>
                    <th>Weight</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>

                {
                    manageProducts.map(product => <tr>
                        <td>{product.name}</td>
                        <td>{product.weight}</td>
                        <td>${product.price}</td>
                        <td class="DeleteAction">  <DeleteTwoToneIcon onClick={() => handleProductDelete(product._id)} /> </td>
                    </tr>)
                }
            </table>
        </div>
    );
};

export default ManageProducts;