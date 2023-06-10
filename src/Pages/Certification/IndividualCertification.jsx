/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";
import RuleImage from "../../assets/Certifications/rule.png";
import style from "./individualCertification.module.css";

const IndividualCertification = ({ course }) => {
  const { courseId, courseName, courseImg, courseDesc } = course;
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // modal contains rules of the exam
  const toggleRuleModal = () => {
    setRuleModalOpen(ruleModalOpen === true ? false : true);
  };

  // modal contains confirmation message to proceed
  const toggleConfirmationModal = () => {
    setConfirmModalOpen(confirmModalOpen === true ? false : true);
  };

  return (
    <div className="card my-5 bg-base-100 shadow-xl">
      <figure className="h-[220px]">
        <img
          src={courseImg}
          alt="course image"
          className="object-cover h-full w-full"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title font-bold text-2xl font-roboto">
            {courseName}
          </h2>

          {/* rule modal  */}
          <button onClick={toggleRuleModal}>
            <img src={RuleImage} alt="image" className="w-[50px] h-[50px]" />
          </button>

          {/* modal box of rules  */}
          {ruleModalOpen && (
            <div className={`${style.popup} px-[6%]`}>
              <div className={`${style.overlay}`}>
                <div className={`${style.content}`}>
                  {/* course image  */}
                  <div className="mb-10 sm:w-[50%] sm:mx-auto">
                    <img
                      src={courseImg}
                      alt="course image"
                      className="w-full object-cover rounded-lg"
                    />
                  </div>

                  {/* course name  */}
                  <h1 className="text-3xl font-bold my-4">
                    {courseName} Certification Exam
                  </h1>

                  {/* course description  */}
                  <h2 className="font-bold text-start text-2xl mb-3">
                    Description:
                  </h2>
                  <p className="text-start">{courseDesc}</p>

                  {/* Exam rules  */}
                  <h2 className="text-2xl text-start font-bold my-3">Rules:</h2>
                  <ol
                    className={`${style.orderList} text-start list-disc ml-[10%] pb-5`}
                  >
                    <li>The exam duration is 2 hours</li>
                    <li>Total number of question is 100</li>
                    <li>
                      Each correct answer will be awarded +1 mark, while each
                      wrong answer will result in -1 mark.
                    </li>
                    <li>
                      If you minimize your window of the browser, then your exam
                      will be finished.
                    </li>
                    <li>
                      Users scoring 80 marks or more will pass, while those
                      scoring less than 80 will fail.
                    </li>
                  </ol>

                  <button
                    className="font-roboto bg-[#1abc9c] text-white py-[10px] px-[30px] rounded-full"
                    onClick={toggleRuleModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="font-poppins text-sm text-justify">
          {courseDesc.split(".")[0]}
        </p>

        <div className="card-actions justify-end">
          {/* modal of confirmation  */}
          <button 
            className="btn bg-[#42B2BE] font-roboto text-white rounded-full"
            onClick={toggleConfirmationModal}
          >
            Give Exam
          </button>

          {/* modal box of rules  */}
          {confirmModalOpen && (
            <div className={`${style.popup} px-[6%]`}>
              <div className={`${style.overlay}`}>
                <div className={`${style.content}`}>
                  {/* course name  */}
                  <h1 className="text-3xl font-bold my-4">Are you ready?</h1>

                  {/* Exam rules  */}
                  <h2 className="text-2xl text-start text-red-500 font-bold my-3">
                    Read the following rules again:
                  </h2>
                  <ol
                    className={`${style.orderList} text-start list-disc ml-[10%] pb-5`}
                  >
                    <li>The exam duration is 2 hours</li>
                    <li>Total number of question is 100</li>
                    <li>
                      Each correct answer will be awarded +1 mark, while each
                      wrong answer will result in -1 mark.
                    </li>
                    <li>
                      If you minimize your window of the browser, then your exam
                      will be finished.
                    </li>
                    <li>
                      Users scoring 80 marks or more will pass, while those
                      scoring less than 80 will fail.
                    </li>
                  </ol>

                  <div className="flex justify-between md:w-[30%] mx-auto my-10">
                    <button
                      className="bg-[#e74c3c] text-white font-roboto py-[15px] px-[20px] rounded-full"
                      onClick={toggleConfirmationModal}
                    >
                      Cancel
                    </button>
                    <Link
                      to={`/certifications/${courseName}/exam`}
                      className="bg-[#2ecc71] text-white py-[15px] px-[20px] font-roboto rounded-full"
                    >
                     Start Exam
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualCertification;
