import React from 'react'
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    Label,
    YAxis,
    LabelList,
} from 'recharts';
import Loader from '../../Loader/Loader';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { styles } from '@/app/styles/style';

type Props= {
    isDashboard?:boolean;
}

const UserAnalytics = (props: Props) => {
    return (
        <div>
            
        </div>
    )
}

export default UserAnalytics
