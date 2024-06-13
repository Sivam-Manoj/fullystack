import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateVideoApiMutation,
  useGetAdminVideosApiQuery,
  useGetVideosApiQuery,
} from "../Store/slices/videoSlice";
import { toast } from "react-toastify";
import {
  useCreateNotesApiMutation,
  useGetNotesAdminApiQuery,
  useGetNotesApiQuery,
} from "../Store/slices/notesSlice";

const AdminUpload = () => {
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingNote, setIsUploadingNote] = useState(false);

  const {
    register: registerVideo,
    handleSubmit: handleSubmitVideo,
    reset: resetVideo,
    formState: { errors: errorsVideo },
  } = useForm();

  const {
    register: registerNote,
    handleSubmit: handleSubmitNote,
    reset: resetNote,
    formState: { errors: errorsNote },
  } = useForm();

  const { refetch: refetchVideos } = useGetAdminVideosApiQuery();
  const [createVideoApi] = useCreateVideoApiMutation();
  const [createNotesApi] = useCreateNotesApiMutation();
  const { refetch: refectNotes } = useGetNotesAdminApiQuery();
  const { refetch: refetchUserNotes } = useGetNotesApiQuery();
  const { refetch: refetchUserVideos } = useGetVideosApiQuery();
  const handleVideoUpload = async (data) => {
    const { videoTitle, videoLink, videoTags } = data;

    setIsUploadingVideo(true);
    try {
      await createVideoApi({
        title: videoTitle,
        link: videoLink,
        tags: videoTags,
      }).unwrap();

      toast.success("Video added successfully");
      resetVideo();
      refetchVideos();
      refetchUserVideos();
    } catch (error) {
      toast.error(`Video upload failed: ${error.message}`);
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleNoteUpload = async (data) => {
    const { title, file } = data;

    if (!title || !file) {
      toast.error("Note title and file are required.");
      return;
    }

    setIsUploadingNote(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file[0]);

      await createNotesApi(formData).unwrap();
      toast.success("Note PDF added successfully");
      refectNotes();
      refetchUserNotes();
      resetNote();
    } catch (error) {
      toast.error(`Note upload failed: ${error.message}`);
    } finally {
      setIsUploadingNote(false);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Admin Upload</h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Video Upload Section */}
        <div className="p-6 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Upload Video</h3>
          <form onSubmit={handleSubmitVideo(handleVideoUpload)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                {...registerVideo("videoTitle", {
                  required: "Video title is required",
                })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter video title"
                aria-label="Video title"
              />
              {errorsVideo.videoTitle && (
                <span className="text-red-500">
                  {errorsVideo.videoTitle.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Link</label>
              <input
                type="text"
                {...registerVideo("videoLink", {
                  required: "Video link is required",
                })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter video link"
                aria-label="Video link"
              />
              {errorsVideo.videoLink && (
                <span className="text-red-500">
                  {errorsVideo.videoLink.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                {...registerVideo("videoTags", {
                  required: "Video tags are required",
                })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter video tags"
                aria-label="Video tags"
              />
              {errorsVideo.videoTags && (
                <span className="text-red-500">
                  {errorsVideo.videoTags.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
              disabled={isUploadingVideo}
            >
              {isUploadingVideo ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>

        <div className="p-6 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Upload Notes</h3>
          <form onSubmit={handleSubmitNote(handleNoteUpload)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                {...registerNote("title", {
                  required: "Note title is required",
                })}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter note title"
                aria-label="Note title"
                name="title"
              />
              {errorsNote.title && (
                <span className="text-red-500">{errorsNote.title.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">File</label>
              <input
                type="file"
                {...registerNote("file", { required: "Note file is required" })}
                className="w-full p-3 border rounded-lg"
                aria-label="Note file"
                name="file"
              />
              {errorsNote.file && (
                <span className="text-red-500">{errorsNote.file.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
              disabled={isUploadingNote}
            >
              {isUploadingNote ? "Uploading..." : "Upload Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;
