"use client"
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import React from 'react'
import AdminSidebar from '../../../app/components/Admin/Sidebar/AdminSidebar'
import DashboardHero from '../../../app/components/Admin/DashboardHero'
import EditHero from '@/app/components/Admin/Customization/EditHero'



type Props = {
    
}

const page = (props: Props) => {
    return (
        <div>
      <AdminProtected>
      <Heading 
        title='ELearn - Admin'
        description='ELearn is a platform for students to learn and develop themselves'
        keywords='Programming, Developer, Software Engineering'
        />
        <div className='flex h-screen'>
            <div className='1500px:w-[16%] w-1/5'>
                <AdminSidebar />
            </div>
            <div className='w-[85%]'>
                <DashboardHero />
                <EditHero />
               

            </div>
        </div>
      </AdminProtected>
    </div>
    )
}

export default page
