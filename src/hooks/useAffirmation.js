import { useState } from 'react'
import { getShuffled, setCurrentAffirmation } from '../lib/affirmations'

// Affirmation is fixed for the lifetime of the page load.
// A new one is shown each time the NFC bracelet is tapped,
// because every tap opens the URL fresh (new shuffle, index 0).
export function useAffirmation() {
  const [list] = useState(() => getShuffled())
  const current = list[0]

  // Cache at module level so ReflectPage can read it even without location.state
  setCurrentAffirmation(current)

  return { quote: current[0], action: current[1], fading: false }
}
