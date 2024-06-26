import React, { FC, useState, useEffect } from "react";
import { styles } from "../../../app/styles/style";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/avatar.webp";
import Image from "next/image";
import { useEditProfileMutation, useUpdateAvatarMutation } from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { putApi } from "@/app/utils/FetchData";
type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, {isSuccess:success, error:updateError, isLoading}] = useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();

    fileReader.onload = () => {
      
      if(fileReader.readyState === 2){
        const avatar = fileReader.result;
        console.log(avatar)
        updateAvatar(avatar)
        toast.success('image updated successfully')
      }
    }
    fileReader.readAsDataURL(e.target.files[0]);
    
  };

  useEffect(() => {
    if(isSuccess || success){
      setLoadUser(true);
    }
    if (error|| updateError) {
      console.log(error);
    }
    if(success){
      toast.success('profile updated successfully')
    }
  }, [error, isSuccess, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(name!== ""){
      await editProfile({
        name:name,
        
      
      })
    }
    
    // You can add logic here to update other user details if needed
  };






 

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="relative">
          <Image
            src={user?.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            width={200}
            height={200}
            alt=""
            className="w-[120px] h-[120px] cursor-pointer border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
        <br />
        <br />
        <div className="w-full pl-6 800px:pl-10">
          <form onSubmit={handleSubmit}>
            <div className="800px:w-[50%] m-auto block pb-4">
              <div className="w-[100%]">
                <label className="block pb-2">Full Name</label>
                <input
                  type="text"
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-[100%] pt-3">
                <label className="block pb-1">Email Address</label>
                <input
                  type="text"
                  readOnly
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={user?.email}
                />
              </div>
              <input
                className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
              {
                isLoading  && (
                  <h1>Loading...</h1>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
