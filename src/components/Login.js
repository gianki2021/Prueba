import { useState } from 'react';
import {
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  Container,
  Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState(false);

  const [isLoading, setLoading] = useState(false);

  //display errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateFields = () => {
    let valid = true;

    //validate email address
    const userEmail = localStorage.getItem('email');
    if (email !== userEmail) {
      setEmailError('Invalid Email address');
      valid = false;
    }

    //validate password
    const userPassword = localStorage.getItem('password');
    if (password !== userPassword) {
      setPasswordError('Invalid Password');
      valid = false;
    }

    return valid;
  };

  const login = async () => {
    setLoading(true);
    setEmailError(undefined);
    setPasswordError(undefined);

    setLoading(false);

    const isValid = validateFields();
    if (!isValid) {
      return;
    }
  };

  return (
    <Container className="d-flex min-vh-100 flex-column justify-content-center">
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <div className="card shadow-sm p-4 mx-auto rounded">
            <p className="h1 font-weight-bold">Login</p>
            <Form>
              <Form.Group className="mb-3">
                <label htmlFor="email" className="mb-1">
                  Email:
                </label>
                <InputGroup>
                  <Form.Control
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
                {emailError && (
                  <p className="fw-medium fs-6 text-danger">{emailError}</p>
                )}
                <label htmlFor="password" className="mb-1">
                  Password:
                </label>
                <InputGroup>
                  <Form.Control
                    type={displayPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputGroup.Text
                    style={{ cursor: 'pointer' }}
                    className="bg-zinc-100 d-flex align-items-center justify-content-center px-3 rounded-r-md border border-left-0 rounded-end"
                    onClick={(e) => {
                      e.preventDefault();
                      setDisplayPassword(!displayPassword);
                    }}
                  >
                    {displayPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="black"
                        style={{ width: '20px', height: '20px' }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        style={{ width: '20px', height: '20px' }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </InputGroup.Text>
                </InputGroup>
                {passwordError && (
                  <p className="fw-medium fs-6 text-danger">{passwordError}</p>
                )}
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button variant="primary" className="btn-lg" onClick={login}>
                  {isLoading ? <Spinner animation="border" /> : 'Sign in'}
                </Button>
              </div>
            </Form>
            <p className="mt-3">
              You do not have an account?{' '}
              <Link to="/signup" className="text-primary font-weight-bold">
                Sign up
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
