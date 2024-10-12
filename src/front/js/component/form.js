import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Signup } from "./signup";
import {Link} from "react-router-dom"

export const Form = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	async function sendData(e){
		e.preventDefault()
		
		const response= await actions.login(email, password)
		console.log(response)
		if(response){
			navigate("/demo")
		}
		
	}
	return (
		<div>
			<form className=".w-25" onSubmit={sendData}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
					<input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
				</div>
				<button type="submit" className="btn btn-primary">Login</button>
			</form>
			<Link to="/signup" className="my-link">Signup</Link>

		</div>
	);
};
