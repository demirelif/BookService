import React, { useState } from "react";
import { Container, Grid, Divider, Form, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./App.css";
import { toast } from "react-toastify";

const Login = ( { showRegisterLink }) => {
    const history = useHistory();

    const [usernamePassword, setUsernamePassword] = useState ({
        username: "",
        password: ""
    });

    const [usernamePasswordError, setUsernamePasswordError ] = useState ({
        username: null,
        password: null,
    });

    const handleChange = (e) => {
        const {currentTarget} = e;
        const{value, name} = currentTarget;
        setUsernamePassword({
            ...usernamePassword, [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = usernamePassword;
        if( username.length < 5 || usernamePassword.length > 255 ){
            setUsernamePasswordError({
                ...usernamePasswordError,
                username: "Lütfen kullanıcı adınızı kontrol edin",
            });
            return;
        }else {
            setUsernamePasswordError({
                username:null,
            });
        }
        if ( password.length < 3 || password.length > 255 ){
            setUsernamePasswordError({
                ...usernamePasswordError,
                password: "Lütfen şifrenizi kontrol edin",
            });
            return;
        }
        
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);
        fetch("http://localhost:8081/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
            credentials : "include",
        })
        .then((r) => {
            if(r.ok){
                return r;
            }
            if( r.status===401 || r.status === 403 || r.status === 500 ){
                return Promise.reject(new Error("Bir hata oluştu"));
            }
        })
        .then((response) => {
            toast.success("Giriş başarılı! Yönlendiriliyorsunuz.");
            setTimeout( () => {    
                history.push("/dashboard");
            }, 3000);
        })
        .catch((e) => {
            toast.error("e.message");
        } );
    };
        return (
            <div className="App">
                <Container>
                    <Grid>
                        <Grid.Row columns="equal" centered>
                            <Grid.Column width={8}>
                                <h1 centered> Giriş Sayfası </h1><br></br>
                                <Form 
                                onSubmit = {handleSubmit}
                                onReset ={(e) => {
                                    e.preventDefault();
                                    setUsernamePassword({ username: "", password: ""});
                                }}
                                >
                                    <Form.Field>
                                        <label> Kullanıcı adı</label>
                                        <Form.Input
                                        type="email"
                                        name="username"
                                        required
                                        error={usernamePasswordError.username}
                                        value={usernamePassword.username}
                                        onChange={handleChange}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                    <label> Şifre </label>
                                        <Form.Input
                                        type="password"
                                        name="password"
                                        required
                                        error={usernamePasswordError.password}
                                        value={usernamePassword.password}
                                        onChange={handleChange}
                                        />
                                    </Form.Field>

                                    <Button.Group fluid>
                                       
                                        <Button type="submit" color="purple">Giriş Yap</Button>
                                    </Button.Group>
                                    </Form>
                                    <Divider />
                        
                                    {showRegisterLink && (
                                        <Button 
                                        type="button"
                                        basic color="orange"
                                        fluid
                                        size = "small"
                                        onClick={() => {
                                            history.push("/");
                                        }}
                                        >Hesabınız yok mu? Kayıt olun.</Button>
                                    )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
}

export default Login;