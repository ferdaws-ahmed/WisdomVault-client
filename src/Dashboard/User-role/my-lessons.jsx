import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const MyLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState(null);

  // Fetch lessons
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/dashboard/my-lessons", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLessons(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchLessons();
  }, [user]);

  // Delete lesson
  const handleDelete = async (lessonId) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await axios.delete(`http://localhost:3000/dashboard/my-lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setLessons(lessons.filter((l) => l._id !== lessonId));
      toast.success("Lesson deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete lesson");
    }
  };

  // Update lesson (both collections)
  const handleUpdate = async (updatedLesson) => {
    try {
      await axios.put(
        `http://localhost:3000/dashboard/my-lessons/${updatedLesson._id}`,
        updatedLesson,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setLessons(
        lessons.map((l) => (l._id === updatedLesson._id ? updatedLesson : l))
      );
      toast.success("Lesson updated successfully");
      setEditingLesson(null);
    } catch (error) {
      console.error(error);
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Lessons</h1>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <tr>
              <th>Image</th>
              <th className="text-left">Title</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Created At</th>
              <th>Likes</th>
              <th>Favorites</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100">
                <td>
                  {lesson.image ? (
                    <img
                      src={lesson.image}
                      alt={lesson.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">No Image</span>
                  )}
                </td>
                <td className="text-left">{lesson.title}</td>
                <td>{lesson.visibility}</td>
                <td>{lesson.accessLevel}</td>
                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>
                <td>{lesson.likesCount}</td>
                <td>{lesson.favoritesCount}</td>
                <td className="flex gap-2 flex-wrap">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setEditingLesson(lesson)}
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    Delete
                  </button>
                  <a
                    href={`/lesson-details/${lesson._id}`}
                    className="px-3 py-1 border border-gray-400 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

/* ---------------- Update Modal ---------------- */
const UpdateLessonModal = ({ lesson, onClose, onUpdate, isPremium }) => {
  const [formData, setFormData] = useState({ ...lesson });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Update Lesson</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Title" name="title" value={formData.title} onChange={handleChange} />
          <TextareaField label="Short Description" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
          <TextareaField label="Full Description" name="fullDescription" value={formData.fullDescription} onChange={handleChange} />
          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"]}
          />
          <SelectField
            label="Emotional Tone"
            name="emotionalTone"
            value={formData.emotionalTone}
            onChange={handleChange}
            options={["Motivational", "Sad", "Realization", "Gratitude"]}
          />
          <InputField label="Image URL" name="image" value={formData.image} onChange={handleChange} />
          <SelectField label="Visibility" name="visibility" value={formData.visibility} onChange={handleChange} options={["public", "private"]} />
          <SelectField
            label="Access Level"
            name="accessLevel"
            value={formData.accessLevel}
            onChange={handleChange}
            options={["free", "premium"]}
            disabled={!isPremium}
            tooltip={!isPremium ? "Upgrade to Premium to set premium lessons" : ""}
          />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------------- Small Form Components ---------------- */
const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block mb-1 text-gray-900 dark:text-gray-100">{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
  </div>
);

const TextareaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block mb-1 text-gray-900 dark:text-gray-100">{label}</label>
    <textarea name={name} value={value} onChange={onChange} rows={4} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, disabled, tooltip }) => (
  <div>
    <label className="block mb-1 text-gray-900 dark:text-gray-100">{label}</label>
    <select name={name} value={value} onChange={onChange} disabled={disabled} title={tooltip} className={`w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${disabled ? "cursor-not-allowed opacity-60" : ""}`}>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
