import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import RecommendedJobs from "./RecommendedJobs";

const Description = () => {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyOrWithdrawHandler = async () => {
    if (!user) {
      toast.error("Please login to apply for this job");
      navigate("/login");
      return;
    }

    try {
      if (isApplied) {
        // WITHDRAW LOGIC
        const res = await axios.delete(`${APPLICATION_API_ENDPOINT}/withdraw/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          setIsApplied(false);
          const updateSingleJob = {
            ...singleJob,
            applications: singleJob.applications.filter(app => app.applicant !== user?._id)
          };
          dispatch(setSingleJob(updateSingleJob));
          toast.success(res.data.message);
        }
      } else {
        // APPLY LOGIC
        const res = await axios.post(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, null, { withCredentials: true , headers: {'Content-Type':'application/json'}});
        if (res.data.success) {
          setIsApplied(true);
          const currentApplications = singleJob?.applications || [];
          const updateSingleJob = {
            ...singleJob,
            applications: [...currentApplications, { applicant: user?._id }],
          };
          dispatch(setSingleJob(updateSingleJob));
          toast.success(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);
  console.log("single jobs", singleJob);

  if (!singleJob) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10 px-4 md:px-8">
        <Button onClick={() => navigate(-1)} variant="ghost" className="mb-4 flex items-center gap-2 text-gray-600">
          <ArrowLeft size={18} />
          Back
        </Button>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-2 items-center mt-4">
              <Badge className={"text-blue-600 font-bold"} variant={"ghost"}>
                {singleJob?.position} Open Positions
              </Badge>
              <Badge className={"text-[#FA4F09] font-bold"} variant={"ghost"}>
                {singleJob?.salary}LPA
              </Badge>
              <Badge className={"text-[#6B3AC2] font-bold"} variant={"ghost"}>
                {singleJob?.location}
              </Badge>
              <Badge className={"text-black font-bold"} variant={"ghost"}>
                {singleJob?.jobType}
              </Badge>
            </div>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <Button
              onClick={applyOrWithdrawHandler}
              className={`rounded-lg w-full md:w-auto transition-colors ${isApplied
                  ? "bg-red-500 hover:bg-red-600 text-white" // Red for Withdraw
                  : "bg-[#6B3AC2] hover:bg-[#552d9b] text-white" // Purple for Apply
                }`}
            >
              {isApplied ? "Withdraw Application" : "Apply"}
            </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
          {singleJob?.description}
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1 ">
            Role:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.position} Open Positions
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Location:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {" "}
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Salary:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Experience:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} Year
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Requirements:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {Array.isArray(singleJob?.requirements)
                ? singleJob.requirements.join(', ')
                : singleJob?.requirements}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Total Applicants:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Job Type:
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Post Date:
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>

        <RecommendedJobs jobId={jobId} />
      </div>
    </div >
  );
};

export default Description;
