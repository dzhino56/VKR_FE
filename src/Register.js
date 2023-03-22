import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import MyInput from "./components/UI/input/MyInput";
import MyButton from "./components/UI/button/MyButton";
import axios from "axios";
import { getCookie, getCSRF } from "./functions/functions"

const REGISTER_URL = '/api/v1/register';
const CSRF_TOKEN_URL = '/api/v1/csrf_cookie'

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [email, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [username, setUsername] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, pwd])

    useEffect(()  => {
        getCSRF()
    }, []);

    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + REGISTER_URL,
                JSON.stringify({
                    username: username,
                    email: email,
                    password: pwd
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    withCredentials: true
                })
            if (response.status === 412) {
                setErrMsg(response.data)
            } else {
                if (response.status === 200) {
                    navigate('/login', { replace: true })
                }
            }
            setUser('')
            setPwd('')
        } catch (err) {

        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Please Sign Up</h1>
            <form onSubmit={signUp}>
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
                <label htmlFor="username">Username</label>
                <MyInput
                    type="text"
                    placeholder="Enter your username"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
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
                <MyButton>Sign Up</MyButton>
            </form>
        </section>
    )
};

export default Register;