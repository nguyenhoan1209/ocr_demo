import React from "react";
import SidebarMenu from "../components/SidebarMenu";

const BusinessLicensePage = () => {
  return (
<>
      <SidebarMenu />
      <div className="p-4 sm:ml-64 mt-20">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 border-dashed border-2 relative">
              <div className="text-xl font-bold bg-gradient-to-r from-greenlogo-100  to-orangelogo-100 text-transparent bg-clip-text mb-4 absolute top-0 left-10">
                Upload Your Licence
              </div>
              <p className="text-2xl text-black dark:text-gray-500 w-5/6 mt-10">
              </p>
            </div>

            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 border-dashed border-2 relative">
              <div className="text-xl font-bold bg-gradient-to-r from-orangelogo-100  to-greenlogo-100 text-transparent bg-clip-text mb-4 absolute left-10 top-0 ">
                Result
              </div>

              <p className="text-2xl text-black dark:text-gray-500 w-full h-full mt-20">
                
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default BusinessLicensePage;
