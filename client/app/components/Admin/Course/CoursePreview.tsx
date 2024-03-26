import React, { FC } from 'react'

type Props = {
    active:number;
    setActive:(active:number)=>void;
    courseData:any;
    handleCourseCreate:any
    
}

const CoursePreview:FC<Props> = ({
    courseData, handleCourseCreate, setActive, active
}) => {
    return (
        <div>
            preview
            
        </div>
    )
}

export default CoursePreview
