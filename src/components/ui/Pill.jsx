/**
 * Small pill tag, used for PDF / Audio labels in the prayer list.
 *
 * @param {{ solid?: boolean, children: React.ReactNode }} props
 */
export default function Pill({ solid = false, children }) {
  return <span className={`pill${solid ? ' solid' : ''}`}>{children}</span>
}
