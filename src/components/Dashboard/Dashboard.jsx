import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskCountBasedOnStatus } from '../../services/taskApisCall';
import BarChart from "../common/BarChart";
// import "./Dashboard.css"

function Dashboard() {
  const { tasks } = useSelector((state) => state.task);
  const { token } = useSelector((state) => state.user);
  const [totalTaskCount, setTotalTaskCount] = useState({
    Inprogress: 0,
    Finished: 0,
    Not_Started: 0,
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getTaskCount = async (token) => {
      try {
        setLoading(true);
        const res = await getTaskCountBasedOnStatus(token);
        const taskCounts = res?.data?.data;

        //console.log('taskCounts count........', taskCounts);

        setTotalTaskCount({
          Inprogress: taskCounts?.Inprogress || 0,
          Finished: taskCounts?.Finished || 0,
          Not_Started: taskCounts?.Not_Started || 0,
        });
      } catch (error) {
        //console.log('Error occurred while fetching task counts: ', error);
      } finally {
        setLoading(false);
      }
    };

    getTaskCount(token);
  }, [token]);

  // //console.log('Total counts: ', totalTaskCount);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {/* Total Task */}
        <div className="bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-xl shadow-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <p className="text-sm font-semibold text-white">Total Tasks</p>
          <p className="text-3xl font-bold text-white mt-2">
            {totalTaskCount.Inprogress +
              totalTaskCount.Finished +
              totalTaskCount.Not_Started}
          </p>
        </div>

        {/* In Progress */}
        <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-xl shadow-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <p className="text-sm font-semibold text-white">In Progress</p>
          <p className="text-3xl font-bold text-white mt-2">{totalTaskCount.Inprogress}</p>
        </div>

        {/* Finished */}
        <div className="bg-gradient-to-r from-green-200 to-green-400 rounded-xl shadow-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <p className="text-sm font-semibold text-white">Completed</p>
          <p className="text-3xl font-bold text-white mt-2">{totalTaskCount.Finished}</p>
        </div>

        {/* Not Started */}
        <div className="bg-gradient-to-r from-red-200 to-red-400 rounded-xl shadow-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <p className="text-sm font-semibold text-white">Not Started</p>
          <p className="text-3xl font-bold text-white mt-2">{totalTaskCount.Not_Started}</p>
        </div>
      </div>

      <div className="chart h-[80vh] flex justify-center items-center bg-white rounded-xl shadow-lg mx-4 mt-6 p-4">
        {/* Pass totalTaskCount to the BarChart component */}
        <BarChart counts={totalTaskCount} />
      </div>
    </div>
  );
}

export default Dashboard;
