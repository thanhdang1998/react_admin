import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Menu from "../Layout/Sidebar/Menu"
import Nav from "../Layout/Topbar/Nav"

const Role = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('role/getList');
                setRoles(data);
            }
        )();
    },[])

    const del = async (id) => {
      await axios.delete(`role/delete/${id}`);
      setRoles(roles.filter((u) => u.id !== id));
    } 

    return (
        <div>
            <Nav/>
            <div className="container-fluid">
                <div className="row">
                    <Menu/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> 
                      <div className="pt-3 pb-2 mb-3 border-bottom">
                        <Link to={'/role/create_role'} className="btn btn-sm btn-outline-secondary">Add</Link>
                      </div>
                      <h2>Section title</h2>
                      <div className="table-responsive">
                        <table className="table table-striped table-sm">
                          <thead>
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                              {roles.map((role) => {
                                return (
                                   <tr key={role.id}>
                                      <td>{role.id}</td>
                                      <td>{role.name}</td>
                                      <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/role/edit_role/${role.id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        </div>
                                        <div className="btn-group mr-2">
                                            <Link to={'#'} className="btn btn-sm btn-outline-secondary" onClick={() => del(role.id)}>Delete</Link>
                                        </div>
                                      </td>
                                  </tr> 
                                )
                              })}
                          </tbody>
                        </table>
                      </div>
                      <nav>
                        <ul className="pagination">
                              <li className="page-item">
                                <Link to={'#'} className="page-link" /*onClick={prev}*/>Previous</Link>
                              </li>
                              <li className="page-item">
                                <Link to={'#'} className="page-link" /*onClick={next}*/>Next</Link>
                              </li>
                        </ul>
                      </nav>
                    </main>
                </div>
            </div>
      </div>
    )
} 
export default Role