import Menu from '../Layout/Sidebar/Menu';
import Nav from '../Layout/Topbar/Nav';
const Dashboard = () => {
    return (
        <>
            <Nav/>
            <div className="container-fluid">
                <div className="row">
                    <Menu/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> 
                        <h1>Dashboard</h1>
                    </main>
                </div>
            </div>
        </>
        
    )
}
export default Dashboard