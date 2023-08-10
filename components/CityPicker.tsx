'use client'

import { Country, City } from 'country-state-city'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import { GlobeIcon } from '@heroicons/react/outline'
import { GlobeAltIcon } from '@heroicons/react/outline'

type option = {
    value: {
        latitude: string;
        longitude: string;
        isoCode: string;
    };
    label: string;
} | null;

type cityOption = {
    value: {
        latitude: string;
        longitude: string;
        countryCode: string;
        name: string;
        stateCode: string;
    };
    label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
    value: {
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
    },
    label: country.name,
}));

function CityPicker() {
    const customStyles = {
        option: (defaultStyles: any, state: { isSelected: any; }) => ({
          ...defaultStyles,
          color: state.isSelected ? "#000000" : "#fff",
          backgroundColor: state.isSelected ? "#0094C6" : "#040F16",
          overflow: "hidden",
          border: "none",
          "&:hover": {
            backgroundColor: "#005E76",
            cursor: 'pointer',
          }
        }),
    
        _control: (defaultStyles : any) => ({
            ...defaultStyles,
            whiteSpace: "normal",
            color: "#fff",
            backgroundColor: "#18181b",
            padding: "5px",
            border: "none",
            boxShadow: "none",
            "&:hover" : {
                border: '3px solid transparent',
                background: 'linear-gradient(to right, #18181b, #18181b), linear-gradient(to right, #005E76 , #0094C6)',
                backgroundClip: 'padding-box, border-box',
                backgroundOrigin: 'padding-box, border-box',
                cursor: 'pointer',  
            },
        }), 
        get control() {
            return this._control;
        },
        set control(value) {
            this._control = value;
        },
        singleValue: (defaultStyles : any) => ({ ...defaultStyles, color: "#fff" }),
      };
    
    const [selectedCountry, setSelectedCountry] = useState<option>(null);
    const [selectedCity, setSelectedCity] = useState<cityOption>(null);
    const router = useRouter();

    const handleSelectedCountry = (option: option) => {
        setSelectedCountry(option);
        setSelectedCity(null);
    }

    const handleSelectedCity = (option: cityOption) => {
        setSelectedCity(option);
        router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`)
    }

  return (
    <div className='space-y-4'>
        <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-white/80 font-bold'>
                <GlobeIcon className='h-5 w-5 text-white' />
                <label htmlFor="country">Country</label>
            </div>
        <Select 
            className='text-black font-mono bg-[rgb(36,36,36)]'
            value={selectedCountry}
            onChange={handleSelectedCountry}
            options={options}
            styles={customStyles}
        />
      </div>
        {selectedCountry && (
            <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-white/80 font-bold'>
                <GlobeAltIcon className='h-5 w-5 text-white' />
                <label htmlFor="country">City</label>
            </div>
        <Select 
            className='text-black font-mono'
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
                selectedCountry.value.isoCode
            )?.map((state) => ({
                value: {
                    latitude: state.latitude!,
                    longitude: state.longitude!,
                    countryCode: state.countryCode,
                    name: state.name,
                    stateCode: state.stateCode,
            },
                label: state.name,
            }))}
            styles={customStyles}
        />
      </div>
        )}
      
    </div>
  )
}

export default CityPicker
