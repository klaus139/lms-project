import React from 'react'
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    Label,
    YAxis,
    LabelList,
    AreaChart,
    Tooltip,
    Area
} from 'recharts';
import Loader from '../../Loader/Loader';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { styles } from '@/app/styles/style';

type Props= {
    isDashboard?:boolean;
}

// const analyticsData = [
//     {name:"January 2023", count: 400},
//     {name:"Febraury 2023", count:600},
//     {name:"March 2023", count: 4005},
//      {name:"April 2023", count: 200},
//       {name:"May 2023", count: 6070},
//        {name:"June 2023", count: 4500},
//         {name:"July 2023", count: 2400},
//          {name:"August 2023", count: 1100},
//           {name:"September 2023", count: 300},
//           {name:"October 2023", count: 700},
//           {name:"November 2023", count: 8500},
//           {name:"December 2023", count: 4200},
          
// ]

const UserAnalytics = ({isDashboard}:Props) => {
    const {data, isLoading} = useGetUsersAnalyticsQuery({})
    console.log(data)

    const analyticsData:any = [];
    data && data.users?.last12Months.forEach((item:any) => {
        analyticsData.push({name:item.month, count:item.count})
    })
    return (
       <>
       {isLoading ? (
        <Loader />
       ):(
        <div className={`${!isDashboard ? 'mt-[50px]' : 'mt-[50px] dark:bg-[#111c43] shadow-sm pb-5 rounded-sm'}`}>
            <div className={`${isDashboard ? '!ml-8 mb-[50px]' : ""}`}>
                <h1 className={`${styles.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>User Analytics</h1>
                {
                    !isDashboard && (
                        <p className={`${styles.label} px-5 py-5`}>Last 12 months analytics data{" "}</p>
                    )
                }
            </div>
            <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flx items-center justify-center mt-[100px]`}>
                <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? '50%' : '100%'}>
                    <AreaChart
                    data={analyticsData}
                    margin={{
                        top:20,
                        right:30,
                        left:0,
                        bottom:0,
                    }}
                    >
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Area 
                        type='monotone'
                        dataKey="count"
                        stroke='#4d62d9'
                        fill='#4d62d9'
                        />
                    </AreaChart>

                </ResponsiveContainer>
            </div>
        </div>
       )}
       </>
    )
}

export default UserAnalytics
