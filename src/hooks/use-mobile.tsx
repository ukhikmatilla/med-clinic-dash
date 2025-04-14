
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to check if window width is less than mobile breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Add event listener for window resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      checkMobile()
    }

    // Modern browsers
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange)
    } 
    // Legacy browser support
    else if (typeof mql.addListener === 'function') {
      mql.addListener(onChange)
    }

    // Initial check
    checkMobile()

    // Cleanup
    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', onChange)
      } else if (typeof mql.removeListener === 'function') {
        mql.removeListener(onChange)
      }
    }
  }, [])

  return !!isMobile
}
