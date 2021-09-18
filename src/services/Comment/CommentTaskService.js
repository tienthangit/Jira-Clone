import { baseService} from "../config/baseService"

export class CommentService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        
    }
    
    getCommentTask = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`) 
    }

    addCommentTask = (commentTask) => {
        // console.log(this.post(`Comment/insertComment`,commentTask))
        return this.post(`Comment/insertComment`,commentTask)
    }

    deleteCommentTask = (commentId) => {
        return this.delete(`Comment/deleteComment?idComment=${commentId}`)
    }

    updateCommentTask = (commentId,commentContent) => {
        return this.put(`Comment/updateComment?id=${commentId}&contentComment=${commentContent}`)
    }
}

export const commentService = new CommentService();