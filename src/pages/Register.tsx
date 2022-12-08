import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Container, Button, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../services/api/config/api";
import { IPerson } from "../services/api/person/conex";
import { mask, unMask } from "remask";
import { cpf } from "cpf-cnpj-validator";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: "#f5f3f3",
      margin: "40px auto",
      maxWidth: 400,
      borderRadius: 10,
      padding: "30px",
      textAlign: "left",
      [theme.breakpoints.down("sm")]: {
        margin: "5px 5px",
        padding: "40px",
        width: "350",
      },
    },
    title: {
      margin: theme.spacing(2),
    },
    textField: {
      borderRadius: 4,
      marginTop: 12,
      marginBottom: 12,
      textAlign: "left",
      height: "60px",
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(1),
        fontSize: "1rem",
      },
    },
    textFieldGroup: {
      borderRadius: 4,
      marginTop: 9,
      background: "transparent",
      maxWidth: 770,
      textAlign: "left",
      height: "7ch",
      border: "1px solid #bbb0b0",
      fontSize: "1.2rem",
      width: "100%",
      "&::placeholder": {
        color: "red",
      },
    },
    controlForm: {
      margin: theme.spacing(5),
    },
    btn: {
      padding: 20,
      color: "#000",
      marginTop: 30,
      "&:hover": {
        background: "#897b7f",
        color: "#ccc",
        [theme.breakpoints.down("sm")]: {
          padding: 10,
        },
      },
    },
    containerCentral: {
      margin: "0 auto",
    },
  })
);
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "minimo de 3 caractes")
    .required("* Campo nome requerido"),
  lastname: Yup.string()
    .min(3, "minimo de 3 caractes")
    .required("* Campo sobrenome requerido"),
  email: Yup.string().email().required("* Campo e-mail requerido"),
  text: Yup.string()
    .min(10, "ao menos um item obrigatório")
    .required("* Campo experiencia requerido"),
  phone: Yup.string()
    .min(12, "minimo de 10 caractes")
    .required("* Campo telefone requerido"),
  cpf: Yup.string()
    .min(14, "minimo de 11 caractes")
    .required("* Campo cpf requerido")
    .test((value) => cpf.isValid(value)),
  birthday: Yup.date().required("Campo data requerido"),
});

export default function Register() {
  const classes = useStyles();

  const [list, setList] = useState<IPerson[]>([]);
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await api
        .post("/person", values)
        .then((response) => {
          alert("sucesso");
        })
        .catch(() => {
          alert("erro");
        });
    },
    validateOnMount: true,
    validationSchema,
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      birthday: "",
      text: "",
      phone: "",
      cpf: "",
      genre: "",
    },
  });
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.container}>
          <div className={classes.containerCentral}>
            <Typography variant="h6">Nome</Typography>
            <TextField
              id="standard-basic"
              name="name"
              value={formik.values.name}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classes.textField}
              variant="outlined"
              error={Boolean(formik.errors.name) && formik.touched.name}
              helperText={formik.errors.name}
              fullWidth
            />
            <br />
            {formik.errors.name && formik.touched.name}
            <Typography variant="h6" className={classes.title}>
              Sobrenome
            </Typography>
            <TextField
              id="standard-basic"
              name="lastname"
              value={formik.values.lastname}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classes.textField}
              variant="outlined"
              error={Boolean(formik.errors.lastname) && formik.touched.lastname}
              helperText={formik.errors.lastname}
              fullWidth
            />
            <br />
            {formik.errors.lastname && formik.touched.lastname}

            <Typography variant="h6" className={classes.title}>
              E-mail
            </Typography>

            <TextField
              id="standard-email-input"
              variant="outlined"
              type="email"
              autoComplete="current-email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classes.textField}
              error={Boolean(formik.errors.email) && formik.touched.email}
              helperText={formik.errors.email}
              fullWidth
            />
            <br />
            {formik.errors.email && formik.touched.email}
            <Typography variant="h6" className={classes.title}>
              Nascimento
            </Typography>
            <TextField
              id="birthday"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classes.textField}
              error={Boolean(formik.errors.birthday) && formik.touched.birthday}
              helperText={formik.errors.birthday}
              fullWidth
            />
            <br />
            {formik.errors.birthday && formik.touched.birthday}

            <br />
            <Typography variant="h6" className={classes.title}>
              Sexo
            </Typography>
            <FormControl
              variant="outlined"
              className={classes.textField}
              fullWidth
            >
              <Select
                name="genre"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={formik.values.genre}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>Escolha</em>
                </MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
              </Select>
            </FormControl>
            <br />
            {formik.errors.genre && formik.touched.genre}
            <div>
              <Typography variant="h6" className={classes.title}>
                Telefone
              </Typography>
              <TextField
                id="standard-basic"
                name="phone"
                value={mask(formik.values.phone, ["99 9999-9999"])}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={classes.textField}
                variant="outlined"
                error={Boolean(formik.errors.phone) && formik.touched.phone}
                helperText={formik.errors.phone}
                fullWidth
              />
              <br />
              {formik.errors.phone && formik.touched.phone}

              <Typography variant="h6" className={classes.title}>
                CPF
              </Typography>
              <TextField
                id="standard-basic"
                name="cpf"
                value={mask(unMask(formik.values.cpf), ["999.999.999-99"])}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={classes.textField}
                variant="outlined"
                error={Boolean(formik.errors.cpf) && formik.touched.cpf}
                helperText={formik.errors.cpf}
                fullWidth
              />
              <br />
              {formik.errors.cpf && formik.touched.cpf}

              <Typography variant="h6" className={classes.title}>
                Experiência
              </Typography>
              <TextField
                id="standard-multiline-static"
                multiline
                rows={4}
                variant="outlined"
                name="text"
                value={formik.values.text}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.text) && formik.touched.text}
                helperText={formik.errors.text}
                fullWidth
              />
              <br />
              {formik.errors.text && formik.touched.text}
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                disabled={!formik.isValid}
                type="submit"
                className={classes.btn}
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
}
