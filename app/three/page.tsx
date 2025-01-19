"use client";

import useThree from "@hooks/useThree";
import React from "react";

const Page = () => {
  useThree({ objPath: "/3d_models/newpillow.glb", parentId: "container" });

  return <section id="container" className="w-full"></section>;
};

export default Page;
