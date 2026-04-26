import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query

    // TODO: GET ALL VIDEOS BASED ON QUERY, SORT, PAGINATION
})


const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    // TODO: GET VIDEO, UPLOAD ON CLOUDINARY, CREATE VIDEO
    if (!(title || description)) {
        throw new ApiError(400, "Provide all the fields")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!(videoLocalPath || thumbnailLocalPath)) {
        throw new ApiError(400, "Video and thumbnail are required: please provide video and thumbanil")
    }

    try {
        const videoUploaded = await uploadOnCloudinary(videoLocalPath)
        const thumbanilUploaded = await uploadOnCloudinary(thumbnailLocalPath)

        console.log(videoUploaded, thumbanilUploaded)

        if (!(videoUploaded.url && thumbanilUploaded.url)) {
            throw new ApiError(400, "Video and thumbanil is required")
        }

        const newVideo = await Video.create(
            {
                title,
                description,
                duration: videoUploaded.duration,
                videoFile: videoUploaded.url,
                thumbnail: thumbanilUploaded.url,
                isPublished: true,
                owner: req.user?._id
            }
        );

        if (!newVideo) {
            throw new ApiError(400, "Video couldn't be created")
        }

        const createdVideo = await Video.findById(newVideo._id);

        console.log(createdVideo, "Video created")

        if (!createdVideo) {
            throw new ApiError(500, "Video couldn't be created")
        }
        return res
            .status(201)
            .json(new ApiResponse(200, createdVideo, "Video uploaded successfully uploaded"))

    } catch (error) {
        throw new ApiError(500, error, "Some error occurred while publishing video")
    }

})


const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // TODO: GET VIDEO BY ID
})


const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // TODO: UPDATE VIDEO DETAILS LIKE TITLE, DESCRIPTON, THUMBNAIL
})


const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //  TODO: DELETE VIDEO
})


const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})


export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}