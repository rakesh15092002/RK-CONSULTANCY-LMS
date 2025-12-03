import { Children, createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

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

  // fetch all courses from
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateAvgRating,
    isEducator,
    setIsEducator,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
