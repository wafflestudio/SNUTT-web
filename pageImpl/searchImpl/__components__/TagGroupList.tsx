import styled from "@emotion/styled"
import { TagGroupDTO } from "@lib/dto/core/tag"

interface Props {
  tagGroups: TagGroupDTO[]
  selectedTagGroup: TagGroupDTO
  onTagGroupSelectionChange: (tagGroup: TagGroupDTO) => void
}

export const TagGroupList: React.FC<Props> = ({
  tagGroups,
  selectedTagGroup,
  onTagGroupSelectionChange,
}) => {
  return (
    <Wrapper>
      {tagGroups.map((it) => (
        <TagGroupItem
          tagGroup={it}
          isSelected={selectedTagGroup.name === it.name}
          key={it.name}
          onClick={() => {
            onTagGroupSelectionChange(it)
          }}
        />
      ))}
    </Wrapper>
  )
}

const TagGroupItem: React.FC<{
  tagGroup: TagGroupDTO
  isSelected: boolean
  onClick: () => void
}> = ({ tagGroup, isSelected, onClick }) => {
  return <div onClick={onClick}>{tagGroup.name}</div>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`
