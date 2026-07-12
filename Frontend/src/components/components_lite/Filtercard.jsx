import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  { filterType: "Location", array: ["Delhi", "Mumbai", "Kolkata", "Pune", "Bangalore", "Hyderabad", "Chennai", "Remote"] },
  { filterType: "Technology", array: ["Mern", "React", "Data Scientist", "Fullstack", "Node", "Python", "Java", "Frontend", "Backend", "Mobile", "Desktop"] },
  { filterType: "Experience", array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"] },
  { filterType: "Salary", array: ["0-50k", "50k-100k", "100k-200k", "200k+"] },
];

const Filter = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const dispatch = useDispatch();

  const handleChange = (filterType, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    const queryArray = Object.values(selectedValues);
    dispatch(setSearchedQuery(queryArray));
  }, [selectedValues, dispatch]);

  return (
    <div className="w-full bg-white rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <div className="mt-5">
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-bold text-lg mb-2">{data.filterType}</h2>
            {data.array.map((item, indx) => {
              const itemId = `Id${index}-${indx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <input
                    type="radio"
                    name={data.filterType}
                    id={itemId}
                    value={item}
                    checked={selectedValues[data.filterType] === item}
                    onChange={() => handleChange(data.filterType, item)}
                    className="w-4 h-4 text-[#6B3AC2] border-gray-300 focus:ring-[#6B3AC2] cursor-pointer"
                  />
                  <label htmlFor={itemId} className="cursor-pointer text-gray-700">
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
