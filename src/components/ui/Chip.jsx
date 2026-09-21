/**
 * Reusable filter chip button.
 *
 * @param {{ active: boolean, onClick: Function, children: React.ReactNode, style?: object, type?: 'button' | 'submit' | 'reset' }} props
 */
export default function Chip({ active, onClick, children, style, type = 'button' }) {
  return (
    <button
      type={type}
      className={`chip${active ? ' active' : ''}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  )
}
