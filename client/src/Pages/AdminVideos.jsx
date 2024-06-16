import { useState } from "react";
import {
  useGetAdminVideosApiQuery,
  useUpdateVideoApiMutation,
  useDeleteVideoAPiMutation,
  useGetVideosApiQuery,
} from "../Store/slices/videoSlice";
import YouTube from "react-youtube";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminVideos = () => {
  const {
    data: videos,
    isLoading,
    error,
    refetch,
  } = useGetAdminVideosApiQuery();
  const [updateVideoApi] = useUpdateVideoApiMutation();
  const [deleteVideoAPi] = useDeleteVideoAPiMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const { refetch: refectUserVideos } = useGetVideosApiQuery();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const startEditing = (video) => {
    setEditingVideoId(video._id);
    setTitle(video.title);
    setTags(video.tags.join(", "));
  };

  const handleUpdate = async (id) => {
    const data = {
      title,
      tags,
    };
    try {
      await updateVideoApi({ id, data });
      setEditingVideoId(null);
      toast.success("video updated succesfully");
      refetch();
      refectUserVideos();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async (videoId) => {
    await deleteVideoAPi(videoId);
    toast.success("video deleted succesfully");
    refetch();
    refectUserVideos();
  };

  const filteredVideos = videos?.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="text-center text-2xl text-blue-500 animate-bounce ease-in-out">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-2xl text-red-600 animate-bounce ease-in-out">
        Error loading videos
      </div>
    );
  }

  const videoOptions = {
    height: "250",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <h2 className="text-3xl font-bold sm:text-4xl text-center mb-8">
        Videos
      </h2>
      <div className="relative mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-4 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search videos..."
        />
        <FaSearch className="absolute top-0 left-0 mt-4 ml-3 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div
              key={video._id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              {editingVideoId === video._id ? (
                <>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <button
                    onClick={() => handleUpdate(video._id)}
                    className="block w-full rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white mb-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingVideoId(null)}
                    className="block w-full rounded-lg bg-gray-600 px-5 py-2 text-sm font-medium text-white"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {video.title}
                  </h3>
                  <div className="aspect-w-16 aspect-h-9">
                    <YouTube videoId={video.link} opts={videoOptions} />
                  </div>
                  <p className="text-gray-600 mt-2">
                    Tags: {video.tags.join(", ")}
                  </p>
                  <button
                    onClick={() => startEditing(video)}
                    className="block w-full rounded-lg bg-yellow-600 px-5 py-2 text-sm font-medium text-white mt-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="block w-full rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white mt-2"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500">
            No videos found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVideos;
