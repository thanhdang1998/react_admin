import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Layout/Sidebar/Menu';
import Nav from '../Layout/Topbar/Nav';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
      (
        async () => {
          const {data} = await axios.get(`user/getList?page=${page}`);
          setUsers(data.data);
          setLastPage(data.meta.last_page);
        }
      )();
    },[page]);

    const next = () => {
        if(page < lastPage) {
          setPage(page + 1);
        }
    }

    const prev = () => {
      if(page > 1) {
        setPage(page - 1);
      }
    }

    const del = async (id) => {
      await axios.delete(`user/delete/${id}`);

      setUsers(users.filter((u) => u.id !== id));
    }

    return(
      <div>
            <Nav/>
            <div className="container-fluid">
                <div className="row">
                    <Menu/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> 
                      <div className="pt-3 pb-2 mb-3 border-bottom">
                        <Link to={'/user/create_user'} className="btn btn-sm btn-outline-secondary">Add</Link>
                      </div>
                      <h2>Section title</h2>
                      <div className="table-responsive">
                        <table className="table table-striped table-sm">
                          <thead>
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Role</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                              {users.map((user) => {
                                return (
                                   <tr key={user.id}>
                                      <td>{user.id}</td>
                                      <td>{user.last_name}</td>
                                      <td>{user.email}</td>
                                      <td>{user.role?.name}</td>
                                      <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/user/edit_user/${user.id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        </div>
                                        <div className="btn-group mr-2">
                                            <Link to={'#'} className="btn btn-sm btn-outline-secondary" onClick={() => del(user.id)}>Delete</Link>
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
                                <Link to={'#'} className="page-link" onClick={prev}>Previous</Link>
                              </li>
                              <li className="page-item">
                                <Link to={'#'} className="page-link" onClick={next}>Next</Link>
                              </li>
                        </ul>
                      </nav>
                    </main>
                </div>
            </div>
      </div>
    )
}
export default Users