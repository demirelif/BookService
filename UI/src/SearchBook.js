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

class SearchBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
      who: [],
      currentPage: 0,
      bookID: null,
      searchWord: "",
      bookFav: [],
    };
  };

  componentDidMount = () => {
  //this.searchBook();
  };

  statePage = { activeItem: "Kitaplar" };

  addToFavs = (favId) => {
    this.setState({
      bookID : favId
    })
    fetch(
      `http://localhost:8081/api/user/addFav?id=${favId}`,
      {
        method: "PUT",
        headers: {
          //"Content-Type": "application/json",
        },
        credentials: "include",
      }
    ).then((r) => {
      if (r.ok) {
        toast.info("Favorilerinize eklendi.");
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

  addToReads = (favId) => {
    toast.info(`the id is ${favId}`)
    this.setState({
      bookID : favId
    })
    fetch(
      `http://localhost:8081/api/user/addRead?id=${favId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    ).then((r) => {
      if (r.ok) {
        toast.info("Okuma listenize eklendi.");
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

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    const { history } = useHistory();
    history.push("/login");
  };

  handleSubmit = (event) => {
    event.preventDefault();
  }
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      searchWord : event.target.value
    })
  }
  searchBook = () => {
    fetch(
      "http://localhost:8081/api/book/searchBook?" +
        new URLSearchParams({ bookname: this.state.searchWord }),
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
      this.setState({ book: data });
    })
    .catch((e) => {
      toast.error(e.message);
    });
  };

  render = () => {
    const { book } = this.state;
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
              <Button color="vk" onClick={this.searchBook}>    
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
                          <Table.HeaderCell>Yazar</Table.HeaderCell>
                          <Table.HeaderCell>ISBN</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {book && 
                          book.map((value, index) => (
                            <Table.Row>
                              <Table.Cell>
                                <Label ribbon color = 'olive'>
                                  {book.size * book.number + (index + 1)}
                                </Label>
                              </Table.Cell>
                              <Table.Cell>{value.bookname}</Table.Cell>
                              <Table.Cell>{value.author}</Table.Cell>
                              <Table.Cell>
                                <Icon name="barcode" size="large" />
                              </Table.Cell>
                              <Table.Cell>
                                <Popup
                                  trigger={
                                    <Button 
                                      circular
                                      icon = "heart outline"
                                      color = "red"
                                      onClick = {(e) => {e.preventDefault(); this.addToFavs(value.id) } }
                                    />
                                  }
                                  content="Favorilere ekle"
                                />
                              </Table.Cell>
                              <Table.Cell>
                                <Popup
                                  trigger={
                                    <Button
                                      circular
                                      icon="bookmark outline"
                                      color="blue"
                                      //value = {value.bookname}
                                      onClick= {(e) => {e.preventDefault(); this.addToReads(value.id) } }
                                    />
                                  }
                                  content="Okuma listesine ekle"
                                />
                              </Table.Cell>
                            </Table.Row>
                          ))}
                      </Table.Body>

                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan="6">
                            <Menu floated="right" pagination>
                              <Menu.Item
                                onClick={() => {
                                  this.changePageTo(this.state.currentPage - 1);
                                }}
                                as="a"
                                icon
                                disabled={book.first}
                              >
                                <Icon name="chevron left" />
                              </Menu.Item>
                              {[...Array(book.totalPages).keys()].map(
                                (value, index) => (
                                  <Menu.Item
                                    as="a"
                                    onClick={() => {
                                      this.changePageTo(index);
                                    }}
                                    active={book.number === index}
                                  >
                                    {index + 1}
                                  </Menu.Item>
                                )
                              )}

                              <Menu.Item
                                onClick={() => {
                                  this.changePageTo(this.state.currentPage + 1);
                                }}
                                as="a"
                                icon
                                disabled={book.last}
                              >
                                <Icon name="chevron right" />
                              </Menu.Item>
                            </Menu>
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
                  as={Link}
                  to="/dashboard3"
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

export default withRouter(SearchBook);
