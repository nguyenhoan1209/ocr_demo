import React, { useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const BusinessLicensePage = () => {
  const [file, setFile] = useState(null);
  const [viewFile, setViewFile] = useState(null);
  const [pdfFile, setPdfFile] = useState();
  const [loading, setLoading] = useState(false);
  const [infoLicense, setInfoLicense] = useState(null);

  const [tableData, setTableData] = useState(null);

  const newPlugin = defaultLayoutPlugin();
  const fileType = ["application/pdf"];
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setPdfFile(uploadedFile);
    console.log(pdfFile);
    if (uploadedFile) {
      if (uploadedFile && fileType.includes(uploadedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        reader.onload = (e) => {
          setFile(e.target.result);
        };
      } else {
        setFile(null);
      }
    } else {
      console.log("upload");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file !== null) {
      setViewFile(file);
    } else {
      setViewFile(null);
    }
  };

  const handleVerifyClick = async (e) => {
    if (pdfFile) {
      const api_key = "maitrongjthuaanf";
      const tokenFormData = new FormData();
      tokenFormData.append("api_key", api_key);

      const apiKeyOptions = {
        method: "POST",
        body: tokenFormData,
      };

      const tokenResponse = await fetch(
        "http://125.212.225.71:8000/auth",
        apiKeyOptions
      );

      const apiToken = await tokenResponse.json();

      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("img", pdfFile);

        const requestOptions = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + apiToken.access_token,
          },
        };

        const licenseResponse = await fetch(
          "https://api.smartbot.vn/v2/ocr/document/business_registration/file?get_thumb=false",
          requestOptions
        );

        const licenseResponseData = await licenseResponse.json();
        const infolicenseOCR = licenseResponseData.data;

        if (licenseResponseData) {
          setInfoLicense(infolicenseOCR);
          console.log(infolicenseOCR);
        }
      } catch (err) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowTable = async (e) => {
    try {
      
      const requestOptions = {
        method: "GET",
      }
      
      const response = await fetch(`https://api.vietqr.io/v2/business/${infoLicense[0].info.business_code}`,
        requestOptions
      );
      const data = await response.json()
      

      if (data) {
        if (data.code == "00"){
        setTableData(data)
        if(tableData.data.id == infoLicense[0].info.business_code){
          toast.success("Legal!", {
            position: "top-center",
          })
        }else{
          setTableData(null)
          toast.warning("Illegal!", {
            position: "top-center"
          })
        }}else{
          toast.error("Not found!", {
            position: "top-center"
          })

        }
      } else {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <SidebarMenu />
      <div className="p-4 sm:ml-64 mt-20">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 border-dashed border-2 relative">
              <div className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text mb-4 absolute top-0 left-10">
                Upload Your Licence
              </div>
              <p className="text-2xl text-black dark:text-gray-500 w-5/6 mt-10">
                <form  onSubmit={handleSubmit}>
                  
                    <div className="grid grid-cols-8">
                      <input
                        className="col-span-7 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="large_size"
                        type="file"
                        onChange={(e) => {
                          handleFileChange(e);
                        }}
                      />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center place-content-center text-white bg-green-700 font-medium rounded-lg text-sm text-center  "
                    >
                      Submit
                    </button>
                    </div>
                </form>
                <div className="h-[27rem] w-full mt-10">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      {viewFile && (
                        <>
                          <Viewer
                            fileUrl={viewFile}
                            plugins={[]}
                          ></Viewer>
                        </>
                      )}
                    </Worker>
                  </div>

                <div>
                  {!loading && pdfFile ? (
                    <button
                      onClick={handleVerifyClick}
                      className="w-full mt-10 place-content-center text-white bg-green-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    >
                      OCR License
                    </button>
                  ) : (
                    <div className="text-center mt-10 mb-10">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orangelogo-100"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}

                  
                </div>
              </p>
            </div>

            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 border-dashed border-2 relative">
              <div className="text-xl font-bold bg-gradient-to-r from-red-600  to-red-500 text-transparent bg-clip-text mb-4 absolute left-10 top-0 ">
                Result
              </div>

              <p className="text-2xl text-black dark:text-gray-500 w-11/12 mt-10">
                {!loading && infoLicense ? (
                  <div>
                    
                    <div className="overflow-auto h-[31rem] shadow-md sm:rounded-lg w-full">
                      <table className="h-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                        <thead className="sticky top-0 text-xs text-white uppercase bg-red-500 border-b border-gray-500 dark:text-white">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Info
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Data
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Confident Level
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-red-200 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Business code
                            </th>
                            <td className="px-6 py-4 text-black">
                              {infoLicense[0].info.business_code}
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info.business_code > 0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info.business_code_confidence *
                                  10000
                              ) / 100}
                              %
                            </td>
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Company Name
                            </th>
                            <td className="px-6 py-4 text-black">
                              {infoLicense[0].info.company_name}
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info.company_name_confidence >
                                0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info.company_name_confidence *
                                  10000
                              ) / 100}
                              %
                            </td>
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              English Name
                            </th>
                            <td className="px-6 py-4 text-black">
                              {infoLicense[0].info.english_name}
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info.english_name_confidence >
                                0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info.english_name_confidence *
                                  10000
                              ) / 100}
                              %
                            </td>
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-100 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Address
                            </th>
                            <td className="px-6 py-4 text-black">
                              {infoLicense[0].info.address}
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info.address_confidence > 0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info.address_confidence * 10000
                              ) / 100}{" "}
                              %
                            </td>
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Company phone
                            </th>
                            <td className="px-6 py-4 text-black">
                              {infoLicense[0].info.company_phone}
                            </td>
                            <td
                              className={`px-6 py-4 text-black  font-bold underline ${
                                infoLicense[0].info.company_phone_confidence >
                                0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info.company_phone_confidence *
                                  10000
                              ) / 100}{" "}
                              %
                            </td>
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-100 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Authorized capital
                            </th>
                            <td className="px-6 py-4 text-black">
                              {infoLicense[0].info.authorized_capital}
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info
                                  .authorized_capital_confidence > 0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info
                                  .authorized_capital_confidence * 10000
                              ) / 100}{" "}
                              %
                            </td>
                          </tr>

                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Representative name
                            </th>
                            <td className="px-6 py-4 text-black">
                              {
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .representative_name
                              }
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .representative_name_confidence > 0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .representative_name_confidence * 10000
                              ) / 100}{" "}
                              %
                            </td>
                          </tr>

                          <tr className="border-b border-gray-500 bg-gray-100 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Representative title
                            </th>
                            <td className="px-6 py-4 text-black">
                              {
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .representative_title
                              }
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .representative_title_confidence > 0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .representative_title_confidence * 10000
                              ) / 100}{" "}
                              %
                            </td>
                          </tr>

                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              DOB
                            </th>
                            <td className="px-6 py-4 text-black">
                              {
                                infoLicense[0].info
                                  .list_of_legal_representatives[0].dob
                              }
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .dob_confidence > 0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .dob_confidence * 10000
                              ) / 100}{" "}
                              %
                            </td>
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Document type
                            </th>
                            <td className="px-6 py-4 text-black">
                              {
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .document_type
                              }
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .document_type_confidence > 0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .document_type_confidence * 10000
                              ) / 100}{" "}
                              %
                            </td>
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Number of idcard
                            </th>
                            <td className="px-6 py-4 text-black">
                              {
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .number_of_idcard
                              }
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .number_of_idcard_confidence > 0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .number_of_idcard_confidence * 10000
                              ) / 100}{" "}
                              %
                            </td>
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Household address
                            </th>
                            <td className="px-6 py-4 text-black">
                              {
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .household_address
                              }
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .household_address_confidence > 0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .household_address_confidence * 10000
                              ) / 100}{" "}
                              %
                            </td>
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Representative address
                            </th>
                            <td className="px-6 py-4 text-black">
                              {
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .representative_address
                              }
                            </td>
                            <td
                              className={`px-6 py-4 text-black font-bold underline ${
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .representative_address_confidence > 0.75
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {Math.round(
                                infoLicense[0].info
                                  .list_of_legal_representatives[0]
                                  .representative_address_confidence * 10000
                              ) / 100}{" "}
                              %
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button
                      onClick={handleShowTable}
                      className="w-full mt-10 place-content-center text-white bg-green-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  "
                    >
                      Verify 
                    </button>
                  </div>

                  
                ) : (
                  <div className="text-4xl flex justify-center items-center font-bold my-36">
                    No data to display
                  </div>
                )}
              </p>
            </div>
          </div>
          

          {tableData ? (
            <div className="grid grid-cols-1 gap-4 mb-4 mt-10">
            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 border-dashed border-2 relative">
              <div className="text-xl font-bold bg-gradient-to-r from-orangelogo-100  to-greenlogo-100 text-transparent bg-clip-text mb-4 absolute left-10 top-0 ">
                Data Register with government
              </div>

              <p className="text-2xl text-black dark:text-gray-500 w-11/12 mt-10">
                {!loading && infoLicense ? (
                  <div>
                    
                    <div className="overflow-auto h-[16rem] shadow-md sm:rounded-lg w-full">
                      <table className="h-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-greenlogo-100 border-b border-gray-500 dark:text-white">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Info
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Data
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Business code
                            </th>
                            <td className="px-6 py-4 text-black">
                              {tableData.data.id}
                            </td>

                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Company Name
                            </th>
                            <td className="px-6 py-4 text-black">
                              {tableData.data.name}
                            </td>
                            
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              English Name
                            </th>
                            <td className="px-6 py-4 text-black">
                              {tableData.data.internationalName}
                            </td>
                            
                          </tr>
                          <tr className="border-b border-gray-500 bg-gray-100 hover:bg-orangelogo-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                            >
                              Address
                            </th>
                            <td className="px-6 py-4 text-black">
                              {tableData.data.address}
                            </td>
                            
                          </tr>

                        </tbody>
                      </table>
                    </div>
                    
                  </div>

                  
                ) : (
                  <div className="text-4xl flex justify-center items-center font-bold my-36">
                    No data to display
                  </div>
                )}
              </p>
            </div>
            
          </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default BusinessLicensePage;
