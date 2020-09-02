import { toast } from "react-toastify";
import "./App.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Menu,
  Input,
  Form,
  Segment,
} from "semantic-ui-react";

class SearchBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: "",
      bookAuthor: "",
    };
  };

  componentDidMount = () => {
  //this.searchBook();
  };
  addBook = () => {
    fetch(
      `http://localhost:8081/api/book/addBook?bookname=${this.state.bookName}&authorname=${this.state.bookAuthor}`, 
       // new URLSearchParams({ bookname: this.state.bookName, authorname: this.state.bookAuthor }),
      {
        method: "PUT",
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
       toast.info("Kitap eklendi.");
      return r.json();
    })
    .catch((e) => {
      toast.error(e.message);
    });
  };

  statePage = { activeItem: "Kitaplar" };
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    const { history } = useHistory();
    history.push("/login");
  };

  handleSubmit = (event) => {
    event.preventDefault();
  }
  handleInputChangeName = (event) => {
    event.preventDefault();
    this.setState({
      bookName : event.target.value
    })
  }
  handleInputChangeAuthor = (event) => {
    event.preventDefault();
    this.setState({
      bookAuthor : event.target.value
    })
  }
  
  render = () => {
    const { activeItem } = this.statePage;

    return (
      <div className="App">
        <Container>
          <Grid>
            <Grid.Column stretched width={12}>
              <Segment>
                <Grid.Row columns="equal" centered>
                  <Grid.Column width={16}>
                    
                
                    <Segment clearing> 
                    <Header size="huge" floated = "left">
                      {" "}
                      Kitap ekleyin{" "}
                    </Header>
                    <Header size="huge" content="" floated="right">
        
                    </Header>
                    </Segment>

                    <Form onSubmit={this.handleSubmit}>
              <Input type='string' name='bookName' placeholder='Kitap ismi' onChange = {this.handleInputChangeName}/>
              <Input type='string' name='bookAuthor' placeholder='Yazar' onChange = {this.handleInputChangeAuthor}/>
              
              <Button color="vk" onClick={this.addBook}>    
                  Ekle
              </Button>
              </Form>
                
                                    
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

export default withRouter(SearchBook);
