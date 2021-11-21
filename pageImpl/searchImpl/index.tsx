import styled from "@emotion/styled"
import { Searchbar } from "./__components__/Searchbar"
import { useSearchContainer } from "./__containers__/search"
import { SearchResultItem } from "./__components__/SearchResultItem"

export const SearchImpl = () => {
  const { data } = useSearchContainer()

  return (
    <Wrapper>
      <Searchbar />
      <SearchResultList>
        {data ? (
          data.map((it) => <SearchResultItem content={it} key={it.id} />)
        ) : (
          <SearchNoResult>강의명, 교수명으로 검색하세요</SearchNoResult>
        )}
      </SearchResultList>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const SearchResultList = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`

const SearchNoResult = styled.div`
  font-size: 16px;
  color: #777777;
`
