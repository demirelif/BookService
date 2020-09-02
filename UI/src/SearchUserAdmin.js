import { toast } from "react-toastify";
import "./App.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
import React from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Table,
  Label,
  Menu,
  Icon,
  Popup,
  Input,
  Form,
  Segment,
} from "semantic-ui-react";

class SearchUserAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
      who: [],
      currentPage: 0,
      bookID: null,
      searchWord: "",
      bookFav: [],
      user: [],
    };
  };

  componentDidMount = () => {
   // this.getUsers();
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    const { history } = useHistory();
    history.push("/loginadmin");
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      searchWord : event.target.value
    })
  };


  deleteAdmin = (favId) => {
    fetch(
      `http://localhost:8081/api/user/deleteUser?id=${favId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    ).then((r) => {
      if (r.ok) {
        toast.info("Başarıyla silindi");
        return r;
      }
      if (r.status === 401 || r.status === 403 || r.status === 500) {
        return Promise.reject(new Error("Bir hata oluştu"));
      }
    })
    .catch((e) => {
      toast.error(e.message);
    });
  };

  logout = (event) => {
    fetch("http://localhost:8081/logout",{
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials : "include",
  })
  .then((r) => {
      if(r.ok){
         this.setState({redirect: true});
         return true;
      }
      if( r.status===401 || r.status === 403 || r.status === 500 ){
          return Promise.reject(new Error("Bir hata oluştu"));
      }
  })
  .catch((e) => {
      toast.error("e.message");
  } );
};

  statePage = { activeItem: "Kullanıcılar" };

  searchUser = () => {
    fetch(
      "http://localhost:8081/api/user/searchUser?" +
        new URLSearchParams({ username: this.state.searchWord }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
    .then((r) => {
      if (r.ok) {
        return r;
      }
      if (r.status === 401 || r.status === 403 || r.status === 500) {
        return Promise.reject(new Error("Bir hata oluştu"));
      }
    })
    .then((r) => {
      return r.json();
    })
    .then((data) => {
      if ( data.length === 0 ){
        toast.error("Sonuç bulunamadı. Kelimeleri doğru yazdığınızdan emin olunuz.");
      }
      this.setState({ user: data });
    })
    .catch((e) => {
      toast.error(e.message);
    });
  };

  render = () => {
    const { user } = this.state;
    const { activeItem } = this.statePage;
    //this.searchBook();

    if (this.state.redirect) {
      return <Redirect push to="/login" />;
    }

    return (
      <div className="App">
        <Container>
          <Segment clearing>
            <Header as="h2" content="Device Visibility" floated="left">
              <Grid columns={16}>
                <Grid.Column only="large screen" largeScreen={100}>
                         <p> Hoş Geldiniz </p>
                </Grid.Column>
                <Grid.Column only="mobile" mobile={16}>
                  <Segment>Mobile</Segment>
                </Grid.Column>
              </Grid>
            </Header>

            <Header as="h2" floated="right">
              <Button.Group floated="right">
              <Button color="red"

onClick = {(e) => {e.preventDefault(); this.logout() } }

>Çıkış Yap</Button>
              </Button.Group>
            </Header>
          </Segment>
          <Grid>
            <Grid.Column stretched width={12}>
              <Segment>
                <Grid.Row columns="equal" centered>
                  <Grid.Column width={16}>
                    <Header as="h2" content="Device Visibility" floated="left">
                      <Grid columns={16}>
                        <Grid.Column
                          only="large screen"
                          largeScreen={100}
                        ></Grid.Column>
                      </Grid>
                    </Header>

                    <Segment clearing> 
                    <Header size="huge" content="Device Visibility" floated = "left">
                      {" "}
                      Kitaplar{" "}
                    </Header>
                    <Header size="huge" content="Device Visibility" floated="right">
        
              <Form onSubmit={this.handleSubmit}>
              <Input type='text' name='searchWord' placeholder='İsme göre kitap arayın...' onChange = {this.handleInputChange}/>
              <Button color="vk" onClick={this.searchUser}>    
                  Ara
              </Button>
              </Form>
                    </Header>
                    </Segment>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>Ad</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                  
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>


                      <Table.Body>
                        {user &&
                      
                          user.map((value, index) => (
                            <Table.Row>
                              <Table.Cell>
                                <Label ribbon color = 'olive'>
                                 
                                </Label>
                              </Table.Cell>
                              <Table.Cell>{value.username}</Table.Cell>
                              
                              <Table.Cell>
                                <Icon name="barcode" size="large" />
                              </Table.Cell>
                              <Table.Cell>
                              <Popup
                                  trigger={
                                    <Button 
                                      disabled = {!value.active}
                                      circular
                                      icon = "delete"
                                      color = "red"
                                      onClick = {(e) => {e.preventDefault(); this.deleteAdmin(value.id) } }
                                    />
                                  }
                                  content="Sil"
                                />
                              </Table.Cell>
                            </Table.Row>
                          ))}
                      </Table.Body>

                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Segment>
            </Grid.Column>

            <Grid.Column width={4}>
              <Menu fluid vertical tabular="right">
                <Menu.Item
                  name="Kitaplar"
                  active={activeItem === "Kitaplar"}
                  as={Link}
                  to="/dashboard-admin-1"
                />
                <Menu.Item
                  name="Kullanıcılar"
                  active={activeItem === "Kullanıcılar"}
                  as={Link}
                  to="/dashboard-admin-2"
                />

              </Menu>
            </Grid.Column>

            <Grid.Column width={12}>
    
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  };
}


  export default withRouter(SearchUserAdmin);