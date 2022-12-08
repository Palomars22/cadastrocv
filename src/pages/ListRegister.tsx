import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import api from "../services/api/config/api";
import { deleteUser } from '../services/api/person/conex'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactExcel from "react-html-table-to-excel";


const useStyles = makeStyles({
  container: {
    marginBlock: 50,
  },
  table: {
    minWidth: 650,
  },
  btn: {
    background: "#1a030b",
    color: "#fff",
    height: 35,
    margin: 5,
    border: "none",
    padding: "10px 20px",
    borderRadius: 4,
    "&:hover": {
      background: "#897b7f",
      color: "#ccc",
    },
  },
  rowMaster: {
    background: "#c4b8b8",
  },
  rowBody: {
    background: "#f6f9f8",
  },
});

interface IPerson {
  id: number;
  name: string;
  lastname: string;
  birthday: Date;
  email: string;
  cpf: number;
  phone: number;
  genre: string;
  text: string;
}

export default function Listrar() {
  const classes = useStyles();
  const [list, setList] = useState<IPerson[]>([]);

  useEffect(() => {
    api.get('/person')
      .then((response) => {
        setList(response.data)
      })
  }, []);

  const handleDelete = (id: number) => {
    if (confirm("Apagar o registro?")) {
      deleteUser(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setList(list => {
            return [
              ...list.filter(list => list.id !== id)
            ]
          })
          alert('Apagado com sucesso')
        }
      });
    }

  };
  return (
    <Container maxWidth="lg" className={classes.container}>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
          id="excel"
        >
          <TableHead>
            <TableRow className={classes.rowMaster}>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Sobrenome</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Telefone</TableCell>
              <TableCell align="right">Sexo</TableCell>
              <TableCell align="right">Nascimento</TableCell>
              <TableCell align="right">Experiências</TableCell>
              <TableCell align="right">Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow key={row.id} className={classes.rowBody}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.lastname}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.cpf}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.genre}</TableCell>
                <TableCell align="right">{row.birthday}</TableCell>
                <TableCell align="right">{row.text}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReactExcel
        className={classes.btn}
        table="excel"
        filename="Excel file"
        sheet="Sheet"
        buttonText="Exportar"
      />
    </Container>
  );

}
