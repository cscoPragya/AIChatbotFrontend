"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

function HeroAnimation() {
  const containerRef = useRef(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Check for dark mode and set up a listener for changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"))
    }

    // Initial check
    checkDarkMode()

    // Set up a mutation observer to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkDarkMode()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline()

    // Animate the scale
    tl.fromTo(".scale-base", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

    tl.fromTo(
      ".scale-arm",
      { rotation: -45, transformOrigin: "center" },
      { rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" },
      "-=0.5",
    )

    tl.fromTo(
      [".scale-left-pan", ".scale-right-pan"],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
      "-=1",
    )

    // Add continuous balancing animation - IMPROVED FOR MORE REALISM
    // Create a more natural, synchronized movement
    const masterTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // The arm rotates slightly
    masterTimeline.to(".scale-arm", {
      rotation: 3, // Reduced rotation for more realism
      duration: 2,
      transformOrigin: "center",
    })

    // The pans move in opposite directions but with coordinated movement
    // Left pan goes down when arm rotates clockwise
    gsap.to(".scale-left-pan", {
      y: 5, // Reduced movement for more realism
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    })

    // Right pan goes up when arm rotates clockwise
    gsap.to(".scale-right-pan", {
      y: -5, // Reduced movement for more realism
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    })

    // Animate the glow effect
    gsap.to(".glow", {
      opacity: isDarkMode ? 0.6 : 0.8,
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => {
      tl.kill()
      masterTimeline.kill()
    }
  }, [isDarkMode])

  return (
    <div ref={containerRef} className="animation-container">
      <div className="weighing-scale">
        <div className={`glow ${isDarkMode ? "glow-dark" : "glow-light"}`}></div>
        <div className="scale-base">
          <div className="scale-stand"></div>
        </div>
        <div className="scale-arm"></div>
        <div className="scale-left-pan">
          <div className="scale-pan-content">
            <div className="document-mini"></div>
          </div>
        </div>
        <div className="scale-right-pan">
          <div className="scale-pan-content">
            <div className="gavel-mini"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroAnimation

