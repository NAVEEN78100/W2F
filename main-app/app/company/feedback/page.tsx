'use client'

import React from 'react'

// This page serves the static CRA feedback app deployed to `public/company/feedback/`
// It uses an iframe with proper path handling

export default function FeedbackPage() {
  return (
    <iframe
      src="/company/feedback/index.html"
      title="Company Feedback"
      style={{ 
        width: '100%', 
        height: '100vh', 
        border: 'none',
        display: 'block'
      }}
      sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
    />
  )
}
