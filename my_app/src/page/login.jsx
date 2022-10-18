import React from "react";
 import { useNavigate} from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const [name ,setName] = React.useState(null)

    const sendData = (e) => {
        e.preventDefault()
        navigate('/home' , { state: {userName: name}});
    }

    return(
        <form action="" onSubmit={(e) => sendData(e)}>
            <input onChange={(e) => setName(e.target.value)} type="text" className="" name="name" required/>
            <button type="submit" className="">submit</button>
        </form>
    )
}

export default Login