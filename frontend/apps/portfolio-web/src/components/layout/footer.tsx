'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com/altamashkhan', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/altamashkhan', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com/altamashkhan', icon: Twitter, label: 'Twitter' },
  { href: 'mailto:altamash@portfolio.com', icon: Mail, label: 'Email' },
];

const footerLinks = [
  { href: '#home', label: 'Home' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Md Altamash Khan</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Software Developer • Data Science Enthusiast • Entrepreneur
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:opacity-80 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium">Get in Touch</h4>
            <p className="text-sm text-muted-foreground">
              Bhagalpur, Bihar, India
            </p>
            <a
              href="mailto:altamash@portfolio.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              altamash@portfolio.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Md Altamash Khan. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> using Next.js & NestJS
          </p>
        </div>
      </div>
    </footer>
  );
}
