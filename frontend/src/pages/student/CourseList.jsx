import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/students/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/students/CourseCard";

const CourseList = () => {
  const { navigate ,allCourses} = useContext(AppContext);
  const {input} = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

useEffect(() => {
  if (allCourses && allCourses.length > 0) {
    const tempCourses = allCourses.slice();

    input
      ? setFilteredCourse(
          tempCourses.filter((item) =>
            item.courseTitle
              .toLowerCase()
              .includes(input.toLowerCase())
          )
        )
      : setFilteredCourse(tempCourses);
  }
}, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-30 text-left">
        <div className="flex justify-between md:flex-row flex-col gap-6 items-start w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800 ">Course List</h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input}/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {/* Course list content goes here */}
          {
            filteredCourse.map((course,index)=>(
              <CourseCard key={index} course={course}/>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default CourseList;
