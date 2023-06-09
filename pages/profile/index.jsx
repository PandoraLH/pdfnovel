import React from "react";
import ProfileMenu from "components/ProfilePage/ProfileMenu";
import Library from "components/ProfilePage/Library";

const ProfilePage = () => {
   return (
      <div className="md:flex w-full bg-zinc-100 gap-4">
         <div className="hidden md:block md:w-[320px]">
            <ProfileMenu />
         </div>
         <div className=" w-full">
            <Library />
         </div>
      </div>
   );
};

export default ProfilePage;
