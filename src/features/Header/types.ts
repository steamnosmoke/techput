export type TMenuStore = {
    isOpen: boolean;
    toggleMenu: () => void;
}

export type TNav = {
    name: string;
    href: string;
    action: () => void;
}