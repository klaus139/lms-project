"use client"
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '../hooks/adminProtected'
import DashboardHero from '../components/Admin/DashboardHero'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
      <Heading 
        title='ELearn - Admin'
        description='ELearn is a platform for students to learn and develop themselves'
        keywords='Programming, Developer, Software Engineering'
        />
        <div className='flex h-auto'>
            <div className='1500px:w-[16%] w-1/5'>
                <AdminSidebar />
            </div>
            <div className='w-[85%] '>
                <DashboardHero />

            </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page