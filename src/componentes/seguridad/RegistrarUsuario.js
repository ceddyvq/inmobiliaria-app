import {
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import { compose } from "recompose";
import { consumerFirebase } from "../../server";

const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alingItems: "center",
  },
  avatar: {
    margin: 8,
    backgroundColor: "#e53935",
  },
  form: {
    width: "100%",
    marginTop: 10,
  },
  submit: {
    marginTop: 15,
    marginBottom: 20,
  },
};

const usuarioInicial = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
};

class RegistrarUsuario extends Component {
  state = {
    firebase: null,
    usuario: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.firebase === prevState.firebase) {
      return null;
    }
    return {
      firebase: nextProps.firebase,
    };
  }

  onChange = (e) => {
    let usuario = Object.assign({}, this.state.usuario);
    usuario[e.target.name] = e.target.value;
    this.setState({
      usuario: usuario,
    });
  };

  registrarUsuario = e => {
    e.preventDefault();
    console.log("imrimir objeto  usuario del state", this.state.usuario);
    const { usuario, firebase } = this.state;

    firebase.auth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then((auth) => {
        
        firebase.db.collection('Users').doc(auth.user.uid)
        .set({nombre:usuario.nombre,apellido:usuario.apellido,id:auth.user.uid})
        .then(doc=>{
          this.props.history.push("/auth/home")
        })

      },{merge:true})
      .catch(error =>{
        console.log(error);
      })
  };

  render() {
    return (  
      <Container max="md">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOutLineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registre su cuenta
          </Typography>
          <form style={style.form}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  name="nombre"
                  onChange={this.onChange}
                  value={this.state.usuario.nombre}
                  fullWidth
                  label="Ingrese su nombre"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="apellido"
                  onChange={this.onChange}
                  value={this.state.usuario.apellido}
                  fullWidth
                  label="Ingrese su apellido"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="email"
                  onChange={this.onChange}
                  value={this.state.usuario.email}
                  fullWidth
                  label="Ingrese su email"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.usuario.password}
                  fullWidth
                  label="Ingrese su password"
                />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={12} md={6}>
                <Button
                  type="submit"
                  onClick={this.registrarUsuario}
                  variant="contained"
                  fullWidth
                  size="large"
                  color="primary"
                  style={style.submit}
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default compose(consumerFirebase)(RegistrarUsuario);
