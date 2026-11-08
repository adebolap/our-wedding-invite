import { useCallback, useState } from "react"
import { site } from "./site.config"
import { Countdown } from "./components/Countdown"
import { InviteGate } from "./components/InviteGate"
import { JourneyRail } from "./components/JourneyRail"
import { MomentsScratch } from "./components/MomentsScratch"
import { Reveal } from "./components/Reveal"
import { SiteNav } from "./components/SiteNav"
import { StyleInspiration } from "./components/StyleInspiration"
import { useLenis } from "./hooks/useLenis"

export default function App() {
  const [opened, setOpened] = useState(false)
  const handleOpen = useCallback(() => setOpened(true), [])
  useLenis(opened)

  return (
    <div className={`site${opened ? " site--open" : " site--locked"}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <InviteGate onOpen={handleOpen} />

      <SiteNav />
      <JourneyRail active={opened} />

      <main id="main">
        <section className="hero" id="hero" aria-label="Invitation">
          <div className="hero__media">
            <img
              className="hero__media-bleed"
              src={site.heroImage}
              alt=""
              width={1500}
              height={2000}
              aria-hidden="true"
            />
            <img
              className="hero__media-photo"
              src={site.heroImage}
              alt=""
              width={1500}
              height={2000}
              fetchPriority="high"
            />
          </div>
          <div className="hero__veil" aria-hidden="true" />
          <div className="hero__content">
            <h1 className="hero__names">
              {site.partners.one.first}
              <span>and</span>
              {site.partners.two.first}
            </h1>
            <p className="hero__lede">{site.tagline}</p>
            <div className="hero__actions">
              <a className="btn btn--solid" href="#day">
                See the day
              </a>
              <a className="btn btn--ghost hero__action--style" href="#style">
                Dress code
              </a>
            </div>
          </div>
        </section>

        <section className="story" id="story" aria-labelledby="story-title">
          <Reveal className="section story__shell" delay={40}>
            <div className="story__inner">
              <div className="story__media">
                <figure className="story__frame">
                  <img
                    src={site.gatheringImage}
                    alt=""
                    width={1200}
                    height={1600}
                    loading="lazy"
                  />
                </figure>
              </div>
              <div className="story__copy">
                <h2 className="section__title story__title" id="story-title">
                  {site.story.headline}
                </h2>
                <p className="story__reference">{site.story.reference}</p>
              </div>
            </div>
            <ol className="story-stamps" aria-label="Story milestones">
              {site.story.chapters.map((chapter, index) => (
                <li className="story-stamp" key={chapter.title}>
                  <article className="story-stamp__card">
                    <img
                      src={chapter.image}
                      alt={chapter.alt}
                      width={800}
                      height={1000}
                      loading="lazy"
                    />
                    <div className="story-stamp__veil" aria-hidden="true" />
                    <div className="story-stamp__meta">
                      <span className="story-stamp__index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="story-stamp__title">{chapter.title}</p>
                      <p className="story-stamp__when">{chapter.when}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="day" id="day" aria-labelledby="day-title">
          <div className="section">
            <Reveal className="day__intro">
              <p className="section__eyebrow">{site.date.label}</p>
              <h2 className="section__title" id="day-title">
                What to expect
              </h2>
              <p className="section__body">
                We begin at {site.date.time}. Vows at 5:00. Dress code:{" "}
                {site.dressCode}.
              </p>
              <ul className="colour-cocktail" aria-label="Colour cocktail">
                {site.colourCocktail.map((swatch) => (
                  <li className="colour-cocktail__item" key={swatch.name}>
                    <span
                      className="colour-cocktail__swatch"
                      style={{ background: swatch.hex }}
                      aria-hidden="true"
                    />
                    <span className="colour-cocktail__name">{swatch.name}</span>
                  </li>
                ))}
              </ul>
              <div id="style">
                <StyleInspiration />
              </div>
              <Countdown />
            </Reveal>
            <ol className="timeline">
              {site.schedule.map((item, index) => (
                <Reveal
                  as="li"
                  className="timeline__item"
                  key={item.title}
                  delay={index * 90}
                >
                  <div className="timeline__time">{item.time}</div>
                  <div>
                    <h3 className="timeline__title">{item.title}</h3>
                    <p className="timeline__detail">{item.detail}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <Reveal as="section" className="section venue" delay={60}>
          <div id="venue" aria-labelledby="venue-title" className="venue__inner venue__inner--simple">
            <div className="venue__copy">
              <p className="section__eyebrow">Where</p>
              <h2 className="section__title" id="venue-title">
                {site.venue.name}
              </h2>
              <div className="venue__meta">
                <p className="venue__address">{site.venue.address}</p>
              </div>
              <p style={{ marginTop: "1.5rem" }}>
                <a
                  className="btn btn--ink"
                  href={site.venue.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open map
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="section moments" delay={80}>
          <div id="moments" aria-labelledby="moments-title">
            <div className="moments__intro">
              <p className="section__eyebrow">For you</p>
              <h2 className="section__title" id="moments-title">
                {site.moments.headline}
              </h2>
              <p className="section__body">{site.moments.body}</p>
            </div>

            <MomentsScratch />
          </div>
        </Reveal>
      </main>

      <footer className="footer">
        <div className="footer__brand">{site.monogram}</div>
        <p>{site.footerNote}</p>
      </footer>
    </div>
  )
}
