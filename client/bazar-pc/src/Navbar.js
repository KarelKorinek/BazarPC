import { useState } from "react"
import { NavLink } from "react-router-dom";
import { Button, Offcanvas } from 'react-bootstrap';
import { useSession } from "./context/session";
import { deleteData } from "./utilities/fetch";
import { BASE_URL } from "./constants/GlobalConstants";

const Navbar = () => {

    const { session, setSession } = useSession();

    const handleLogout = () => {
      deleteData(`${BASE_URL}/api/user/account`)
        .finally( () => setSession({
          data: null,
          status: "unauthorized"
        }));
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const navMenu = (
        <>
            <NavLink className="nav-link text-primary" to="/bazar" onClick={handleClose} end>Hlavní stránka</NavLink>
            <>
            { session.data ?
                            <>                    
                                <NavLink className="nav-link text-primary" to="bazar/component/create"  onClick={handleClose} end>Přidat inzerát</NavLink>
                                <NavLink className="nav-link text-primary" to={`bazar/components/${session.data.id}`} onClick={handleClose} end>Moje inzeráty</NavLink> 
                                <a className="nav-link text-primary" onClick={handleLogout}>Odhlásit se</a>
                                <div className="nav-item nav-link text-primary fw-bold">
                                {session.data.email}
                                </div>
                            </>
                            : session.status === "loading" ?
                            <>
                                <div className="spinner-border spinner-border-sm" role="status"></div>
                                <span className="visually-hiden">Loading...</span>
                            </>
                            :
                            <>
                                <NavLink className="nav-link text-primary" to="bazar/user/" onClick={handleClose} end>Registrace</NavLink>
                                <NavLink className="nav-link text-primary" to="bazar/user/account" onClick={handleClose} end>Přihlásit se</NavLink>         
                            </>                           
            }
            </>       
        </>
    )

    return (
        <div className="d-flex justify-content-end top-0 end-0 m-3">
          <Button variant="primary" className="d-md-none" onClick={handleShow}>
              Menu
          </Button>
          {/* PC version navigation menu*/}
          <nav className="d-none d-md-flex gap-4 p-3 nav-underline">      
              {navMenu}
          </nav>
    
          {/* Mobile version navigation menu */}
          <div className="d-md-none top-0 end-0 m-3">
              <Offcanvas show={show} onHide={handleClose} responsive="lg" placement="end" >
                  <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menu</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                      <nav className="navbar-nav nav-underline">
                          {navMenu}
                      </nav>
                  </Offcanvas.Body>
              </Offcanvas>
          </div>
        </div>
    );
}

export default Navbar;

