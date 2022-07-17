import React, { type PropsWithChildren, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import type { Placement } from '@popperjs/core'
import style from './Tooltip.module.css'

interface TooltipProps extends PropsWithChildren {
    referenceElement: HTMLElement | null | undefined
    strategy?: 'fixed' | 'absolute'
    placement?: Placement
}

const Tooltip: React.FC<TooltipProps> =
    ({ referenceElement, strategy = 'fixed', placement = 'auto-start', children }) => {
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
                        offset: [0, 5],
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        mainAxis: false, // true by default
                    },
                },
            ],
        });

        return (
            <>
                {strategy === 'fixed' &&
                    createPortal(
                        <div ref={setPopperElement}
                            className="z-50 font-[Oswald] text-sm font-light
                                     bg-melony-clay rounded-lg shadow-[0_0_5px_#000] text-white"
                            style={styles.popper}
                            {...attributes.popper}
                        >
                            {children}
                            <div ref={setArrowElement} className={`shadow ${style.arrow}`} style={styles.arrow} />
                        </div>, document.getElementById('root')!)}
            </>
        );
    }

export default Tooltip