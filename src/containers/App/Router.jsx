import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";
import Login from '../Login/Login';
import Register from '../Register/Register';
import User from '../User/User';
import UserForm from '../User/components/UserForm';
import Role from '../Role/Role';
import RoleForm from '../Role/components/RoleForm';

const Router = () => {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>}/>

                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/user" element={<User/>} />
                    <Route path="/user/create_user" element={<UserForm/>} />
                    <Route path="/user/edit_user/:id" element={<UserForm/>} />

                    <Route path="/role" element={<Role/>} />
                    <Route path="/role/create_role" element={<RoleForm/>} />
                    <Route path="/role/edit_role/:id" element={<RoleForm/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router;