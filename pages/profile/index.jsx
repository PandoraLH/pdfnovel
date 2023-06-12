import React from "react";
import ProfileMenu from "components/ProfilePage/ProfileMenu";
import Library from "components/ProfilePage/Library";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

const ProfilePage = ({ session }) => {
   return (
      <div className="md:flex w-full bg-zinc-100 gap-4">
         <div className="hidden md:block md:w-[320px]">
            <ProfileMenu image={session.user.image} />
         </div>
         <div className=" w-full">
            <Library session={session} />
         </div>
      </div>
   );
};

export default ProfilePage;

export async function getServerSideProps(context) {
   const session = await getServerSession(
      context.req,
      context.res,
      authOptions
   );
   if (!session) {
      return {
         redirect: {
            destination: "/login",
            permanent: false,
         },
      };
   }
   return {
      props: {
         title: "Profile",
         session,
      },
   };
}
