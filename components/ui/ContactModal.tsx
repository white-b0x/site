'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from './Button';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="glass relative w-full max-w-md rounded-2xl p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 id="contact-title" className="text-xl font-bold mb-4">
          Contact Us
        </h2>
        {status === 'success' ? (
          <div className="text-center py-8">
            <p className="text-green-400">Message sent successfully!</p>
            <Button className="mt-4" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-neutral-400 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-neutral-400 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-neutral-400 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none resize-none"
              />
            </div>
            {status === 'error' && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
            <Button type="submit" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
