import { useLayoutEffect, useState } from 'react';
import { Pricing } from './components/Pricing';
import { Chrome } from './components/Chrome';
import { StickerStage } from './components/Sticker';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useRevealSystem } from './hooks/useReveal';
import { benefits } from './lib/content';
import { initMotion } from './lib/scroll';

const states = [
  { name: 'Green', title: 'Fresh', detail: 'A simple starting signal when a container is closed.', color: '#237349', message: 'Container closed. Your timer has started.' },
  { name: 'Yellow', title: 'Eat soon', detail: 'A reminder to bring forgotten leftovers back into your plans.', color: '#b77c13', message: 'A little nudge: check the leftovers in your fridge.' },
  { name: 'Red', title: 'Discard alert', detail: 'The proposed warning state when the lid detects signs of spoilage.', color: '#b33c30', message: 'Spoilage alert. Do not rely on this concept to assess food safety.' },
];
function Demo() {
  const [selected, setSelected] = useState(0);
  const s = states[selected];
  return <div className="demo-panel">
    <div className="demo-tabs" role="group" aria-label="Choose a sample indicator state">
      {states.map((item, i) => <button key={item.name} aria-pressed={selected === i} onClick={() => setSelected(i)}>{item.name}</button>)}
    </div>
    <div className="demo-output" aria-live="polite">
      <span className="demo-light" style={{ background: s.color }} />
      <span className="micro">SAMPLE LID SIGNAL</span>
      <h3>{s.title}</h3><p>{s.detail}</p>
      <div className="phone-note"><strong>FreshCheck app concept</strong><p>{s.message}</p></div>
    </div>
    <button className="reset-demo" onClick={() => setSelected(0)}>Reset demo ↺</button>
    <p className="demo-disclaimer">Illustrative states only. This demo does not read a sensor or determine whether food is safe. Sensor reliability and app reminders require further testing.</p>
  </div>;
}
export default function App() {
  if (location.pathname.endsWith("pricing.html")) return <Pricing/>;
  return <Home/>;
}
function Home() {
  const reduced = useReducedMotion();
  useLayoutEffect(() => initMotion(reduced), [reduced]);
  useRevealSystem(!reduced);
  return <>
    <Chrome reduced={reduced}/><StickerStage reduced={reduced}/>
    <main id="main">
      <section id="hero" className="hero">
        <div className="hero-eyebrow"><span className="status-dot"/> SMART LID. SIMPLE ROUTINE.<span className="edition">FRESHCHECK / PRODUCT CONCEPT</span></div>
        <h1 className="hero-title"><span className="green">LESS</span><br/>GUESS.<br/><span className="blue">MORE FRESH.</span></h1>
        <div className="hero-product-slot" data-sticker-slot />
        <div className="hero-bottom"><div><p>Meet FreshCheck. A smart-lid concept designed to help you keep track of leftovers, with a timer, a simple light, and a timely nudge.</p><a className="pricing-home-link" href="pricing.html">Explore the $52.99 starter bundle ↗</a><a className="button" href="#demo">Try the lid demo <span aria-hidden="true">↓</span></a></div><span className="micro scroll-hint">KEEP LEFTOVERS IN THE PICTURE ↓</span></div>
      </section>
      <section id="value" className="value section">
        <div className="section-label"><span>01 /</span> A SMALL CHANGE TO YOUR FRIDGE</div>
        <div className="split"><div className="section-copy"><h2 className="display" data-reveal>LEFTOVERS.<br/><span className="green">REMEMBERED.</span></h2><p data-reveal>Between classes, work, and family plans, yesterday’s dinner is easy to forget. FreshCheck aims to make keeping track feel effortless.</p><p data-reveal>Close the lid to start a timer. Check a color indicator at a glance. Get a proposed app reminder before leftovers slip your mind.</p><span className="micro">FOR STUDENTS. BUSY FAMILIES. EVERYDAY LEFTOVERS.</span></div><div className="value-product" data-sticker-slot /></div>
        <div className="ticker" aria-hidden="true"><span>CLOSE <b>＋</b> TRACK <b>＋</b> REMEMBER <b>＋</b> REPEAT <b>＋</b> CLOSE <b>＋</b> TRACK</span></div>
      </section>
      <section id="benefits" className="benefits section">
        <div className="section-label"><span>02 /</span> HOW THE CONCEPT WORKS</div>
        <h2 className="display" data-reveal>ONE LID.<br/><span className="green">LESS TO TRACK.</span></h2>
        <div className="benefit-cards">{benefits.map((item,i)=><article className={`benefit-card ${item.color}-card`} key={item.title} data-reveal><div className="card-top"><span className="micro">0{i+1}</span><span className="card-symbol" aria-hidden="true">{item.icon}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>
      <section id="demo" className="section demo-section">
        <div className="section-label"><span>03 /</span> TRY THE INDICATOR</div>
        <div className="split"><div className="section-copy"><h2 className="display">THREE COLORS.<br/><span className="blue">ONE GLANCE.</span></h2><p>Tap each color to explore the proposed lid signals and see a sample app message. No app download or account needed.</p><p className="concept-note">FreshCheck is a student venture concept, not an available or validated food-safety device.</p></div><Demo/></div>
      </section>
      <section id="pack" className="pack section">
        <div className="section-label"><span>04 /</span> DESIGNED AROUND REAL ROUTINES</div>
        <div className="split"><div className="pack-art"><div className="pack-outline one"/><div className="pack-outline two"/><div className="pack-product" data-sticker-slot/><span className="micro pack-caption">FRESHCHECK SMART LID / CONCEPT ILLUSTRATION</span></div><div className="section-copy"><h2 className="display">EASY TO USE.<br/><span className="green">EASY TO KEEP.</span></h2><p>Our design priorities are a durable lid, easy cleaning, clear instructions, and compact storage. We’re also exploring one lid size across different containers.</p><p>A small review sample of related storage products highlighted convenience and seal performance. The next step is testing FreshCheck itself with students and busy households.</p><a className="button" href="#clubs">Share your routine <span aria-hidden="true">↓</span></a></div></div>
      </section>
      <section id="clubs" className="clubs section">
        <div className="section-label"><span>05 /</span> HELP SHAPE FRESHCHECK</div>
        <div className="club-grid"><h2 className="display" data-reveal>A BUSY LIFE.<br/>A FULL FRIDGE.<br/><span>SOUND FAMILIAR?</span></h2><div className="club-copy"><div className="club-symbols" aria-hidden="true"><span>●</span><span>●</span><span>●</span></div><p>What gets forgotten in your fridge? Tell Ryan what would make tracking leftovers easier, and which FreshCheck feature you would use most.</p><a className="button" href="mailto:ryan.zannoni23@gmail.com?subject=FreshCheck%20feedback">Email Ryan your feedback <span aria-hidden="true">↗</span></a><p className="micro email-note">Opens your email app. No purchase or sign-up required.</p></div></div>
        <div className="club-tags"><span>COLLEGE STUDENTS</span><span>BUSY HOUSEHOLDS</span><span>MEAL PREPPERS</span></div>
      </section>
    </main>
    <footer><a className="wordmark" href="#hero">FRESHCHECK</a><p>Keep track of leftovers.<strong>Make room for your day.</strong></p><a className="store-link" href="pricing.html">Starter bundle · $52.99 USD ↗</a><a className="store-link" href="https://ryanzannoni-creator.github.io/">Meet Ryan Zannoni ↗</a><div className="footer-note"><span>A Marketing Venture concept by Ryan Zannoni.</span><span>Proposed features. Product not available for purchase.</span></div></footer>
  </>;
}
