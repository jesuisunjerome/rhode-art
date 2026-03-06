export default function Form() {
  return (
    <form className="grid sm:grid-cols-2 md:grid-cols-1 gap-5">
      <div className="space-y-1">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input type="text" id="name" className="form-input" />
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" id="email" className="form-input" />
      </div>
      <div className="space-y-1">
        <label htmlFor="phone" className="form-label">
          Teléfono
        </label>
        <input type="tel" id="phone" className="form-input" />
      </div>
      <div className="space-y-1">
        <label htmlFor="subject" className="form-label">
          Asunto
        </label>
        <input type="text" id="subject" className="form-input" />
      </div>
      <div className="space-y-1 sm:col-span-2 md:col-span-1">
        <label htmlFor="message" className="form-label">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={5}
          className="form-input resize-none"
        ></textarea>
      </div>
      <div className="sm:col-span-2 md:col-span-1 space-y-1">
        <button type="submit" className="btn-primary group w-full">
          Enviar mensaje
        </button>
      </div>
    </form>
  );
}
