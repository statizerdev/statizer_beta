'use client'

import { PartnerCard } from '@/components/partner-card'
import { DemoCard } from '@/components/demo-card'
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import { motion } from 'framer-motion'

const partners = [
  {
    name: 'Euphonix',
    description:
      'Founded in 2024 by Larza, KILIAM, and Tweellve, Euphonix Recordings is a worldwide EDM label dedicated to pushing the boundaries of electronic music. With a focus on quality, innovation, and unity, Euphonix showcases forward-thinking artists across genres like progressive house and modern EDM.',
    demo: 'euphonixrecordings@gmail.com',
    imageSrc: '/euphonix_128.png',
    link: 'https://linktr.ee/euphonixrecordings',
  },
  {
    name: 'INVIBES',
    description:
      'Founded in 2022 by Ray, INVIBES is a global EDM label committed to progressive house and melodic energy. Focused on creativity, depth, and emotion, it showcases unique artists and uplifting tracks designed for powerful live and streaming experiences. The label continues to grow with a mission to support new talent.',
    demo: 'demo@invibesrec.id',
    imageSrc: '/invibes_128.png',
    link: 'https://linktr.ee/invibesrec',
  },
]

export default function PartnersPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Our Partners</h1>
       <Separator className="mb-6 bg-white/10" />

      <div className="grid gap-12 md:grid-cols-2">
        {partners.map((partner, index) => (
          <div key={index} className="flex flex-col gap-4">
            <PartnerCard
              name={partner.name}
              description={partner.description}
              imageSrc={partner.imageSrc}
              link={partner.link}
            />
            <DemoCard email={partner.demo} />
          </div>
        ))}
      </div>
    </main>
  )
}
