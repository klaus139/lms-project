"use client";
import React, { useState, useEffect } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type Props = {};

const CreateCourse = (props: Props) => {
  const [createCourse, {isLoading, isSuccess, error}] = useCreateCourseMutation();

  useEffect(() => {
    if(isSuccess){
      toast.success("course created successfully")
      redirect('/admin/courses');
    }
    if(error){
      if("data" in error){
        const errorMessage = error as any
        toast.error(errorMessage.data.message)
      }
    }
   
  },[isSuccess,isLoading, error])



  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories:"",
    demoUrl: "",
    thumbnail: "",
  });
  //console.log(courseInfo)
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength:"",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});
  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({title:benefit.title}));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({title:prerequisite.title}));
    const formattedCourseContentData = courseContentData.map((courseContent)=>({
      videoUrl:courseContent.videoUrl,
      title:courseContent.title,
      description:courseContent.description,
      videoSection:courseContent.videoSection,
      videoLength:courseContent.videoLength,
      links: courseContent.links.map((link) => ({
        title:link.title,
        url:link.url
      })),
      suggestion:courseContent.suggestion,
    }));

    //preprare our data object
   
    const data = {
      name:courseInfo.name,
      description:courseInfo.description,
      price:courseInfo.price,
      estimatedPrice:courseInfo.estimatedPrice,
      tags:courseInfo.tags,
      thumbnail:courseInfo.thumbnail,
      level:courseInfo.level,
      demoUrl:courseInfo.demoUrl,
      totalVideos:courseContentData.length,
      benefits:formattedBenefits,
      prerequisites:formattedPrerequisites,
      courseData:formattedCourseContentData,
    }
   

    setCourseData(data)
  };

  const handleCourseCreate = async(e:any) =>{
    const data = courseData
    if(isLoading)(
      <p>Loading....</p>
    )
    if(!isLoading){
      await createCourse(data);
    }
  }

  //console.log(courseData);
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 3 && (
          <CoursePreview
          courseData={courseData}
          handleCourseCreate={handleCourseCreate}
            active={active}
            setActive={setActive}
            isEdit={false}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
