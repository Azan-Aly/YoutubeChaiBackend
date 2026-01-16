import { asyncHandler } from "../utils/asyncHandler";

const getVideoComment = asyncHandler(async (req, res) => {
    // TODO: get all comments for a video
    const { videoId } = req.params
    const {page = 1, limit = 1} = req.query
})


const addComment = asyncHandler(async (req, res) => {
    
})


const updateComment = asyncHandler(async (req, res) => {
    
})


const deleteComment = asyncHandler(async (req, res) => {
    
})


export {
    getVideoComment,
    addComment,
    updateComment,
    deleteComment
}