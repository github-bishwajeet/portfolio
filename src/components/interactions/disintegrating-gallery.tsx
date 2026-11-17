"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
} from "react";

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
};

export interface DisintegratingGalleryProps {
  images: GalleryImage[];
  className?: string;
}

const TILE_COLUMNS = 8;
const TILE_ROWS = 6;
const TILES = Array.from(
  { length: TILE_COLUMNS * TILE_ROWS },
  (_, index) => {
    const column = index % TILE_COLUMNS;
    const row = Math.floor(index / TILE_COLUMNS);
    const dx = (column - (TILE_COLUMNS - 1) / 2) * 8;
    const dy = (row - (TILE_ROWS - 1) / 2) * 7;
    return {
      column,
      row,
      dx,
      dy,
      rotation: ((index * 17) % 25) - 12,
      delay: ((index * 13) % 10) * 0.006,
    };
  },
);

export function DisintegratingGallery({
  images,
  className,
}: DisintegratingGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const drag = useRef({ active: false, x: 0, scrollLeft: 0 });
  const frame = useRef(0);

  const updateScatter = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const viewportWidth = window.innerWidth;
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const bounds = card.getBoundingClientRect();
        const center = bounds.left + bounds.width / 2;
        const distance = Math.abs(center - viewportWidth / 2);
        const start = viewportWidth * 0.2;
        const end = viewportWidth * 0.53;
        const scatter = Math.max(0, Math.min(1, (distance - start) / (end - start)));
        card.style.setProperty("--scatter", scatter.toFixed(3));
      });
    });
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    updateScatter();
    const observer = new ResizeObserver(updateScatter);
    observer.observe(scroller);
    scroller.addEventListener("scroll", updateScatter, { passive: true });
    window.addEventListener("resize", updateScatter, { passive: true });

    return () => {
      cancelAnimationFrame(frame.current);
      observer.disconnect();
      scroller.removeEventListener("scroll", updateScatter);
      window.removeEventListener("resize", updateScatter);
    };
  }, [updateScatter]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    drag.current = {
      active: true,
      x: event.clientX,
      scrollLeft: scroller.scrollLeft,
    };
    scroller.setPointerCapture(event.pointerId);
    scroller.dataset.dragging = "true";
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || !drag.current.active) return;
    scroller.scrollLeft =
      drag.current.scrollLeft - (event.clientX - drag.current.x) * 1.15;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    drag.current.active = false;
    if (scroller?.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    if (scroller) delete scroller.dataset.dragging;
  };

  return (
    <div
      ref={scrollerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        "group/gallery flex w-full cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-[15vw] py-12 [scrollbar-width:none] select-none data-[dragging=true]:cursor-grabbing [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {images.map((image, imageIndex) => (
        <article
          key={`${image.src}-${imageIndex}`}
          ref={(element) => {
            cardRefs.current[imageIndex] = element;
          }}
          style={{ "--scatter": 0 } as CSSProperties}
          className="relative h-[26rem] w-[72vw] max-w-md shrink-0 snap-center overflow-visible rounded-3xl md:h-[34rem] md:w-[28rem]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              draggable={false}
              sizes="(min-width: 768px) 448px, 72vw"
              className="pointer-events-none object-cover [opacity:calc(1-var(--scatter)*.85)] [transform:scale(calc(1-var(--scatter)*.04))]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-visible rounded-3xl">
            {TILES.map((tile, tileIndex) => (
              <span
                key={tileIndex}
                className="absolute bg-cover will-change-transform"
                style={
                  {
                    left: `${(tile.column / TILE_COLUMNS) * 100}%`,
                    top: `${(tile.row / TILE_ROWS) * 100}%`,
                    width: `${100 / TILE_COLUMNS + 0.15}%`,
                    height: `${100 / TILE_ROWS + 0.15}%`,
                    backgroundImage: `url("${image.src}")`,
                    backgroundSize: `${TILE_COLUMNS * 100}% ${TILE_ROWS * 100}%`,
                    backgroundPosition: `${(tile.column / (TILE_COLUMNS - 1)) * 100}% ${(tile.row / (TILE_ROWS - 1)) * 100}%`,
                    opacity: "calc(var(--scatter) * .94)",
                    transform: `translate(calc(${tile.dx}px * var(--scatter)), calc(${tile.dy}px * var(--scatter))) rotate(calc(${tile.rotation}deg * var(--scatter))) scale(calc(1 - var(--scatter) * .08))`,
                    transition: `transform 180ms ${tile.delay}s ease-out, opacity 140ms ease-out`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 text-white [opacity:calc(1-var(--scatter)*.5)]">
            <p className="text-xl font-semibold md:text-2xl">{image.title}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
