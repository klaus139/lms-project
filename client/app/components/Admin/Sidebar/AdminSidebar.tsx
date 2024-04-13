"use client";
import React, { FC, useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowBackIosIcon,
  ArrowForwardIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OnDemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  Wysiwyg,
  QuizIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./Icon";

import avatarDefault from "../../../../public/assets/avatar.webp";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface itemProps {
  title: string;
  to: string;
  icon: any;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111c43 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6878fa !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111c43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "8%" : "16%",
        }}
      >
        <Menu iconShape="square">
          {/* logo and memu icon here */}
           <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {/* <Link href="/">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-[#ffffffc1] text-black">
                    E-Learn
                  </h3>
                </Link> */}
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosIcon className="text-black ddark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )} 
          </MenuItem> 
          {/* <Menu iconShape="square">
          {/* logo and memu icon here */}
          {/* <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)} // Toggle collapse state
            icon={isCollapsed ? <ArrowForwardIosIcon className="text-red-500" /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-[#ffffffc1] text-black">
                    E-Learn
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block text-red-500 text-[30px] z-[10]"
                >
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )}
          </MenuItem> */}
          {/* Rest of the menu items */}
        {/* </Menu>  */}
          {!isCollapsed && (
            
            <Box mb="25px" justifyContent='center'>
                   <Link href="/">
                  <h3 className="text-[20px] ml-[0px] items-center justify-center flex  font-Poppins uppercase dark:text-[#ffffffc1] text-black">
                    E-Learn
                  </h3>
                </Link>
              <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="flex text-black dark:text-white text-[20px] items-center justify-center mx-auto flex-row gap-2"
                >
             
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1] text-[20px]" />
                </IconButton>
              
              <Box display="flex" justifyContent="center" alignItems="center">
                
              
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50px",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0 " }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "16px 0 0 0 " }}
                  className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize"
                >
                 - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[16px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[16px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OnDemandVideoIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[16px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              setSelected={setSelected}
              selected={selected}
            />
             <Item
              title="Categories"
              to="/admin/categories"
              icon={<Wysiwyg />}
              setSelected={setSelected}
              selected={selected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[16px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[16px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Course Analytics"
              to="/admin/course-analytics"
              icon={<BarChartOutlinedIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <Item
              title="Order Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <Item
              title="User Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[16px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="Settings"
              to="/admin/settings"
              icon={<SettingsIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <div onClick={logoutHandler}>
              <Item
                title="Logout"
                to="/"
                icon={<ExitToAppIcon />}
                setSelected={setSelected}
                selected={selected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
