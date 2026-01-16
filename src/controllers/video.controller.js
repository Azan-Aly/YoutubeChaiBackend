import { asyncHandler } from "../utils/asyncHandler";

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query

    // TODO: GET ALL VIDEOS BASED ON QUERY, SORT, PAGINATION
})


const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: GET VIDEO, UPLOAD ON CLOUDINARY, CREATE VIDEO
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
    const {videoId} = req.params
})


export{
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}