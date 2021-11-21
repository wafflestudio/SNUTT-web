import styled from "@emotion/styled"
import { SearchResultDTO } from "@lib/dto/searchResult"
import Image from "next/image"

import person_black from "@public/icons/person_black.svg"
import tag_black from "@public/icons/tag_black.svg"
import star_cyan from "@public/icons/star_cyan.svg"
import { Subheading01 } from "@lib/components/Text"

interface Props {
  content: SearchResultDTO
}

export const SearchResultItem: React.FC<Props> = ({ content }) => {
  return (
    <Wrapper>
      <ItemTop>
        <SubjectText>{content.subject}</SubjectText>
        <Rating>
          <Image src={star_cyan} height={15} width={15} />
          <RatingText>{content.rating}</RatingText>
        </Rating>
      </ItemTop>

      <ItemBottom>
        <Icons>
          <Image src={tag_black} height={15} width={15} />
          <Image src={person_black} height={15} width={15} />
        </Icons>
        <Texts>
          <InfoText>
            {content.department}, {content.grade}
          </InfoText>
          <LecturerText>{content.lecturer}</LecturerText>
        </Texts>
      </ItemBottom>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 12px;

  border-bottom: solid 1px rgba(196, 196, 196, 0.3);
`

const ItemTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-weight: bold;
`

const ItemBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 12px;
  height: 39px;
`

const Icons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  padding-top: 1px;
  padding-bottom: 1px;
`

const Texts = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  justify-content: space-between;
`

const SubjectText = styled(Subheading01)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Rating = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 17px;

  align-items: center;
`

const RatingText = styled(Subheading01)`
  margin-left: 2px;
`

const InfoText = styled.div`
  font-family: AppleSDGothicNeo;
  font-weight: normal;

  font-size: 12px;
  line-height: 16.5px;
`

const LecturerText = styled.div`
  font-family: AppleSDGothicNeo;
  font-weight: normal;

  font-size: 12px;
  line-height: 16.5px;
`

const Line = styled.hr`
  height: 1px;
  border: 0px;
  background-color: #c4c4c4;
  opacity: 0.3;
  margin-top: 12px;
  margin-bottom: 0px;
`
