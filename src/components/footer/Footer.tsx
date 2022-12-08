import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    menu:{
      background:'#0c0707',
    },
  })
);

export default function Footer() {
  const classes = useStyles();
  const [menu, setMenu] = useState(false);
  const openMenu = Boolean(menu);
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.menu}>
        <Toolbar>
          <Typography variant="h6" align="center" className={classes.title}>
           Todos direitos reservados
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
