import { useFormik } from 'formik'
import React, { HTMLAttributes, PropsWithChildren, useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import * as yup from 'yup'

const validationSchema = yup.object({
    newsletterEmail: yup.string().email('Please, enter a valid email address.')
})

const NewsLetter = () => {
    const newsletterForm = useFormik({
        initialValues: {
            newsletterEmail: ''
        },
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema,
        onSubmit: values => {
            console.log(values) // to implement later 
        }
    })

    return (
        <section>
            <div className='max-w-[313px]'>
                <div>
                    <h4 id='newsletter-heading' className='font-[Oswald] uppercase text-[22px] pb-4 text-sandy-brown'>Join Our Newsletter</h4>
                </div>

                <div>
                    <p
                        id='newsletter-description'
                        className='font-["Roboto_Condensed"] text-[14px] text-white pb-2'
                    >Be the first to receive exciting news, features, and special offers from Bodybuilding.com! </p>
                    <form className='w-full' onSubmit={newsletterForm.handleSubmit}>
                        <div className='relative mx-auto'>
                            <div className='w-full'>
                                <Input
                                    type='email'
                                    labeledBy='newsletter-heading'
                                    aria-describedby='newsletter-description'
                                    id='newsletterEmail'
                                    name='newsletterEmail'
                                    onChange={newsletterForm.handleChange}
                                    onBlur={newsletterForm.handleBlur}
                                    value={newsletterForm.values.newsletterEmail}
                                    error={newsletterForm.touched && newsletterForm.errors.newsletterEmail as string | undefined}
                                    height={58}
                                    label='Email'
                                    bgColor='bg-[#14181D]'
                                    placeholder='Jhondoe@mail.com' />
                            </div>
                            <div className={`absolute h-full right-0.5 top-0 flex items-center justify-center`}>
                                <Button inline={true} className='font-[Oswald] rounded-[12px] font-medium uppercase px-2 py-4 text-[18px] leading-[18px]' type='submit'>Send</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewsLetter
