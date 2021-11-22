import { TagDTO, TagGroupDTO } from "./core/tag"

export interface GetTagInfos {
  results: {
    tags: TagDTO[]
    tagGroup: TagGroupDTO
  }[]
}
