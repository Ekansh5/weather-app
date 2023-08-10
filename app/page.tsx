'use client'

import CityPicker from "@/components/CityPicker"
import { Card, Divider, Subtitle, Text } from "@tremor/react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001242] via-black/90 to-black md:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] md:from-black md:via-black/90 md:to-[#001242] md:p-10 flex flex-col justify-center">
      <Card className="max-w-4xl mx-auto bg-transparent ring-0 md:ring-4 ring-slate-600">
        <Text className="text-6xl font-bold lg:text-center mb-10 font-sans text-slate-400"><span className="font-mono bg-gradient-to-r from-[#0094C6] to-[#005E7C] inline-block text-transparent bg-clip-text">Weather</span> AI</Text>
        <Subtitle className="text-xl lg:text-center font-mono">Powered by Open AI, Next.js 13.4, Tailwind CSS, Tremor 2.0 + More!</Subtitle>

        <Divider className="my-10 bg-slate-600" />

        <Card className="bg-transparent ring-transparent p-0">
          <CityPicker />
        </Card>
      </Card>
    </div>
  )
}
