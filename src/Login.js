import React, {useEffect, useRef, useState} from 'react';

import MyInput from "./components/UI/input/MyInput";
import MyButton from "./components/UI/button/MyButton";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { getCookie, getCSRF } from "./functions/functions"

const LOGIN_URL = '/api/v1/login';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();

    useEffect(()  => {
        getCSRF()
    }, []);

    const [email, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, pwd])

    const signIn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + LOGIN_URL,
                JSON.stringify({username: email, password: pwd}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    withCredentials: true
                })
            setUser('')
            setPwd('')
            if (response.status === 200) {
                navigate('/', { replace: true })
            }
            if (response.status === 401) {
                console.log(response.data)
                setErrMsg(response.data['error'])
            }
        } catch (err) {
            setErrMsg(err.response.data['error'])
        }


    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Please Sign In</h1>
            <form onSubmit={signIn}>
                <label htmlFor="email">Email</label>
                <MyInput
                    type="text"
                    placeholder="Enter your email"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={email}
                    required
                />
                <label htmlFor="password">Password</label>
                <MyInput
                    type="password"
                    placeholder="Enter your password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <MyButton>Sign In</MyButton>
            </form>
            <p>
                Need an Account?<br/>
                <span className="line">
                    <a href={"/register"}>Sign Up</a>
                </span>
            </p>
        </section>
    )
}

export default Login;