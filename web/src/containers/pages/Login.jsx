import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { themeSettings } from "../../theme";
import {Snackbar, Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const mode = 'light';
  const theme = themeSettings(mode)
  const navigate = useNavigate();

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem('auth'));
      console.log(user?.accessToken)
      if (user?.accessToken !== '') {
        console.log(1)
        navigate('/')
        console.log(2)
      }
    }, []);

  document.title = "Wii || Login"
  const [isLogin, setIsLogin] = useState(true)
  const [loginDto, setLoginDto] = useState({email: '', password:''})
  const [registerDto, setRegisterDto] = useState({
    "username": "",
    "email": "",
    "password": "",
    "confirmPassword": "",
    "fullname": ""
  })
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    type: 'success',
    message: 'Success!'
  });

  const showNoti = (type, message) => {
    setAlertInfo({
      type,
      message
    })
    setOpen(true)
  }

  const HandleLogin = async () => {
    const param = {...loginDto} 
    if(param.email === '' || param.password === ''){
      showNoti('error', 'Invalid email or password!')
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(param),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("auth", JSON.stringify(data));
        navigate('/')
      } 
      else {
        showNoti('error', response?.message ? response.message : "Đã có lỗi xảy ra trong quá trình xử lý!")
      }
    } 
    catch (error) {
      showNoti('error', "Đã có lỗi xảy ra trong quá trình xử lý!")
    }
  }

  const HandleRegister = async () => {
    const param = {...registerDto} 
    if(param.email === '' || param.password === '' || param.fullname === '' || param.username === ''){
      showNoti('error', 'Invalid email or password!')
      return;
    }

    if(param.password !== param.confirmPassword){
      showNoti('error', 'Invalid password! and confirmPassword')
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(param),
        }
      );
      if (response.status === 201) {
        const data = await response.json();
        localStorage.setItem("auth", JSON.stringify(data))
        navigate('/')
      } 
      else {
        showNoti('error', response?.message ? response.message : "Đã có lỗi xảy ra trong quá trình xử lý!")
      }
    } 
    catch (error) {
      showNoti('error', "Đã có lỗi xảy ra trong quá trình xử lý!")
    }
  }

  return (
    <Container theme = { theme }>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert
            onClose={() => setOpen(false)}
            severity={alertInfo.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertInfo.message}
          </Alert>
        </Snackbar>

      {isLogin ? 
        <LoginUI theme = { theme }>
          <div className="login-left">
              <h2>Welcome back</h2>
              <span>New here</span>
              <BtnPrimary1 theme = { theme } onClick={() => setIsLogin(!isLogin)}>Sign up</BtnPrimary1>
          </div>
          <div className="login-right">
              <Logo className="logo" src='./images/logo.png' alt="" />
              <h2>SIGN IN</h2>
              
              <div className="login-form">
                <Input value={loginDto.email} onChange={e => setLoginDto({...loginDto, email: e.target.value})} theme = { theme } type="text" placeholder="Email address" />
                <Input value={loginDto.password} onChange={e => setLoginDto({...loginDto, password: e.target.value})} theme = { theme } type="password" placeholder="Password" />
              </div>
              <button className="btn-forgot_pw">Forgot password?</button>
              <BtnPrimary onClick={() => HandleLogin()} theme = { theme } className="btn-login">Login</BtnPrimary>
          </div>
        </LoginUI>
      : 
        <Register theme = { theme }>
          <div className="register-left">
              <Logo className="logo" src='./images/logo.png' alt="" />
              <h2>SIGN UP</h2>
              
              <div className="register-form">
                <Input value={registerDto.username} onChange={e => setRegisterDto({...registerDto, username: e.target.value})} theme = { theme } type="text" placeholder="User name" />
                <Input value={registerDto.email} onChange={e => setRegisterDto({...registerDto, email: e.target.value})} theme = { theme } type="text" placeholder="Email address" />
                <Input value={registerDto.fullname} onChange={e => setRegisterDto({...registerDto, fullname: e.target.value})} theme = { theme } type="text" placeholder="Full name" />
                <Input value={registerDto.password} onChange={e => setRegisterDto({...registerDto, password: e.target.value})} theme = { theme } type="password" placeholder="Password" />
                <Input value={registerDto.confirmPassword} onChange={e => setRegisterDto({...registerDto, confirmPassword: e.target.value})} theme = { theme } type="password" placeholder="Confirm Password" />
              </div>
              <BtnPrimary theme = { theme } onClick={() => HandleRegister()} className="btn-register">Register</BtnPrimary>

          </div>
          <div className="register-right">
              <h2>Úer: Kiến trúc phần mềm!</h2>
              <span>Already have an account</span>
              <BtnPrimary1 theme = { theme } onClick={() => setIsLogin(!isLogin)}>Sign in</BtnPrimary1>
          </div>
          
        </Register>
      }

    </Container>
  )
}

const Container = styled.div`
  background: #fff;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items:center;
  justify-content: center;
  transition: all 0.5s linear;
`

const LoginUI = styled.div`
  background: ${({theme}) => theme.palette.rgba_primary[1]};
  display: flex;
  width: 800px;
  box-shadow: 4px 3px 6px ${({theme}) => theme.palette.base_border};
  border-radius: 8px;

  .login-left{
    flex: 1;
    background: ${({theme}) => theme.palette.primary};
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2{
      text-align: center;
      font-size: 42px;
      color: white;
      text-shadow: 2px 2px 2px ${({theme}) => theme.palette.text_color1};
      margin: 0;
    }

    span{
      color: white;
      font-size: 16px;
      font-weight: normal;
      margin: 12px;
    }

  }

  .login-right{
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h2{
      margin-top: 20px;
      font-weight: 900;
      font-size: 1.8rem;
      color: ${({theme}) => theme.palette.primary};
      letter-spacing: 1px;
      text-align: center;
    }

    h4{
      margin: 20px 0 8px;
      color:${({theme}) => theme.palette.text_color1};
      font-weight: normal;
      font-size: 16px;
    }
    .login-social{
      display: flex;
      align-items: center;

      .img-social{
        height: 40px;
        width: 40px;
        object-fit: cover;
        margin: 0 12px;
        border-radius: 50%;
        box-sizing: border-box;
        box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
        border: 0.5px solid #ccc;
        padding: 4px;
        transition: all 0.5s linear;

        &:hover {
          box-shadow: none;
          cursor: pointer;
        }
      }
    }

    .login-form{
      width: 100%;
    }

    .btn-forgot_pw{
      margin: 12px 0 0 auto;
      background: transparent;
      border: none;
      outline: none;
      color: ${({theme}) => theme.palette.text_color1};
      font-style: italic;
      transition: all 0.5s ease;

      &:hover{
        cursor: pointer;
        color: ${({theme}) => theme.palette.primary};
      }
    }

  }
`

const Register = styled.div`
  background: ${({theme}) => theme.palette.rgba_primary[1]};
  display: flex;
  width: 800px;
  box-shadow: 4px 3px 6px ${({theme}) => theme.palette.base_border};
  border-radius: 8px;

  .register-left{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 40px 20px;

    h2{
      margin-top: 20px;
      font-weight: 900;
      font-size: 1.8rem;
      color: ${({theme}) => theme.palette.primary};
      letter-spacing: 1px;
      text-align: center;
    }

    h4{
      margin: 20px 0 8px;
      color:${({theme}) => theme.palette.text_color1};
      font-weight: normal;
      font-size: 16px;
    }
  }

  .register-right{
    flex: 1;
    background: ${({theme}) => theme.palette.primary};
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

    h2{
      text-align: center;
      font-size: 42px;
      color: white;
      text-shadow: 2px 2px 2px ${({theme}) => theme.palette.text_color1};
      margin: 0;
    }

    span{
      color: white;
      font-size: 16px;
      font-weight: normal;
      margin: 12px;
    }
  }
`

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  box-sizing: border-box;
  caret-color: red;
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  height: 32px;
  font-size: 14px;
  border-radius: 50px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
  margin-top: 24px;

  &::placeholder{
    font-style: italic;
    color: ${({theme}) => theme.palette.text_color1};
    font-size: 12px;
  }
`
const BtnPrimary = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
  color: white;
  margin-top: 20px;
  background: ${({theme}) => theme.palette.primary};
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  transition: 0.5s;

  &:hover {
    box-shadow: none;
  }

`

const Logo = styled.img`
      height: 100px;
      width: 100px;
      object-fit: cover;
      margin: auto;
      //border-radius: 50%;
      //box-sizing: border-box;
      //box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
      //border: 0.5px solid #ccc;
`

const BtnPrimary1 = styled.button`
      display: block;
      width: 100%;
      padding: 0;
      border: none;
      outline: none;
      box-sizing: border-box;
      color: white;
      margin-top: 20px;
      background: ${({theme}) => theme.palette.primary};
      height: 40px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 900;
      box-shadow: 6px 6px 6px #db680a, -6px -6px 6px #fc9037;
      transition: 0.5s;

      &:hover {
        box-shadow: 6px 6px 6px #fc9037, -6px -6px 6px  #db680a;
      }

`

export default Login