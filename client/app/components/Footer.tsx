import Link from "next/link";
import React from "react";

interface Props {}

const Footer = (props: Props) => {
  return (
    <div className="border mt-4 border-[#000000e] dark:border-[#ffffff1e]">
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-[14px] text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[14px] text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[14px] text-black dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-[14px] text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-[14px] text-black dark:text-gray-300 dark:hover:text-white"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-[14px] text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className='text-[20px] font-[600] text-black dark:text-white'>Social Links</h3>
            <ul>
                <li>
                    <Link 
                    href='https://www.youtube.com/channel/'
                    className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'
                    >
                    YouTube
                    </Link>
                </li>
                <li>
                    <Link 
                    href='https://www.instagram.com/e-learning'
                    className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'
                    >
                    Instagram
                    </Link>
                </li>
                <li>
                    <Link 
                    href='https://www.github.com/klaus139'
                    className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'
                    >
                    Github
                    </Link>
                </li>
            </ul>

          </div>
          <div>
            <h3 className='text-[20px] font-[600] text-black dark:text-white pb-3'>Contact Info</h3>
            <p className='text-[14px] text-gray-700 dark:text-gray-300 dark:hover:text-white pb-2'>
                Call Us: +2348072345624
            </p>
            <p className=' text-[14px] text-gray-700 dark:text-gray-300 dark:hover:text-white pb-2'>
                Mail Us: nickoklaus5@gmail.com
            </p>
            <p className=' text-[14px] text-gray-700 dark:text-gray-300 dark:hover:text-white pb-2'>
                Address: Victoria Island, Lagos, Nigeria
            </p>

          </div>
        </div>
        
      </div>
      <br />
      <div className='text-center text-[14px] mt-3 mb-2 text-black dark:text-white'>
        Copyright &copy; {new Date().getFullYear()} E-Learn | All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
