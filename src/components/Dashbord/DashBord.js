import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import AddProduct from '../AddProduct/AddProduct';
import ManageProducts from '../ManageProducts/ManageProducts';
import "./Dashbord.css"

const DashBord = () => {
    const [manage, setmanage] = useState(false)
    const [add, setAdd] = useState(true)
    const handleManage = () => {
        setmanage(true)
        setAdd(false)
    }
    const handleAdd = () => {
        setmanage(false)
        setAdd(true)
    }
    return (
        <div className="dashBord">
            <div className="sideBar">
                <Button onClick={handleAdd} variant="contained" color="primary">Add Product</Button>
                <Button onClick={handleManage} variant="contained" color="secondary">Manage Product</Button>
            </div>

            <div className="addProdut">
                {add &&
                    <AddProduct />}
                {manage &&
                    <ManageProducts />}
            </div>


            <div className="manageProduct">

            </div>
        </div>
    );
};

export default DashBord;