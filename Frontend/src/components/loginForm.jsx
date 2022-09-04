import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../components/services/authService';
import { Redirect } from 'react-router-dom';
import { Column1, Column2, InfoRow,Img,ImgWrap, InfoWrapper } from '../../src/components/InfoSection/InfoElements';
import { LoginContainer,HeroBg,HeroContent} from './HeroSection/HeroElements';

class LoginForm extends Form {

    state = {
        data: { 
            username:'',
            password:''
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = async ()=>{

        try {
           await auth.login(this.state.data.username, this.state.data.password);
           const { state } = this.props.location;
           window.location = state ? state.from.pathname : '/';
        } catch (ex) {
            if(ex.response && ex.response.status === 400){
                const errors = { ...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
       
    }
     
    render() { 

       if (auth.getCurrentUser()) return <Redirect to='/'/>;

        return (

            <LoginContainer>
               <HeroBg>
                <div style={{  background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
                                   width: '100%',
                                   height: '100%',
                                   backgroundSize: 'cover'}}/>
            </HeroBg>
           <HeroContent>
            <InfoWrapper>
              <InfoRow>
 
               <Column1>
                <h1 styles={{color:'white'}}>Sign In</h1>

                     <form onSubmit = {this.handleSubmit}>
        
                        {this.renderInput('username', 'Username')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderButton("Login")}
                     </form>
       
               </Column1>

               <Column2>
                  <ImgWrap>
                       <Img src={require('../../src/images/undraw_movie_night_fldd.svg').default} />
                </ImgWrap>
                   
               </Column2>
     
              </InfoRow>
            </InfoWrapper>
            </HeroContent>
           </LoginContainer>
        )
    }
}
 
export default LoginForm;