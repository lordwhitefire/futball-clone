import Link from "next/link";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/soyfutbolmaniaco/",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/blanco/icon-facebook.svg",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/futbolmanianet",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/blanco/icon-twitter.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/futbolmaniacom/",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/blanco/icon-instagram.svg",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/futbolmania-tv",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/blanco/icon-youtube.svg",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@futbolmaniacom",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/blanco/icon-tiktok.svg",
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.es/futbolmania/",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/blanco/icon-pinterest.svg",
  },
];

const paymentIcons = [
  {
    name: "Visa",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/icon-visa.svg",
  },
  {
    name: "Mastercard",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/icon-mastercard.svg",
  },
  {
    name: "American Express",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/icon-american-express.svg",
  },
  {
    name: "PayPal",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/icon-paypal.svg",
  },
  {
    name: "Google Pay",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/icon-google-pay.svg",
  },
  {
    name: "Bizum",
    icon: "https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/bizum.svg",
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-1">
            <p className="text-base font-bold mb-1">
              Subscribe to our NEWSLETTER
            </p>
            <p className="text-sm text-primary-foreground/60">
              Get first access to new products, exclusive offers, events, and
              promotions.
            </p>
          </div>
          <Link
            href="#"
            className="inline-block bg-primary-foreground text-foreground px-6 py-2.5 text-sm font-bold uppercase hover:bg-primary-foreground/90 transition-colors"
          >
            Subscribe
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Links */}
          <div className="space-y-3">
            <FooterLink href="https://www.futbolmania.com/es/contacts/">
              Contact
            </FooterLink>
            <FooterLink href="https://futbolmania.zendesk.com/hc/es">
              Help
            </FooterLink>
            <FooterLink href="https://www.futbolmania.com/es/nuestras-tiendas">
              Our Stores
            </FooterLink>
            <FooterLink href="https://www.futbolmania.com/es/empleo">
              Work With Us
            </FooterLink>
          </div>

          {/* Column 2: Social */}
          <div>
            <p className="text-sm font-bold mb-4">Follow us</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-6 h-6"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: futbolmania */}
          <div className="flex flex-col gap-2">
            <Link
              href="https://www.futbolmania.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/logo-FM-home.svg"
                alt="futbolmania"
                className="h-8 mb-1"
              />
              <span className="text-xs text-primary-foreground/50">
                The biggest football store in the world
              </span>
            </Link>
          </div>

          {/* Column 4: futbolmania Kids */}
          <div className="flex flex-col gap-2">
            <Link
              href="https://www.futbolmania.com/kids"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://media.futbolmania.com/media/wysiwyg/ImagenesFooter/logo-FM-Kids-home.svg"
                alt="futbolmania Kids"
                className="h-8 mb-1"
              />
              <span className="text-xs text-primary-foreground/50">
                The football store for young players
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Payment icons */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {paymentIcons.map((payment) => (
              <div
                key={payment.name}
                className="h-6 flex items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={payment.icon}
                  alt={payment.name}
                  className="h-5"
                />
              </div>
            ))}
          </div>

          {/* Logo and legal */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.futbolmania.com/media/wysiwyg/ImagenesFooter/logo-futbolmania.svg"
              alt="futbolmania"
              className="h-5"
            />
            <div className="flex flex-wrap gap-3 text-xs text-primary-foreground/50">
              <Link href="#" className="hover:text-primary-foreground">
                Terms of Sale
              </Link>
              <span>|</span>
              <Link href="#" className="hover:text-primary-foreground">
                Terms of Use
              </Link>
              <span>|</span>
              <Link href="#" className="hover:text-primary-foreground">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="#" className="hover:text-primary-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
      >
        {children}
      </a>
    </p>
  );
}
