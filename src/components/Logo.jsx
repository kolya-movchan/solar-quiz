import React from 'react'

export const Logo = () => {
  return (
    <div className="logo-container" style={{ zIndex: "1000" }}>
      <a href="/">
        <img src="/logo.png" alt="logo" height="40px" width="40px" />
      </a>
    </div>
  )
}
