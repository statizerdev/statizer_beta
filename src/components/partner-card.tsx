'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface PartnerCardProps {
  name: string
  description: string
  imageSrc: string
  link: string
}

export function PartnerCard({ name, description, imageSrc, link }: PartnerCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="block rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-xl hover:border-white/20 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex gap-4 items-start">
        <Image
          src={imageSrc}
          alt={`${name} logo`}
          width={64}
          height={64}
          className="rounded object-contain"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold">{name}</h2>
            <CheckCircle className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-sm text-white/80 leading-snug">{description}</p>
        </div>
      </div>
    </motion.a>
  )
}
