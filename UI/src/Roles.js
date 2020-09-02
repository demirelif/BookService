import { toast } from "react-toastify";
import "./App.css";
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router';
import React from "react";

class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
    };
  };

  componentDidMount = () => {
    this.getRole();
  };

  getRole = () => {
    fetch("http://localhost:8081/api/user/getRole",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials : "include",
    }
  )
  .then((r) => {
      if(r.ok){
         return true;
      }
      if( r.status===401 || r.status === 403 || r.status === 500 || r.status===404){
          return Promise.reject(new Error("Bir hata oluştu"));
      }
  })
  .then((data) => {
    toast.info(`${data}`);
    if ( data.length === 0 ){
      toast.error("Sonuç bulunamadı. Kelimeleri doğru yazdığınızdan emin olunuz.");
    }
    this.setState({ roles: data });
    toast.error(`leng ${data.length}`);
  })
  .catch((e) => {
    toast.error(e.message);
  });
};

render = () => {
    const { roles } = this.state;
    
    if (roles.name === "ROLE_ADMIN") {
      return <Redirect push to="/dashboard-admin-1" />;
    }
    else {
      //return <Redirect push to="/dashboard" />;
      return (
        <ul>
            {roles.map(name => (<li>{name}</li>))}
        </ul>
    );
    }
  };
}

export default withRouter(Roles);
