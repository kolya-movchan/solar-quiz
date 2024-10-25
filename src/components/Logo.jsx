import React from 'react'

export const Logo = () => {
  return (
    <div className="logo-container" style={{ zIndex: "1000" }}>
      <a href="/">
        <img src="/logo.svg" alt="logo" />
      </a>
    </div>
  )
}
