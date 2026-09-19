import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Beef,
  Clock3,
  Flame,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  UtensilsCrossed,
  X,
  Zap,
} from "lucide-react";
import comboImage from "@/assets/combo.jpg";
import heroImage from "@/assets/hero-burger.jpg";
import kitchenImage from "@/assets/kitchen-prep.jpg";
import { BrandMark } from "@/components/brand-mark";
import { OrderDialog } from "@/components/order-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatPrice, products, restaurant } from "@/data/restaurant";

const navItems = [
  ["Início", "inicio"],
  ["Cardápio", "cardapio"],
  ["Sobre nós", "sobre"],
  ["Localização", "localizacao"],
  ["Contato", "contato"],
] as const;

const reviews = [
  ["Um dos melhores burgers que já experimentei. A carne é muito saborosa!", "Lucas M."],
  ["Ambiente incrível, atendimento rápido e o hambúrguer estava perfeito.", "Mariana R."],
  ["O BBQ Burger virou meu favorito. Com certeza vou voltar.", "Pedro A."],
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function RestaurantSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const openOrder = (productId?: string) => {
    setSelectedProduct(productId);
    setOrderOpen(true);
  };

  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <main className="overflow-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-cream/10 bg-brand-ink/95 text-cream backdrop-blur-sm">
        <div className="site-container flex h-[74px] items-center justify-between gap-5">
          <button onClick={() => navigate("inicio")} aria-label="Ir ao início"><BrandMark /></button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {navItems.map(([label, id]) => <button key={id} onClick={() => navigate(id)} className="nav-link">{label}</button>)}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="brand" className="h-10 px-3 sm:px-4" onClick={() => openOrder()}><ShoppingBag /><span className="hidden sm:inline">Pedir agora</span></Button>
            <button className="grid size-10 place-items-center border border-cream/20 lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          {navItems.map(([label, id], index) => <button key={id} onClick={() => navigate(id)}><span>0{index + 1}</span>{label}<ArrowDownRight /></button>)}
        </div>
      </header>

      <section id="inicio" className="hero-section scroll-mt-20 bg-brand-ink text-cream">
        <div className="site-container grid min-h-[800px] items-center gap-8 pb-10 pt-28 lg:grid-cols-[.88fr_1.12fr] lg:pt-24">
          <div className="relative z-10 pt-4" data-reveal>
            <p className="eyebrow text-primary"><span className="mr-3 inline-block h-px w-8 bg-primary align-middle" />Feito na hora. Feito pra você.</p>
            <h1 className="mt-5 font-display text-[clamp(4.2rem,7.5vw,8.6rem)] leading-[.77] uppercase">
              Hambúrgueres<br />que dão<br /><span className="text-primary">vontade.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg">Ingredientes selecionados, hambúrguer artesanal e muito sabor em cada mordida.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="brand" size="lg" onClick={() => scrollTo("cardapio")}>Ver cardápio <ArrowRight /></Button>
              <Button variant="brand-outline" size="lg" onClick={() => openOrder()} className="text-cream">Pedir agora</Button>
            </div>
            <div className="mt-10 flex items-center gap-4 border-t border-cream/15 pt-5">
              <div><div className="flex text-primary" aria-label="5 estrelas">{[0,1,2,3,4].map((item) => <Star key={item} className="size-4 fill-current" />)}</div><strong className="mt-1 block font-display text-3xl">4,9</strong></div>
              <div className="h-10 w-px bg-cream/20" />
              <p className="max-w-32 text-xs font-bold uppercase leading-relaxed text-cream/60">+1.200 clientes satisfeitos</p>
            </div>
          </div>
          <div className="hero-visual" data-reveal>
            <div className="hero-sun" />
            <p className="hero-outline-word">ARTESANAL</p>
            <img src={heroImage} alt="Hambúrguer artesanal com cheddar, bacon e vegetais frescos" width={1536} height={1536} fetchPriority="high" className="hero-image" />
            <div className="craft-seal"><span>100%</span><strong>Sabor</strong><span>Artesanal</span></div>
            <Sparkles className="absolute right-[3%] top-[17%] size-10 text-primary" />
            <svg className="absolute bottom-[12%] left-[2%] w-20 text-primary" viewBox="0 0 100 40" fill="none"><path d="M2 30c24-25 45 13 94-19" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><path d="m84 5 13 6-9 12" stroke="currentColor" strokeWidth="4"/></svg>
          </div>
        </div>
      </section>

      <section className="bg-brand-charcoal text-cream">
        <div className="site-container grid sm:grid-cols-2 xl:grid-cols-4">
          {[
            [Beef, "Carne artesanal", "Produzida com ingredientes selecionados."],
            [Sparkles, "Ingredientes frescos", "Tudo preparado com cuidado."],
            [Flame, "Batata crocante", "Dourada, crocante e irresistível."],
            [Zap, "Feito na hora", "Seu pedido preparado especialmente para você."],
          ].map(([Icon, title, text], index) => (
            <div key={title as string} className="feature-item" data-reveal style={{ transitionDelay: `${index * 70}ms` }}><Icon className="size-7 text-primary" /><div><h3>{title as string}</h3><p>{text as string}</p></div></div>
          ))}
        </div>
      </section>

      <section id="cardapio" className="scroll-mt-16 bg-background py-20 sm:py-28">
        <div className="site-container">
          <div className="mb-10 flex items-end justify-between gap-8" data-reveal>
            <div><p className="eyebrow">Nosso cardápio</p><h2 className="section-title mt-3">Os favoritos<br />da casa</h2><p className="mt-4 max-w-xl text-muted-foreground">Escolha seu favorito e descubra por que todo mundo está falando deles.</p></div>
            <button onClick={() => openOrder()} className="hidden border-b-2 border-foreground pb-2 text-xs font-black uppercase md:flex">Ver cardápio completo <ArrowRight className="ml-2 size-4" /></button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product, index) => (
              <article key={product.id} className="product-card group" data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                <div className="overflow-hidden bg-brand-ink"><img src={product.image} alt={product.name} width={1200} height={912} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <div className="relative p-5">
                  <span className="absolute -top-6 right-4 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-90"><Plus /></span>
                  <h3 className="font-display text-[1.75rem] uppercase">{product.name}</h3>
                  <p className="mt-2 min-h-[72px] text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  <div className="mt-5 flex items-end justify-between"><strong className="font-display text-2xl text-brand-warm">{formatPrice(product.price)}</strong><button onClick={() => openOrder(product.id)} className="text-xs font-black uppercase underline decoration-2 underline-offset-4">Adicionar</button></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-brand-ink text-cream lg:grid-cols-2">
        <div className="promo-photo relative min-h-[580px] overflow-hidden" data-reveal>
          <img src={comboImage} alt="Combo com hambúrguer, batatas e bebida" width={1408} height={1104} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-12">
            <p className="eyebrow text-primary">A combinação completa</p>
            <h2 className="font-display text-[clamp(3.5rem,6vw,6.5rem)] leading-[.82] uppercase">Transforme seu<br />burger em um<br />combo</h2>
            <p className="mt-5 text-cream/70">Adicione batata crocante e bebida ao seu pedido.</p>
            <div className="mt-6 flex items-center gap-6"><strong className="font-display text-4xl text-primary">+ R$ 9,90</strong><Button variant="brand" onClick={() => openOrder()}>Quero meu combo</Button></div>
          </div>
        </div>
        <div className="relative flex min-h-[580px] flex-col justify-center overflow-hidden bg-primary p-8 text-primary-foreground sm:p-14" data-reveal>
          <div className="ingredient-rings" aria-hidden="true" />
          <UtensilsCrossed className="absolute right-10 top-10 size-16 opacity-20" />
          <p className="eyebrow">Feito com paixão</p>
          <h2 className="relative mt-4 font-display text-[clamp(4rem,7vw,8rem)] leading-[.76] uppercase">Burgers<br />feitos<br />de verdade</h2>
          <p className="relative mt-7 max-w-lg text-lg leading-relaxed">Da primeira mordida ao último detalhe, tudo é preparado para entregar uma experiência de verdade.</p>
          <Button variant="brand-dark" size="lg" className="relative mt-8 self-start" onClick={() => scrollTo("sobre")}>Conheça nossa história <ArrowRight /></Button>
        </div>
      </section>

      <section id="sobre" className="scroll-mt-16 bg-background py-20 sm:py-28">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative" data-reveal>
            <img src={kitchenImage} alt="Preparação artesanal de hambúrguer na cozinha" width={1408} height={1104} loading="lazy" className="aspect-[5/4] w-full object-cover" />
            <div className="absolute -bottom-5 -right-1 bg-primary px-5 py-4 font-display text-2xl uppercase text-primary-foreground sm:right-6">Desde 2021</div>
          </div>
          <div data-reveal>
            <p className="eyebrow">Nossa cozinha. Nossa essência.</p>
            <h2 className="section-title mt-4">Mais que um<br />hambúrguer.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">A Sua Hamburgueria nasceu de uma ideia simples: preparar hambúrgueres artesanais com ingredientes de qualidade, combinações marcantes e muito cuidado em cada detalhe.</p>
            <div className="mt-10 grid grid-cols-3 border-y border-foreground/20 py-6">
              {[["+5", "Anos de história"], ["+10 mil", "Pedidos"], ["4,9", "Avaliação média"]].map(([number, label]) => <div key={label} className="border-r border-foreground/15 px-3 first:pl-0 last:border-0"><strong className="block font-display text-3xl text-brand-warm sm:text-5xl">{number}</strong><span className="mt-2 block text-[.63rem] font-black uppercase sm:text-xs">{label}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="localizacao" className="scroll-mt-16 border-y border-border bg-secondary py-20 sm:py-28">
        <div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div data-reveal>
            <p className="eyebrow">Santa Brasa — SC</p><h2 className="section-title mt-4">Venha nos<br />visitar</h2>
            <div className="mt-8 space-y-5">
              <div className="contact-line"><MapPin /><p>{restaurant.address.map((line) => <span key={line}>{line}</span>)}</p></div>
              <div className="contact-line"><Phone /><p>{restaurant.phone}</p></div>
              <div className="contact-line"><Instagram /><p>{restaurant.instagram}</p></div>
            </div>
            <div className="mt-8 border-t border-foreground/20 pt-6">
              {restaurant.hours.map((item) => <div key={item.days} className="mb-3 flex justify-between gap-4 text-sm"><strong className="uppercase">{item.days}</strong><span>{item.time}</span></div>)}
            </div>
            <Button variant="brand-dark" size="lg" className="mt-6" onClick={() => setMapOpen(true)}><MapPin /> Abrir no mapa</Button>
          </div>
          <div className="map-graphic" data-reveal>
            <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
            <div className="map-label label-one">Av. das Brasas</div><div className="map-label label-two">Rua do Fogo</div>
            <div className="map-pin"><BrandMark compact /></div>
            <span className="absolute bottom-5 right-5 bg-background px-3 py-2 text-[.6rem] font-black uppercase">Mapa ilustrativo</span>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="site-container">
          <div className="mb-10 flex items-end justify-between" data-reveal><div><p className="eyebrow">Avaliações</p><h2 className="section-title mt-3">Quem prova,<br />aprova</h2></div><div className="hidden font-display text-8xl text-primary md:block">“</div></div>
          <div className="grid border-y border-border md:grid-cols-3">
            {reviews.map(([quote, author], index) => <blockquote key={author} className="review" data-reveal style={{ transitionDelay: `${index * 70}ms` }}><div className="flex text-primary">{[0,1,2,3,4].map((item) => <Star key={item} className="size-4 fill-current" />)}</div><p>“{quote}”</p><footer>— {author}</footer></blockquote>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-ink py-20 text-cream sm:py-28">
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 font-display text-[24vw] leading-none text-cream/[.025]">BURGER</div>
        <div className="site-container relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end" data-reveal>
          <div><p className="eyebrow text-primary">A fome não espera</p><h2 className="mt-4 font-display text-[clamp(5rem,10vw,10rem)] leading-[.74] uppercase">Ficou com<br /><span className="text-primary">vontade?</span></h2><p className="mt-6 text-cream/65">Seu próximo hambúrguer está a poucos cliques de distância.</p></div>
          <Button variant="brand" size="lg" className="h-14 px-8 text-base" onClick={() => openOrder()}><ShoppingBag /> Pedir agora</Button>
        </div>
      </section>

      <footer id="contato" className="scroll-mt-16 bg-brand-charcoal py-14 text-cream">
        <div className="site-container">
          <div className="grid gap-10 border-b border-cream/15 pb-12 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div><BrandMark /><p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">Hambúrguer artesanal, ingredientes de qualidade e muito sabor.</p><div className="mt-6 flex gap-3">{[Instagram, MessageCircle, Zap].map((Icon, index) => <a key={index} href="#contato" aria-label={["Instagram", "Facebook", "TikTok"][index]} className="grid size-10 place-items-center border border-cream/20 transition-colors hover:border-primary hover:text-primary"><Icon className="size-4" /></a>)}</div></div>
            <FooterColumn title="Navegação">{navItems.map(([label, id]) => <button key={id} onClick={() => navigate(id)}>{label}</button>)}</FooterColumn>
            <FooterColumn title="Atendimento">{restaurant.hours.map((item) => <span key={item.days}>{item.days}<small>{item.time}</small></span>)}</FooterColumn>
            <FooterColumn title="Contato"><a href={`tel:${restaurant.phone.replace(/\D/g, "")}`}>{restaurant.phone}</a><a href="#contato">{restaurant.instagram}</a></FooterColumn>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-[.65rem] font-bold uppercase text-cream/40 sm:flex-row"><p>© 2026 Sua Hamburgueria. Todos os direitos reservados.</p><p className="text-primary">Site demonstrativo</p></div>
        </div>
      </footer>

      <OrderDialog key={selectedProduct ?? "default"} open={orderOpen} onOpenChange={setOrderOpen} initialProductId={selectedProduct} />
      <Dialog open={mapOpen} onOpenChange={setMapOpen}><DialogContent className="max-w-md border-foreground bg-background sm:rounded-sm"><DialogHeader><p className="eyebrow">Localização fictícia</p><DialogTitle className="font-display text-4xl uppercase">Mapa demonstrativo</DialogTitle><DialogDescription className="pt-2 leading-relaxed">Este endereço foi criado exclusivamente para apresentação do site. Em um projeto real, o botão abriria a rota no aplicativo de mapas.</DialogDescription></DialogHeader><Button variant="brand-dark" onClick={() => setMapOpen(false)}>Entendi</Button></DialogContent></Dialog>
    </main>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="footer-column"><h3>{title}</h3>{children}</div>;
}