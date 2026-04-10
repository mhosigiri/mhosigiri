import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, CheckCircle, Loader } from 'lucide-react'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const LINKS = [
  { label: 'Email',    value: 'anishkc2004@gmail.com',         href: 'mailto:anishkc2004@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/anishkc',        href: 'https://linkedin.com/in/anishkc' },
  { label: 'GitHub',   value: 'github.com/anishkc',             href: 'https://github.com/anishkc' },
  { label: 'Phone',    value: '+1 (682) 372-5303',              href: 'tel:+16823725303' },
]

function Field({
  label, type = 'text', value, onChange, error, multiline = false
}: {
  label: string
  type?: string
  value: string
  onChange: (val: string) => void
  error?: string
  multiline?: boolean
}) {
  const fieldStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${error ? '#c0392b' : 'var(--color-border)'}`,
    padding: '0.625rem 0',
    color: 'var(--color-text)',
    fontSize: '1rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    resize: 'none' as const,
    transition: 'border-color 0.2s',
    lineHeight: 1.6,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label
        style={{
          font: 'var(--font-label)',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
          style={fieldStyle}
          aria-label={label}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={fieldStyle}
          aria-label={label}
        />
      )}
      {error && (
        <p style={{ font: 'var(--font-label)', fontFamily: 'var(--font-sans)', color: '#c0392b' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export function Contact() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true })
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.email.trim()) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.subject.trim()) errs.subject = 'Required'
    if (form.message.length < 10) errs.message = 'At least 10 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
  }

  const update = (field: keyof FormState) => (val: string) => {
    setForm(f => ({ ...f, [field]: val }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }))
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Contact section"
    >
      <div
        style={{
          maxWidth: 'var(--content-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(2.5rem, 6vw, 5rem)',
        }}
      >
        {/* Left: info */}
        <div ref={titleRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-label"
            style={{ marginBottom: '0.75rem' }}
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              font: 'var(--font-title1)',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text)',
              marginBottom: '1.5rem',
            }}
          >
            Get in touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.75 }}
          >
            Open to internships, research collaborations, and interesting projects.
            Reach out — I respond within a day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '0.875rem 0',
                  borderTop: i === 0 ? '1px solid var(--color-border)' : undefined,
                  borderBottom: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  gap: '1rem',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.5')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                <span style={{ font: 'var(--font-small)', fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--color-text)' }}>
                  {link.label}
                </span>
                <span style={{ font: 'var(--font-small)', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  {link.value}
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
        >
          {status === 'success' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, paddingTop: '1rem' }}>
              <CheckCircle size={28} style={{ color: 'var(--color-text)' }} />
              <p style={{ font: 'var(--font-body)', fontFamily: 'var(--font-sans)', color: 'var(--color-text)' }}>
                Message sent — I'll be in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              noValidate
            >
              <Field label="Name"    value={form.name}    onChange={update('name')}    error={errors.name} />
              <Field label="Email"   type="email" value={form.email}   onChange={update('email')}   error={errors.email} />
              <Field label="Subject" value={form.subject} onChange={update('subject')} error={errors.subject} />
              <Field label="Message" value={form.message} onChange={update('message')} error={errors.message} multiline />

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 22px',
                  background: 'var(--color-text)',
                  border: '1px solid var(--color-text)',
                  color: 'var(--color-bg)',
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  borderRadius: 0,
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'opacity 0.15s',
                }}
              >
                {status === 'loading' ? (
                  <><Loader size={15} style={{ animation: 'spin 1s linear infinite' }} /> Sending</>
                ) : (
                  <><Send size={15} /> Send message</>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
