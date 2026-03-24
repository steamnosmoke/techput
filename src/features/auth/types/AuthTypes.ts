export type TLogin = {
  email: string;
  password: string;
  confirm?: string;
  name?: string;
  phone?: string;
};

export type TAuthStore = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirm: string;
  error: string;
  phone: string;
  status: boolean;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirm: (confirm: string) => void;
  setPhone: (phone: string) => void;
  setStatus: (status: boolean) => void;
  logOut: () => void;
  setError: (error: string) => void;
};
