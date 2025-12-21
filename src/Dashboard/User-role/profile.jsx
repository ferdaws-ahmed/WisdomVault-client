import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";


const Profile = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState(null);
  const [userLessons, setUserLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({ name: "", photoURL: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const BASE_URL = "http://localhost:3000";

  /* ================= FETCH PROFILE + MY LESSONS ================= */
  useEffect(() => {
    const fetchProfileAndLessons = async () => {
      if (!user?.token) return;
      try {
        setLoading(true);

        // Profile
        const profileRes = await axios.get(`${BASE_URL}/users/profile/${user.email}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setProfileData(profileRes.data);
        setFormData({
          name: profileRes.data.name || "",
          photoURL: profileRes.data.photoURL || "",
        });
        setPreviewURL(profileRes.data.photoURL || "");

        // My lessons
        const lessonsRes = await axios.get(`${BASE_URL}/dashboard/my-lessons`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setUserLessons(lessonsRes.data || []);
      } catch (error) {
        console.error("Failed to fetch profile or lessons:", error);
        toast.error("Failed to load profile or lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndLessons();
  }, [user?.token]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };


const uploadProfileImage = async () => {
  if (!selectedFile) return formData.photoURL;

  try {
    const form = new FormData();
    form.append("profileImage", selectedFile);

    const res = await axios.post(`${BASE_URL}/users/upload-profile`, form, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    
    console.log("Uploaded Image URL:", res.data.photoURL);
    
    if (res.data?.photoURL) return res.data.photoURL;
    return formData.photoURL;
  } catch (err) {
    console.error("Image upload failed:", err);
    return formData.photoURL;
  }
};

const handleUpdateProfile = async (e) => {
  e.preventDefault();
  setUpdating(true);

  try {
    let finalPhotoURL = formData.photoURL;

    
    if (selectedFile) {
      const form = new FormData();
      form.append("profileImage", selectedFile);

      const uploadRes = await axios.post(`${BASE_URL}/users/upload-profile`, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadRes.data?.photoURL) {
        finalPhotoURL = uploadRes.data.photoURL;
      }
    }

   
    const updateDbRes = await axios.put(`${BASE_URL}/users/update-profile`, 
      { 
        name: formData.name, 
        photoURL: finalPhotoURL 
      }, 
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    if (updateDbRes.data.success) {
      
      const cacheBustedURL = `${finalPhotoURL}?v=${Date.now()}`;
      
      await updateUser({ 
        displayName: formData.name, 
        photoURL: cacheBustedURL 
      });

    
      const profileRes = await axios.get(`${BASE_URL}/users/profile/${user.email}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      
      setProfileData(profileRes.data);
      setFormData({
        name: profileRes.data.name,
        photoURL: profileRes.data.photoURL,
      });
      setPreviewURL(cacheBustedURL);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      toast.success("Profile and Photo updated successfully!");
    }
  } catch (err) {
    console.error("Update fail detail:", err.response?.data || err.message);
    toast.error("Update failed. Please check backend console.");
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
          key={previewURL || user?.photoURL}
          src={previewURL || user?.photoURL || `https://ui-avatars.com/api/?name=${user?.name}`}
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
              <p className="text-xl font-bold">{profileData.lessonsCreated || 0}</p>
              <p className="text-xs opacity-60">CREATED</p>
            </div>
            <div>
              <p className="text-xl font-bold">{profileData.lessonsSaved || 0}</p>
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
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Display name"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button type="submit" disabled={updating} className="btn btn-primary px-6">
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
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
