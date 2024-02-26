import React from "react";
import Link from "next/link";
import { ModeToggle } from "./theme";

const Nav = () => {
  return (
    <div className="shadow-md py-6 rounded-lg">
      <div className="flex justify-between  md:mx-[5vw] px-3 ">
        <Link href={"/"}>
          <div className="font-black">Where in the world?</div>
        </Link>
        <div className="font-black">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Nav;
