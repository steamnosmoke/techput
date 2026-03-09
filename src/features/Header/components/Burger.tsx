import useMenuStore from "../store/useMenuStore";

export default function Burger() {
  const isOpen = useMenuStore ((s) => s.isOpen);
  const toggleMenu = useMenuStore ((s) => s.toggleMenu);
  return (
    <div className="w-5 h-3 flex flex-col justify-between" onClick={toggleMenu}>
      <div className={`upper${isOpen ? "-open" : "-close"} w-full h-0.5 bg-white`}></div>
      <div className={`middle${isOpen ? "-open" : "-close"} w-full h-0.5 bg-white`}></div>
      <div className={`lower${isOpen ? "-open" : "-close"} w-full h-0.5 bg-white`}></div>
    </div>
  );
}
