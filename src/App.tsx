import { site } from "./site.config"
import { RsvpForm } from "./components/RsvpForm"

const brand = `${site.partners.one.first} & ${site.partners.two.first}`

export default function App() {
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="nav" aria-label="Primary">
        <div className="nav__brand">{site.monogram}</div>
        <ul className="nav__links">
          <li>
            <a href="#story">Story</a>
          </li>
          <li>
            <a href="#day">Day</a>
          </li>
          <li>
            <a href="#venue">Venue</a>
          </li>
          <li>
            <a href="#rsvp">RSVP</a>
          </li>
        </ul>
      </header>

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

        <section className="section story" id="story" aria-labelledby="story-title">
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
        </section>

        <section className="day" id="day" aria-labelledby="day-title">
          <div className="section">
            <div className="day__intro">
              <p className="section__eyebrow">{site.date.label}</p>
              <h2 className="section__title" id="day-title">
                The shape of our day
              </h2>
              <p className="section__body">
                Ceremony begins at {site.date.time}. Dress code: {site.dressCode}.
              </p>
            </div>
            <ol className="timeline">
              {site.schedule.map((item) => (
                <li className="timeline__item" key={item.title}>
                  <div className="timeline__time">{item.time}</div>
                  <div>
                    <h3 className="timeline__title">{item.title}</h3>
                    <p className="timeline__detail">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section venue" id="venue" aria-labelledby="venue-title">
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
              <a className="btn btn--ink" href={site.venue.mapUrl} target="_blank" rel="noreferrer">
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
        </section>

        <section className="section rsvp" id="rsvp" aria-labelledby="rsvp-title">
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
        </section>
      </main>

      <footer className="footer">
        <div className="footer__brand">{brand}</div>
        <p>{site.footerNote}</p>
      </footer>
    </div>
  )
}
