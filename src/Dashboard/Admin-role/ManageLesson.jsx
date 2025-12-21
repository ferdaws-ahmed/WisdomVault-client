import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEye, FaEyeSlash, FaStar } from "react-icons/fa";

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [updating, setUpdating] = useState(false);

  /* ================= FETCH LESSONS ================= */
  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://wisdomvaultserver.vercel.app/admin/manage-lessons"
        // 🔧 change endpoint here if needed
      );
      setLessons(res.data);
    } catch (error) {
      console.error("Failed to fetch lessons", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE LESSON ================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://wisdomvaultserver.vercel.app/admin/lessons/${id}`);
      setLessons((prev) => prev.filter((l) => l._id !== id));
    } catch (error) {
      console.error("Lesson delete failed", error);
    }
  };

  /* ================= UPDATE ACCESS ================= */
  const updateLessonAccess = async () => {
    if (!selectedLesson) return;

    const nextAccess =
      selectedLesson.accessLevel === "premium" ? "free" : "premium";

    try {
      setUpdating(true);

      const res = await axios.patch(
        `https://wisdomvaultserver.vercel.app/admin/lessons/access/${selectedLesson._id}`,
        { accessLevel: nextAccess }
      );

      if (res.data?.success) {
        setLessons((prev) =>
          prev.map((l) =>
            l._id === selectedLesson._id
              ? { ...l, accessLevel: nextAccess }
              : l
          )
        );
        setSelectedLesson(null);
      }
    } catch (error) {
      console.error("Access update failed", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Manage Lessons
      </h1>

      {/* ================= TABLE ================= */}
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading lessons...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-full bg-white dark:bg-gray-900">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Visibility</th>
                <th className="px-6 py-3 text-left">Access</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {lessons.map((lesson) => (
                <tr
                  key={lesson._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-3 font-medium text-gray-800 dark:text-gray-100">
                    {lesson.title}
                  </td>

                  <td className="px-6 py-3 text-gray-600 dark:text-gray-300">
                    {lesson.category}
                  </td>

                  <td className="px-6 py-3 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-sm
                        ${
                          lesson.visibility === "public"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                    >
                      {lesson.visibility}
                    </span>
                  </td>

                  <td className="px-6 py-3 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-sm
                        ${
                          lesson.accessLevel === "premium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                    >
                      {lesson.accessLevel}
                    </span>
                  </td>

                  <td className="px-6 py-3 flex gap-2">
                    {/* ACCESS TOGGLE */}
                    <button
                      onClick={() => setSelectedLesson(lesson)}
                      className={`flex items-center gap-1 px-3 py-1 rounded text-white
                        ${
                          lesson.accessLevel === "premium"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                      <FaStar />
                      {lesson.accessLevel === "premium"
                        ? "Make Free"
                        : "Make Premium"}
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(lesson._id)}
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
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-80 space-y-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Change Lesson Access
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedLesson.accessLevel === "premium"
                ? "Make this lesson free for all users?"
                : "Restrict this lesson to premium users only?"}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedLesson(null)}
                className="px-4 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>

              <button
                disabled={updating}
                onClick={updateLessonAccess}
                className={`px-4 py-1 rounded text-white disabled:opacity-50
                  ${
                    selectedLesson.accessLevel === "premium"
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {updating
                  ? "Updating..."
                  : selectedLesson.accessLevel === "premium"
                  ? "Make Free"
                  : "Make Premium"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLessons;
