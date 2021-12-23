import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { User } from "../../../models/user"

const Nav = () => {
    const [user, setUser] = useState(new User());
    useEffect(() => {
        (
            async () => {
                const response = await axios.get('user');
                setUser(new User(
                    response.data.id,
                    response.data.first_name,
                    response.data.last_name,
                    response.data.email,
                    response.data.role,
                ));
            }
        )(); 
    }, [])

    const Logout = async () => {
        await axios.post('logout', {});
    }
    
    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/aaa">Company name</a>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <a className="p-2 text-white text-decoration-none" href="/">{user.name}</a>
                    <Link to="/login" className="p-2 text-white text-decoration-none" onClick={Logout}>Sign out</Link>
                </div>
            </div>
        </header>
    )
}
export default Nav