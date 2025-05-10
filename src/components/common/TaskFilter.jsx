import React, { useState } from "react";
import { fetchTask, getTasksByStatusAndUser } from "../../services/taskApisCall";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../Store/Slices/task";

const STATUS_OPTIONS = [
    { label: "Inprogress", value: "Inprogress" },
    { label: "Not Started", value: "Not Started" },
    { label: "Finished", value: "Finished" },
];

function TaskFilter({ users = [] }) {
    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        status: "",
        userId: "",
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);
        // //console.log("handle change...............", updatedFilters)

        if (!updatedFilters.status && !updatedFilters.userId) {
            let data = await fetchTask(token);
            // //console.log("task fetch.........",data?.data?.tasks);
            dispatch(setTasks(data?.data?.tasks));
            return;
        }

        let data = await getTasksByStatusAndUser(updatedFilters, token);
        dispatch(setTasks(data?.tasks));
    };

    return (
        <div className="flex flex-wrap gap-4 mb-4 items-center">
            {/* Status Filter */}
            {/* <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm"
                >
                    <option value="">All</option>
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div> */}

            {/* User Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Assigned User</label>
                <select
                    name="userId"
                    value={filters.userId}
                    onChange={handleChange}
                    className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm"
                >
                    <option value="">All</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.firstName} ({user.email})
                        </option>
                    ))}
                </select>

            </div>
        </div>
    );
}

export default TaskFilter;
