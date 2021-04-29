import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import "./AddProduct.css"

const AddProduct = () => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const history = useHistory();

    const onSubmit = data => {
        const { name, weight, price } = data;
        const productDetails = {
            name: name,
            weight: weight,
            price: price,
            image: imageURL,
        }

        fetch("https://fierce-ridge-34437.herokuapp.com/addProduct", {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify(productDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert("Product Added");
                    reset();
                    history.push("/dashbord");
                }
            })
    };

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '1d971379f428b4594bab13d738cfab77');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" placeholder="Enter Product Name" ref={register({ required: true })} />
                {errors.name && <span>Name is required</span>}

                <input name="weight" placeholder="Enter product weight" ref={register({ required: true })} />
                {errors.weight && <span>Product weight is required</span>}

                <input name="price" type="number" step="0.01" placeholder="Enter Product Price" ref={register({ required: true })} />
                {errors.price && <span>Price is required</span>}

                <input type="file" name="file" onChange={handleImageUpload} ref={register({ required: true })} />
                {errors.price && <span>Image is required</span>}

                <input type="submit" name="submit" value="Save" />
            </form>
        </div>
    );
};

export default AddProduct;