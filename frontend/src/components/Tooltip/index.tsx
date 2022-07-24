import React, { type PropsWithChildren, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import type { Placement } from '@popperjs/core'
import style from './Tooltip.module.css'
import { Variants, motion } from 'framer-motion'

const tooltipVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

interface TooltipProps extends PropsWithChildren {
    referenceElement: HTMLElement | null | undefined
    strategy?: 'fixed' | 'absolute'
    placement?: Placement
    shadow?: string
}

const Tooltip: React.FC<TooltipProps> =
    ({ referenceElement, strategy = 'absolute', placement = 'top-end', children, shadow = '#000' }) => {
        const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
        const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
        const { styles, attributes } = usePopper(referenceElement, popperElement, {
            strategy,
            placement,
            modifiers: [
                {
                    name: 'arrow',
                    options: { element: arrowElement }
                },
                {
                    name: 'offset',
                    options: {
                        offset: [0, 10],
                    },
                }
            ],
        });

        return (
            <motion.div
                variants={tooltipVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                ref={setPopperElement}
                className={`z-50 font-[Oswald] font-light rounded-md ${style.tooltip}`}
                style={{ boxShadow: `0 0 4px ${shadow}`, ...styles.popper }}
                {...attributes.popper}
            >
                <div className={`relative text-white bg-melony-clay rounded-md `}>
                    {children}
                </div>
                <div ref={setArrowElement} className={`${style.arrow} bg-melony-clay before:shadow-[0_0_5px]`} style={{ color: shadow, ...styles.arrow }} />
            </motion.div>
        )
    }

export default Tooltip