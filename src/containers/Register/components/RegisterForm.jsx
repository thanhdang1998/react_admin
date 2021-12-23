import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom";

const RegisterForm = () => {
    const { register , handleSubmit} = useForm();
    const [redirect, setRedirect] = useState(false);
    const onSubmit = async (data) => {
        const response = await axios.post('register' ,data);
        console.log(response);
        setRedirect(true);
    }

    if(redirect === true) {
        return <Navigate to={'/login'} />
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="h3 mb-3 fw-normal">Register</h1>

            <div className="form-floating">
                <input
                    type="text"
                    className="form-control"
                    {...register('first_name', {required: true})}
                />
                <label htmlFor="floatingInput">First Name</label>
            </div>

            <div className="form-floating">
                <input 
                    type="text"
                    className="form-control"
                    {...register('last_name', {required: true})} 
                />
                <label htmlFor="floatingInput">Last Name</label>
            </div>

            <div className="form-floating">
                <input 
                    type="email"
                    className="form-control"
                    {...register('email', {required: true})} 
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating">
                <input 
                    type="password" 
                    className="form-control" 
                    {...register("password", {required: true})}
                    />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-floating">
                <input 
                    type="password" 
                    className="form-control" 
                    {...register("password_confirm", {required: true})}
                    />
                <label htmlFor="floatingPassword">Confirm Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
        </form>   
    )
}
export default RegisterForm