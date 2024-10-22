import { useContext, useState } from "react";
import axios from 'axios';
import './App.css';
import { useNavigate, Link } from "react-router-dom";
import { userlogin } from "./App";

const Login = (click ) => {
  const { setdata1 } = useContext(userlogin); // corrected destructuring
  const navigate = useNavigate(); // corrected typo
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', data);
      console.log(res.data);

      if (res.status === 200) {
        // Uncomment and set the context data if needed
        setdata1("ok");
        navigate('/home'); // changed to '/home'
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Incorrect email or password');
      } else {
        console.log('Server error. Please try again later');
      }
    }

    setData({
      email: "",
      password: ""
    });
  };

  return (
    <div>
      <form className='form-detail'>
        <h1>Login here</h1>
        <input
          type="text"
          placeholder="Email"
          onChange={handleOnChange}
          name="email"
          value={data.email}
        />
        <input
          type="password" // changed type to password for security
          placeholder="Password"
          onChange={handleOnChange}
          name="password"
          value={data.password}
        />
        <button onClick={handleOnSubmit}>Login</button>
        <p>
          If you dont have an account? 
          <Link to="/register" onClick={click}> Register here </Link> {/* use Link instead of <a> */}
        </p>
      </form>



      
    </div>
  );
};

export default Login;
