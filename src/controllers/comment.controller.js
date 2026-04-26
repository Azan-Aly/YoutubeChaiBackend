import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const getVideoComments = asyncHandler(async (req, res) => {

    const { video_Id } = req.params
    const { page = 1, limit = 10 } = req.query

    console.log(video_Id, "video_id from request")

    if (!video_Id) {
        throw new ApiError(404, "enter valid video_id to find comments")
    }

    try {
        const videoComments = await Comment.find({ video: video_Id }).skip((page - 1) * limit).limit(limit).exec();
        // console.log(videoComments, "comments")
        if (!videoComments || videoComments.length === 0) {
            throw new ApiError(404, "Could not find comments for specified video")
        }

        res
            .status(200)
            .json(new ApiResponse(200, videoComments, "All comments fetched successfully"))

    } catch (error) {
        throw new ApiError(500, error, "Couldn't find video comments")
    }
})


const addComment = asyncHandler(async (req, res) => {

    const { video_Id } = req.params;
    const { commentContent } = req.body;
    console.log(video_Id, commentContent, "video id and comment");

    if (!(video_Id || commentContent)) {
        throw new ApiError(404, "Invalid video_Id or you have not written any comment");
    }
    try {
        const newComment = await Comment.create({
            content: commentContent,
            video: video_Id,
            owner: req.user._id // Assuming user is authenticated and their ID is in req.user._id
        });

        if (!newComment) {
            throw new ApiError(500, "Can not add a comment to video");
        }

        return res.status(200)
            .json(new ApiResponse(200, newComment, "Comment added successfully"));
    } catch (error) {
        // If an error occurs during the process, throw an error
        throw new ApiError(500, error, "Some error occurred while adding comment");
    }
});


const updateComment = asyncHandler(async (req, res) => {
    const { comment_Id } = req.params;
    const { newComment } = req.body;

    if (!(comment_Id || newComment)) {
        throw new ApiError(404, "Invalid comment_Id : can not update empty");
    }

    try {
        const updatedComment = await Comment.findByIdAndUpdate(comment_Id,
            {
                content: newComment
            },
            {
                new: true,
                validateBeforeSave: false
            })

        console.log(updatedComment, "Comment updated")

        res
            .status(200)
            .json(new ApiResponse(200, updatedComment, "Comment updated successfully"))

    } catch (error) {
        throw new ApiError(500, error, "Some error occurred while updating comment");
    }
})


const deleteComment = asyncHandler(async (req, res) => {
    const { comment_Id } = req.params

    console.log(comment_Id, "Comment id")

    if (!comment_Id) {
        throw new ApiError(404, "Enter Comment Id to delete comment")
    }

    try {
        const comment = await Comment.findById({ _id: comment_Id })

        if (!comment) {
            throw new ApiError(404, "comment not found : See if comment id is correct")
        }

        if (comment.owner.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "You are not allowed to delete this comment")
        }

        const deletedComment = await Comment.findByIdAndDelete(comment_Id)

        if (!deleteComment) {
            throw new ApiError(500, "Could not delete the comment. Try again later.")
        }

        return res.status(200)
            .json(
                new ApiResponse(200, deletedComment, "Comment deleted successfully")
            )

    } catch (error) {
        throw new ApiError(500, "An Error occured while deleting the comment. Please try again later.")
    }
})


export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}