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
  Popup,
  Segment,
} from "semantic-ui-react";

class Dashboard3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      book: [],
      currentPage: 0,
      bookID: 4,
    };
  }

  componentDidMount = () => {
    this.getReads();
  };

  statePage = { activeItem: "Okuma Listesi" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    const {history} = useHistory();
    history.push("/login");
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

  delete = (favId) => {
    fetch(
      `http://localhost:8081/api/user/deleteRead?id=${favId}`,
      {
        method: "DELETE",
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

  getReads = () => {
    fetch(
      "http://localhost:8081/api/user/seeRead",
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
        this.setState({ book: data });  
      })
      .catch((e) => {
        toast.error(e.message);
      });

  };

  render = () => {
    const { book } = this.state;
    const { activeItem } = this.statePage;

    if (this.state.redirect) {
      return <Redirect push to="/login" />;
    }

    return (
      <div className="App">
        <Container>
          <Segment clearing>
            
            <Header as="h2" content='Device Visibility' floated="left">
                <Grid columns={16}>
                <Grid.Column only='large screen' largeScreen={100}>
                    <p> Hoş Geldiniz</p>
                </Grid.Column>
                <Grid.Column only='mobile' mobile={16}>
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


                  <Header as="h2" content='Device Visibility' floated="left">
                <Grid columns={16}>
                <Grid.Column only='large screen' largeScreen={100}>

                </Grid.Column>
                </Grid>
            </Header>

                    <Header size="huge" content='Device Visibility'> Okuma Listeniz </Header>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>Ad</Table.HeaderCell>
                          <Table.HeaderCell>Yazar</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {book &&
                          book.map((value, index) => (
                            <Table.Row>
                              <Table.Cell>
                                <Label ribbon color="violet">
                                  {}
                                </Label>
                              </Table.Cell>
                              <Table.Cell>{value.bookname}</Table.Cell>
                              <Table.Cell>{value.author}</Table.Cell>
                              <Table.Cell>
                                <Popup
                                  trigger={
                                    <Button 
                                      circular
                                      icon = "delete"
                                      color = "red"
                                      onClick = {(e) => {e.preventDefault(); this.delete(value.id) } }
                                    />
                                  }
                                  content="Sil"
                                />
                              </Table.Cell>
                              <Table.Cell>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                      </Table.Body>

                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan="4">
                           
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
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
                  to="/dashboard"
                />
                <Menu.Item
                  name="Favoriler"
                  active={activeItem === "Favoriler"}
                  as={Link}
                  to="/dashboard2"
                />
                <Menu.Item
                  name="Okuma Listesi"
                  active={activeItem === "Okuma Listesi"}
                />
              </Menu>
            </Grid.Column>
            </Grid>
        </Container>
      </div>
    );
  };
}

export default withRouter(Dashboard3);
