"use client";

import useAlgolia from "@hooks/useAlgolia";
import React, { useEffect } from "react";

const Page = () => {
  const { AssignParent } = useAlgolia();

  useEffect(() => {
    AssignParent("algolia-search");
  }, []);

  return <section id="algolia-search" className="w-full"></section>;
};

export default Page;
