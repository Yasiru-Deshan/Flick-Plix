import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../components/services/authService';
import { Redirect } from 'react-router-dom';
import { Column1, Column2, InfoRow,Img,ImgWrap, InfoWrapper } from '../../src/components/InfoSection/InfoElements';
import { HeroContainer,HeroBg,HeroContent,VideoBg} from './HeroSection/HeroElements';

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

            <HeroContainer id='login'>
               <HeroBg>
                <VideoBg style={{ background: '#2C3E50',     /* fallback for old browsers */
                                  background: '-webkit-linear-gradient(to left, #4CA1AF, #2C3E50)',  /* Chrome 10-25, Safari 5.1-6 */
                                  background: 'linear-gradient(to left, #4CA1AF, #2C3E50)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 }}/>
            </HeroBg>
           <HeroContent>
            <InfoWrapper>
              <InfoRow>
 
               <Column1>
                  <ImgWrap>
                       <Img src={require('../../src/images/undraw_horror_movie_3988.svg').default} />
                </ImgWrap>
       
               </Column1>

               <Column2>
                    <h1>Login</h1>

                     <form onSubmit = {this.handleSubmit}>
        
                        {this.renderInput('username', 'Username')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderButton("Login")}
                     </form>
               </Column2>
     
              </InfoRow>
            </InfoWrapper>
            </HeroContent>
           </HeroContainer>
        )
    }
}
 
export default LoginForm;