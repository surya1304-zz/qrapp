import React, { Component } from 'react';
import './App.css';
import PlantStats from './Stats/plantstats/plantstats';
import {Route} from "react-router";
import {BrowserRouter, Redirect} from "react-router-dom";
import ZoneStats from "./Stats/zonestats/zonestats";
import RowEnquiry from "./Stats/rowstats/rowenquiry";
import Register from "./Creating/register";
import NewSignIn from "./TextFields/SigninPage/New_Signin";
import QRCodeGen from "./QR/QRCode_Gen";
import QRCodeBlock from "./QR/QRCodeBlock";
import CreatePlant from './Creating/CreatePlant';
import ResponsiveDialog from "./Card/Dialog";
class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            name : '',
            role : '',
            plants : '',
            signedIn : false,
            plant : "",
        };
        this.handler = this.handler.bind(this);
    }

    handler(fname, role, plants){
        this.setState({
            name: fname,
            role : role,
            plants : plants,
            signedIn : true,
        });
        sessionStorage.setItem("fname", fname);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("plants", plants);
        sessionStorage.setItem('plant',plants.split('&')[0].toLowerCase());
    }

    render() {
    return (
      <div className="App">
          {
                <BrowserRouter>
                    <Route exact path="/" render={() => (<Redirect to="/signin" />)} />
                    <Route path="/plantstats" render={(props) => <PlantStats signedIn={this.state.signedIn} fname={this.state.name} role={this.state.role} plants={this.state.plants} {...props}/>}/>
                    <Route path="/zonestats" render={(props) => <ZoneStats signedIn={this.state.signedIn} fname={this.state.name} role={this.state.role} plants={this.state.plants} {...props}/>} />
                    <Route path="/rowstats" render={(props) => <RowEnquiry signedIn={this.state.signedIn} fname={this.state.name} role={this.state.role} plants={this.state.plants} {...props}/>} />
                    <Route path="/register" component={Register} />
                    <Route path='/signin' render={(props) => <NewSignIn handler={this.handler} {...props}/>} />
                    <Route path='/qrcode' render={(props) => <QRCodeGen handler={this.handler1} signedIn={this.state.signedIn} fname={this.state.name} role={this.state.role} plants={this.state.plants} {...props}/>}/>
                    <Route path='/qrcode_block' render={(props) => <QRCodeBlock signedIn={this.state.signedIn} fname={this.state.name} role={this.state.role} plants={this.state.plants} {...props}/>}/>
                    <Route path='/plant' component={CreatePlant}/>
                    <Route path='/dialog' component={ResponsiveDialog}/>
              </BrowserRouter>
          }
      </div>
    );
  }
}

export default App;
