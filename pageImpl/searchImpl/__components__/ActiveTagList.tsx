type Tag = {
  name: string
  category: { name: string }
}

interface Props {
  selectedTags: Tag[]
  onDeleteTag: (tag: Tag) => void
}

export const ActiveTagList: React.FC<Props> = ({
  selectedTags,
  onDeleteTag,
}) => {
  return (
    <div>
      {selectedTags.map((it) => (
        <TagItem tag={it} key={it.name} onClick={() => onDeleteTag(it)} />
      ))}
    </div>
  )
}

const TagItem: React.FC<{
  tag: Tag
  onClick: () => void
}> = ({ tag, onClick }) => {
  return <div></div>
}
