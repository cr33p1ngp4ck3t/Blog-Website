import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { getPosts, postImage } from "@/lib/posts";
import ArticleFeed from "./components/ArticleFeed";
import SavingsPlanner from "./components/SavingsPlanner";
import { jsonLd, siteUrl } from "@/lib/site";

export const revalidate = 60;
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const posts = await getPosts();
  const featured = posts.find((post) => post.featured) || posts[0];
  const editors = posts
    .filter((post) => post._id !== featured?._id)
    .slice(0, 3);
  return (
    <main id="main-content">
      <section className="shell hero">
        <div className="hero-copy">
          <h1>
            Your money.
            <br />
            More{" "}
            <span className="hero-word">
              possibility
              <svg
                viewBox="0 0 650 35"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M5 22 Q250 0 640 14 M50 30 Q310 12 600 24" />
              </svg>
            </span>
            <span className="orange-dot">.</span>
          </h1>
          <p>
            Make sense of the money stuff.
            <br />
            Make room for the life stuff.
          </p>
          <div className="hero-actions">
            <Link href="#latest" className="primary-button">
              Find your next good move <ArrowUpRight size={20} />
            </Link>
            <Link href="#money-tool" className="text-link">
              Try the savings planner <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="mini-spark" aria-hidden="true">
              ✳
            </span>
            <span>
              Practical guides. Real sources. A little more breathing room.
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-image-frame">
            <Image
              src="/images/money.jpg"
              alt="A small green plant growing beside a pile of coins"
              fill
              priority
              sizes="(max-width: 800px) 85vw, 40vw"
              className="hero-photo"
            />
          </div>
          <div className="hero-circle" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path
                  id="circle-text"
                  d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
                />
              </defs>
              <text>
                <textPath href="#circle-text">
                  SMALL STEPS • BIG POSSIBILITIES •{" "}
                </textPath>
              </text>
            </svg>
            <MoveUpRight />
          </div>
          <div className="savings-ticket">
            <span>YOUR NEXT CHAPTER</span>
            <strong>
              Starts small.
              <br />
              Grows with you.
            </strong>
            <div>
              <span>ONE GOOD MOVE AT A TIME</span>
              <ArrowUpRight size={25} />
            </div>
          </div>
          <span className="art-spark" aria-hidden="true">
            ✳
          </span>
          <span className="art-caption">A little saved. A lot possible.</span>
          <div className="checker-detail" aria-hidden="true" />
        </div>
      </section>

      <div className="editorial-band">
        <div className="shell band-inner">
          <span>
            GOOD WITH MONEY.
            <br />
            <strong>BETTER AT LIFE.</strong>
          </span>
          <span className="band-star" aria-hidden="true">
            ✳
          </span>
          <span>Spend with intention</span>
          <span className="band-star" aria-hidden="true">
            ✳
          </span>
          <span>Save for possibilities</span>
          <span className="band-star" aria-hidden="true">
            ✳
          </span>
          <span>Find your footing</span>
          <ArrowDown size={21} />
        </div>
      </div>

      {featured && (
        <section className="shell spotlight-section">
          <div className="section-heading">
            <span className="section-label">THE BIG READ</span>
            <span className="issue-label">YOUR MONEY, EXPLAINED ↗</span>
          </div>
          <div className="spotlight-grid">
            <Link
              href={`/post/${featured.slug.current}`}
              className="spotlight-image"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={postImage(featured)}
                alt={featured.mainImage?.alt || featured.title}
                fill
                sizes="(max-width: 800px) 100vw, 55vw"
              />
              <div className="image-corner">
                <ArrowUpRight size={34} />
              </div>
            </Link>
            <div className="spotlight-copy">
              <div className="post-card-meta">
                <span>
                  {featured.categories[0]?.title || "Financial health"}
                </span>
                <span>{featured.readingTime} MIN READ</span>
              </div>
              <h2>
                <Link href={`/post/${featured.slug.current}`}>
                  {featured.title}
                </Link>
              </h2>
              <p>{featured.excerpt}</p>
              <Link
                className="text-link"
                href={`/post/${featured.slug.current}`}
              >
                Let’s get into it <ArrowUpRight size={19} />
              </Link>
              <div className="spotlight-bottom">
                <span className="mini-spark" aria-hidden="true">
                  ✳
                </span>
                <span>Less overwhelm. More “I’ve got this.”</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <ArticleFeed posts={posts} homepage />

      <section className="topic-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="section-label">START WHERE YOU ARE</span>
              <h2>
                What’s on
                <br />
                your <span>mind?</span>
              </h2>
            </div>
            <p className="section-description">
              You don’t need to know it all.
              <br />
              Just where to start.
            </p>
          </div>
          <div className="topic-paths">
            {[
              {
                number: "01",
                title: "Make more room.",
                copy: "Everyday savings, fewer money leaks, and habits that stick.",
                href: "saving-money",
                color: "lime",
              },
              {
                number: "02",
                title: "Find your footing.",
                copy: "Debt, credit, and building a buffer for life’s curveballs.",
                href: "financial-health",
                color: "orange",
              },
              {
                number: "03",
                title: "Get a helping hand.",
                copy: "Clear routes to food, housing, and utility assistance.",
                href: "government-assistance",
                color: "lavender",
              },
            ].map((topic) => (
              <Link
                key={topic.href}
                href={`/category/${topic.href}`}
                className={`topic-path ${topic.color}`}
              >
                <span className="topic-number">{topic.number}</span>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.copy}</p>
                </div>
                <ArrowUpRight size={30} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SavingsPlanner />

      <section className="shell field-notes">
        <div className="section-heading">
          <div>
            <span className="section-label">WORTH A FEW MINUTES</span>
            <h2>
              Small reads.
              <br />
              <span>Useful takeaways.</span>
            </h2>
          </div>
          <Link href="/articles" className="text-link">
            Keep exploring <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="field-notes-grid">
          {editors.map((post, index) => (
            <Link
              href={`/post/${post.slug.current}`}
              key={post._id}
              className="field-note"
            >
              <span className="note-index">0{index + 1}</span>
              <div>
                <span className="section-label">
                  {post.categories[0]?.title || "The journal"}
                </span>
                <h3>{post.title}</h3>
                <span className="note-read">{post.readingTime} MIN READ</span>
              </div>
              <ArrowUpRight size={23} />
            </Link>
          ))}
        </div>
      </section>

      <section className="shell follow-journal">
        <div><span className="section-label">KEEP A GOOD HABIT GOING</span><h2>Make room for your next good read.</h2><p>Add FinAid Hub to your RSS reader for new guides, or compare where to keep your savings.</p></div>
        <div className="contact-actions"><a href="/feed.xml" className="primary-button">Follow the journal <ArrowUpRight size={18} /></a><Link href="/compare" className="outline-button">Compare savings options <ArrowUpRight size={18} /></Link></div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FinAid Hub",
            url: siteUrl,
          }),
        }}
      />
    </main>
  );
}
