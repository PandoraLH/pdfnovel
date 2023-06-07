import React from "react";
import ProfileMenu from "components/ProfilePage/ProfileMenu";
import Library from "components/ProfilePage/Library";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

const ProfilePage = ({ session }) => {
  return (
    <div className="profile flex bg-zinc-100">
      <div className="profile-menu">
        <Image
          src={session.user.image}
          alt="Profile Pic"
          width={320}
          height={320}
        />
        <ProfileMenu />
      </div>
      <div className="profile-content w-full mx-5">
        <Library />
      </div>
    </div>
  );
};

export default ProfilePage;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
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
