import styled from "@emotion/styled"
import { AppBar } from "@lib/components/Appbar"
import { useRouter } from "next/router"
import { Detail, Subheading02, Title01 } from "@lib/components/Text"
import { useEvaluationSummaryContainer } from "./__containers__/useEvaluationSummaryContainer"
import { LectureReviewCard } from "./__components__/LectureReviewCard"

import SvgWrite from "@lib/components/Icons/SvgWrite"
import SvgStarSmallFilled from "@lib/components/Icons/SvgStarSmallFilled"
import SvgArrowBack from "@lib/components/Icons/SvgArrowBack"
import { RatingGraph } from "@lib/components/RatingGraph"
import { useLectureEvaluationsContainer } from "@pageImpl/detailImpl/__containers__/useLectureEvaluationsContainer"
import { GetEvaluationsQuery } from "@lib/dto/getEvaluations"

export const DetailImpl = () => {
  const router = useRouter()
  const { id } = router.query

  const mockQuery: GetEvaluationsQuery = {
    id: Number(id),
    cursor: "",
  }

  const { summaryData } = useEvaluationSummaryContainer(Number(id))
  const { evaluationData } = useLectureEvaluationsContainer(mockQuery)

  return (
    <Wrapper>
      <AppBar
        LeftImage={() => (
          <SvgArrowBack width={30} height={30} onClick={() => router.back()} />
        )}
      >
        <AppBarContent>
          <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
          <SvgWrite
            height={30}
            width={30}
            onClick={() => router.push("/create/" + id)}
          />
        </AppBarContent>
      </AppBar>

      <Content>
        <ReviewSummary>
          <ReviewSummaryLeft>
            <Title01>{summaryData?.title}</Title01>
            <InstructorName>{summaryData?.instructor}</InstructorName>
          </ReviewSummaryLeft>
          <ReviewSummaryRight>
            <ReviewScore>
              <SvgStarSmallFilled height={19} width={19} />
              <Title01 style={{ marginLeft: 6, marginTop: 0 }}>
                {summaryData?.summary.avg_rating}
              </Title01>
            </ReviewScore>
            <ReviewCount>{evaluationData?.total_count}개의 강의평</ReviewCount>
          </ReviewSummaryRight>
        </ReviewSummary>

        <ReviewDiagram>
          <DiagramTop>
            <AxisLabel style={{ marginBottom: 10 }}>성적 만족도</AxisLabel>
          </DiagramTop>
          <DiagramMiddle>
            <YAxisLabel>강의력</YAxisLabel>
            <GraphWrapper>
              <RatingGraph
                gradeSatisfaction={Number(
                  summaryData?.summary.avg_grade_satisfaction,
                )}
                lifeBalance={Number(summaryData?.summary.avg_life_balance)}
                gains={Number(summaryData?.summary.avg_gains)}
                teachingSkill={Number(summaryData?.summary.avg_teaching_skill)}
                height={280}
                width={280}
              />
            </GraphWrapper>
            <YAxisLabel>수라밸</YAxisLabel>
          </DiagramMiddle>
          <DiagramBottom>
            <AxisLabel>얻어가는 것</AxisLabel>
          </DiagramBottom>
        </ReviewDiagram>

        <ReviewList>
          {evaluationData?.content.length !== 0 ? (
            evaluationData?.content.map((it) => (
              <LectureReviewCard review={it} key={it.id} />
            ))
          ) : (
            <Subheading02>대충 아직 없으니 적어달라는 문구</Subheading02>
          )}
        </ReviewList>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const AppBarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 12px;
`

const Content = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
`

const ReviewSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 12px 0 12px 0;
  border-bottom: solid 1px rgb(232, 232, 232);
`

const ReviewSummaryLeft = styled.div`
  display: flex;
  flex-direction: column;
`

const InstructorName = styled(Subheading02)`
  margin-top: 3px;
  color: rgb(119, 119, 119);
`

const ReviewSummaryRight = styled.div`
  display: flex;
  flex-direction: column;
`

const ReviewScore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`

const ReviewCount = styled(Detail)`
  margin-top: 3px;
  color: rgb(102, 102, 102);
`

const ReviewDiagram = styled.div`
  height: 330px;
  width: 290px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  align-self: center;
  padding: 8px 0 8px 0;
`

const DiagramTop = styled.div``

const DiagramMiddle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`

const DiagramBottom = styled.div`
  height: 28px;
`

const AxisLabel = styled.span`
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 10px;
  line-height: 11px;
`

const YAxisLabel = styled(AxisLabel)`
  margin-top: 20px;
`

const GraphWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const ReviewList = styled.div``
