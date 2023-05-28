import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Labels from '../Shared/Labels';
import { Link } from 'react-router-dom'
import '../Shared/Styles/Home.scss';
import { useState, useEffect } from 'react';
function NavbarComp() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		if (localStorage.getItem('isLoggedIn') === 'true') {
			setIsLoggedIn(true);
		}
	},[isLoggedIn]);

  function logoutUser() {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  }
  return (
    <Navbar bg="dark" variant="dark"  fixed="top">
      <Container>
        <Navbar.Brand >{Labels.CryptoExchange}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
				<Link className="NavBtn" to="/home">{Labels.Dashboard}</Link>
          	</Nav.Link>
            <Nav.Link>
				<Link className="NavBtn" to="/home/aboutUs">
				{Labels.AboutUs}
				</Link>
          </Nav.Link>
					 
          </Nav>
          <Nav>
            <Nav.Link>
              <Link to="/signup" className="NavBtn" onClick={logoutUser}>{isLoggedIn ? Labels.SignOut : Labels.SignUpLogin}</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;