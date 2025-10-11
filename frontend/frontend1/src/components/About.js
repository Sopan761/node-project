import React from "react";
import "./AboutUs.css";
import aboutImage from "../assets/about-us.jpg";
import founderImage from "../assets/our-founder.jpg";

const AboutUs = () => {
  return (
    <div className="aboutus-page">
      <div className="aboutus-container">
        <header className="aboutus-top">
          <div className="aboutus-image-wrap">
            {/* add srcSet if you have multiple resolutions, e.g. aboutImage + aboutImage2x */}
            <img
              src={aboutImage}
              alt="Audio-visual team setting up a stage"
              className="aboutus-image"
              loading="lazy"
            />
          </div>

          <div className="aboutus-text">
            <h1>About Acoustic</h1>
            <p className="lead">
              Acoustic Visions is a hub of innovation, delivering high-quality audio-visual
              solutions with unmatched technical excellence and creativity.
            </p>
            <a href="/contact" className="aboutus-contact-btn">Contact Us</a>
          </div>
        </header>

        <section className="aboutus-section">
          <h2>Who We Are</h2>
          <p>
            At Acoustic Visions, we blend cutting-edge technology with creative expertise
            to craft unforgettable audiovisual experiences. Whether it's a concert, corporate
            event, or private function, we deliver high-impact AV solutions that elevate your event.
          </p>
        </section>

        <section className="aboutus-founder">
          <div className="founder-text">
            <h2>About Our Founder</h2>
            <p>
              Summy V S is a seasoned Sound Engineer and Technical Director with an impressive
              28 years of experience in sound engineering and technical management for
              large-scale events across India, the Middle East, and the USA. Having worked with
              industry leaders like MediaPro India and RECPRO, Summy has honed his skills in
              setting up and managing sound systems for high-stakes events, from film awards to
              national games and rock shows.
            </p>

            <p>
              Throughout his career, Summy has been the go-to sound engineer for prestigious
              awards like the Vanitha Film Awards, where he has served as the official engineer for
              over 15 years. He has also collaborated with renowned artists, including Hariharan,
              Shankar Mahadevan, and Susheela Raman, bringing their performances to life with his
              sound expertise.
            </p>

            <p>
              Summy's international experience spans venues across the US, UK,
              Australia, and Singapore, where he has managed A/V systems and ensured flawless
              sound quality.
            </p>

            <p>
              As a former Technical Director at MediaPro AV International and Kappa TV, Summy led
              technical teams, optimized sound quality, and introduced initiatives to improve
              operational efficiency. His technical repertoire includes handling LED video walls,
              projectors, analog and digital mixing systems, and more, making him a versatile asset
              in the audio-visual industry.
            </p>

            <p>
              With a blend of technical prowess and excellent interpersonal skills, Summy has built
              long-standing relationships with clients who value his consistency, dedication, and
              expertise. His commitment to delivering top-notch sound quality has positioned him
              as a leader in sound engineering, making him an invaluable partner for companies and
              events worldwide.
            </p>
          </div>

          <div className="founder-image-wrap">
            <img
              src={founderImage}
              alt="Summy V S — Founder and Technical Director"
              className="founder-image"
              loading="lazy"
            />
          </div>
        </section>

        <footer className="aboutus-footer">
          <h3>Work with us</h3>
          <p>We provide AV solutions for concerts, corporate events, private functions and more.</p>
          <a className="aboutus-contact-btn" href="/contact">Get in touch</a>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
