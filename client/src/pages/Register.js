import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormRow, Logo, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  // global state and useNavigate
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    clearAlert,
    registerUser,
    loginUser,
    setupUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };

    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login successful! Redirecting...',
      });
    } else {
      registerUser({
        currentUser,
        endPoint: 'register',
        alertText: 'Registration successful! Redirecting...',
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            id="name"
            value={values.name}
            handleChange={handleChange}
            labelText="Name"
          />
        )}
        <FormRow
          type="email"
          name="email"
          id="email"
          value={values.email}
          handleChange={handleChange}
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          id="password"
          value={values.password}
          handleChange={handleChange}
          labelText="Password"
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
