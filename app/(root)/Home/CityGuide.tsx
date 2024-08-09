import { CBD, CityGate, Highcourt, Skyline, Zuma } from '@/public'
import Image from 'next/image'
import React from 'react'

const landmarks = [
  { name: 'CBD', src: CBD, zone: 'Central Zone', degrees: '0°' },
  { name: 'City Gate', src: CityGate, zone: 'Northern Zone', degrees: '0°' },
  { name: 'Zuma Rock', src: Zuma, zone: 'Western Zone', degrees: '270°' },
  { name: 'Highcourt', src: Highcourt, zone: 'Southern Zone', degrees: '180°' },
  { name: 'Skyline', src: Skyline, zone: 'Eastern Zone', degrees: '90°' }
]

const CityGuide = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">City Guide</h1>
      <div className="hidden md:grid grid-rows-1 grid-cols-3 gap-4 h-[500px]">
        <div className="row-span-1 col-span-1 h-full relative">
          <Image alt="CBD" src={CBD} className="object-cover w-full h-full rounded-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <h2 className="text-lg font-bold">CBD</h2>
            <p>Central Zone</p>
            <p>0°</p>
          </div>
        </div>
        <div className="row-span-1 col-span-1 grid grid-rows-2 grid-cols-1 gap-4 h-full">
          <div className="row-span-1 relative">
            <Image alt="City Gate" src={CityGate} className="object-cover w-full h-full rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
              <h2 className="text-lg font-bold">City Gate</h2>
              <p>Northern Zone</p>
              <p>0°</p>
            </div>
          </div>
          <div className="row-span-1 grid grid-cols-2 gap-4">
            {landmarks.slice(2, 4).map((landmark, index) => (
              <div key={index} className="col-span-1 relative">
                <Image alt={landmark.name} src={landmark.src} className="object-cover w-full h-full rounded-lg" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                  <h2 className="text-lg font-bold">{landmark.name}</h2>
                  <p>{landmark.zone}</p>
                  <p>{landmark.degrees}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row-span-1 col-span-1 h-full relative">
          <Image alt="Skyline" src={Skyline} className="object-cover w-full h-full rounded-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <h2 className="text-lg font-bold">Skyline</h2>
            <p>Eastern Zone</p>
            <p>90°</p>
          </div>
        </div>
      </div>
      <div className="md:hidden flex overflow-x-auto space-x-4">
        {landmarks.map((landmark, index) => (
          <div key={index} className="flex-shrink-0 w-64 relative">
            <Image alt={landmark.name} src={landmark.src} className="object-cover w-full h-full rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
              <h2 className="text-lg font-bold">{landmark.name}</h2>
              <p>{landmark.zone}</p>
              <p>{landmark.degrees}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CityGuide






