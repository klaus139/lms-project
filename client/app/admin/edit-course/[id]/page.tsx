"use client"
import React from 'react'
import AdminSidebar from "../../../components/Admin/Sidebar/AdminSidebar";
import Heading from '../../../../app/utils/Heading';

import DashboardHeader from '../../../../app/components/Admin/DashboardHeader';
import EditCourse from '@/app/components/Admin/Course/EditCourse';

interface Props {
    
}

const page = ({params}:any) => {
    const id = params?.id
    return (
        <div>
            <Heading 
            title='ELearn - Admin'
            description='ELearn is a platform for learning'
            keywords='Learning, Programming'
            />
            <div className='flex'>
                <div className='1500px:w-[16%] w-1/5'>
                    <AdminSidebar />
                </div>
                <div className='w-[85%]'>
                    <DashboardHeader />
                    <EditCourse id={id}/>

                </div>
            </div>
        </div>
    )
}

export default page
