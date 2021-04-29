import { Container } from '@material-ui/core';
import React, { useContext } from 'react';
import googleIcon from "../../Images/google-icon.svg"
import "./LogIn.css";
import { firebaseConfig } from './FirebaseConfig';
import firebase from 'firebase';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



if (firebase.apps.length === 0) { firebase.initializeApp(firebaseConfig) }

const LogIn = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const provider = new firebase.auth.GoogleAuthProvider();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const handleGoogle = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const newUser = {
                    name: displayName,
                    email: email,
                    image: photoURL,
                    success: true,
                    error: "",
                }
                setLoggedInUser(newUser)
                history.replace(from)
            }).catch((error) => {
                const errorMessage = error.message;
                const newUser = {
                    error: errorMessage,
                    success: false
                }
                setLoggedInUser(newUser)
            });
    }
    console.log("LoggedInUser", loggedInUser)
    return (


        <div className="LogInGoogle">
            <h2>Login Here To Buy</h2>
            <button onClick={handleGoogle}> <img src={googleIcon} height="20px" alt="" /> <p>Continue With Google</p></button>
        </div>

    );
};

export default LogIn;