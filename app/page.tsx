'use client'

import CityPicker from "@/components/CityPicker"
import { Card, Divider, Subtitle, Text } from "@tremor/react"
import Head from "next/head"

export default function Home() {
  return (
    
    <div className="min-h-screen font-quicksand bg-[url('https://media.istockphoto.com/id/165965989/vector/white-clouds-and-blue-sky-seamless.jpg?s=612x612&w=0&k=20&c=alAxeUtH7Fprrz83jQ5D-iDtWDRAN7RtteSvwIZDpk4=')] bg-repeat md:p-10 flex flex-col justify-center">
      <Card className="max-w-4xl mx-auto border-none bg-black/80">
        <Text className="text-6xl font-bold lg:text-center mb-10 font-sans text-slate-400"><span className="font-mono bg-gradient-to-r from-[#0094C6] to-[#005E7C] inline-block text-transparent bg-clip-text">Weather</span> AI</Text>
        <Subtitle className="text-xl lg:text-center font-mono">Powered by Next.js 13.4, Tailwind CSS, Tremor 2.0 + More!</Subtitle>

        <Divider className="my-10 bg-slate-600" />

        <Card className="bg-transparent ring-transparent p-0">
          <CityPicker />
        </Card>
      </Card>
    </div>
  )
}
