import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { nanoid } from "nanoid";


import type { TLogin } from "../../types/AuthTypes";
import type { TUser } from "../../../../app/types/user";

const DB_URL = "https://69a5a354885dcb6bd6a8d8bc.mockapi.io/users";

async function registerUser({
  email,
  password,
  confirm,
}: TLogin): Promise<TUser> {
  if (password !== confirm) {
    throw new Error("Passwords do not match");
  }

  const { data: users } = await axios.get<TUser[]>(DB_URL, {
    params: { email },
  });

  if (users) {
    throw new Error("This e-mail is already registered");
  }


  const newUser = {
    id: nanoid(10),
    name: "",
    email,
    phone: "",
    passwordHash: password,
    status: false,
  };

  const { data } = await axios.post<TUser>(DB_URL, newUser);
  
  return data;
}

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: ["register"],
  });
}
