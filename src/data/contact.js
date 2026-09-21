export const CONTACT_TYPES = ['Demande de prière', 'Question', 'Témoignage']
export const CONTACT_METHODS = ['Email', 'WhatsApp', 'Je ne souhaite pas être recontacté']

export const DIRECT_CONTACT_PLACEHOLDERS = [
  {
    type: 'email',
    label: 'Email',
    value: 'pere@example.com',
    href: 'mailto:pere@example.com',
    isPlaceholder: true,
  },
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    value: '+228 XX XX XX XX',
    href: null,
    isPlaceholder: true,
  },
]

export const CONTACT_PLACEHOLDERS = {
  'Demande de prière': 'Partagez votre intention de prière…',
  Question: 'Écrivez votre question…',
  Témoignage: 'Partagez votre témoignage…',
}
