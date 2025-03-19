"use client";

import React, { Suspense } from "react";
import ProblemsDisplay from "../components/problems-list/ProblemsDisplay";
import Filters from "../components/problems-list/ProblemFilters";

const Page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <div className="mt-2">
        <Filters />
        <div>
          <ProblemsDisplay />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
