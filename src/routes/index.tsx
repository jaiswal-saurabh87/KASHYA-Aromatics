import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Gift,
  Leaf,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type FormEvent, type SyntheticEvent, useEffect, useMemo, useState } from "react";
import heroImage from "@/assets/kashya-hero.jpg";
import dhoopImage from "@/assets/kashya-dhoop.jpg";
import samraniImage from "@/assets/kashya-samrani.jpg";
import ingredientsImage from "@/assets/kashya-ingredients.jpg";
import { Button } from "@/components/ui/button";
import { formatPrice, products, type Product } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KASHYA — Ancient Calm. Modern Living." },
      {
        name: "description",
        content:
          "Discover KASHYA Aromatics and KASHYA Rituals—considered dhoop, samrani and objects for a slower, more intentional home.",
      },
      { property: "og:title", content: "KASHYA — Ancient Calm. Modern Living." },
      {
        property: "og:description",
        content: "Indian aromatic traditions, thoughtfully presented for modern living.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Storefront,
});

type CartLine = { product: Product; quantity: number };

const categories = [
  { name: "Dhoop", note: "Grounding formats for daily pause", image: dhoopImage, alt: "Dhoop sticks in a cream ceramic vessel" },
  { name: "Incense Sticks", note: "Botanical expressions, coming soon", image: ingredientsImage, alt: "Natural aromatic botanicals on handmade paper" },
  { name: "Camphor & Naturals", note: "Traditional materials, simply presented", image: samraniImage, alt: "Terracotta samrani cups arranged on pale stone" },
  { name: "Home Fragrance", note: "Quiet objects for considered spaces", image: heroImage, alt: "Brass incense holder in a calm sunlit home" },
];

const navItems = [
  ["Shop", "#shop"],
  ["Our Story", "#story"],
  ["Rituals", "#rituals"],
  ["Journal", "#journal"],
] as const;

const valueItems: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Leaf, title: "Rooted in ritual", copy: "Inspired by enduring Indian aromatic traditions" },
  { icon: Sparkles, title: "Made for modern homes", copy: "Considered formats with a quiet, refined presence" },
  { icon: PackageCheck, title: "Clear product facts", copy: "What is configured is stated; what is not stays transparent" },
];

const serviceItems: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: PackageCheck, title: "Thoughtful presentation", copy: "Designed to sit quietly in modern homes" },
  { icon: Leaf, title: "Tradition, considered", copy: "Familiar aromatic forms for daily rituals" },
  { icon: Gift, title: "KASHYA gifting", copy: "A future collection for meaningful occasions" },
];

function imageFallback(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.opacity = "0";
  event.currentTarget.alt = "Image unavailable";
}

function Storefront() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) =>
      `${product.name} ${product.category} ${product.weight ?? ""}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cart.reduce((total, line) => total + (line.product.price ?? 0) * line.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen || cartOpen || demoOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen, cartOpen, demoOpen]);

  const addToCart = (product: Product) => {
    if (product.price === undefined) return;
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      return existing
        ? current.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQuantity = (id: string, change: number) => {
    setCart((current) => current
      .map((line) => line.product.id === id ? { ...line, quantity: line.quantity + change } : line)
      .filter((line) => line.quantity > 0));
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setNewsletterMessage(valid
      ? "Thank you. Your email is valid; newsletter signup will be available when our email service is connected."
      : "Please enter a valid email address.");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <a href="#main" className="sr-only z-50 bg-background p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <div className="bg-primary px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-primary-foreground">
        KASHYA Aromatics · Ancient Calm. Modern Living.
      </div>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="mx-auto grid h-18 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 md:h-22 md:px-8">
          <Button variant="icon" className="md:hidden" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu size={21} /></Button>
          <a href="#main" className="justify-self-center text-2xl font-semibold uppercase tracking-[0.22em] text-foreground md:justify-self-start">Kashya</a>
          <nav aria-label="Primary navigation" className="hidden justify-self-center md:block">
            <ul className="flex items-center gap-8">
              {navItems.map(([label, href]) => <li key={label}><a className="text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:text-primary" href={href}>{label}</a></li>)}
            </ul>
          </nav>
          <div className="flex items-center justify-self-end">
            <Button variant="icon" aria-label="Search products" onClick={() => setSearchOpen(true)}><Search size={20} /></Button>
            <Button variant="icon" className="relative" aria-label={`Open cart with ${cartCount} items`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{cartCount}</span>}
            </Button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="relative min-h-[calc(100svh-104px)] overflow-hidden md:min-h-[760px]">
          <img src={heroImage} alt="A dhoop ritual with brass holder in warm morning light" width={1440} height={1100} className="absolute inset-0 size-full object-cover object-[66%_center]" onError={imageFallback} />
          <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/55 to-transparent" />
          <div className="relative mx-auto flex min-h-[calc(100svh-104px)] max-w-7xl items-center px-5 pb-20 pt-16 md:min-h-[760px] md:px-8">
            <div className="max-w-xl animate-rise">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">KASHYA Aromatics</p>
              <h1 className="text-6xl leading-[0.92] md:text-8xl">Ancient Calm.<br /><em className="font-normal">Modern Living.</em></h1>
              <p className="mt-7 max-w-md text-base leading-7 text-foreground/75">Aromatic rituals rooted in Indian tradition, thoughtfully presented for the pace and spaces of today.</p>
              <a href="#shop" className="mt-8 inline-flex items-center gap-3 border border-primary bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90">Explore aromatics <ArrowRight size={16} /></a>
            </div>
          </div>
          <a href="#values" aria-label="Scroll to our values" className="absolute bottom-5 left-1/2 grid size-10 -translate-x-1/2 place-items-center border border-foreground/30 text-foreground"><ChevronRight className="rotate-90" size={18} /></a>
        </section>

        <section id="values" className="border-y border-border bg-background">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-8">
            {valueItems.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="flex gap-4 px-4 py-7 sm:px-6"><Icon className="mt-1 shrink-0 text-primary" size={20} /><div><h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em]">{title}</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p></div></div>
            ))}
          </div>
        </section>

        <SectionHeading eyebrow="A ritual for every space" title="Shop by collection" copy="Explore familiar aromatic forms and considered objects for moments of pause." />
        <section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 pb-24 md:grid-cols-4 md:gap-5 md:px-8">
          {categories.map((category, index) => (
            <a href="#shop" key={category.name} className={`group relative overflow-hidden ${index % 2 ? "mt-8" : "mb-8"}`}>
              <img src={category.image} alt={category.alt} loading="lazy" width={index === 1 ? 1400 : 1200} height={index === 1 ? 1100 : 1500} onError={imageFallback} className="aspect-[3/4] size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground md:p-6"><h3 className="text-2xl leading-none md:text-3xl">{category.name}</h3><p className="mt-2 hidden text-xs opacity-80 sm:block">{category.note}</p><span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em]">Discover <ArrowRight size={13} /></span></div>
            </a>
          ))}
        </section>

        <section id="shop" className="bg-secondary/55 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 flex items-end justify-between gap-6"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Daily essentials</p><h2 className="mt-3 text-5xl md:text-6xl">Bestsellers</h2></div><Button variant="secondary" className="hidden sm:inline-flex" onClick={() => setSearchOpen(true)}>View all <ArrowRight size={15} /></Button></div>
            <div className="grid gap-5 sm:grid-cols-3">
              {products.filter((product) => product.price !== undefined).map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2">
          <img src={ingredientsImage} alt="Sandalwood, resin, vetiver and flowers arranged on handmade paper" loading="lazy" width={1400} height={1100} onError={imageFallback} className="h-full min-h-[430px] w-full object-cover" />
          <div className="flex items-center bg-primary px-7 py-18 text-primary-foreground md:px-16 lg:px-24">
            <div className="max-w-lg"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Ingredient notes</p><h2 className="mt-4 text-5xl leading-[0.95] md:text-7xl">Nature, in its own language.</h2><p className="mt-7 text-base leading-7 text-primary-foreground/80">Our visual palette draws from woods, resins, roots and flowers long associated with Indian aromatic practice. Individual product compositions will always be stated on their final packaging.</p><a href="#story" className="mt-8 inline-flex items-center gap-3 border-b border-accent pb-2 text-xs font-semibold uppercase tracking-[0.14em]">Read our approach <ArrowRight size={15} /></a></div>
          </div>
        </section>

        <section id="story" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-8 md:py-32">
          <div className="md:pr-16"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">The KASHYA story</p><h2 className="mt-4 text-5xl leading-[0.98] md:text-7xl">A quiet bridge between then and now.</h2></div>
          <div className="border-l border-accent pl-6 md:pl-12"><p className="text-lg leading-8 text-foreground/75">KASHYA begins with a simple idea: the rituals that shaped our homes still have a place in the lives we lead now.</p><p className="mt-5 text-base leading-7 text-muted-foreground">Aromatics considers the atmosphere of a space. Rituals looks toward meaningful objects and gifting. Together, they invite small pauses without asking life to slow down completely.</p></div>
        </section>

        <section id="rituals" className="bg-secondary/55 py-22 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8"><SectionHeading eyebrow="Mindful rituals" title="Make space for a moment" copy="Three simple invitations for bringing intention into an ordinary day." compact />
            <div className="grid gap-px bg-border md:grid-cols-3">
              {[["01", "Morning", "Open a window. Light your chosen aromatic. Let the room settle before the day begins."], ["02", "Threshold", "Mark the transition between work and home with a familiar, grounding gesture."], ["03", "Evening", "Choose lower light, put away one screen, and allow fragrance to signal rest."]].map(([number, title, copy]) => <article key={number} className="bg-background p-7 md:p-10"><span className="text-xs text-primary">{number}</span><h3 className="mt-8 text-4xl">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="grid min-h-[620px] md:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden"><img src={samraniImage} alt="Samrani cups and brass ritual objects styled as a thoughtful gift" loading="lazy" width={1200} height={1500} onError={imageFallback} className="absolute inset-0 size-full object-cover" /></div>
          <div className="flex items-center bg-background px-7 py-20 md:px-16 lg:px-24"><div><Gift className="text-primary" size={25} /><p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary">KASHYA Rituals</p><h2 className="mt-4 text-5xl leading-none md:text-7xl">Gifts with<br /><em>presence.</em></h2><p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">A considered gifting collection is taking shape. Join our notes below to hear when KASHYA Rituals is ready to share.</p><a href="#newsletter" className="mt-8 inline-flex items-center gap-3 border-b border-foreground pb-2 text-xs font-semibold uppercase tracking-[0.14em]">Keep me informed <ArrowRight size={15} /></a></div></div>
        </section>

        <section id="journal" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-30">
          <div className="mb-12 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">From the journal</p><h2 className="mt-3 text-5xl md:text-6xl">Notes for slower living</h2></div></div>
          <div className="grid gap-8 md:grid-cols-3">
            {[[heroImage, "Practice", "A small ritual for the start of day"], [ingredientsImage, "Materials", "Reading the landscape of aroma"], [dhoopImage, "Home", "Creating a quiet corner, wherever you live"]].map(([image, label, title], index) => <article key={String(title)} className="group"><img src={String(image)} alt="" loading="lazy" width={1200} height={900} onError={imageFallback} className="aspect-[4/3] w-full object-cover transition-opacity group-hover:opacity-90" /><p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">{String(label)} · Journal preview</p><h3 className="mt-2 text-3xl leading-tight">{String(title)}</h3><span className="mt-4 inline-flex items-center gap-2 text-xs">Coming soon <ArrowRight size={14} /></span>{index === 0 && <span className="sr-only">First journal preview</span>}</article>)}
          </div>
        </section>

        <section id="newsletter" className="border-y border-border bg-primary py-20 text-primary-foreground">
          <div className="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-[1fr_1.1fr] md:items-end md:px-8"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Letters from KASHYA</p><h2 className="mt-4 text-5xl leading-none md:text-6xl">A little quiet,<br />in your inbox.</h2></div><div><p className="mb-6 max-w-lg text-sm leading-6 text-primary-foreground/75">Product notes, ritual ideas and journal updates. Signup will activate once our email service is connected.</p><form onSubmit={submitNewsletter} noValidate><div className="grid grid-cols-[minmax(0,1fr)_auto] border-b border-primary-foreground/60"><label htmlFor="email" className="sr-only">Email address</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="min-w-0 bg-transparent py-4 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/55" /><Button type="submit" variant="ghost" className="text-primary-foreground hover:text-accent">Submit <ArrowRight size={16} /></Button></div><p className="mt-3 min-h-10 text-xs leading-5 text-primary-foreground/70" role="status">{newsletterMessage}</p></form></div></div>
        </section>

        <section className="border-b border-border"><div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-8">{serviceItems.map(({ icon: Icon, title, copy }) => <div key={title} className="flex items-start gap-4 px-4 py-8"><Icon size={20} className="shrink-0 text-primary" /><div><h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em]">{title}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{copy}</p></div></div>)}</div></section>
      </main>

      <Footer />
      <MobileMenu open={mobileOpen} close={() => setMobileOpen(false)} />
      <SearchPanel open={searchOpen} close={() => setSearchOpen(false)} query={query} setQuery={setQuery} results={filteredProducts} addToCart={addToCart} />
      <CartDrawer open={cartOpen} close={() => setCartOpen(false)} cart={cart} subtotal={subtotal} changeQuantity={changeQuantity} openDemo={() => { setCartOpen(false); setDemoOpen(true); }} />
      {demoOpen && <Modal title="Demo checkout" close={() => setDemoOpen(false)}><p className="text-sm leading-6 text-muted-foreground">Checkout is not configured. No order has been placed, and this demonstration does not collect payment or delivery details.</p><Button className="mt-6 w-full" onClick={() => setDemoOpen(false)}>Return to cart</Button></Modal>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, compact = false }: { eyebrow: string; title: string; copy: string; compact?: boolean }) {
  return <div className={`mx-auto max-w-7xl px-5 text-center md:px-8 ${compact ? "pb-12" : "pb-12 pt-22 md:pt-28"}`}><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p><h2 className="mt-3 text-5xl md:text-6xl">{title}</h2><p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground">{copy}</p></div>;
}

function ProductCard({ product, addToCart }: { product: Product; addToCart: (product: Product) => void }) {
  return <article className="group"><div className="relative overflow-hidden bg-muted"><img src={product.image} alt={product.imageAlt} loading="lazy" width={1200} height={1500} onError={imageFallback} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /><Button aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(product)} className="absolute inset-x-3 bottom-3 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus:translate-y-0 md:focus:opacity-100">Add to bag</Button></div><div className="flex items-start justify-between gap-4 pt-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">{product.category}</p><h3 className="mt-1 text-2xl leading-tight">{product.name}</h3><p className="mt-1 text-xs text-muted-foreground">{product.weight}</p></div>{product.price !== undefined && <p className="shrink-0 text-sm font-semibold">{formatPrice(product.price)}</p>}</div></article>;
}

function MobileMenu({ open, close }: { open: boolean; close: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 bg-background p-5" role="dialog" aria-modal="true" aria-label="Navigation menu"><div className="flex items-center justify-between"><span className="text-2xl font-semibold uppercase tracking-[0.22em]">Kashya</span><Button variant="icon" aria-label="Close menu" onClick={close}><X /></Button></div><nav className="mt-20"><ul>{navItems.map(([label, href]) => <li key={label} className="border-b border-border"><a href={href} onClick={close} className="flex items-center justify-between py-5 text-4xl font-display">{label}<ArrowRight size={20} /></a></li>)}</ul></nav><p className="absolute bottom-8 left-5 text-xs uppercase tracking-[0.16em] text-primary">Ancient Calm. Modern Living.</p></div>;
}

function Drawer({ open, close, title, children }: { open: boolean; close: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50"><button className="absolute inset-0 bg-foreground/35" aria-label={`Close ${title}`} onClick={close} /><aside className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-background shadow-2xl" role="dialog" aria-modal="true" aria-label={title}><header className="grid grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border px-5 py-5"><h2 className="truncate text-3xl">{title}</h2><Button variant="icon" aria-label={`Close ${title}`} onClick={close}><X size={21} /></Button></header>{children}</aside></div>;
}

function SearchPanel({ open, close, query, setQuery, results, addToCart }: { open: boolean; close: () => void; query: string; setQuery: (value: string) => void; results: Product[]; addToCart: (product: Product) => void }) {
  return <Drawer open={open} close={close} title="Search KASHYA"><div className="flex min-h-0 flex-1 flex-col"><div className="border-b border-border p-5"><label htmlFor="search" className="sr-only">Search products</label><div className="flex items-center gap-3 border-b border-foreground"><Search size={18} /><input autoFocus id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Dhoop, samrani, home fragrance…" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" /></div></div><div className="min-h-0 flex-1 overflow-y-auto p-5" aria-live="polite">{results.length ? <div className="space-y-3">{results.map((product) => <div key={product.id} className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-3"><img src={product.image} alt="" width={72} height={88} className="h-20 w-18 object-cover" /><div className="min-w-0"><p className="truncate font-display text-xl">{product.name}</p><p className="text-xs text-muted-foreground">{product.weight ?? "Collection preview"}</p>{product.price !== undefined && <p className="mt-1 text-xs font-semibold">{formatPrice(product.price)}</p>}</div>{product.price !== undefined ? <Button variant="icon" aria-label={`Add ${product.name}`} onClick={() => addToCart(product)}><Plus size={18} /></Button> : <span className="text-[9px] uppercase tracking-[0.12em] text-primary">Preview</span>}</div>)}</div> : <div className="py-16 text-center"><Search className="mx-auto text-muted-foreground" /><h3 className="mt-4 text-2xl">No products found</h3><p className="mt-2 text-sm text-muted-foreground">Try dhoop, samrani, incense or fragrance.</p></div>}</div></div></Drawer>;
}

function CartDrawer({ open, close, cart, subtotal, changeQuantity, openDemo }: { open: boolean; close: () => void; cart: CartLine[]; subtotal: number; changeQuantity: (id: string, change: number) => void; openDemo: () => void }) {
  return <Drawer open={open} close={close} title={`Your bag (${cart.reduce((sum, line) => sum + line.quantity, 0)})`}>{cart.length === 0 ? <div className="grid flex-1 place-items-center p-8 text-center"><div><ShoppingBag className="mx-auto text-muted-foreground" size={28} /><h3 className="mt-5 text-3xl">Your bag is quiet.</h3><p className="mt-2 text-sm text-muted-foreground">Begin with a daily aromatic ritual.</p><Button className="mt-6" onClick={close}>Explore collection</Button></div></div> : <><div className="min-h-0 flex-1 overflow-y-auto p-5"><div className="space-y-5">{cart.map((line) => <div key={line.product.id} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4"><img src={line.product.image} alt="" width={88} height={110} className="h-28 w-22 object-cover" /><div className="min-w-0"><div className="flex justify-between gap-3"><div><h3 className="truncate text-xl">{line.product.name}</h3><p className="text-xs text-muted-foreground">{line.product.weight}</p></div><p className="text-sm font-semibold">{formatPrice((line.product.price ?? 0) * line.quantity)}</p></div><div className="mt-5 inline-grid grid-cols-3 border border-border"><Button variant="icon" className="size-8" aria-label={`Decrease ${line.product.name}`} onClick={() => changeQuantity(line.product.id, -1)}><Minus size={13} /></Button><span className="grid min-w-8 place-items-center text-xs" aria-label={`Quantity ${line.quantity}`}>{line.quantity}</span><Button variant="icon" className="size-8" aria-label={`Increase ${line.product.name}`} onClick={() => changeQuantity(line.product.id, 1)}><Plus size={13} /></Button></div></div></div>)}</div></div><div className="border-t border-border p-5"><div className="flex justify-between text-sm"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p className="mt-2 text-xs leading-5 text-muted-foreground">Demonstration only. Taxes, delivery and order processing are not configured.</p><Button className="mt-5 w-full" onClick={openDemo}>Demo checkout <ArrowRight size={15} /></Button></div></>}</Drawer>;
}

function Modal({ title, close, children }: { title: string; close: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/40 p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="w-full max-w-md bg-background p-6 shadow-2xl"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4"><h2 id="modal-title" className="text-3xl">{title}</h2><Button variant="icon" aria-label="Close" onClick={close}><X /></Button></div><div className="mt-6">{children}</div></div></div>;
}

function Footer() {
  return <footer className="bg-foreground text-background"><div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20"><div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]"><div><p className="text-4xl font-semibold uppercase tracking-[0.22em]">Kashya</p><p className="mt-4 font-display text-2xl italic text-background/75">Ancient Calm. Modern Living.</p><p className="mt-7 max-w-xs text-xs leading-5 text-background/55">KASHYA Aromatics + KASHYA Rituals. A considered home for aromatic traditions and everyday pauses.</p></div><div><h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent">Explore</h2><ul className="mt-5 space-y-3 text-sm text-background/70">{navItems.map(([label, href]) => <li key={label}><a className="hover:text-background" href={href}>{label}</a></li>)}</ul></div><div><h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent">Information</h2><ul className="mt-5 space-y-3 text-sm text-background/70"><li><a href="#shop" className="hover:text-background">Product collection</a></li><li><a href="#newsletter" className="hover:text-background">Newsletter notice</a></li><li><a href="#story" className="hover:text-background">About KASHYA</a></li></ul></div></div><div className="mt-16 flex flex-col gap-3 border-t border-background/15 pt-6 text-[10px] uppercase tracking-[0.12em] text-background/45 sm:flex-row sm:justify-between"><span>© 2026 KASHYA</span><span>Storefront demonstration · Commerce not configured</span></div></div></footer>;
}