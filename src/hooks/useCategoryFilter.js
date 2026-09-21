import { useState } from 'react'

export default function useCategoryFilter(items, { defaultKey = 'all', matchKey = 'cat' } = {}) {
  const [active, setActive] = useState(defaultKey)
  const filtered = active === defaultKey ? items : items.filter((item) => item[matchKey] === active)

  return { active, setActive, filtered }
}
