import { Variants } from "framer-motion"

export const menuMotionVariants: Variants = {
    hidden: (menuType: string) => {
        if (menuType === 'sidenav') {
            return {
                height: 'auto',
                x: '-100%',
                opacity: 0,
                transition: {
                    opacity: {
                        duration: 0.8
                    },
                    x: {
                        duration: 0.5
                    }
                }
            }
        }
        return { height: 'auto' }
    },
    visible: (menuType: string) => {
        if (menuType === 'sidenav') {
            return {
                x: '0',
                opacity: 1,
                transition: {
                    opacity: {
                        duration: 0.5
                    },
                    x: {
                        duration: 0.8
                    }
                }
            }
        }
        return { height: 'auto' }
    }
}