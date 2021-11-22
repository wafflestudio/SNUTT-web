import styled from "@emotion/styled"
import { TagGroupList } from "./TagGroupList"
import { useMemo, useState } from "react"
import { TagList } from "./TagList"
import { TagDTO, TagGroupDTO } from "@lib/dto/core/tag"

interface Props {
  selectedTags: TagDTO[]
  tagGroupsWithTags: { tagGroup: TagGroupDTO; tags: TagDTO[] }[]
  onSelectTag: (tag: TagDTO) => void
  onDeselectTag: (tag: TagDTO) => void
}

export const SearchOptionSheet: React.FC<Props> = ({
  selectedTags,
  tagGroupsWithTags,
  onSelectTag,
  onDeselectTag,
}) => {
  const [selectedTagGroup, setSelectedTagGroup] = useState<TagGroupDTO>(
    tagGroupsWithTags[0]?.tagGroup,
  )

  const visibleTags = useMemo(() => {
    return (
      tagGroupsWithTags.find((it) => it.tagGroup.id === selectedTagGroup.id)
        ?.tags ?? []
    )
  }, [selectedTagGroup, tagGroupsWithTags])

  const tagGroups = tagGroupsWithTags.map((it) => it.tagGroup)

  return (
    <div>
      <TagGroupList
        tagGroups={tagGroups}
        selectedTagGroup={selectedTagGroup}
        onTagGroupSelectionChange={setSelectedTagGroup}
      />
      <TagList
        tags={visibleTags}
        selectedTags={selectedTags}
        onToggleTag={(tag) => {
          if (selectedTags.some((s) => s.name === tag.name)) {
            onDeselectTag(tag)
          } else {
            onSelectTag(tag)
          }
        }}
      />
      <SubmitButton />
      <CloseButton />
    </div>
  )
}

const SubmitButton = styled.div`
  width: 100px;
`

const CloseButton = styled.div`
  width: 100px;
`
