import { Router } from "express"
import { addTag, deleteTag, getTags } from "../../controllers/tag/tag"

const tagRouter = Router()

tagRouter.route('/tags').get(getTags).put(addTag)
tagRouter.route('/tag/:id').delete(deleteTag)

export default tagRouter