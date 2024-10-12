import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Form } from "../component/form";
import { Navigate } from "react-router-dom";
import { Signup } from "../component/signup";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 ">
			{store.user ? <Navigate to="/demo" /> : store.user== false ? <Form/> : store.user == null && <h1>Loading...</h1>}
		</div>
	);
};
