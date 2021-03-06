import styled from "@emotion/styled"
import { Detail, Subheading01 } from "@lib/components/Text"
import { COLORS } from "@lib/styles/colors"
import { Rating } from "@lib/components/Rating"
import { CollapsableText } from "@lib/components/CollapsableText"
import { MainEvaluationDTO } from "@lib/dto/core/mainEvaluation"
import { SemesterIntToString } from "@lib/util"
import { useRouter } from "next/router"

interface Props {
  evaluation: MainEvaluationDTO
}

export const EvaluationCard = ({ evaluation }: Props) => {
  const router = useRouter()

  return (
    <Wrapper>
      <Contents>
        <Header>
          <HeaderLeft>
            <LectureName
              onClick={() => router.push(`/detail?id=${evaluation.lecture.id}`)}
            >
              {evaluation.lecture.title}
            </LectureName>
            <RatingSemester>
              <Rating rating={evaluation.rating} size={12} />
              <Semester>
                {evaluation.year}년 {SemesterIntToString(evaluation.semester)}
                학기
              </Semester>
            </RatingSemester>
          </HeaderLeft>
          <HeaderRight>{evaluation.lecture.instructor}</HeaderRight>
        </Header>
        <Review>
          <CollapsableText text={evaluation.content} />
        </Review>
      </Contents>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
`

const Contents = styled.div`
  border-bottom: 1px solid ${COLORS.gray};
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`

const HeaderLeft = styled.div``

const HeaderRight = styled(Detail)`
  color: rgb(119, 119, 119);
  max-width: 30%;
  text-align: right;
  word-break: keep-all;
  margin-left: 10px;
`

const LectureName = styled(Subheading01)``

const Semester = styled(Detail)`
  color: ${COLORS.darkGray};
  text-align: left;
  font-size: 11px;
  margin-left: 8px;
  line-height: 100%;
`

const RatingSemester = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3px;
  align-items: center;
`

const Review = styled.div``
