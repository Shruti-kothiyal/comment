import axios from 'axios';
import React, { useState } from 'react'

const UserLogin=()=>{
    const localhost='http://localhost:3000/api'
    const [email,setUserEmailLogin]=useState('')
    const [otp,setUserOtpLogin]=useState('')
    const [password,setUserPasswordLogin]=useState('')

    const UserLogin=async(e)=>{
        try{
            await axios.post(localhost+'/user/login',{
                email:email,
                otp:otp,
                password:password
            })
        }catch(error){
            if(error.response){
                console.log("error----------->",error)
            }
        }
    }
    let state=1

    return(
        <div className="App">
            <h1>Login</h1>
            <label>Email
                <input placeholder='email' type="text" value={email} onChange={(e)=>
                setUserEmailLogin(e.target.value)
                }/><br/>
            </label>
            {state? (
                <p>Password
                    <input placeholder='password' type="password" value={password} onChange={(e)=>
                        setUserPasswordLogin(e.target.value)
                    }/><br/>
                </p>
            ):(
                <p>OTP
                    <input placeholder='otp' type="text" value={otp} onChange={(e)=>
                        setUserOtpLogin(e.target.value)
                    }/><br/>
                </p>
            )}
            <button onClick={UserLogin}>Login</button>
        </div>
    )

}

export default UserLogin;