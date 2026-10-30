import { Chrome } from './Chrome';
import { STICKER_URL } from '../lib/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Pricing() {
  const reduced = useReducedMotion();
  return <>
    <Chrome reduced={reduced}/>
    <main id="main" className="pricing-page">
      <section className="pricing-intro">
        <a className="pricing-back" href="index.html">← Meet FreshCheck</a>
        <div className="section-label">THE FRESHCHECK STARTER BUNDLE</div>
        <h1 className="display">ONE BUNDLE.<br/><span className="green">A SIMPLER ROUTINE.</span></h1>
        <p className="pricing-lead">Help keep yesterday’s leftovers in today’s plans. A proposed smart lid and compatible container for students and busy families.</p>
      </section>
      <section className="pricing-grid" aria-label="Starter bundle pricing">
        <div className="pricing-art"><span className="micro">SMART LID + COMPATIBLE CONTAINER</span><img src={STICKER_URL} alt="Illustration of the proposed FreshCheck lid and container"/><p className="micro">PRODUCT CONCEPT · ILLUSTRATION ONLY</p></div>
        <article className="pricing-card">
          <span className="pricing-badge">ONE PROPOSED BUNDLE</span>
          <h2>FreshCheck starter bundle</h2>
          <p>One proposed smart lid plus a compatible container.</p>
          <div className="public-price">$52.99 <span>USD</span></div>
          <p className="pricing-unit">Per bundle · one smart lid and compatible container</p>
          <ul className="pricing-features"><li><span>01</span> Proposed automatic timer</li><li><span>02</span> Planned app reminders</li><li><span>03</span> Proposed indicator and sensor</li></ul>
          <p className="pricing-status">FreshCheck is a product concept. Performance remains unvalidated, and the bundle is not available for purchase.</p>
          <a className="button" href="mailto:ryan.zannoni23@gmail.com?subject=FreshCheck%20starter%20bundle%20question">Ask about FreshCheck <span aria-hidden="true">↗</span></a>
          <p className="pricing-email-note">Opens your email app. No order or payment is taken.</p>
          <a className="pricing-demo-link" href="index.html#demo">Explore the interactive lid demo →</a>
        </article>
      </section>
      <section className="pricing-questions" aria-labelledby="questions-title"><div><span className="micro">A FEW THINGS TO KNOW</span><h2 id="questions-title">Clear details.<br/><span className="green">No guesswork.</span></h2></div><div>
        <details><summary>What does the bundle include?</summary><p>One proposed smart lid and one compatible container. The proposed features are an automatic timer, app reminders, and an indicator and sensor. Performance remains unvalidated.</p></details>
        <details><summary>Are there other tiers or add-ons?</summary><p>The starter bundle is the only option presented here. No optional add-ons are offered.</p></details>
        <details><summary>Can I buy it now?</summary><p>FreshCheck is a student venture concept and is not available for purchase. You can explore the demo or email Ryan with questions. No release date is announced.</p></details>
        <details><summary>Does it tell me whether food is safe?</summary><p>No validated food-safety capability is established. The proposed indicator and sensor still require testing. The interactive demo illustrates the concept only.</p></details>
      </div></section>
    </main>
    <footer><a className="wordmark" href="index.html">FRESHCHECK</a><p>Keep track of leftovers.<strong>Make room for your day.</strong></p><a className="store-link" href="index.html#demo">Try the lid demo ↗</a><div className="footer-note"><span>A Marketing Venture concept by Ryan Zannoni.</span><span>Proposed features. Product not available for purchase.</span></div></footer>
  </>;
}
