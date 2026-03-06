export default function VerticalLines() {
  return (
    <div className="fixed top-0 left-0 h-full w-full px-5 md:px-20 xl:px-30 pointer-events-none">
      <div className="grid grid-cols-5 h-full">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="border-slate-50 md:border-slate-100 h-full border-l last:border-r"
          />
        ))}
      </div>
    </div>
  );
}
