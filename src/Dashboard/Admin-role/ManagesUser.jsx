import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaUserShield } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updating, setUpdating] = useState(false);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/admin/manage-users-test"
      );
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE USER ================= */
  const handleDelete = async (email) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/admin/users/${email}`);
      setUsers((prev) => prev.filter((u) => u.email !== email));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  /* ================= UPDATE ROLE ================= */
  const updateUserRole = async () => {
    if (!selectedUser) return;

    const newRole = selectedUser.role === "premium" ? "user" : "premium";

    try {
      setUpdating(true);

      const res = await axios.patch(
        `http://localhost:3000/admin/users/role/${encodeURIComponent(
          selectedUser.email
        )}`,
        { role: newRole }
      );

      if (res.data?.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u.email === selectedUser.email
              ? { ...u, role: newRole }
              : u
          )
        );
        setSelectedUser(null);
      }
    } catch (error) {
      console.error(
        "Role update failed:",
        error.response?.data || error.message
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Manage Users
      </h1>

      {/* ================= TABLE ================= */}
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-full bg-white dark:bg-gray-900">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-3 text-gray-800 dark:text-gray-100">
                    {user.name || "Anonymous"}
                  </td>

                  <td className="px-6 py-3 text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>

                  <td className="px-6 py-3 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          user.role === "premium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-3 flex gap-2">
                    {/* TOGGLE ROLE */}
                    <button
                      onClick={() => setSelectedUser(user)}
                      className={`flex items-center gap-1 px-3 py-1 rounded text-white
                        ${
                          user.role === "premium"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                      <FaUserShield />
                      {user.role === "premium"
                        ? "Make User"
                        : "Make Premium"}
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MODAL ================= */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-80 space-y-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Change User Role
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedUser.role === "premium"
                ? `Remove Premium access from ${selectedUser.email}?`
                : `Make ${selectedUser.email} a Premium user?`}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>

              <button
                disabled={updating}
                onClick={updateUserRole}
                className={`px-4 py-1 rounded text-white disabled:opacity-50
                  ${
                    selectedUser.role === "premium"
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                {updating
                  ? "Updating..."
                  : selectedUser.role === "premium"
                  ? "Make User"
                  : "Make Premium"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
