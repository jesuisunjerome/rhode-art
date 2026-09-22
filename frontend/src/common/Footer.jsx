export default function Footer() {
  return (
    <footer className="border-t border-slate-100 py-5 bg-light relative">
      <div className="px-5 md:px-10 xl:px-30">
        <p className="text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Rhode Art. Todos los derechos
          reservados.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-center text-slate-500 text-sm">
          Diseñado y desarrollado por <a href="https://logenik.net" className="underline hover:text-accent" target="_blank" rel="noopener noreferrer">Logenik</a>
        </p>
      </div>
    </footer>
  );
}
