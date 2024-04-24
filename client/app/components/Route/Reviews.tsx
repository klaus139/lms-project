import { styles } from '@/app/styles/style'
import Image from 'next/image'
import React from 'react'
import ReviewCard from '../review/ReviewCard'

interface Props {
    
}

export const reviews = [
    {
        name:"Gene Micheals",
        avatar:"https://randomuser.me/api/portraits/women/1.jpg",
        profession:"Student | HighFlyers",
        comment:"This e-learning platform has transformed my learning experience entirely! The variety of courses available is impressive, covering a wide range of topics from programming to business management. The bite-sized lessons make it easy to digest information, and the progress tracking feature keeps me accountable and motivated to reach my goals.."
    },
    {
        name:"Kelly Ofonsos",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"UI/UX Designer | Amazon",
        comment:"E-Learn does such a good job explaining the concepts so clearly and in a concise way, and the examples are well chosen, overall this is a valuable resource for anyone who is new to programming"
    },
    {
        name:"Fredrick Omotayo",
        avatar:"https://randomuser.me/api/portraits/men/2.jpg",
        profession:"Student | University of Ilorin",
        comment:"I've recommended this e-learning platform to all my friends and colleagues! The quality of the content is unmatched, and I've seen significant improvement in my skills since I started using it. Whether you're a beginner or an expert looking to upskill, this platform has something for everyone"
    },
    {
        name:"Mark Huggins",
        avatar:"https://randomuser.me/api/portraits/men/3.jpg",
        profession:"Developer | SimFit",
        comment:"As a busy professional, I appreciate the flexibility this e-learning platform offers. I can access courses anytime, anywhere, using my computer or mobile device. The mobile app is particularly convenient for learning on the go. Thank you for making education accessible and convenient"
    },
    {
        name:"Anne Tayo",
        avatar:"https://randomuser.me/api/portraits/women/2.jpg",
        profession:"Student | University of Lagos",
        comment:"I've tried several e-learning platforms, but this one stands out for its excellent instructor support. The instructors are knowledgeable, responsive, and truly passionate about teaching. I appreciate the personalized feedback they provide, which helps me understand complex concepts better."
    },
    {
        name:"Garry Cors",
        avatar:"https://randomuser.me/api/portraits/men/4.jpg",
        profession:"Intern | Google",
        comment:"Absolutely love this e-learning platform! The interface is user-friendly, making it easy to navigate through courses. The content is top-notch, with engaging lessons and interactive quizzes that keep me motivated to learn. Plus, the flexibility to study at my own pace is fantastic!"
    },
    {
        name:"Sarah Micheals",
        avatar:"https://randomuser.me/api/portraits/women/3.jpg",
        profession:"Developer | BBWE",
        comment:"This is amazing, simple and easy to use"
    },
]

const Reviews = (props: Props) => {
    return (
        <div className='w-[90%] 800px:w-[85%] m-auto'>
            <div className='w-full 800px:flex items-center'>
                <div className='800px:w-[50%] w-full'>
                    <Image
                    src={require('../../../public/assets/aboutus_intro.png')}
                    alt='business'
                    width={500}
                    height={500}
                    />
                </div>
                <div className='800px:w-[50%] w-full'>
                    <h3 className={`${styles.title} 800px:text-[40px]`}>
                        Our Students Are <span className='text-gradient bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text'>Our Strength</span>{" "}
                        <br /> See What They Say About Us
                    </h3>
                    <br />
                    <p className={`${styles.label}`}>
                        I really grew a lot learning from these guys and the resource they shared were profound. They taught me from a fresh beginner to a place where i knew i could stand for myself and appreciate all i had learnt.

                    </p>
                
                </div>
                <br />
                <br />
              
            </div>
            <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-20px] md:[&>*:nth-child(6)]:!mt-[-20px]'>
                    {
                        reviews && reviews.map((i, index) => <ReviewCard item={i} key={index} />)
                    }

                </div>
        </div>
    )
}

export default Reviews
