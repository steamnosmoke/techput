// types.ts
export interface TContactStore {
  name: string;
  email: string;
  phone: string;
  nameEr: string;
  emailEr: string;
  phoneEr: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setNameEr: (value: string) => void;
  setEmailEr: (value: string) => void;
  setPhoneEr: (value: string) => void;
  clearForm: () => void;
  clearErrors: () => void;
  validateForm: () => boolean;
}

export interface TFormData {
  name: string;
  email: string;
  phone: string;
}
