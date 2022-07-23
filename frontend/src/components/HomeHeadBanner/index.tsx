import React from 'react'

interface BannerItem {
  url?: string
  title?: {
    value: string,
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  },
  content: {
    value: string
  }
}

interface BannerData {
  type: 'static' | 'video' | 'carousel',
  items: BannerItem[]
}

const data: BannerData = {
  type: 'static',
  items: [
    {
      url: 'https://www.google.com',
      title: {
        value: 'Hello Shaky',
        level: 'h2'
      },
      content: {
        value: '<p>This is a banner</p>'
      }
    }
  ]
}

const HomeHeadBanner = () => {
  const type = data?.type
  const items = data?.items

  return (
    <>
      {type === 'static' &&
        <section className='relative w-full sm: '>
          
        </section>
      }
    </>
  )
}

export default HomeHeadBanner