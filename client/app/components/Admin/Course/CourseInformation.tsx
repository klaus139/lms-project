import React, { FC, useState, useEffect } from "react";
import { styles } from "../../../../app/styles/style";
import { readSync } from "fs";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

interface Props {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const {data} = useGetHeroDataQuery("Categories", {})
const [categories, setCategories] = useState([]);
useEffect(() => {
  if(data){
    setCategories(data?.layout?.categories)
  }
},[data])
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files?.[0]
    if(file){
      const reader = new FileReader();
      reader.onload = (e:any) => {
        if(reader.readyState === 2){
          setCourseInfo({...courseInfo, thumbnail:reader.result})
        }
      };
      reader.readAsDataURL(file);
    }

  }

  const handleDragOver = (e:any) => {
    e.preventDefault();
    setDragging(true);
  }

  const handleDragLeave = (e:any) => {
    e.preventDefault();
    setDragging(false);
  }

  const handleDrop = (e:any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0]

    if(file){
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({...courseInfo, thumbnail:reader.result})
      }
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Mern Stack E-Commerce App"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Describe the course content"
            className={`${styles.input} !h-[200px] !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
         <div className='w-[45%]'>
         <label className={`${styles.label}`}>Course Price</label>
          <input
            type="number"
            name=""
            required
            value={courseInfo.price}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, price: e.target.value })
            }
            id="price"
            placeholder="29"
            className={`${styles.input}`}
          />
         </div>
         <div className='w-[50%]'>
         <label className={`${styles.label}`}>Estimated Price (Optional)</label>
          <input
            type="number"
            name=""
            required
            value={courseInfo.estimatedPrice}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
            }
            id="estimatedPrice"
            placeholder="79"
            className={`${styles.input}`}
          />
         </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
         <div className='w-[45%]'>
         
        <label className={`${styles.label}`}>Course Tags</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="MERN, React, Node, Tailwind"
            className={`${styles.input}`}
          />

        
         </div>
         <div className='w-[50%]'>
         <label className={`${styles.label}`}>Course Categories</label><br />
          <select name="" title='categories' id='' className={`${styles.input}`}
          value={courseInfo.category}
          onChange={(e:any) => setCourseInfo({...courseInfo, category: e.target.value})}
          >
            <option value=''>{" "}Select category</option>
            {categories?.map((item:any) => (
              <option value={item.title} key={item._id}>{item.title}</option>
            ))}
          </select>
         </div>
        </div>
        
        <br />
        <div className="w-full flex justify-between">
         <div className='w-[45%]'>
         <label className={`${styles.label}`}>Course Level</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.level}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, level: e.target.value })
            }
            id="level"
            placeholder="Beginner / Intermediate / Expert"
            className={`${styles.input}`}
          />
         </div>
         <div className='w-[50%]'>
         <label className={`${styles.label}`}>Demo Url</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.demoUrl}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
            }
            id="demoUrl"
            placeholder="https://url.google.com"
            className={`${styles.input}`}
          />
         </div>
        </div>
        <br />
        <div className='w-full mb-[30px]'>
          <input type="file" accept="image/*" id="file" className="hidden" onChange={handleFileChange} />
          <label htmlFor="file"
          className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
            dragging ? "bg-blue-500" : "bg-transparent"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          >
            {
              courseInfo.thumbnail ? (
                <img src={courseInfo.thumbnail} alt="" className="max-h-full w-full object-cover" />
              ): (
                <span className="text-black dark:text-white">
                  Drag and drop your thumbnail here or click to browse
                </span>

              )
            }

          </label>
        </div>
        <br />
        <div className='w-full flex items-center justify-end'>
          <input type="submit" value='Next' className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-2  cursor-pointer'/>
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
