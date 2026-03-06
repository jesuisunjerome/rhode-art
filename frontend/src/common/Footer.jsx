export default function Footer() {
  return (
    <footer className="border-t border-slate-100 py-5 bg-light relative">
      <div className="space-y-10 px-5 md:px-10 xl:px-30">
        <p className="text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Rhode Art. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
