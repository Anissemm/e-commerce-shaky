import { AnimatePresence, motion } from 'framer-motion'
import { ChangeEvent, forwardRef, HTMLAttributes, PropsWithChildren, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { ReactComponent as Eye } from '../../assets/svg/icons/eye_icon.svg'
import style from './Input.module.css'
import Tooltip from '../Tooltip'
import { RefAttributes } from 'react'

interface InputProps extends RefAttributes<HTMLInputElement> {
    id: string
    className?: string
    label: string
    type: 'text' | 'password' | 'number' | 'email'
    value?: string
    bgColor?: string
    height?: number | 'auto' | 'inherit' | '100%'
    name?: string
    placeholder?: string
    required?: boolean
    error?: null | undefined | boolean | string
    placeTooltip?: 'top-end' | 'top-start'
    labeledBy?: string
    // describedBy?: string
    hint?: string
    onFocus?: (e: any) => void
    onBlur?: (e: any) => void
    onChange?: (e: any) => void
}

const Input = forwardRef<{ focus: () => void } | null, InputProps>((
    {
        label,
        placeholder = '',
        value,
        bgColor = 'bg-melony-clay',
        name = '',
        id,
        labeledBy = '',
        // describedBy = '',
        type,
        onFocus,
        onBlur,
        onChange,
        required = false,
        error = null,
        className = '',
        hint = '',
        placeTooltip = 'top-end',
        ...props
    }, ref) => {

    const [focused, setFocucsed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [clicked, setClicked] = useState(false)
    const inputRef = useRef<null | HTMLInputElement>(null)
    const wrapperRef = useRef<null | HTMLDivElement>(null)
    const [showHint, setShowHint] = useState(false)


    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current?.focus();
        }
    }))

    useEffect(() => {
        if (error) {
            setShowHint(true)
            const timerId = setTimeout(() => {
                setShowHint(false)
            }, 3000)
            return () => clearTimeout(timerId)
        } else {
            setShowHint(false)
        }
    }, [focused, error])

    return (

        <motion.div layout transition={{ ease: 'linear' }}>
            <motion.div
                ref={wrapperRef}
                layout
                tabIndex={-1}
                onFocus={(e: any) => {
                    setClicked(true)
                    setFocucsed(true)
                    inputRef.current?.focus()
                    setClicked(false)
                }}
                aria-label={label}
                className={`relative -z[2] font-["Roboto_Condensed"] px-3 ${bgColor} 
                                items-center justify-center rounded-2xl pb-1.5 transition duration-200 
                                focus-within:shadow-[0_0_5px_#000] ${error ? style.error : style.inputWrapper}`}
            >
                {(type === 'password' || showPassword) &&
                    <button
                        tabIndex={-1}
                        type='button'
                        onClick={() => {
                            if (inputRef.current?.type) {
                                flushSync(setShowPassword(prev => !prev) as any)
                                inputRef.current.blur()
                                if (inputRef.current.type !== 'email') {
                                    const length = inputRef.current.value.length
                                    inputRef.current.setSelectionRange(length, length)
                                }
                                inputRef.current.focus()
                            }
                        }}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className={`bg-transparent rounded-lg border-none absolute z-[1] right-3 w-6 h-6 top-1/2 
                                -translate-y-1/2 flex items-center justify-center ${style.showButton}`}>
                        <Eye className='w-5 pointer-events-none' />
                    </button>}
                <motion.label
                    id={`${id}-label`}
                    className={`${focused || clicked ? 'text-[14px]' : 'text-[12px]'} font-bold top-1 leading-none text-sandy-brown transiton duration-300
                     relative  z-[0]`}
                    htmlFor={id}>{`${required ? '*' : ''}${label}`}
                </motion.label>
                <input
                    autoComplete="new-password"
                    name={name}
                    value={value}
                    ref={inputRef}
                    placeholder={!focused ? placeholder : ''}
                    className={`${style.input} font-[Roboto] text-[12px] pr-8 leading-none bg-transparent w-full text-gray-300 
                    z-[0] outline-none ${className}`}
                    type={showPassword ? 'text' : type}
                    aria-labelledby={`${labeledBy} ${id}-label`}
                    // aria-describedBy={describdBy}
                    onChange={onChange}
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
                    }}
                    id={id}
                    required={false}
                    {...props}
                />
            </motion.div>
            <AnimatePresence>
                {showHint &&
                    <Tooltip referenceElement={wrapperRef.current} shadow='#f87171' placement={placeTooltip} >
                        <div className='text-red-300 text-[11px] max-w-[250px] font-["Roboto_Condensed"] px-3 py-2'>{error}</div>
                    </Tooltip>
                }
            </AnimatePresence>
        </motion.div>
    )
})

export default Input