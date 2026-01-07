import React from 'react'

interface AuthInputProps {
    placeholder: string;
    fieldName: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

    id: string;
    name: string;
    autocomplete?: string;
}

export default function AuthInput({
    placeholder, fieldName, type='text', value, onChange, id, name, autocomplete
  }: AuthInputProps){

  return (
    <div className='h-fit w-[100%] '>
        <label className='text-sm font-medium leading-[1.25rem]'>{fieldName}</label>
        
        <input 
            id={id}
            name={name}
            autoComplete={autocomplete}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className='flex items-center w-full bg-bland-text border-grey-stroke p-[.75rem] mt-[6px] h-[2.75rem] border-solid border rounded-lg font-regular text-base focus:outline-none focus:ring-2 focus:ring-blue-bg/20'
        />
    </div>
  );
} 