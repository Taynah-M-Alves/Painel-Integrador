import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarMenu() {

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">PAINEL</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">VerProjetos</Nav.Link>
            <Nav.Link href="/VerTarefas">VerTarefas</Nav.Link>
            <Nav.Link href='/CriarTarefa'>CriarTarefa</Nav.Link>
            <Nav.Link href='/ProfessorPage'>Pagina do Professor</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarMenu;