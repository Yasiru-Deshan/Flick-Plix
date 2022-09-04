import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../components/services/authService';
import * as userService from '../components/services/userService';
import { Column1, Column2, InfoRow,Img,ImgWrap, InfoWrapper } from '../../src/components/InfoSection/InfoElements';
import { LoginContainer,HeroBg,HeroContent} from './HeroSection/HeroElements';


class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name:''
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    }

    doSubmit = async () => {

        try{
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token']); 
            window.location = '/';
        }
        catch(ex){
            if(ex.response && ex.response.status === 400){
                const errors = { ...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {



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
                  <ImgWrap>
                       <Img src={require('../../src/images/undraw_video_streaming_re_v3qg.svg').default} />
                </ImgWrap>  
                </Column1>

                  <Column2>
                <h1 style={{color:'white'}}>Register</h1>

                <form onSubmit={this.handleSubmit}>

                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton("Register")}
                </form>

                 </Column2>
     
              </InfoRow>
            </InfoWrapper>
            </HeroContent>
           </LoginContainer>
         
        )
    }
}

 
export default RegisterForm;