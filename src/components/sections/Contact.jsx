import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Mail, MessageCircle } from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import Chip from '../ui/Chip'
import BlurFade from '../magicui/blur-fade'
import { supabase } from '../../lib/supabase'
import {
  CONTACT_METHODS,
  CONTACT_PLACEHOLDERS,
  CONTACT_TYPES,
  DIRECT_CONTACT_PLACEHOLDERS,
} from '../../data/contact'

const initialForm = {
  name: '',
  email: '',
  whatsapp: '',
  message: '',
}

const DIRECT_CONTACT_ICONS = {
  email: Mail,
  whatsapp: MessageCircle,
}

export default function Contact() {
  const [type, setType] = useState(CONTACT_TYPES[0])
  const [contactMethod, setContactMethod] = useState(CONTACT_METHODS[2])
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const placeholder = useMemo(() => CONTACT_PLACEHOLDERS[type] || 'Écrivez votre message…', [type])

  const updateField = (field) => (event) => {
    const value = event.target.value
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!type) nextErrors.type = 'Choisissez un type de demande.'
    if (!form.message.trim()) nextErrors.message = 'Votre message est requis.'

    if (contactMethod === 'Email') {
      if (!form.email.trim()) {
        nextErrors.email = 'Votre adresse email est requise.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        nextErrors.email = 'Adresse email invalide.'
      }
    }

    if (contactMethod === 'WhatsApp') {
      if (!form.whatsapp.trim()) {
        nextErrors.whatsapp = 'Votre numéro WhatsApp est requis.'
      } else if (form.whatsapp.trim().length < 8) {
        nextErrors.whatsapp = 'Le numéro semble incomplet.'
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSuccessMessage('')

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const payload = {
        type,
        name: form.name.trim() || null,
        contact_method: contactMethod,
        email: contactMethod === 'Email' ? form.email.trim() : null,
        whatsapp: contactMethod === 'WhatsApp' ? form.whatsapp.trim() : null,
        message: form.message.trim(),
        status: 'new',
      }

      if (supabase) {
        const { error } = await supabase.from('contact_messages').insert(payload)
        if (error) throw error
      }

      setForm(initialForm)
      setContactMethod(CONTACT_METHODS[2])
      setType(CONTACT_TYPES[0])
      setSuccessMessage('Votre message a bien été envoyé. Merci pour votre confiance.')
    } catch (error) {
      console.error('Erreur lors de l’envoi du formulaire :', error)
      setErrors({ form: 'Le formulaire n’a pas pu être envoyé pour le moment. Réessayez.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="day" id="contact">
      <div className="wrap">
        <BlurFade inView delay={0.05} yOffset={6}>
          <Eyebrow>Contact</Eyebrow>
        </BlurFade>
        <BlurFade inView delay={0.12} yOffset={8}>
          <h2 className="title">Une prière, une question, un témoignage ?</h2>
        </BlurFade>

        <div className="cwrap">
          <BlurFade inView delay={0.18} yOffset={10}>
            <div className="contact-panel">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-block">
                  <label className="section-label">Comment pouvons-nous vous aider ?</label>
                  <div className="type-grid">
                    {CONTACT_TYPES.map((item) => (
                      <Chip
                        key={item}
                        type="button"
                        active={type === item}
                        onClick={() => setType(item)}
                        style={{ borderColor: type === item ? '#A6472A' : undefined }}
                      >
                        {item}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="contact-name">Votre nom</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Nom (facultatif)"
                    value={form.name}
                    onChange={updateField('name')}
                  />
                </div>

                <div className="form-block">
                  <label className="section-label">Comment souhaitez-vous être recontacté ?</label>
                  <div className="type-grid">
                    {CONTACT_METHODS.map((method) => (
                      <Chip
                        key={method}
                        type="button"
                        active={contactMethod === method}
                        onClick={() => setContactMethod(method)}
                        style={{ borderColor: contactMethod === method ? '#A6472A' : undefined }}
                      >
                        {method}
                      </Chip>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {contactMethod === 'Email' && (
                    <motion.div
                      key="email-field"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="field">
                        <label htmlFor="contact-email">Votre adresse email</label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="votre@email.com"
                          value={form.email}
                          onChange={updateField('email')}
                          aria-invalid={Boolean(errors.email)}
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                      </div>
                    </motion.div>
                  )}

                  {contactMethod === 'WhatsApp' && (
                    <motion.div
                      key="whatsapp-field"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="field">
                        <label htmlFor="contact-whatsapp">Votre numéro WhatsApp</label>
                        <input
                          id="contact-whatsapp"
                          type="tel"
                          placeholder="+225 00 00 00 00"
                          value={form.whatsapp}
                          onChange={updateField('whatsapp')}
                          aria-invalid={Boolean(errors.whatsapp)}
                        />
                        {errors.whatsapp && <span className="field-error">{errors.whatsapp}</span>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="field">
                  <label htmlFor="contact-msg">Votre message</label>
                  <textarea
                    id="contact-msg"
                    placeholder={placeholder}
                    value={form.message}
                    onChange={updateField('message')}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>

                {errors.form && <div className="form-error">{errors.form}</div>}
                {successMessage && <div className="success-banner">{successMessage}</div>}

                <div className="privacy-note">
                  Vos informations sont utilisées uniquement pour répondre à votre message.
                </div>

                <button type="submit" className="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Envoi en cours…' : 'Envoyer mon message'}
                </button>
              </form>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.24} yOffset={10}>
            <aside className="direct-contact" aria-labelledby="direct-contact-title">
              <span className="direct-contact-kicker">Contact direct</span>
              <h3 id="direct-contact-title">Joindre le Père</h3>
              <p className="direct-contact-intro">
                Pour une prise de contact directe, vous pouvez également joindre le Père par les
                coordonnées ci-dessous.
              </p>

              <div className="direct-contact-list">
                {DIRECT_CONTACT_PLACEHOLDERS.map((contact) => {
                  const Icon = DIRECT_CONTACT_ICONS[contact.type]
                  const content = (
                    <>
                      <span className="direct-contact-icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span className="direct-contact-copy">
                        <span className="direct-contact-label">{contact.label}</span>
                        <span className="direct-contact-value">{contact.value}</span>
                      </span>
                    </>
                  )

                  return contact.href ? (
                    <a
                      className="direct-contact-item"
                      href={contact.href}
                      key={contact.type}
                      aria-label={`${contact.label}: ${contact.value}`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      className="direct-contact-item direct-contact-item--placeholder"
                      key={contact.type}
                      aria-label={`${contact.label}: ${contact.value}, coordonnée à venir`}
                    >
                      {content}
                    </div>
                  )
                })}
              </div>

              <p className="direct-contact-note">Coordonnées provisoires à remplacer.</p>
            </aside>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
