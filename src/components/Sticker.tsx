import { useLayoutEffect, useRef } from "react";
import { STICKER_URL } from "../lib/content";
import { gsap } from "../lib/scroll";

export function Sticker({ className = "" }: { className?: string }) {
  return (
    <span className={`sticker-crop ${className}`}>
      <img
        src={STICKER_URL}
        alt="Create Design Code Build for everyone sticker"
        width="468"
        height="190"
      />
    </span>
  );
}

/** A fixed product layer follows responsive DOM slots, never covering mobile copy. */
export function StickerStage({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const update = () => {
      const el = root.current;
      if (!el) return;
      const slots = [
        ...document.querySelectorAll<HTMLElement>("[data-sticker-slot]"),
      ];
      const visible = slots
        .map((slot) => slot.getBoundingClientRect())
        .filter((r) => r.bottom > 0 && r.top < innerHeight);
      const rect = visible.sort(
        (a, b) =>
          Math.abs(a.top + a.height / 2 - innerHeight / 2) -
          Math.abs(b.top + b.height / 2 - innerHeight / 2),
      )[0];
      if (!rect) {
        el.style.opacity = "0";
        return;
      }
      const size = Math.min(rect.width, innerWidth < 760 ? 300 : 440);
      const center =
        innerWidth < 760
          ? rect.top + rect.height / 2
          : Math.max(
              rect.top + size / 2,
              Math.min(innerHeight * 0.53, rect.bottom - size / 2),
            );
      el.style.width = `${size}px`;
      el.style.transform = `translate3d(${rect.left + rect.width / 2 - size / 2}px,${center - size / 2}px,0)`;
      el.style.opacity = "1";
    };
    gsap.ticker.add(update);
    update();
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);
  return (
    <div
      ref={root}
      className={`sticker-stage ${reduced ? "still" : ""}`}
      aria-hidden="true"
    >
      <Sticker className="floating-sticker" />
    </div>
  );
}
