import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    padding: 25,
    margin: '140px auto 200px',
  },
  title:{
    color:'#ffffff',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
  },
  btn:{
    color:'#000',
    "&:hover": {
      background: "#897b7f",
      color: "#ccc",
    },
    [theme.breakpoints.down('sm')]: {
      witdh:100,
      margin:theme.spacing(2),
    },
  },
}));

export default function Home4() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth='lg'>
      <Typography variant="h3" align='center' className={classes.title}>
        Sistema de Cadastro Online
      </Typography>

      <br/> 
      <br/> 
        <Link to='/cadastro'> <Button variant="contained" className={classes.btn} color='inherit' >Novo Cadastro</Button></Link> <Link to='/listar'><Button variant="contained" className={classes.btn} color='inherit'>Lista de Registro</Button></Link>
      
    </Container>
  );
}