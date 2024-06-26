'use client'
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, {useState, useEffect} from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetails from './CourseDetails';
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/ordersApi';
import {loadStripe} from '@stripe/stripe-js'

type Props = {
    id:string;
    
}

const CourseDetailsPage = ({id}: Props) => {
    //console.log(id)
    const [route, setRoute] = useState('Login')
    const [open, setOpen] = useState(false);
    const {data, isLoading} =  useGetCourseDetailsQuery(id);
    const {data:config} = useGetStripePublishableKeyQuery({})
    const [createPaymentIntent, {data:paymentIntentData}] = useCreatePaymentIntentMutation()
    const [clientSecret, setClientSecret] = useState('')
    const [stripePromise, setStripePromise] = useState<any>(null);
    //console.log(data);

    useEffect(() => {
        if(config){
            const publishablekey = config?.publishableKey;
            setStripePromise(loadStripe(publishablekey));
            if(data){
                const amount = Math.round(data.course.price * 100);
                createPaymentIntent(amount)
            }
        }
    },[config, data, createPaymentIntent])

    useEffect(() => {
        if(paymentIntentData){
            setClientSecret(paymentIntentData?.client_secret);
        }
    },[paymentIntentData])
   


    return (
       <>
       {isLoading ? (
        <Loader />
       ):(
        <div>
            <Heading
            title={data?.course?.name + " - ELearn"}
            description={
                "ELearn is a programming community which is developed by Nicholas Igunbor to help people learn how to code"
            }
            keywords={data?.course?.tags}
            />
            <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1} 
            />
            {
                stripePromise && (
                    <CourseDetails data={data.course} stripePromise={stripePromise} clientSecret={clientSecret}/>
                )
            }
            <Footer />

        </div>
       )}
       </>
    )
}

export default CourseDetailsPage
