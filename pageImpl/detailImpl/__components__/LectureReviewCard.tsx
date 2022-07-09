import styled from "@emotion/styled"
import { Detail } from "@lib/components/Text"
import { COLORS } from "@lib/styles/colors"
import { Rating } from "@lib/components/Rating"
import { CollapsableText } from "@lib/components/CollapsableText"
import { EvaluationDTO } from "@lib/dto/core/evaluation"
import MoreVerticalIcon from "@public/icons/more_vertical.svg"
import FossilIcon from "@public/icons/fossil.svg"
import { SemesterIntToString } from "@lib/util"

interface Props {
  review: EvaluationDTO
  onMoreClick: () => void
  isMyReview?: boolean
}

export const LectureReviewCard = ({
  review,
  onMoreClick,
  isMyReview = false,
}: Props) => {
  return (
    <Wrapper isMintColor={isMyReview}>
      <Contents>
        <Header>
          <SideInfo>
            <Rating rating={review.rating} size={12} />
            <Semester>
              <SemesterText>
                {review.year}년 {SemesterIntToString(review.semester)}학기
              </SemesterText>
            </Semester>
            {review.from_snuev && (
              <FossilIconWrapper>
                <FossilIcon />
              </FossilIconWrapper>
            )}
            <div style={{ flexGrow: 1 }} />
            <div onClick={onMoreClick}>
              <MoreVerticalIcon />
            </div>
          </SideInfo>
        </Header>
        {review.content === "" ? (
          <></>
        ) : (
          <Review>
            <CollapsableText text={review.content} />
          </Review>
        )}
      </Contents>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isMintColor: boolean }>`
  width: calc(100% + 40px);
  box-sizing: border-box;
  margin-left: -20px;
  background-color: ${(props) =>
    props.isMintColor && "rgba(27, 208, 200, 0.05)"};
`

const Contents = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  margin: 0 20px;
  border-bottom: 1px solid ${COLORS.gray};
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Semester = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SemesterText = styled(Detail)`
  color: ${COLORS.darkGray};
  text-align: left;
  font-size: 10px;
  margin-left: 8px;
  line-height: 18px;
`

const FossilIconWrapper = styled.div`
  margin-left: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SideInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Review = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 12px;
`
