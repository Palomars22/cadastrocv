import api from "../config/api";

export interface IPerson {
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
export function create(payload: IPerson) {
  return api.post("/person", payload);
}
export function editUser(payload: IPerson) {
  return api.put("/person", payload);
}
export function listUser() {
  return api.get("/person");
}

export function deleteUser(id: number) {
  return api.delete(`/person/${id}`);
}
