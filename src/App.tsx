import { useCallback, useState } from "react"
import { site } from "./site.config"
import { Countdown } from "./components/Countdown"
import { FloatingAccents } from "./components/FloatingAccents"
import { InviteGate } from "./components/InviteGate"
import { Reveal } from "./components/Reveal"
import { RsvpForm } from "./components/RsvpForm"
import { SiteNav } from "./components/SiteNav"
import { useLenis } from "./hooks/useLenis"

const brand = `${site.partners.one.first} & ${site.partners.two.first}`

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

      <main id="main">
        <section className="hero" aria-label="Invitation">
          <div className="hero__media">
            <img
              src={site.heroImage}
              alt=""
              width={2400}
              height={1600}
              fetchPriority="high"
            />
          </div>
          <div className="hero__veil" aria-hidden="true" />
          <FloatingAccents />
          <div className="hero__content">
            <h1 className="hero__names">
              {site.partners.one.first}
              <span>and</span>
              {site.partners.two.first}
            </h1>
            <p className="hero__lede">{site.tagline}</p>
            <div className="hero__actions">
              <a className="btn btn--solid" href="#rsvp">
                RSVP
              </a>
              <a className="btn btn--ghost" href="#day">
                View the day
              </a>
            </div>
          </div>
        </section>

        <Reveal as="section" className="section story" delay={40}>
          <div id="story" aria-labelledby="story-title" className="story__inner">
            <div className="story__media">
              <img
                src={site.gatheringImage}
                alt="Guests gathered for a celebration"
                width={1600}
                height={1200}
                loading="lazy"
              />
            </div>
            <div className="story__copy">
              <p className="section__eyebrow">Our story</p>
              <h2 className="section__title" id="story-title">
                {site.story.headline}
              </h2>
              <p className="section__body">{site.story.body}</p>
            </div>
          </div>
        </Reveal>

        <section className="day" id="day" aria-labelledby="day-title">
          <div className="section">
            <Reveal className="day__intro">
              <p className="section__eyebrow">{site.date.label}</p>
              <h2 className="section__title" id="day-title">
                The shape of our day
              </h2>
              <p className="section__body">
                Ceremony begins at {site.date.time}. Dress code: {site.dressCode}.
              </p>
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
          <div id="venue" aria-labelledby="venue-title" className="venue__inner">
            <div className="venue__copy">
              <p className="section__eyebrow">Where</p>
              <h2 className="section__title" id="venue-title">
                Meet us under the olive trees
              </h2>
              <div className="venue__meta">
                <p className="venue__name">{site.venue.name}</p>
                <p className="venue__address">{site.venue.address}</p>
                <p className="venue__note">{site.venue.note}</p>
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
            <div className="venue__media">
              <img
                src={site.venueImage}
                alt="Wedding venue atmosphere"
                width={1600}
                height={1200}
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="section rsvp" delay={80}>
          <div id="rsvp" aria-labelledby="rsvp-title">
            <div className="rsvp__panel">
              <div>
                <p className="section__eyebrow">RSVP</p>
                <h2 className="section__title" id="rsvp-title">
                  {site.rsvp.headline}
                </h2>
                <p className="section__body">{site.rsvp.body}</p>
              </div>
              <RsvpForm />
            </div>
          </div>
        </Reveal>
      </main>

      <footer className="footer">
        <div className="footer__brand">{brand}</div>
        <p>{site.footerNote}</p>
      </footer>
    </div>
  )
}
