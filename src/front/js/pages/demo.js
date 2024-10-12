import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Signup } from "../component/signup";


export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			{!store.user ? <Navigate to="/" /> : <>
				<h1>Hello, {store.user.email}, id: {store.user.id}</h1>
				<h2>is active: {store.user.is_active ? 'Yes' : 'No'}</h2>
			</>}
				
		</div>
	);
};
