import { useState } from "react";
import { ArrowRight, FlowerLotus, Gift, List, X } from "@phosphor-icons/react";

const products = [
  {
    name: "どら焼き",
    description: "ふっくら生地に、粒感を残したやさしい甘さのつぶ餡。こはる堂の定番です。",
    image: "/assets/reference/product-classic-crop.png",
    generated: "/assets/generated/product-classic.png",
  },
  {
    name: "抹茶どら焼き",
    description: "香り豊かな抹茶餡をたっぷりと。ほろ苦さと甘さのバランスがやみつきになります。",
    image: "/assets/reference/product-matcha-crop.png",
    generated: "/assets/generated/product-matcha.png",
  },
  {
    name: "栗どら焼き",
    description: "やさしい甘さの餡に、ほくほくの栗を合わせた季節の味わいです。",
    image: "/assets/reference/product-chestnut-crop.png",
    generated: "/assets/generated/product-chestnut.png",
  },
];

function AssetImage({ generated, fallback, alt, ...props }) {
  const [source, setSource] = useState(generated || fallback);
  return (
    <img
      {...props}
      src={source}
      alt={alt}
      onError={() => {
        if (source !== fallback) setSource(fallback);
      }}
    />
  );
}

function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="こはる堂 ホーム">こはる堂</a>
      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={24} /> : <List size={26} />}
      </button>
      <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="メインナビゲーション">
        <a href="#about" onClick={closeMenu}>お菓子について</a>
        <a href="#story" onClick={closeMenu}>家族のこと</a>
        <a href="#pickup" onClick={closeMenu}>お取り置き</a>
        <a href="#gift" onClick={closeMenu}>贈りもの</a>
      </nav>
    </header>
  );
}

export function App() {
  return (
    <main id="top">
      <AppHeader />

      <section className="hero" aria-labelledby="hero-title">
        <AssetImage
          className="hero-image"
          generated="/assets/generated/hero.png"
          fallback="/assets/reference/hero-crop.png"
          alt="湯気の立つお茶と、焼きたてのどら焼きが並ぶ家族の食卓"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <h1 id="hero-title">今日のおやつを、<br />家族のまんなかに。</h1>
          <p>ふっくら焼いた皮に、やさしい甘さの餡。<br />家族で手を動かし、今日の分を<br />ていねいに焼いています。</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#about">お店へ行く <ArrowRight weight="bold" /></a>
            <a className="button button-light" href="#pickup">お取り置きする <ArrowRight weight="bold" /></a>
          </div>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-copy">
          <h2>家族で焼く、<br />毎日のどら焼き</h2>
          <FlowerLotus className="section-mark" weight="fill" aria-hidden="true" />
          <p>朝の支度を終えたら、今日のどら焼き作り。<br />生地を混ぜて、銅板でふっくらと焼き上げ、<br />餡を炊いて、ひとつずつ手で挟む。<br />家族みんなで手を動かす時間が、<br />こはる堂のいちばんの原点です。<br />日々のおやつが、家族の団らんになりますように。</p>
        </div>
        <div className="process-gallery" aria-label="どら焼き作りの様子">
          <AssetImage
            generated="/assets/generated/process-griddle.png"
            fallback="/assets/reference/process-griddle-crop.png"
            alt="銅板でどら焼きの皮を焼く様子"
          />
          <div className="process-stack">
            <AssetImage
              generated="/assets/generated/process-fill.png"
              fallback="/assets/reference/process-fill-crop.png"
              alt="焼いた皮に餡をのせる様子"
            />
            <AssetImage
              generated="/assets/generated/process-finish.png"
              fallback="/assets/reference/process-finish-crop.png"
              alt="どら焼きをていねいに仕上げる様子"
            />
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true"><FlowerLotus weight="fill" /></div>

      <section className="products-section" id="about">
        <div className="products-intro">
          <h2>いつものおやつ</h2>
          <AssetImage
            className="leaf-mark"
            generated="/assets/generated/botanical-sprig.png"
            fallback="/assets/reference/product-classic-crop.png"
            alt=""
            aria-hidden="true"
          />
          <p>素材のやさしさを大切に、<br />毎日食べたくなる素朴なおいしさを<br />お届けしています。</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <AssetImage
                generated={product.generated}
                fallback={product.image}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gift-section" id="gift">
        <div className="gift-copy">
          <h2>大切な人への贈りもの</h2>
          <Gift className="gift-mark" weight="light" aria-hidden="true" />
          <p>こころを込めて包んだ、こはる堂の贈りもの。<br />大切なあの人へ、やさしい時間を届けます。</p>
          <a className="button button-primary" href="#pickup">贈りものを見る <ArrowRight weight="bold" /></a>
        </div>
        <AssetImage
          className="gift-image"
          generated="/assets/generated/gift-box.png"
          fallback="/assets/reference/gift-crop.png"
          alt="どら焼きの詰め合わせと贈答箱"
        />
      </section>

      <section className="closing" id="pickup">
        <AssetImage
          className="closing-leaf"
          generated="/assets/generated/botanical-sprig.png"
          fallback="/assets/reference/product-classic-crop.png"
          alt=""
          aria-hidden="true"
        />
        <div>
          <p>おやつの時間に、こはる堂を。</p>
          <FlowerLotus className="section-mark" weight="fill" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
