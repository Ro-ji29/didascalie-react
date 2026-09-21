import { useState } from 'react'
import Eyebrow from '../ui/Eyebrow'
import BlurFade from '../magicui/blur-fade'
import { PAYMENT_METHODS } from '../../data/donation'

/**
 * Donate section — free custom amount input and payment methods reassurance.
 * Allows users to choose freely their contribution without predefined minimums or suggestions.
 */
export default function Donate() {
  const [amount, setAmount] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Format input to allow only valid numeric input with space separators
  const handleAmountChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '')
    if (!rawVal) {
      setAmount('')
      setSubmitted(false)
      return
    }
    // Format with thousands separator space (e.g. 10 000)
    const formatted = new Intl.NumberFormat('fr-FR').format(parseInt(rawVal, 10))
    setAmount(formatted)
    setSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount.trim()) {
      // Focus on the input if empty
      document.getElementById('custom-amount')?.focus()
      return
    }
    setSubmitted(true)
  }

  return (
    <section className="night donate-section" id="don">
      <div className="wrap">
        <div className="donwrap">
          <div>
            <BlurFade inView delay={0.05} yOffset={6}>
              <Eyebrow>Soutenir la mission</Eyebrow>
            </BlurFade>

            <BlurFade inView delay={0.12} yOffset={8}>
              <h2 className="title">Votre soutien fait vivre la mission.</h2>
            </BlurFade>

            <BlurFade inView delay={0.18} yOffset={8}>
              <p className="lede">
                Votre soutien contribue à faire vivre cette mission et à permettre la diffusion de
                contenus, d'enseignements et de ressources spirituelles, où que vous soyez.
              </p>
            </BlurFade>

            <BlurFade inView delay={0.24} yOffset={8}>
              <form onSubmit={handleSubmit} className="donate-form">
                <div className="donate-field">
                  <label htmlFor="custom-amount" className="donate-label">
                    Montant de votre choix
                  </label>
                  <div className="donate-input-wrapper">
                    <input
                      id="custom-amount"
                      type="text"
                      inputMode="numeric"
                      placeholder="Ex : 10 000"
                      value={amount}
                      onChange={handleAmountChange}
                      className="donate-input"
                      aria-describedby="amount-hint"
                      aria-label="Montant de votre don en FCFA"
                      autoComplete="off"
                    />
                    <span className="donate-currency" aria-hidden="true">
                      FCFA
                    </span>
                  </div>
                  <span id="amount-hint" className="donate-hint">
                    Choisissez librement le montant de votre soutien, selon vos possibilités.
                  </span>
                </div>

                <button type="submit" className="cta-donate">
                  Soutenir la mission
                </button>

                {submitted && (
                  <div className="donate-feedback" role="status">
                    Merci pour votre intention de don de{' '}
                    <strong style={{ color: 'var(--gold-soft)' }}>{amount} FCFA</strong>. Notre
                    équipe pastorale vous contactera par WhatsApp ou email pour finaliser votre
                    offrande en toute sécurité.
                  </div>
                )}
              </form>
            </BlurFade>
          </div>

          <BlurFade inView delay={0.22} yOffset={10}>
            <div className="methods">
              {PAYMENT_METHODS.map((method) => (
                <div className="m" key={method.name}>
                  <span>{method.name}</span>
                  <span>{method.details}</span>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
