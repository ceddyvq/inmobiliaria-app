import React, { Component, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "./App.css";
import ListaInmuebles from "./componentes/vistas/ListaInmuebles";
import AppNavbar from "./componentes/layout/AppNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme/theme";
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from "./componentes/seguridad/Login";
import home from "./componentes/vistas/home";
import {FirebaseContext} from './server';

import {useStateValue} from "./sesion/store";
import { Snackbar } from "@material-ui/core";
import openSnackbarReducer from "./sesion/reducers/openSnackbarReducer";

function App(props){
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada,setupFirebaseInicial]=React.useState(false);

  const [{openSnackbar},dispatch]=useStateValue();

  useEffect(() =>{
    firebase.estaIniciado().then(val =>{
      setupFirebaseInicial(val);
    })
  })

  return autenticacionIniciada !== false ?(
    <React.Fragment>
      <Snackbar anchorOrigin={{vertical:"bottom" ,horizontal:"center"}}
      open={openSnackbar ? openSnackbar.open:false}
      autoHideDuration={3000}
      ContentProps={{
        "aria-describedby":"message-id"
      }}
      message={
        <span id="message-id">
          {openSnackbar ? openSnackbar.mensaje:""}
        </span>
      }
      onClose={()=>
        dispatch({
          type:"OPEN_SNACKBAR",
          openMensaje:{
            open:false,
            mensaje:""
          }
        })
      }
      >
      </Snackbar>
    <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavbar />
          <Grid container>
            <Switch>
              <Route path="/" exact component={ListaInmuebles}></Route>
              <Route path="/auth/registrarUsuario" exact component={RegistrarUsuario}></Route>
              <Route path="/auth/login" exact component={Login}></Route>
              <Route path="/auth/home" exact component={home}></Route>
            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
      </React.Fragment>
  )
  :null
}



export default App;
