"use client"
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import Protected from "../hooks/useProtected";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Profile from "../components/Profile/Profile";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const { user } = useSelector((state: any) => state.auth);

  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} profile - ELearn`}
          description="E-Learning is a platform for students to learn and get help from tutors"
          keywords="Programming, Data Analysis, Cyber Security, Full-stack, Backend, Frontend, Machine Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default Page;