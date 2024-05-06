import React, { useContext, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import AuthContext from "../context/AuthContext";
import FrontImageContext from "../context/FrontImageContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EkycPage = () => {
  const [token, setToken] = useContext(AuthContext);
  const [frontImg, setFrontImg] = useContext(FrontImageContext);

  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();

  const [infoImg, setInfoImg] = useState(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState()

  const navigate = useNavigate();

  function capitalizeEachWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (img1 && img2) {
      const file = img1;
      const reader = new FileReader();

      reader.onloadend = () => {
        localStorage.setItem("frontImg", reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }

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
        formData.append("img1", img1);
        formData.append("img2", img2);

        const requestOptions = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + apiToken.access_token,
          },
        };

        const ekycResponse = await fetch(
          "http://125.212.225.71:8000/v2/ekyc/cards/file?get_thumb=false",
          requestOptions
        );

        const ekycData = await ekycResponse.json();
        const infoEkyc = ekycData.data;

        if (ekycData) {
          setInfoImg(infoEkyc);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveUser = async () => {
    const userSave = {
      fullname: infoImg[1].info.name,
      dob: infoImg[1].info.dob,
      card_id: infoImg[1].info.id,
      nationality: capitalizeEachWord(infoImg[1].info.nationality),
      sex: capitalizeEachWord(infoImg[1].info.gender),
      place_of_issuance: infoImg[1].info.hometown,
      place_of_origin: infoImg[1].info.address,
      date_of_issuance: infoImg[0].info.issue_date,
      place_of_residence: infoImg[0].info.issued_at,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(userSave),
      headers: {
        Authorization: "Bearer " + token.access_token,
      },
    };

    const response = await fetch(
      "http://125.212.225.71:8000/mirae/save/profile/ekyc",
      requestOptions
    );

    const data = await response.json();

    if (data.status) {
      toast.success("User saved!", {
        position: "top-center",
      });
      setStatus(true)
    } else {
      toast.warning("User already registed information Ekyc", {
        position: "top-center",
      });
      setStatus(false)
    }
  };

  return (
    <>
      <SidebarMenu />
      <div className="p-4 sm:ml-64 mt-20">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
            {/* EKYC */}
            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 border-dashed border-2 relative">
              <div className="text-xl font-bold bg-gradient-to-r from-greenlogo-100  to-orangelogo-100 text-transparent bg-clip-text mb-4 absolute top-0 left-10">
                EKYC
              </div>
              <p className="text-2xl text-black dark:text-gray-500 w-5/6 mt-10">
                <form className="w-full" onSubmit={handleImageUpload}>
                  <div>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="text-lg font-bold flex flex-col items-center justify-center w-full h-48  border-gray-300  rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            setImg1(e.target.files[0]);
                          }}
                        />
                        Mặt trước
                        {!img1 ? (
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
                              src={URL.createObjectURL(img1)}
                              className="object-scale-down w-5/6 h-5/6"
                              alt="Uploaded"
                            />
                          </div>
                        )}
                      </label>
                    </div>

                    <div className="flex items-center justify-center w-full mt-5">
                      <label
                        htmlFor="dropzone-file-2"
                        className="text-lg font-bold flex flex-col items-center justify-center w-full h-48  border-gray-300  rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <input
                          id="dropzone-file-2"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            setImg2(e.target.files[0]);
                          }}
                        />
                        Mặt sau
                        {!img2 ? (
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
                              src={URL.createObjectURL(img2)}
                              className="object-scale-down w-5/6 h-5/6"
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
                      Upload
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

            {/* OCR */}
            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 border-dashed border-2 relative">
              <div className="text-xl font-bold bg-gradient-to-r from-orangelogo-100  to-greenlogo-100 text-transparent bg-clip-text mb-4 absolute left-10 top-0 ">
                OCR
              </div>

              <p className="text-2xl text-black dark:text-gray-500 w-5/6 h-full mt-20">
                {!loading && infoImg ? (
                  <div className="overflow-auto h-[27.8rem] shadow-md sm:rounded-lg">
                    <table className="h-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                      <thead className="text-xs text-white uppercase bg-greenlogo-100 border-b border-gray-500 dark:text-white">
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
                        <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                          >
                            ID
                          </th>
                          <td className="px-6 py-4 text-black">
                            {infoImg[1].info.id}
                          </td>
                          <td
                            className={`px-6 py-4 text-black font-bold underline ${
                              infoImg[1].info.id_confidence > 0.75
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {Math.round(infoImg[1].info.id_confidence * 10000) /
                              100}
                            %
                          </td>
                        </tr>
                        <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                          >
                            Name
                          </th>
                          <td className="px-6 py-4 text-black">
                            {infoImg[1].info.name}
                          </td>
                          <td
                            className={`px-6 py-4 text-black font-bold underline ${
                              infoImg[1].info.name_confidence > 0.75
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {Math.round(
                              infoImg[1].info.name_confidence * 10000
                            ) / 100}
                            %
                          </td>
                        </tr>
                        <tr className="border-b border-gray-500 bg-gray-100 hover:bg-orangelogo-50 ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                          >
                            DOB
                          </th>
                          <td className="px-6 py-4 text-black">
                            {infoImg[1].info.dob}
                          </td>
                          <td
                            className={`px-6 py-4 text-black font-bold underline ${
                              infoImg[1].info.id_confidence > 0.75
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {Math.round(
                              infoImg[1].info.dob_confidence * 10000
                            ) / 100}{" "}
                            %
                          </td>
                        </tr>
                        <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                          >
                            Gender
                          </th>
                          <td className="px-6 py-4 text-black">
                            {infoImg[1].info.gender}
                          </td>
                          <td
                            className={`px-6 py-4 text-black  font-bold underline ${
                              infoImg[1].info.gender_confidence > 0.75
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {Math.round(
                              infoImg[1].info.gender_confidence * 10000
                            ) / 100}{" "}
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
                            {infoImg[1].info.address}
                          </td>
                          <td
                            className={`px-6 py-4 text-black font-bold underline ${
                              infoImg[1].info.address_confidence > 0.75
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {Math.round(
                              infoImg[1].info.address_confidence * 10000
                            ) / 100}{" "}
                            %
                          </td>
                        </tr>

                        <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                          >
                            Home town
                          </th>
                          <td className="px-6 py-4 text-black">
                            {infoImg[1].info.hometown}
                          </td>
                          <td
                            className={`px-6 py-4 text-black font-bold underline ${
                              infoImg[1].info.hometown_confidence > 0.75
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {Math.round(
                              infoImg[1].info.hometown_confidence * 10000
                            ) / 100}{" "}
                            %
                          </td>
                        </tr>

                        <tr className="border-b border-gray-500 bg-gray-100 hover:bg-orangelogo-50 ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                          >
                            Ethnicity
                          </th>
                          <td className="px-6 py-4 text-black">
                            {infoImg[0].info.ethnicity}
                          </td>
                          <td
                            className={`px-6 py-4 text-black font-bold underline ${
                              infoImg[0].info.ethnicity_confidence > 0.75
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {Math.round(
                              infoImg[0].info.ethnicity_confidence * 10000
                            ) / 100}{" "}
                            %
                          </td>
                        </tr>

                        <tr className="border-b border-gray-500 bg-gray-200 hover:bg-orangelogo-50 ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                          >
                            Identification Sign
                          </th>
                          <td className="px-6 py-4 text-black">
                            {infoImg[0].info.identification_sign}
                          </td>
                          <td
                            className={`px-6 py-4 text-black font-bold underline ${
                              infoImg[0].info.identification_sign_confidence >
                              0.75
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {Math.round(
                              infoImg[0].info.identification_sign_confidence *
                                10000
                            ) / 100}{" "}
                            %
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-4xl flex justify-center items-center font-bold my-36">
                    No data to display
                  </div>
                )}
                {!loading && infoImg ? (
                  <button
                    onClick={handleSaveUser}
                    className="w-full mt-10 place-content-center text-white bg-gradient-to-br from-greenlogo-100 to-orangelogo-100 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                  >
                    Save
                  </button>
                ) : (
                  <div></div>
                )}
              </p>
            </div>
          </div>
          {status ? (
            <div className="flex items-center justify-center h-5 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <button
                  onClick={() => {
                    navigate("/face-matching");
                  }}
                  className="w-full mt-5 place-content-center text-white  bg-green-700  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                >
                  Go to Face Matching
                </button>
              </p>
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

export default EkycPage;
