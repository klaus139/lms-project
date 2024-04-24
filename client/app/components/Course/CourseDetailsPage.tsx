import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, {useState} from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';

type Props = {
    id:string;
    
}

const CourseDetailsPage = ({id}: Props) => {
    //console.log(id)
    const [route, setRoute] = useState('Login')
    const [open, setOpen] = useState(false);
    const {data, isLoading} =  useGetCourseDetailsQuery(id);
    console.log(data)


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

        </div>
       )}
       </>
    )
}

export default CourseDetailsPage
