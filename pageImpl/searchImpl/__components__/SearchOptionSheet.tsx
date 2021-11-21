import styled from "@emotion/styled"
import { CategoryList } from "./CategoryList"
import { useMemo, useState } from "react"
import { TagList } from "./TagList"

type Tag = {
  name: string
  category: Category
}
type Category = {
  name: string
}

interface Props {
  selectedTags: Tag[]
  tags: Tag[]
  categories: Category[]
  onSelectTag: (tag: Tag) => void
  onDeselectTag: (tag: Tag) => void
}

export const SearchOptionSheet: React.FC<Props> = ({
  selectedTags,
  tags,
  categories,
  onSelectTag,
  onDeselectTag,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0],
  )

  const visibleTags = useMemo(() => {
    return tags.filter((it) => it.category.name === selectedCategory.name)
  }, [tags, selectedCategory])

  return (
    <div>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelectionChange={setSelectedCategory}
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
