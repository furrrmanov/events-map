import React from 'react'
import dynamic from 'next/dynamic'

import BasicLayout from 'src/client/components/layouts/BasicLayout/component'

const WorldMap = dynamic(() => import('src/client/components/blocks/Map'), {
  ssr: false,
})

export default function Landing() {
  return (
    <BasicLayout>
      <WorldMap />
    </BasicLayout>
  )
}
