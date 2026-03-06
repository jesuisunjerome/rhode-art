import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { useGetMasterpieces } from "../../hooks/products/queries";
import ArtCard, { ArtCardSkeleton } from "../collection/ArtCard";

export default function CollectionSection() {
  // get masterpieces
  const { masterpieces, isPending } = useGetMasterpieces();

  const scrollRef = useRef(null);
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);

  const scroll = (offset) => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const nextScrollLeft = Math.max(
      0,
      Math.min(el.scrollLeft + offset, maxScrollLeft),
    );

    el.scrollLeft = nextScrollLeft;
    setDisabledPrev(nextScrollLeft <= 0);
    setDisabledNext(nextScrollLeft >= maxScrollLeft);

    el.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
  };

  const onTouchScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setDisabledPrev(el.scrollLeft <= 0);
    setDisabledNext(el.scrollLeft >= maxScrollLeft);
  };

  return (
    <section className="my-10 py-20 relative">
      <div className="space-y-10 px-5 md:px-10 xl:px-30">
        <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary-dark mb-4">
              Colección obras maestras
            </h2>
            <div className="flex gap-3">
              <button
                disabled={disabledPrev}
                onClick={() => scroll(-200)}
                className="px-4 py-2 border border-slate-200 bg-light hover:bg-primary-dark hover:text-primary transition-colors disabled:cursor-not-allowed disabled:hover:bg-light disabled:hover:text-secondary-dark disabled:opacity-50"
              >
                <MoveLeftIcon className="w-4 h-4" />
              </button>
              <button
                disabled={disabledNext}
                onClick={() => scroll(200)}
                className="px-4 py-2 border border-slate-200 bg-light hover:bg-primary-dark hover:text-primary transition-colors disabled:cursor-not-allowed disabled:hover:bg-light disabled:hover:text-secondary-dark disabled:opacity-50"
              >
                <MoveRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <Link to="/collection" className="text-sm text-accent underline">
              Ver toda la colección
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-scroll gap-6 lg:gap-10 scrollbar-hide"
          onScroll={onTouchScroll}
          onTouchStart={onTouchScroll}
          onTouchMove={onTouchScroll}
          onTouchEnd={onTouchScroll}
        >
          {isPending
            ? Array.from({ length: 6 }).map((_, index) => (
                <ArtCardSkeleton key={index} />
              ))
            : masterpieces.map((artwork) => (
                <ArtCard key={artwork._id} artwork={artwork} />
              ))}
        </div>
      </div>
    </section>
  );
}
