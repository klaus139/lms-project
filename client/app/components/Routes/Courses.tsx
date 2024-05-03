import { useGetAllCoursesQuery, useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import React, {useState, useEffect} from 'react'
import CourseCard from '../Course/CourseCard';
import Loader from '../Loader/Loader';

interface Props {
    
}

const Courses = (props: Props) => {
    const {data, isLoading} = useGetUsersAllCoursesQuery({})
    
    const [clicked, setClicked] = useState(false)
    //console.log(data)

    const handleClicked = () => {
        setClicked(true);
    }
    const [courses, setCourses] = useState<any[]>([]);
    useEffect(() => {
        setCourses(data?.courses);

    }, [data])

    console.log(data);
    return (
       <div>
         <div className={`w-[90%] 800px:w-[80%] m-auto`}>
            <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-light'>
                Expand Your Career {" "}
                <span className='bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text'>Opportunity</span> <br />
                Opportunity With Our Courses

            </h1>
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mg-12 border-0">
                    {isLoading ? (
                        <p>Loading courses...</p>
                    ) : (
                        courses?.map((item: any, index: number) => (
                            <div className={`${clicked ? 'transition-shadow 0.3 ease-in-out' : ''}`}>
                                <CourseCard item={item} key={index} />
                            </div>
                        ))
                    )}
                </div>
            </div>
       </div>
    )
}

export default Courses
