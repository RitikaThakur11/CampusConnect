import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Admin() {
  const [users, setUsers] = useState([]);

  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalNotes: 0,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchAnalytics();
    fetchActivities();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/users"
      );

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/analytics"
      );

      setAnalytics(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchActivities = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/activity"
      );

      setActivities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`
      );

      fetchUsers();
      fetchAnalytics();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-5xl font-bold mb-10">
          Admin Dashboard
        </h1>

        {/* ANALYTICS */}

        <div className="grid md:grid-cols-4 gap-6 mb-12">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3>Total Users</h3>

            <h1 className="text-4xl font-bold text-indigo-500">
              {analytics.totalUsers}
            </h1>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3>Total Notes</h3>

            <h1 className="text-4xl font-bold text-green-500">
              {analytics.totalNotes}
            </h1>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3>Total Uploads</h3>

            <h1 className="text-4xl font-bold text-yellow-500">
              0
            </h1>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3>Admins</h3>

            <h1 className="text-4xl font-bold text-red-500">
              {
                users.filter(
                  (user) => user.role === "admin"
                ).length
              }
            </h1>
          </div>

        </div>

        {/* USER MANAGEMENT */}

        <div className="bg-slate-900 rounded-2xl p-8 mb-10">

          <h2 className="text-3xl font-bold mb-8">
            User Management
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-700">

                <th className="text-left py-4">
                  Name
                </th>

                <th className="text-left py-4">
                  Email
                </th>

                <th className="text-left py-4">
                  Role
                </th>

                <th className="text-left py-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className="border-b border-slate-800"
                >

                  <td className="py-4">
                    {user.name}
                  </td>

                  <td className="py-4">
                    {user.email}
                  </td>

                  <td className="py-4">
                    {user.role || "user"}
                  </td>

                  <td className="py-4">

                    <button
                      onClick={() =>
                        deleteUser(user._id)
                      }
                      className="bg-red-600 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ACTIVITY LOGS */}

        <div className="bg-slate-900 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Recent Activity
          </h2>

          <div className="space-y-4">

            {activities.map((activity) => (

              <div
                key={activity._id}
                className="bg-slate-800 p-4 rounded-xl"
              >

                <h3 className="font-bold text-lg">
                  {activity.user}
                </h3>

                <p className="text-slate-300">
                  {activity.action}
                </p>

                <p className="text-slate-500 text-sm mt-2">
                  {new Date(
                    activity.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;