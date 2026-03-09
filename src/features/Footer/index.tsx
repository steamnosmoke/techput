export default function Footer() {
  return (
    <footer className="bg-deepBlue text-white py-4 max-sm:py-2 mt-23 max-sm:mt-16">
      <div className="container mx-auto text-center">
        <p className="max-sm:text-sm">&copy; {new Date().getFullYear()} ТЕХ.ПУТЬ</p>
      </div>
    </footer>
  );
}