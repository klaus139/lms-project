'use client'
import CourseContent from '@/app/components/Course/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React,{useEffect} from 'react'
import toast from 'react-hot-toast';

type Props= {
    params:any;
    
}

const page = ({params}: Props) => {
    const id=params.id

    const {isLoading, error, data} = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if(data){
            const isPurchased = data?.user?.courses.find((item:any) => item._id === id);
            if(!isPurchased){
                toast.error("You haven't purchased this course");
                redirect('/');
            }
            if(error){
                console.log(error);
                redirect('/')
            }
        }
    },[data, error])
    return (
        <>
        {isLoading ? (
            <Loader />
        ):(
            <div className='w-full'>
                <CourseContent id={id} user={data.user}/>
            </div>
        )}
        </>
    )
}

export default page
