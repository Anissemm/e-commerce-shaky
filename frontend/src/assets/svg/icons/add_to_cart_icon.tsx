import { motion, SVGMotionProps } from 'framer-motion'
import { forwardRef, PropsWithChildren, SVGAttributes } from 'react'

const AddToCartIcon = forwardRef<SVGSVGElement, SVGMotionProps<SVGSVGElement>>((props, ref) => {
    return (
        <motion.svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.91 47.27" {...props}>
            <g>
                <path
                    d="M34.28,38.69h0A4.26,4.26,0,0,0,30.05,43h0a4.23,4.23,0,1,0,8.46,0,4.3,4.3,0,0,0-1.23-3A4.18,4.18,0,0,0,34.28,38.69Zm0,6.84A2.57,2.57,0,0,1,31.7,43h0a2.6,2.6,0,0,1,2.58-2.61,2.58,2.58,0,0,1,0,5.15Z"
                />
                <polygon points="16.93 47.27 16.93 47.27 16.93 47.27 16.93 47.27" />
                <path
                    d="M16.93,38.69a4.27,4.27,0,1,0,3,1.26A4.18,4.18,0,0,0,16.93,38.69Zm0,6.84A2.57,2.57,0,0,1,14.35,43h0a2.6,2.6,0,0,1,2.58-2.61,2.58,2.58,0,0,1,0,5.15Z"
                />
                <path
                    d="M43.78,13.12a5.27,5.27,0,0,0-3.87-1.51H29.57V1a1,1,0,0,0-1-1h-.09a1,1,0,0,0-1,1V11.61h-12a1,1,0,0,0-1.11.88,1,1,0,0,0,1.11.89h12v11a1,1,0,0,0,1,1h.09a1,1,0,0,0,1-1v-11H39.91a2.91,2.91,0,0,1,2.15.83,2.45,2.45,0,0,1,.62,2.22L40.61,27a3.22,3.22,0,0,1-3.22,2.12H16.84A3.2,3.2,0,0,1,13.63,27l-.53-2.69-1.54-7.83-1-4s0-.06,0-.09c-.19-1.85-2.39-5-9.46-5A1,1,0,0,0,0,8.24a1,1,0,0,0,1.1.88c6.44,0,7.19,2.79,7.29,3.35v.11l1,4.13v0l1.5,7.64L13,35.48a1.1,1.1,0,0,0,1.08.89h23a1.08,1.08,0,0,0,.92-.93,1.07,1.07,0,0,0-.92-1.21H15.61a.7.7,0,0,1-.68-.55l-.43-2.21a.69.69,0,0,1,.14-.57.71.71,0,0,1,.53-.24h.17a6.29,6.29,0,0,0,1.5.19H37.39c2.62,0,5-1.59,5.38-3.62l2.06-10.53A4,4,0,0,0,43.78,13.12Z"
                />
            </g>
        </motion.svg>

    )
})

export default motion(AddToCartIcon)