import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import Menu from "../../Layout/Sidebar/Menu"
import Nav from "../../Layout/Topbar/Nav"
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const schema = yup.object({
    name: yup.string().required(),
}).required();

const RoleForm = () => {
    let {id} = useParams();
    const [permissions, setPermissions] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [selected, setSelected] = useState([]);
    const [role, setRole] = useState([]);
    const { register , handleSubmit, formState, reset} = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('permission/getList');
                setPermissions(data);
                if(id !== undefined) {
                    const getRole = await axios.get(`role/getDetail/${id}`);
                    setRole(getRole.data);
                    setSelected(getRole.data.permission.map((p) => p.id))
                }
            }
        )()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if(role) {
            reset({
                name: role?.name,
                permissions: role?.permission?.id
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[role])

    const onSubmit = async (data) => {
        if(id === undefined) {
            await axios.post('role/create',data);
        } else {
            await axios.put(`role/update/${id}`,data);
        }
        setRedirect(false);
    }

    if(redirect === true) {
        return <Navigate to={'/role'}/>
    }

    console.log(role);
    console.log(selected);
    console.log(selected.some(s => s === 5));

    return (
        <>
            <Nav/>
            <div className="container-fluid">
                <div className="row">
                    <Menu/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> 
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-3">
                                <label>Role</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    {...register("name")} 
                                />
                                <span>{formState.errors?.name?.message}</span>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label">Permissions</label>
                                <div className="col-sm-10">
                                    {permissions.map((permission) => {
                                        return (
                                            <div className="form-check form-check-inline col-3" key={permission.id}>
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox"
                                                    // eslint-disable-next-line array-callback-return
                                                    checked={selected.map(s => {
                                                        if(s === permission.id) {
                                                            return "checked";
                                                        }
                                                    })}
                                                    value={permission.id}
                                                    {...register("permissions")}
                                                />
                                                {permission.name}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <button className="bth bth-outline-secondary">Save</button>
                        </form>
                    </main>
                </div>
            </div>
        </>
    )
}
export default RoleForm