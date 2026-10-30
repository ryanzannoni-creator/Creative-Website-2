import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { navigation, STORE_URL } from "../lib/content";
import { gsap, lockScroll, scrollTo } from "../lib/scroll";

export function Chrome({ reduced }: { reduced: boolean }) {
  const pricing = location.pathname.endsWith("pricing.html");
  const homeLink = (href: string) => pricing && href.startsWith("#") ? `index.html${href}` : href;
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        progress.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: reduced ? true : 0.45,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [reduced]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(menu.current, {
        y: 0,
        yPercent: open ? 0 : -100,
        duration: reduced ? 0 : 0.7,
        ease: "expo.inOut",
      });
      if (open)
        gsap.fromTo(
          ".menu-link",
          { y: reduced ? 0 : 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: reduced ? 0 : 0.055,
            delay: reduced ? 0 : 0.15,
            duration: reduced ? 0 : 0.6,
          },
        );
    });
    return () => ctx.revert();
  }, [open, reduced]);
  useEffect(() => {
    lockScroll(open);
    if (open)
      menu.current
        ?.querySelector<HTMLAnchorElement>("a")
        ?.focus({ preventScroll: true });
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab" && open) {
        const items = [
          toggle.current,
          ...(menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
        ].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        items[
          (i + (e.shiftKey ? -1 : 1) + items.length) % items.length
        ]?.focus();
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="frame" aria-hidden="true" />
      <div className="rail">
        <button
          ref={toggle}
          className={`menu-toggle ${open ? "on" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <div className="rail-track">
          <div ref={progress} />
        </div>
        <span className="rail-caption">KEEP TRACK OF FRESH</span>
      </div>
      <header className={open ? "menu-open" : ""}>
        <a className="wordmark" href={homeLink("#hero")} onClick={() => setOpen(false)}>
          FRESHCHECK
          <span className="brand-dots" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </a>
        <a className="button header-cta" href={homeLink(STORE_URL)}>
          Try the demo <span aria-hidden="true">↗</span>
        </a>
      </header>
      <div
        ref={menu}
        id="site-menu"
        className="menu-sheet"
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label="Site navigation"
        inert={!open}
        style={{ transform: "translateY(-100%)" }}
      >
        <nav>
          {navigation.map((item, i) => (
            <a
              key={item.href}
              className="menu-link"
              href={homeLink(item.href)}
              onClick={(e) => {
                if (pricing || !item.href.startsWith("#")) { setOpen(false); return; }
                e.preventDefault();
                setOpen(false);
                lockScroll(false);
                scrollTo(item.href);
                toggle.current?.focus();
              }}
            >
              <small>0{i + 1}</small>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="menu-bottom">
          <span>Close. Track. Remember.</span>
          <a href={homeLink(STORE_URL)}>Explore the lid demo ↗</a>
        </div>
      </div>
    </>
  );
}
