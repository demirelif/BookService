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
  Segment,
} from "semantic-ui-react";

class SeeBookInactive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      who: [],
      currentPage: 0,
      bookID: null,
      searchWord: "",
      bookFav: [],
    };
  };

  componentDidMount = () => {
    this.getBooks();
  };

  statePage = { activeItem: "Kitaplar" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    const { history } = useHistory();
    history.push("/loginadmin");
  };

  handleSubmit = (event) => {
    event.preventDefault();
  }
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      searchWord : event.target.value
    })
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

  deleteAdmin = (favId) => {
    fetch(
      `http://localhost:8081/api/book/deleteBook?id=${favId}`,
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


  makeActiveAdmin = (favId) => {
    fetch(
      `http://localhost:8081/api/book/makeActiveBook?id=${favId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    ).then((r) => {
      if (r.ok) {
        toast.info("Başarıyla geri getirildi");
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

  getBooks = () => {
    fetch(
      "http://localhost:8081/api/book/all?" +
        new URLSearchParams({ pageNumber: this.state.currentPage }),
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
        //toast.info(`Toplamda ${data.totalElements} eleman bulundu.`);

        this.setState({ book: data });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  

  changePageTo = (i) => {
    this.setState({ currentPage: i }, this.getBooks);
  };

  searchBook = () => {
    fetch(
      "http://localhost:8081/api/book/search-book-admin?" +
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

                    <Button as={Link} 
                    to= "/seeBookInactive"
                    disabled >    
                    <Icon name = "eye" ></Icon>
                    Tüm kitapları görün
                    </Button>  
                
                    <Button as={Link} 
                    to= "/addbook" >    
                    <Icon name = "add" ></Icon>
                    Kitap ekleyin
                    </Button>

                    <Button as={Link} 
                    to= "/search-book-admin" params={ this.state.searchWord } >    
                    <Icon name = "search" ></Icon>
                    Kitap arayın
                    </Button>
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
                          book.content &&
                          book.content.map((value, index) => (
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
                              <Table.Cell>
                                <Popup
                                  trigger={
                                    <Button 
                                      disabled = {value.active}
                                      circular
                                      icon = "add"
                                      color = "green"
                                      onClick = {(e) => {e.preventDefault(); this.makeActiveAdmin(value.id) } }
                                    />
                                  }
                                  content="Geri getir"
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
          </Grid>
        </Container>
      </div>
    );
  };
}

export default withRouter(SeeBookInactive);
