import React, { useContext, useEffect } from 'react'
import { MdOutlineNoEncryptionGmailerrorred } from "react-icons/md";
import { GlobalContext } from '../../context/GlobalContext';

const FormError = () => {
    const { formError, setFormError } = useContext(GlobalContext)

    useEffect(() => {
        setTimeout(() => {
            setFormError(false);
        }, 3000)
    }, [])
    return (
        <div className='w-full h-10 rounded-xl bg-red-500/[0.08] text-red-500 border text-xs  flex items-center justify-start border-red-500'>
            <span className='w-[12%] md:w-[8%] text-red-500 border-r border-red-500 text-lg h-full flex items-center rounded-l-xl justify-center '>
                <MdOutlineNoEncryptionGmailerrorred />
            </span>
            <span className='px-2 font-medium'>
            {formError}
            </span>
        </div>
    )
}

export default FormError