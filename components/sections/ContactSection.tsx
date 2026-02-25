'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateField(name: string, value: string): string | undefined {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.length > 100) return 'Name is too long';
      return undefined;
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
      return undefined;
    case 'message':
      if (!value.trim()) return 'Message is required';
      if (value.length > 5000) return 'Message is too long';
      return undefined;
    default:
      return undefined;
  }
}

const inputStyles =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 transition-colors duration-200 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-[rgba(255,217,160,0.3)] focus:ring-offset-0';

const labelStyles = 'block text-xs font-medium uppercase tracking-widest text-white/40 mb-2';

const errorStyles = 'mt-1.5 text-xs text-red-400/80';

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: FormErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      message: validateField('message', form.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.values(newErrors).some(Boolean)) return;

    // Honeypot: bots fill the hidden field, humans don't
    if (form.website) return;

    const subject = encodeURIComponent(`whiteb0x inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:contact@whiteb0x.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030508]/70 via-[#030508]/90 to-[#030508]/70" />
      <div className="relative mx-auto max-w-xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-white/90 md:text-4xl">
          Let&apos;s Build Something
        </h2>
        <p className="mb-10 text-center text-lg text-white/50">
          Have a project in mind? We&apos;d love to hear about it.
        </p>

        {sent ? (
          <GlassCard className="py-12 px-8 text-center">
            <p className="text-lg font-medium text-white/90">Opening your email client...</p>
            <p className="mt-2 text-sm text-white/50">
              Your message has been pre-filled. Just hit send.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 text-sm text-white/40 transition-colors hover:text-white/60"
            >
              Back to form
            </button>
          </GlassCard>
        ) : (
          <GlassCard className="py-8 px-6 md:px-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot — hidden from humans, bots auto-fill */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="name" className={labelStyles}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  className={inputStyles}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <p id="name-error" className={errorStyles}>{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className={labelStyles}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@company.com"
                  className={inputStyles}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <p id="email-error" className={errorStyles}>{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className={labelStyles}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell us about your project"
                  rows={4}
                  className={`${inputStyles} resize-none`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <p id="message-error" className={errorStyles}>{errors.message}</p>}
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </GlassCard>
        )}
      </div>
    </section>
  );
}
