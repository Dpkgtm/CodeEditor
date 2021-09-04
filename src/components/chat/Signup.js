import React ,{useRef, useState} from 'react'
import {Form,Button,Card,Alert} from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import {Link} from 'react-router-dom';
export default function Signup() {
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const[error,setError]=useState('');
    //using loading to prevent multiple submits
    const[loading,setLoading]=useState(false);
    //signup function from AuthContext
    const {signup}=useAuth();
  async  function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            return setError("password dont match!")
        }
        try{
//async function
            //set error and loading to '' and true while tring to signup
                setError('');
                setLoading(true);
            await signup(emailRef.current.value,passwordRef.current.value);
        } catch{
            setError("failed to signup")
        }
        setLoading(false);
    }

    return (
        <Card>
            <Card.Body>
                <h1 className="text-center mb-4">Sign Up</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email </Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>password </Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>password Confirmation </Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading}className="w-100" type="submit">sign up</Button>
                </Form>   
               <span>Already have an account?</span> <Link to="/login">Log In</Link>
            </Card.Body>
        </Card>
            
    )
}
