import React from 'react'

import NavigationBar from 'src/client/components/blocks/AppBar'

export default function BasicLayout({ children }) {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  )
}
