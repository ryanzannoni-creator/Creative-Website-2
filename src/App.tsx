import { useEffect, useLayoutEffect, useRef } from "react";
import { Chrome } from "./components/Chrome";
import { GiantType } from "./components/GiantType";
import { StickerStage } from "./components/Sticker";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useRevealSystem } from "./hooks/useReveal";
import { benefits, STORE_URL } from "./lib/content";
import { gsap, initMotion, ScrollTrigger } from "./lib/scroll";

function CTA({ club = false }: { club?: boolean }) {
  return (
    <a className="button" href={STORE_URL}>
      {club ? "Order for your club" : "Get the Builder Pack"}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
function Label({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number} /</span>
      {children}
    </div>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  useLayoutEffect(() => initMotion(reduced), [reduced]);
  useRevealSystem(!reduced);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".hero-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.12,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.12,
        },
      );
      gsap.fromTo(
        ".hero-bottom",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7 },
      );
      gsap.to(".hero-title", {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, hero);
    return () => ctx.revert();
  }, [reduced]);
  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => live && ScrollTrigger.refresh());
    const timer = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <Chrome reduced={reduced} />
      <StickerStage reduced={reduced} />
      <main id="main">
        <section id="hero" className="hero" ref={hero}>
          <div className="hero-eyebrow">
            <span className="status-dot" /> FOR THE NEXT THING YOU MAKE{" "}
            <span className="edition">CAMPUS EDITION / 01</span>
          </div>
          <h1 className="hero-title" aria-label="Made for builders">
            <span className="hero-first">
              <span className="word-mask">
                <span className="hero-word green">MADE</span>
              </span>
              <span className="word-mask">
                <span className="hero-word yellow">FOR</span>
              </span>
            </span>
            <span className="word-mask">
              <span className="hero-word blue">BUILDERS</span>
            </span>
          </h1>
          <div className="hero-product-slot" data-sticker-slot />
          <div className="hero-bottom">
            <div>
              <p>
                The Create Design Code Build sticker, for students who actually
                make things.
              </p>
              <CTA />
            </div>
            <span className="micro scroll-hint">
              SCROLL TO MAKE YOUR MARK <span>↓</span>
            </span>
          </div>
        </section>
        <section id="value" className="value section">
          <Label number="01">A LITTLE STICKER. A LOT OF YOU.</Label>
          <div className="split">
            <div className="section-copy">
              <h2 className="display" data-reveal>
                YOUR LAPTOP.
                <br />
                YOUR <span className="green">IDENTITY.</span>
              </h2>
              <p data-reveal>
                Your laptop already says a lot about you. This sticker says you
                build stuff, whether that's code, designs, or projects nobody
                asked for.
              </p>
              <span className="micro" data-reveal>
                FOR THE CODERS. THE DESIGNERS. THE MAKERS.
              </span>
            </div>
            <div className="value-product" data-sticker-slot />
          </div>
          <div className="ticker" aria-hidden="true">
            <span>
              CREATE <b>✳</b> DESIGN <b>↗</b> CODE <b>＋</b> BUILD <b>✳</b>{" "}
              CREATE <b>↗</b> DESIGN
            </span>
          </div>
        </section>
        <section id="benefits" className="benefits section">
          <Label number="02">RIGHT AT HOME IN YOUR STACK</Label>
          <GiantType
            lines={["SMALL STICKER.", "BIG ENERGY."]}
            tone="ink"
            from={reduced ? 0 : 0.04}
            to={reduced ? 0 : -0.04}
            as="h2"
            className="benefit-heading"
          />
          <div className="benefit-cards">
            {benefits.map((item, i) => (
              <article
                className={`benefit-card ${item.color}-card`}
                key={item.title}
                data-reveal
              >
                <div className="card-top">
                  <span className="micro">0{i + 1}</span>
                  <span className="card-symbol" aria-hidden="true">
                    {item.icon}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="pack" className="pack section">
          <Label number="03">MORE WAYS TO MAKE IT YOURS</Label>
          <div className="split">
            <div className="pack-art">
              <div className="pack-outline one" aria-hidden="true" />
              <div className="pack-outline two" aria-hidden="true" />
              <div className="pack-product" data-sticker-slot />
              <span className="micro pack-caption">
                YOUR NEXT FAVORITE STICKER
              </span>
            </div>
            <div className="section-copy">
              <h2 className="display" data-reveal>
                THE
                <br />
                <span className="blue">BUILDER</span>
                <br />
                PACK<span className="red">.</span>
              </h2>
              <p data-reveal>
                Get it bundled with other tech and design stickers so you're
                getting a full set, not paying a lot for one.
              </p>
              <div data-reveal>
                <CTA />
              </div>
            </div>
          </div>
        </section>
        <section id="clubs" className="clubs section">
          <Label number="04">BUILD SOMETHING TOGETHER</Label>
          <div className="club-grid">
            <h2 className="display" data-reveal>
              RUNNING A<br />
              CODING OR
              <br />
              <span>DESIGN CLUB?</span>
            </h2>
            <div className="club-copy">
              <div className="club-symbols" aria-hidden="true">
                <span>↗</span>
                <span>✳</span>
                <span>+</span>
              </div>
              <p data-reveal>
                Grab packs for your whole team. Perfect for hackathons, club
                fairs, and new member welcome kits.
              </p>
              <div data-reveal>
                <CTA club />
              </div>
            </div>
          </div>
          <div className="club-tags">
            <span>HACKATHONS</span>
            <span>CLUB FAIRS</span>
            <span>WELCOME KITS</span>
          </div>
        </section>
      </main>
      <footer>
        <a className="wordmark" href="#hero">
          BUILDER PACK
        </a>
        <p>
          Create. Design. Code. Build. <strong>For builders.</strong>
        </p>
        <a className="store-link" href={STORE_URL}>
          Google Merchandise Store ↗
        </a>
        <div className="footer-note">
          <span>A student landing page concept.</span>
          <span>MAKE SOMETHING THAT MATTERS.</span>
        </div>
      </footer>
    </>
  );
}
