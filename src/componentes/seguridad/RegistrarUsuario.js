import { Container, Grid, TextField, Typography,Avatar } from '@material-ui/core';
import React, { Component } from 'react';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';

const style={
    paper:{
        marginTop:8,
        display:"flex",
        flexDirection:"column",
        alingItems:"center"
    },
    avatar:{
        margin:8,
        backgroundColor:"#e53935"
    },
    form:{
        width:"100%",
        marginTop:10
    }
}

class RegistrarUsuario extends Component {
    render() {
        return (
            <Container max ="md">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutLineIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        REgistre su cuenta
                    </Typography>
                    <form style={style.form}>
                        <Grid container spacing={2}>
                            <Grid item ms={6} xs={12}>
                                <TextField name="nombre" fullWidth label="Ingrese su nombre"/>
                            </Grid>
                        </Grid>
                    </form>

                </div>
            </Container>
        );
    }
}

export default RegistrarUsuario;