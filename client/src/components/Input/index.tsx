import { AnimatePresence, motion } from 'framer-motion'
import { ChangeEvent, forwardRef, PropsWithChildren, useImperativeHandle, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { ReactComponent as Eye } from '../../assets/svg/icons/eye_icon.svg'
import style from './Input.module.css'

interface InputProps extends PropsWithChildren {
    id: string
    className?: string
    label: string
    type: 'text' | 'password' | 'number' | 'email'
    value?: string
    name?: string
    placeholder?: string
    required?: boolean
    error?: null | undefined | boolean | string
    onFocus?: (e: FocusEvent) => void
    onBlur?: (e: FocusEvent) => void
    onChange?: (e: ChangeEvent) => void
}

const Input = forwardRef<{ focus: () => void } | null, InputProps>((
    {
        label,
        placeholder = '',
        value,
        name = '',
        id,
        type,
        onFocus,
        onBlur,
        onChange,
        required = false,
        error = null,
        className = '',
        ...props
    }, ref) => {

    const [focused, setFocucsed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [clicked, setClicked] = useState(false)
    const inputRef = useRef<null | HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current?.focus();
        }
    }))

    const handleEndSelect = () => {
        const end = inputRef.current?.value.length
        console.log(end)
        if (end) {
            inputRef.current?.setSelectionRange(end, end)
        }
    }

    return (
        <AnimatePresence>
            <motion.div layout>
                <motion.div
                    tabIndex={-1}
                    onFocus={(e: any) => {
                        setClicked(true)
                        setFocucsed(true)
                        inputRef.current?.focus()
                        setClicked(false)
                    }}
                    className={`relative -z[2] font-["Roboto_Condensed"] px-3 bg-melony-clay 
                                items-center justify-center rounded-2xl pb-1.5 transition duration-200 
                                focus-within:shadow-[0_0_5px_#000] ${error ? style.error : style.inputWrapper}`}>
                    {(type === 'password' || showPassword) &&
                        <button
                            type='button'
                            onClick={() => {
                                if (inputRef.current?.type) {
                                    flushSync(setShowPassword(prev => !prev) as any)
                                    inputRef.current.blur()
                                    inputRef.current.focus()
                                }
                            }}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className={`bg-transparent rounded-lg border-none absolute z-[1] right-3 w-6 h-6 top-1/2 
                                -translate-y-1/2 flex items-center justify-center ${style.showButton}`}>
                            <Eye className='w-5 pointer-events-none' />
                        </button>}
                    <motion.label
                        className={`${focused || clicked ? 'text-[14px]' : 'text-[12px]'} font-bold top-1 leading-none text-sandy-brown transiton duration-300
                     relative  z-[0]`}
                        htmlFor={id}>{`${required ? '*' : ''}${label}`}
                    </motion.label>
                    <input
                        autoComplete="new-password"
                        name={name}
                        value={value}
                        onChange={onChange}
                        ref={inputRef}
                        placeholder={!focused ? placeholder : ''}
                        className={`${style.input} font-[Roboto] text-[12px] pr-8 leading-none bg-transparent w-full border-white border-2text-gray-300 
                z-[0] text-gray-400 outline-none ${className}`}
                        type={showPassword ? 'text' : type}
                        aria-labelledby={id}
                        onBlur={(e: any) => {
                            if (typeof onBlur === 'function') {
                                onBlur(e)
                            }
                            setFocucsed(false)
                        }}
                        onFocus={(e: any) => {
                            if (typeof onFocus === 'function') {
                                onFocus(e)
                            }
                            if (e.target.type !== 'email') {
                                const length = e.target.value.length
                                e.target.setSelectionRange(length, length)
                            }
                        }
                        }
                        id={id}
                        required={false}
                        {...props}
                    />
                </motion.div>
                {typeof error === 'string' &&
                    <motion.span
                        aria-errormessage='error'
                        className='pl-2 italic text-[12px] text-red-400 font-["Roboto_Condensed"] leading-none'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >{error}</motion.span>}
            </motion.div>
        </AnimatePresence>
    )
})

export default Input