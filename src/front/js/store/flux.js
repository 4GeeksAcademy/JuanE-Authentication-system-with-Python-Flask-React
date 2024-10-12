
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			logout: () => {
				console.log('logout');
				localStorage.removeItem("token");
				setStore({ user: false });
			},
			
			login: async (email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify (
						{
							'email': email,
							'password': password
						}
					)
				};
				const response = await fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
				localStorage.removeItem("token")
				const data = await response.json()
					if(response.ok){
						localStorage.setItem("token", data.access_token);
						setStore({user: data.user})
						return true	
					}
					alert("User not found")
					return false
			},

			signup: async (email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify (
						{
							'email': email,
							'password': password
						}
					)
				};
				const response = await fetch(process.env.BACKEND_URL + "/api/signup", requestOptions)
				const data = await response.json()
					
					if(response.ok){
						setStore({user: data.user})
						return true	
					}else{
						data.user == data.user
						alert("Try another user")
						return false
					}
			},

			private: async() => {
				const response = await fetch(process.env.BACKEND_URL + "/api/private", {
					headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
				})
				const data = await response.json()
				if (response.ok){
					setStore({user: data.user})
					return true
				}
					setStore({user: false})
					return false
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
