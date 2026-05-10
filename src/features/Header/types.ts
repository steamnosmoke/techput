export type TMenuStore = {
    isOpen: boolean;
    toggleMenu: (v:boolean) => void;
}

export type TNav = {
    name: string;
    href: string;
    action: () => void;
}