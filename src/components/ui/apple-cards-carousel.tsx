"use client";

import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image, { type ImageProps } from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type CardData = {
  src: string;
  title: string;
  category: string;
  content: ReactNode;
};

export function Carousel({
  items,
  initialScroll = 0,
}: {
  items: ReactNode[];
  initialScroll?: number;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    setCanScrollLeft(carousel.scrollLeft > 1);
    setCanScrollRight(
      carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth - 1,
    );
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollLeft = initialScroll;
    updateScrollState();

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(carousel);
    return () => observer.disconnect();
  }, [initialScroll, updateScrollState]);

  const scroll = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.7, 325),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      <div
        ref={carouselRef}
        onScroll={updateScrollState}
        className="flex w-full snap-x snap-mandatory gap-[21px] overflow-x-auto py-8 pl-5 pr-[12vw] [scrollbar-width:none] md:gap-[25px] md:pl-10 md:pr-14 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div key={index} className="snap-start">
            {item}
          </div>
        ))}
      </div>
      <div className="mr-4 flex justify-end gap-2 md:mr-10">
        <button
          type="button"
          aria-label="Scroll carousel left"
          disabled={!canScrollLeft}
          onClick={() => scroll(-1)}
          className="grid size-10 place-items-center rounded-full bg-[#e8e8ed] text-[#1d1d1f] transition hover:bg-[#d2d2d7] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Scroll carousel right"
          disabled={!canScrollRight}
          onClick={() => scroll(1)}
          className="grid size-10 place-items-center rounded-full bg-[#e8e8ed] text-[#1d1d1f] transition hover:bg-[#d2d2d7] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

export function Card({
  card,
  index,
  layout = false,
}: {
  card: CardData;
  index: number;
  layout?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const layoutId = layout ? `card-${card.title}-${index}` : undefined;

  const close = useCallback(() => setOpen(false), []);
  useOutsideClick(modalRef, close);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  return (
    <>
      <motion.button
        layoutId={layoutId}
        type="button"
        onClick={() => setOpen(true)}
        className="group relative flex h-[496px] w-[275px] shrink-0 flex-col overflow-hidden rounded-lg border border-[#d2d2d7] bg-white text-left shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition hover:border-[#86868b] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:h-[560px] md:w-[312px]"
      >
        <div className="relative min-h-0 flex-1 overflow-hidden border-b border-[#d2d2d7] bg-[#e8e8ed]">
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            sizes="312px"
            priority={index < 2}
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="relative z-10 bg-white px-5 pt-4 pb-6">
          <p className="text-[12px] font-medium text-[#6e6e73]">{card.category}</p>
          <h3 className="mt-1 text-[21px] font-semibold tracking-tight text-[#1d1d1f] md:text-[24px]">
            {card.title}
          </h3>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={card.title}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              layoutId={layoutId}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-[#d2d2d7] bg-white shadow-2xl"
            >
              <button
                type="button"
                aria-label="Close card"
                onClick={close}
                className="absolute top-4 right-4 z-20 grid size-10 place-items-center rounded-full bg-white/90 text-[#1d1d1f] shadow-sm backdrop-blur"
              >
                <X className="size-5" />
              </button>

              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f5f5f7]">
                <BlurImage
                  src={card.src}
                  alt={card.title}
                  fill
                  sizes="896px"
                  className="object-cover object-top"
                />
              </div>

              <div className="p-6 md:p-8">
                <p className="text-[14px] font-medium text-[#6e6e73]">
                  {card.category}
                </p>
                <h2 className="mt-1 text-[32px] font-semibold tracking-tight text-[#1d1d1f] md:text-[44px]">
                  {card.title}
                </h2>
                <div className="mt-6">{card.content}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function BlurImage({
  className,
  alt,
  onLoad,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [props.src]);

  return (
    <Image
      {...props}
      alt={alt}
      ref={imgRef}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      className={cn(
        "transition duration-500",
        loaded ? "scale-100 blur-0" : "scale-[1.01] blur-[2px]",
        className,
      )}
    />
  );
}
