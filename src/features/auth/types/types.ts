export type TInputs = {
  type: string;
  label: string;
  value: string;
  placeholder: string;
  func: (s: string) => void;
  fieldName: string;
};

export type TModalProps = {
    onClose: ()=>void;
    onSwitchToRegister?: ()=>void
    onSwitchToLogin?: ()=>void
}