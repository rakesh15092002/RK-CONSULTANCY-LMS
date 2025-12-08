import { Children, createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const navigate = useNavigate();

  //   function to calculate avg rating from ratings array
  const calculateAvgRating = (course) => {
    const ratings = course?.courseRatings || [];
    if (ratings.length === 0) return 0;
    let totalRating = 0;
    ratings.forEach((r) => {
      totalRating += r.rating;
    });
    return totalRating / ratings.length;
  };

  // calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture)=>time+=lecture.duration);
    return humanizeDuration(time*60*1000,{units:['h','m']});
}
// calculate the duration of the course
const calculateCourseDuration = (course) => {
  let time = 0;
  course.courseContent.map((chapter) => {
    chapter.chapterContent.map((lecture) => {
      time += lecture.lectureDuration;
    });
  });
  return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
};

// calulate total lectures in a course
const calculateNoOfLectures = (course) => {
  let totalLectures = 0;
  course.courseContent.forEach((chapter) => {
    if(Array.isArray(chapter.chapterContent)){
      totalLectures += chapter.chapterContent.length;
    }
  });
  return totalLectures;
}


  // fetch all courses from
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };


  // fetch enrolled courses

  const fetchEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  }

  useEffect(() => {
    fetchAllCourses();
    fetchEnrolledCourses();
  }, [allCourses]);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateAvgRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,

  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
