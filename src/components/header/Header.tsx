import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      color: '#fff',
      textDecoration: 'none',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1rem',
      },
    },
    title: {
      flexGrow: 1,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    menu:{
      background:'#0c0707',
    },
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.menu}>
        <Toolbar>
          <Typography variant="h4" align="center" className={classes.title}>
            Cadastro Online
          </Typography>
          <Button color="inherit">
            <Link to="/" className={classes.menuButton}>Home</Link>
          </Button>
          <Button color="inherit">
            <Link to="/cadastro" className={classes.menuButton}>Cadastro</Link>
          </Button>
          <Button color="inherit">
            <Link to="/listar" className={classes.menuButton}>Lista </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
