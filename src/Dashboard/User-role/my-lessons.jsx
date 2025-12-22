import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const MyLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://wisdomvaultserver.vercel.app/dashboard/my-lessons",
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setLessons(res.data);
      } catch (error) {
        toast.error("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchLessons();
  }, [user]);

  const handleDelete = async (lessonId) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await axios.delete(
        `https://wisdomvaultserver.vercel.app/dashboard/my-lessons/${lessonId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setLessons(lessons.filter((l) => l._id !== lessonId));
      toast.success("Lesson deleted successfully");
    } catch {
      toast.error("Failed to delete lesson");
    }
  };

  const handleUpdate = async (updatedLesson) => {
    try {
      await axios.put(
        `https://wisdomvaultserver.vercel.app/dashboard/my-lessons/${updatedLesson._id}`,
        updatedLesson,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setLessons(
        lessons.map((l) => (l._id === updatedLesson._id ? updatedLesson : l))
      );
      toast.success("Lesson updated successfully");
      setEditingLesson(null);
    } catch {
      toast.error("Failed to update lesson");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-2 sm:px-4">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
        My Lessons
      </h1>

      {/* -------- Desktop Table -------- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th>Image</th>
              <th className="text-left">Title</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Date</th>
              <th>Likes</th>
              <th>Fav</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id}>
                <td>
                  <img
                    src={lesson.image}
                    alt=""
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td className="text-left">{lesson.title}</td>
                <td>{lesson.visibility}</td>
                <td>{lesson.accessLevel}</td>
                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>
                <td>{lesson.likesCount}</td>
                <td>{lesson.favoritesCount}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => setEditingLesson(lesson)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    Delete
                  </button>
                  <a
                    href={`/lesson-details/${lesson._id}`}
                    className="btn btn-xs"
                  >
                    Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* -------- Mobile Cards -------- */}
      <div className="md:hidden space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="border rounded-lg p-4 bg-white dark:bg-gray-900"
          >
            <img
              src={lesson.image}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h3 className="font-semibold text-lg">{lesson.title}</h3>

            <div className="text-sm text-gray-500 mt-1">
              {lesson.visibility} • {lesson.accessLevel}
            </div>

            <div className="text-sm mt-2 flex gap-4">
              ❤️ {lesson.likesCount} | ⭐ {lesson.favoritesCount}
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                className="flex-1 btn btn-sm btn-info"
                onClick={() => setEditingLesson(lesson)}
              >
                Update
              </button>
              <button
                className="flex-1 btn btn-sm btn-error"
                onClick={() => handleDelete(lesson._id)}
              >
                Delete
              </button>
              <a
                href={`/lesson-details/${lesson._id}`}
                className="flex-1 btn btn-sm"
              >
                Details
              </a>
            </div>
          </div>
        ))}
      </div>

      {editingLesson && (
        <UpdateLessonModal
          lesson={editingLesson}
          onClose={() => setEditingLesson(null)}
          onUpdate={handleUpdate}
          isPremium={user.isPremium}
        />
      )}
    </div>
  );
};

export default MyLessons;
