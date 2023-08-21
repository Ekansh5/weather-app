'use client'

import { ChevronLeftIcon } from '@heroicons/react/solid';
import { Country, City } from 'country-state-city'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';

const delay = (ms: number | undefined) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

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

 function Search() {
    const customStyles = {
        option: (defaultStyles: any, state: { isSelected: any; }) => ({
          ...defaultStyles,
        }),
    
        _control: (defaultStyles : any) => ({
            ...defaultStyles,
            width: "500px",
            cursor: 'pointer',
            whiteSpace: "normal",
            color: "#fff",
            backgroundColor: "#f3f4f6",
            padding: "5px",
            border: "none",
            boxShadow: "none",
            "&:hover" : {
                transform: 'scale(1.02)',
            },
        }), 
        get control() {
            return this._control;
        },
        set control(value) {
            this._control = value;
        },
        singleValue: (defaultStyles : any) => ({ ...defaultStyles, }),
      };
    
    const [selectedCountry, setSelectedCountry] = useState<option>(null);
    const [selectedCity, setSelectedCity] = useState<cityOption>(null);
    const [hidden, setHidden] = useState('visible')

    const router = useRouter();

    const handleSelectedCountry = (option: option) => {
        setSelectedCountry(option);
        setSelectedCity(null);
        setHidden('hidden')
    }

    const handleSelectedCity = (option: cityOption) => {
        setSelectedCity(option);
        router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`)
    }

    const handleClick = async () => {
        await delay(500);
        setHidden('visible')
        setSelectedCountry(null)
        }

  return (
    <div className='flex'>
        <div className={`space-y-2 ${hidden}`}>
        <Select 
            className='text-black'
            placeholder='Select Country'
            value={selectedCountry}
            onChange={handleSelectedCountry}
            options={options}
            styles={customStyles}
        />
      </div>
        {selectedCountry && (
            <div className='space-y-2 flex items-center'>
        <ChevronLeftIcon className={`h-7 w-7 cursor-pointer text-[#0094C6] transition-all duration-300 active:-translate-x-5`} onClick={handleClick} />
        <Select 
            className='text-black'
            value={selectedCity}
            placeholder='Select City'
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

export default Search
