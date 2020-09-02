import React from 'react';
import { Form, Button, Container, Grid} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import fetch from "isomorphic-unfetch";
import {toast} from "react-toastify";
import './App.css';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordRepeat: "",
    };
  };

  handleChange = (e) => {
    const {currentTarget} = e;
    const {value, name} = currentTarget;
    this.setState( { [name]:value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordRepeat } = this.state;
    if ( username.length < 5 || username.length > 255 ){
      this.setState( { 
        usernameError: "Lütfen kullanıcı adınızı kontrol edin",
      });
      return;
    }

    if ( password.length < 3 || username.length > 255 ){
      this.setState( { 
        passwordError: "Lütfen şifrenizi kontrol edin",
      });
      return;
    }

    if ( password !== passwordRepeat){
      this.setState( { 
        passwordError: "Lütfen şifrelerinizi kontrol edin",
        passwordRepeatError: "Lütfen şifrelerinizi kontrol edin",
      });
      return;
    }

fetch("http://localhost:8081/api/user", {
  method: "POST",
  headers: {
    "Content-Type":"application/json",
  },
  body: JSON.stringify({ username, password }),
})
  .then((r) => {
    if(r.ok) {
      return r;
    }
    if ( r.status === 401 || r.status === 403 || r.status === 500 ) {
      return Promise.reject( new Error("Bir hata oluştu"));
    }
  })
  .then((r) => r.json())
  .then((response) => {
  toast.success("Kayıt başarılı. Giriş sayfasına yönlendiriliyorsunuz.");
  setTimeout( () =>  {
    this.props.history.push("/login");
  }, 2000);
  })
  .catch((e) => {
    toast.error(e.message);
  });
};

componentDidMount = () => {
  setInterval(() => {
    console.log("İşlemi tekrarlıyorum" + new Date());
  }, 1000);
};
 
  render = () => {
    const { usernameError, passwordError, passwordRepeatError } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Container> 
            <Grid>
              <Grid.Row columns="equal" centered>
                <Grid.Column width={8}>
                  <Form 
                    onSubmit={this.handleSubmit}
                    onReset={(e) => {
                      e.preventDefault();
                      this.setState({
                        //counter:0,
                        username: "",
                        password: "",
                        passwordRepeat: "",
                      });
                    }}
                  >
                  
                  <h1> Kayıt Sayfası </h1><br></br>
                  <Form.Field>
                  <label> Kullanıcı adı  </label>
                  <Form.Input
                    type="email" 
                    name="username" 
                    required ="true" 
                    error = {usernameError}
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field> 
                  <label> Şifre </label>
                  <Form.Input
                    type="password" 
                    name="password"
                    required
                    error = {passwordError}
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  </Form.Field>

                  <Form.Field>
                  <label> Şifre Tekrarı </label>
                  <Form.Input
                    type="password"
                    name="passwordRepeat" 
                    required ="true"
                    error = {passwordRepeatError}
                    value={this.state.passwordRepeat}
                    onChange={this.handleChange}
                  />
                  </Form.Field>
 
                  <Button.Group fluid>
                  <Button as = {Link} to="/Login"> Hesabınız var mı? Giriş yapın.</Button>
                  <Button type="submit" color="olive"> Kaydet </Button>
                
                  </Button.Group>   

                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </header>
      </div>
    );
  };
}

export default withRouter(Register);
