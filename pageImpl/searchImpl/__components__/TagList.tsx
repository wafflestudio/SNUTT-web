type Tag = {
  name: string
}

interface Props {
  tags: Tag[]
  selectedTags: Tag[]
  onToggleTag: (tag: Tag) => void
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
  tag: Tag
  isSelected: boolean
  onClick: () => void
}> = ({ tag, isSelected, onClick }) => {
  return <div></div>
}
