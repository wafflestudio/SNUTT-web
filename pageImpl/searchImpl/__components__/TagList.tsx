import { TagDTO } from "@lib/dto/core/tag"

interface Props {
  tags: TagDTO[]
  selectedTags: TagDTO[]
  onToggleTag: (tag: TagDTO) => void
}

export const TagList: React.FC<Props> = ({
  tags,
  selectedTags,
  onToggleTag,
}) => {
  return (
    <div>
      {tags.map((it) => (
        <TagItem
          tag={it}
          isSelected={selectedTags.some((s) => s.name === it.name)}
          key={it.name}
          onClick={() => onToggleTag(it)}
        />
      ))}
    </div>
  )
}

const TagItem: React.FC<{
  tag: TagDTO
  isSelected: boolean
  onClick: () => void
}> = ({ tag, isSelected, onClick }) => {
  return <div></div>
}
