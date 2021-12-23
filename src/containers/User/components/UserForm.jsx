import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import Menu from "../../Layout/Sidebar/Menu"
import Nav from "../../Layout/Topbar/Nav"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
}).required();

const UserForm = () => {
    const {id} = useParams();
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('role/getList');
                setRoles(data);
                if(id !== undefined) {
                    const getUser = await axios.get(`user/getDetail/${id}`);
                    setUser(getUser.data);
                }
            }
        )()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { register, handleSubmit, reset, formState } = useForm({
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        if(user) {
            reset({
                first_name: user?.first_name,
                last_name: user?.last_name,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const onSubmit = async (data) => {
        console.log(data);
        // if(id === undefined) {
        //     await axios.post('user/create',data);
        // } else {
        //     await axios.put(`user/update/${id}`,data);
        // }
        // setRedirect(true);
    }

    if(redirect === true) {
       return <Navigate to={'/user'}/>
    }

    return (
        <>
            <Nav/>
            <div className="container-fluid">
                <div className="row">
                    <Menu/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> 
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label>First name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    //onChange={(e) => setValue('first_name', e.target.value)}
                                    {...register("first_name")} 
                                />
                                <span>{formState.errors?.first_name?.message}</span>
                            </div>

                            <div className="mb-3">
                                <label>Last name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    {...register("last_name")} 
                                />
                                <span>{formState.errors?.last_name?.message}</span>
                            </div>

                            <div className="mb-3">
                                <label>Email</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    {...register("email")} 
                                />
                            </div>

                            <div className="mb-3">
                                <label>Role</label>
                                <select 
                                    className="form-control" 
                                    {...register("role_id")}>
                                    {roles.map((role) => {
                                        return(
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <button className="bth bth-outline-secondary">Save</button>
                        </form>
                    </main>
                </div>
            </div>
        </>
    )
    
}
export default UserForm