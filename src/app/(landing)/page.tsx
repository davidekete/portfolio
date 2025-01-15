import styles from "./landing.module.css";
import GitHubContribution from "../components/github-contribution";

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Content HEADER */}
        <div className={styles.info_header}>
          <div className={styles.header_text}>
            <h1 className={styles.name}>
              David <span>[</span>Ekete<span>]</span>
            </h1>
            <p className={styles.jd}>Documentation Engineer</p>
          </div>
          <div className={styles.header_socials}>
            <a href="https://">
              <img src="landing-assets/twitter.svg" alt="" />X
            </a>
            <a href="https://">
              <img src="landing-assets/github.svg" alt="" />
              GitHub
            </a>
          </div>
        </div>
        {/* Content HEADER */}
        <p className={styles.about}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          aperiam eligendi non qui sunt delectus illo minus consequatur eum
          maxime. Exercitationem reprehenderit sit nulla officiis consectetur
          iure officia nobis nam?
        </p>

        <div className={styles.github_contributions}>
          <GitHubContribution userName={"davidekete"} />
        </div>

        <div className={styles.links}>
          <a href="https://" className={styles.large_link}>
            <p>Portfolio Documentation</p>
            <img src="landing-assets/arrow-up-right.svg" alt="" />
          </a>

          <div className={styles.small_links}>
            <a href="http://">
              About
              <img src="landing-assets/arrow-up-right.svg" alt="" />
            </a>
            <a href="http://">
              Projects<sup>(5)</sup>
              <img src="landing-assets/arrow-up-right.svg" alt="" />
            </a>
            <a href="http://">
              Articles<sup>(5)</sup>
              <img src="landing-assets/arrow-up-right.svg" alt="" />
            </a>
            <a href="http://">
              Resume
              <img src="landing-assets/download.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
