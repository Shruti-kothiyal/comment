import axios from 'axios';
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ConsumerRegistration=()=>{


    function Registration() {
      
        
      
        const onSubmit = (data) => {
          axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
          });
        };
    }




    
    const localhost='http://localhost:3000/api'
    const [consumerNameReg,setConsumerNameReg]=useState('')
    const [consumerDescReg,setConsumerDescReg]=useState('')
    const [consumerDobReg,setConsumerDobReg]=useState('')
    const [consumerPasswordReg,setConsumerPasswordReg]=useState('')
    const [consumerEmailReg,setConsumerEmailReg]=useState('')
    const [consumerUserNameReg,setConsumerUserNameReg]=useState('')
    const [consumerImageReg,setConsumerImageReg]=useState('')
    const [msg, setMsg] = useState('');

    const ConsumerRegistration=async(e)=>{
        try{
            await axios.post(localhost+'/consumer/register',{
                name:consumerNameReg,
                desc:consumerDescReg,
                dob:consumerDobReg,
                email:consumerEmailReg,
                password:consumerPasswordReg,
                username:consumerUserNameReg,
                image:consumerImageReg
            })
        }catch(error){
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }
    }


    return(
        <div className="App">
            <h1>Sign Up</h1>
            <p>Name
                <input placeholder='name' type="text" onChange={(e)=>{
                    setConsumerNameReg(e.target.value)
                }}/><br/>
            </p>
            <p>Username
                <input placeholder='username' type="text" onChange={(e)=>{
                    setConsumerUserNameReg(e.target.value)
                }}/><br/>
            </p>
            <p>Desc
                <input placeholder='description' type="text" onChange={(e)=>{
                    setConsumerDescReg(e.target.value)
                }}/><br/>
            </p>
            <p>DOB
                <input placeholder='dob' type="text" onChange={(e)=>{
                    setConsumerDobReg(e.target.value)
                }}/><br/>
            </p>
            <p>Email
                <input placeholder='email' type="text" onChange={(e)=>{
                    setConsumerEmailReg(e.target.value)
                }}/><br/>
            </p>
            <p>Password
                <input placeholder='password' type="text" onChange={(e)=>{
                    setConsumerPasswordReg(e.target.value)
                }}/><br/>
            </p>
            <p>Profile Picture
                <input type="file" onChange={(e)=>{
                    setConsumerImageReg(e.target.value)
                }}/><br/>
            </p>

            <button onClick={ConsumerRegistration}>Sign Up</button>
            <p>{msg}</p>
        </div>
    )

}

export default ConsumerRegistration;