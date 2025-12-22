import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState(null);
  const [userLessons, setUserLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
  });
  const [previewURL, setPreviewURL] = useState("");

  const BASE_URL = "https://wisdomvaultserver.vercel.app";

  /* ================= FETCH PROFILE + MY LESSONS ================= */
  useEffect(() => {
    const fetchProfileAndLessons = async () => {
      if (!user?.token || !user?.email) return;

      try {
        setLoading(true);

        const profileRes = await axios.get(
          `${BASE_URL}/users/profile/${user.email}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        const profile = profileRes.data;

        setProfileData(profile);

        // 🔴 input ফাঁকা থাকবে
        setFormData({ name: "", photoURL: "" });

        // 🔵 preview আগের ছবি দেখাবে
        setPreviewURL(profile.photoURL || "");

        const lessonsRes = await axios.get(
          `${BASE_URL}/dashboard/my-lessons`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        setUserLessons(lessonsRes.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile or lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndLessons();
  }, [user?.token, user?.email]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "photoURL") {
      setPreviewURL(value);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const payload = {
        name: formData.name || profileData.name,
        photoURL: formData.photoURL || profileData.photoURL,
      };

      const res = await axios.put(
        `${BASE_URL}/users/update-profile`,
        payload,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (res.data.success) {
        const finalPhoto =
          payload.photoURL && payload.photoURL !== profileData.photoURL
            ? `${payload.photoURL}?v=${Date.now()}`
            : profileData.photoURL;

        await updateUser({
          displayName: payload.name,
          photoURL: finalPhoto,
        });

        setProfileData((prev) => ({
          ...prev,
          name: payload.name,
          photoURL: finalPhoto,
        }));

        setPreviewURL(finalPhoto);

        // 🔴 save এর পরে input আবার ফাঁকা
        setFormData({ name: "", photoURL: "" });

        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !profileData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-8 p-4">
      {/* PROFILE HEADER */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <img
          src={
            previewURL ||
            user?.photoURL ||
            `https://ui-avatars.com/api/?name=${user?.name}`
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold flex gap-2 justify-center md:justify-start">
            {profileData.name}
            {profileData.isPremium && (
              <span className="bg-yellow-400 text-black px-2 py-0.5 rounded text-xs font-bold">
                Premium ⭐
              </span>
            )}
          </h2>
          <p className="opacity-70">{profileData.email}</p>

          <div className="flex gap-6 mt-4 justify-center md:justify-start">
            <div>
              <p className="text-xl font-bold">
                {profileData.lessonsCreated || 0}
              </p>
              <p className="text-xs opacity-60">CREATED</p>
            </div>
            <div>
              <p className="text-xl font-bold">
                {profileData.lessonsSaved || 0}
              </p>
              <p className="text-xs opacity-60">SAVED</p>
            </div>
          </div>
        </div>
      </div>

      {/* UPDATE PROFILE */}
      <div className="p-6 bg-white dark:bg-gray-800 border rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
  <div>
    <p className="text-sm font-semibold mb-1">Change Name</p>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="w-full p-2 border rounded"
      placeholder="Input Name"
    />
  </div>

  <div>
    <p className="text-sm font-semibold mb-1">Change Image URL</p>
    <input
      type="text"
      name="photoURL"
      value={formData.photoURL}
      onChange={handleChange}
      className="w-full p-2 border rounded"
      placeholder="Input URL"
    />
  </div>
</div>


          <button
            type="submit"
            disabled={updating}
            className="btn btn-primary px-6"
          >
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* USER LESSONS */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Lessons</h3>

        {userLessons.length === 0 ? (
          <p className="opacity-60 italic">No lessons published yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md border border-gray-200 dark:border-gray-600"
              >
                {lesson.image && (
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <h4 className="font-bold text-lg">{lesson.title}</h4>
                <p className="text-sm opacity-70 line-clamp-2">
                  {lesson.shortDescription}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {lesson.category}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      lesson.accessLevel === "premium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {lesson.accessLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
