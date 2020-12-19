import React from 'react'
import dynamic from 'next/dynamic'

import BasicLayout from 'components/layouts/BasicLayout/component'

const WorldMap = dynamic(() => import('components/blocks/Map'), {
  ssr: false,
})

export default function Landing() {
  return (
    <BasicLayout>
      <WorldMap />
    </BasicLayout>
  )
}
