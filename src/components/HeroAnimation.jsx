"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

function HeroAnimation() {
  const containerRef = useRef(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"))
    }

    checkDarkMode()

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

    // Initial appearance animation
    const tl = gsap.timeline()

    // Fade in the hook first
    tl.fromTo(".scale-hook", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

    // Then the arm
    tl.fromTo(
      ".scale-arm",
      { rotation: -10, transformOrigin: "50% 0" },
      { rotation: 90, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.3",
    )

    // Then the pans with a slight bounce
    tl.fromTo(
      [".scale-left-pan", ".scale-right-pan"],
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "bounce.out",
      },
      "-=1",
    )

    // Continuous subtle swaying animation
    const swayTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Subtle arm rotation (reduced for balance)
    swayTimeline
      .to(".scale-arm", {
        rotation: -1, // Minimal movement
        duration: 2,
        ease: "sine.inOut",
      })
      .to(".scale-arm", {
        rotation: 1, // Balanced motion
        duration: 2,
        ease: "sine.inOut",
      })

    // Pan animations - gentle movements
    gsap.to(".scale-left-pan", {
      y: "+=3",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    gsap.to(".scale-right-pan", {
      y: "-=3", // Reduced movement
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Subtle glow animation
    gsap.to(".glow", {
      opacity: isDarkMode ? 0.4 : 0.6,
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => {
      tl.kill()
      swayTimeline.kill()
    }
  }, [isDarkMode])

  return (
    <div ref={containerRef} className="animation-container">
      <div className="weighing-scale">
        <div className={`glow ${isDarkMode ? "glow-dark" : "glow-light"}`}></div>
        <div className="scale-hook"></div>
        <div className="scale-arm"></div>
        <div className="scale-base">
          <div className="scale-stand"></div>
        </div>
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
