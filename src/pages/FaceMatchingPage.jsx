import React, { useState, useContext } from "react";
import SidebarMenu from "../components/SidebarMenu";
import FrontImageContext from "../context/FrontImageContext";
import { CircleCheck, CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FaceMatchingPage = () => {
  const [frontImg, setFrontImg] = useContext(FrontImageContext);

  const [imgFace, setImgFace] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [infoMaching, setInforMatching] = useState();

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const dataUrl = frontImg;

    // Convert data URL to Blob
    const parts = dataUrl.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const byteCharacters = atob(parts[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    // Create File object from Blob
    const imgCart = new File([blob], "frontImg.jpg", { type: contentType });

    if (imgCart && imgFace) {
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
        formData.append("img1", imgCart);
        formData.append("img2", imgFace);
        formData.append("format_type", "file");
        formData.append("type1", "card");

        const requestOptions = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + apiToken.access_token,
          },
        };

        const matchingResponse = await fetch(
          "http://125.212.225.71:8000/v2/ekyc/file/verification",
          requestOptions
        );

        const matchingData = await matchingResponse.json();
        const infoFaceMatching = matchingData.data;

        if (infoFaceMatching) {
          setInforMatching(infoFaceMatching);
          if(infoFaceMatching.match > 0){
            toast.success("Matching!", {
              position: "top-center",
            })
          }else{
            toast.warning("Unmatching!", {
              position: "top-center"
            })
          }
        } else {
        }
      } catch {
        console.log("dm");
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <>
      <SidebarMenu />
      <div className="p-4 sm:ml-64 mt-20">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 border-dashed border-2 relative">
              <div className="text-xl font-bold bg-gradient-to-r from-greenlogo-100  to-orangelogo-100 text-transparent bg-clip-text mb-4 absolute top-0 left-10">
                Face Matching
              </div>
              <p className="text-2xl text-black dark:text-gray-500 w-5/6 mt-10">
                <form className="w-full" onSubmit={handleImageUpload}>
                  <div>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="text-lg font-bold flex flex-col items-center justify-center w-full h-96  border-gray-300  rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            setImgFace(e.target.files[0]);
                          }}
                        />

                        {!imgFace ? (
                          <div>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>{" "}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-full h-44">
                            <img
                              src={URL.createObjectURL(imgFace)}
                              className="object-scale-down w-80 h-80"
                              alt="Uploaded"
                            />
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  {!loading ? (
                    <button
                      type="submit"
                      className="w-full mt-10 place-content-center text-white bg-gradient-to-br from-greenlogo-100 to-orangelogo-100 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    >
                      Verify
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
                </form>
              </p>
            </div>

            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 border-dashed border-2 relative">
              <div className="text-xl font-bold bg-gradient-to-r from-orangelogo-100  to-greenlogo-100 text-transparent bg-clip-text mb-4 absolute left-10 top-0 ">
                Result
              </div>

              <p className="text-2xl text-black dark:text-gray-500 w-full h-full mt-20">
                {!loading && infoMaching ? (
                  <div>
                    <div className="flex items-center justify-center w-full">
                      <label className="text-lg font-bold flex flex-col items-center justify-center w-5/6 h-72  border-gray-300  rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ">
                        <img
                          src={frontImg}
                          className="object-scale-down  h-5/6 w-5/6"
                          alt="Uploaded"
                        />
                      </label>
                    </div>
                    <div>
                      <div className="flex items-center justify-center w-full">
                        <label className="text-lg font-bold flex flex-col items-center justify-center w-5/6 h-40  border-gray-300  rounded-lg cursor-pointer ">
                          <div>
                            <h2 className=" mt-12 mb-2 text-lg font-bold text-gray-900 dark:text-white">
                              Matching Info :
                            </h2>
                            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                              <li className="flex items-center">
                                {infoMaching.match > 0 ? (
                                  <CircleCheck />
                                ) : (
                                  <CircleX />
                                )}
                                <p className="mx-10">
                                  Match: {infoMaching.match}
                                </p>
                              </li>
                              <li className="flex items-center">
                                {infoMaching.matching > 75 ? (
                                  <CircleCheck />
                                ) : (
                                  <CircleX />
                                )}
                                <p className="mx-10">
                                  Confident Level:{" "}
                                  {Math.round(infoMaching.matching * 100) / 100}
                                </p>
                              </li>
                            </ul>
                          </div>
                          {infoMaching.match > 0 ? (
                            <button
                            onClick={()=>{navigate("/business-license")}}
                            className="w-full mt-5 place-content-center text-white bg-gradient-to-br from-greenlogo-100 to-green-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                              Go to OCR business license
                            </button>
                          ) : (
                            <button

                            className="w-full mt-5 place-content-center text-white bg-gradient-to-br from-orangelogo-100 to-orange-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                              Verify Fail
                            </button>
                          )}
                        </label>
                      </div>
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

export default FaceMatchingPage;
