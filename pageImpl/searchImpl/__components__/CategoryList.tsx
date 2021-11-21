import styled from "@emotion/styled"

type Category = {
  name: string
  category: { name: string }
}

interface Props {
  categories: Category[]
  selectedCategory: Category
  onCategorySelectionChange: (category: Category) => void
}

export const CategoryList: React.FC<Props> = ({
  categories,
  selectedCategory,
  onCategorySelectionChange,
}) => {
  return (
    <Wrapper>
      {categories.map((it) => (
        <CategoryItem
          category={it}
          isSelected={selectedCategory.name === it.name}
          key={it.name}
          onClick={() => {
            onCategorySelectionChange(it)
          }}
        />
      ))}
    </Wrapper>
  )
}

const CategoryItem: React.FC<{
  category: Category
  isSelected: boolean
  onClick: () => void
}> = ({ category, isSelected, onClick }) => {
  return <div onClick={onClick}>{category.name}</div>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`
