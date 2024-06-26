import Image from "next/image";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";
import heroBg from "../../../public/assets/hero-bg.png";
import Link from "next/link";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";


interface Props {}

const Hero: FC<Props> = (props) => {
  const { data, refetch } = useGetHeroDataQuery("Banner", {});
  //console.log(data);
  return (
    <div className="w-full 1000px:flex items-center">
      <div className="absolute hidden 1000px:flex top-[150px] m-2 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1000px:h-[600px] 1100px:w-[600px]  md:w-[50vh] md:h-[50vh] hero_animation rounded-full"></div>
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <Image
          src={require("../../../public/assets/hero-bg.png")}
          alt="herobg"
          className="object-contain w-full max-w-[90%] h-auto z-[10]"
        />
      </div>
      <div className="mx-auto 1000px:w-[50%] flex flex-col items-center 1000px:mt-[0px]  text-center mt-[100px]">
        <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[300px] 1000:w-[400px] text-center">
          {data?.layout?.banner?.title}
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
          {data?.layout?.banner?.subTitle}
        </p>
        <br/>
        <br/>
        <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative'>
          <input type='search' placeholder="Search Courses..." className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#00000089] dark:text-[#ffffffe6] text-[16px] font-[500] font-Josefin" />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className='text-white' size={30} />
          </div>
         
        </div>
        <br />
          <br />
          <br />
          <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center'>
            <Image 
            src={require("../../../public/assets/cleint1.jpg")}
            alt='client1'
            className="rounded-full w-[40px] h-[40px] border-[2px]"
            />
            <Image 
            src={require("../../../public/assets/cleint4.jpeg")}
            alt='client1'
            className="rounded-full w-[40px] h-[40px] ml-[-20px] border-[2px]"
            />
            <Image 
            src={require("../../../public/assets/cleitn5.webp")}
            alt='client1'
            className="rounded-full w-[40px] h-[40px] ml-[-20px] border-[2px]"
            />
            <p className='font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[16px] font-[400]'>
              500k+ People already trust us. {" "}
              <Link href="/courses" className='dark:text-[#46e256] text-[crimson] text-[16px]'>View Courses</Link>{" "}
            </p>
          </div>
      </div>
    </div>
  );
};

export default Hero;
