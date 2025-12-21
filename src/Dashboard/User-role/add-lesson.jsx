import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddLesson = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    emotionalTone: "",
    visibility: "public",
    accessLevel: "free",
    imageURL: "", 
  });

  const [loading, setLoading] = useState(false);

  // handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.fullDescription) {
      toast.error("Title and full description are required");
      return;
    }

    try {
      setLoading(true);

      
      const payload = {
        ...formData, 
      };

      await axios.post(
        "https://wisdomvaultserver.vercel.app/dashboard/add-lesson",
        payload, 
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, 
            "Content-Type": "application/json", 
          },
        }
      );

      toast.success("Lesson created successfully!");
      setFormData({
        title: "",
        shortDescription: "",
        fullDescription: "",
        category: "",
        emotionalTone: "",
        visibility: "public",
        accessLevel: "free",
        imageURL: "",
      });
    } catch (error) {
      console.error("Frontend Error:", error.response?.data || error.message);
      toast.error("Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Add New Life Lesson
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Lesson Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter lesson title"
        />

        <TextareaField
          label="Short Description (Summary)"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Enter a brief summary..."
        />

        <TextareaField
          label="Full Description / Story / Insight"
          name="fullDescription"
          value={formData.fullDescription}
          onChange={handleChange}
          placeholder="Write your lesson..."
        />

        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={[
            "Life Advice",
            "Personal Growth",
            "Motivation",
            "Life Skills",
            "Daily Wisdom",
            "Psychology",
          ]}
        />

        <SelectField
          label="Emotional Tone"
          name="emotionalTone"
          value={formData.emotionalTone}
          onChange={handleChange}
          options={["Motivational", "Sad", "Realization", "Gratitude"]}
        />

        {/* IMAGE URL INPUT */}
        <InputField
          label="Image URL"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          placeholder="Paste image URL here"
        />
        {formData.imageURL && (
          <img
            src={formData.imageURL}
            alt="preview"
            className="mt-2 w-48 h-48 object-cover rounded"
          />
        )}

        <SelectField
          label="Privacy"
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
          options={["public", "private"]}
        />

        <SelectField
          label="Access Level"
          name="accessLevel"
          value={formData.accessLevel}
          onChange={handleChange}
          options={["free", "premium"]}
          disabled={!user.isPremium}
          tooltip={user.isPremium ? "" : "Upgrade to Premium to create paid lessons"}
        />
        {!user.isPremium && (
          <p className="text-xs text-warning mt-1">
            Upgrade to Premium to create paid lessons
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Lesson"}
        </button>
      </form>
    </div>
  );
};

export default AddLesson;

/* ---------------- Small Form Components ---------------- */
const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block mb-1 text-gray-900 dark:text-gray-100">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block mb-1 text-gray-900 dark:text-gray-100">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={6}
      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    />
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
  tooltip = "",
}) => (
  <div>
    <label className="block mb-1 text-gray-900 dark:text-gray-100">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      title={tooltip}
      className={`w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
