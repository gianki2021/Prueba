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

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [displayConfirmationPassword, setDisplayConfirmationPassword] =
    useState(false);
  const [isLoading, setLoading] = useState(false);

  //display errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmationPasswordError, setConfirmationPasswordError] =
    useState('');

  const validateFields = () => {
    let valid = true;

    //validate email address
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!isEmail.test(email)) {
      setEmailError('Invalid Email address');
      valid = false;
    }

    //validate password
    const containsUpperCase = /[A-Z]/;
    const containsNumber = /[0-9]/;
    const containsSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (password.trim() === '') {
      setPasswordError('The Password is required');
      valid = false;
    } else if (!containsUpperCase.test(password)) {
      setPasswordError(
        'The Password must include at least 1 upper case letter',
      );
      valid = false;
    } else if (password.length < 8) {
      setPasswordError('The Password must contain at least 8 characters');
      valid = false;
    } else if (!containsNumber.test(password)) {
      setPasswordError('The Password must include at least 1 number');
      valid = false;
    } else if (!containsSpecialCharacter.test(password)) {
      setPasswordError(
        'The Password must include at least 1 special character',
      );
      valid = false;
    }

    //validate confirmation password
    if (password !== confirmationPassword) {
      setConfirmationPasswordError('Passwords do not match');
      valid = false;
    }
    return valid;
  };

  const submitRegisterForm = async () => {
    setLoading(true);
    setEmailError(undefined);
    setPasswordError(undefined);
    setConfirmationPasswordError(undefined);

    const isValid = validateFields();
    setLoading(false);

    if (!isValid) {
      return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    goto('/login');
  };

  return (
    <Container className="d-flex min-vh-100 flex-column justify-content-center">
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <div className="card shadow-sm p-4 mx-auto rounded">
            <p className="h1 font-weight-bold text-center">Join us Today!</p>
            <h2 className="text-lg text-tight text-muted mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h2>

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
                <label htmlFor="password" className="mb-1">
                  Confirm password:
                </label>
                <InputGroup>
                  <Form.Control
                    type={displayConfirmationPassword ? 'text' : 'password'}
                    name="confirmationPassword"
                    value={confirmationPassword}
                    onChange={(e) => {
                      setConfirmationPassword(e.target.value);
                    }}
                  />
                  <InputGroup.Text
                    style={{ cursor: 'pointer' }}
                    className="bg-zinc-100 d-flex align-items-center justify-content-center px-3 rounded-r-md border border-left-0 rounded-end"
                    onClick={(e) => {
                      e.preventDefault();
                      setDisplayConfirmationPassword(
                        !displayConfirmationPassword,
                      );
                    }}
                  >
                    {displayConfirmationPassword ? (
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
                {confirmationPasswordError && (
                  <p className="fw-medium fs-6 text-danger">
                    {confirmationPasswordError}
                  </p>
                )}
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  className="btn-lg"
                  onClick={submitRegisterForm}
                >
                  {isLoading ? <Spinner animation="border" /> : 'Sign up'}
                </Button>
              </div>
            </Form>
            <div className="text-center mt-4">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-weight-bold">
                  Please sign in
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
