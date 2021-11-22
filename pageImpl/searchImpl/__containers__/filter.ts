import { useQuery } from "react-query"
import { GetTagInfos } from "../../../lib/dto/tagInfos"
import { ApiError } from "../../../lib/dto/core/error"
import { useState } from "react"
import { TagDTO } from "../../../lib/dto/core/tag"

export function useTagContainer() {
  const { data, error, isLoading } = useQuery<GetTagInfos, ApiError>("asdf")
  const [selectedTags, setSelectedTags] = useState<TagDTO[]>()

  return {
    tagGroupWithTags: data?.results,
    error,
    isLoading,
    selectedTags,
  }
}
