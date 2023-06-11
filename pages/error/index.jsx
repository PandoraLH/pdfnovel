import React from "react";

const index = () => {
  return (
    <div className="px-5 py-10 bg-zinc-100">
      <h1 className="flex font-bold text-red-500 justify-center text-center align-middle ">
        You are seeing this error because you are trying to login using a
        provider (Facebook, Google) but the email associated with that account
        have already exist in our credentials database (normal Login), please
        check if you have any other account that alreay associated with this
        email.
      </h1>
    </div>
  );
};

export default index;
