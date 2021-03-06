import styled from "@emotion/styled"
import { AppBar } from "@lib/components/Appbar"
import { Router, useRouter } from "next/router"
import { Detail, Subheading02, Title01 } from "@lib/components/Text"
import { useEvaluationSummaryContainer } from "./__containers__/useEvaluationSummaryContainer"
import { LectureReviewCard } from "./__components__/LectureReviewCard"

import SvgWrite from "@lib/components/Icons/SvgWrite"
import SvgStarSmallFilled from "@lib/components/Icons/SvgStarSmallFilled"
import SvgStarSmallEmpty from "@lib/components/Icons/SvgStarSmallEmpty"
import SvgArrowBack from "@lib/components/Icons/SvgArrowBack"
import { RatingGraph } from "@lib/components/RatingGraph"
import { useLectureEvaluationsContainer } from "@pageImpl/detailImpl/__containers__/useLectureEvaluationsContainer"
import useScrollLoader from "@lib/hooks/useScrollLoader"
import React, { useState } from "react"
import EvaluationModifySheet from "./__components__/EvaluationModifySheet"
import { EvaluationDTO } from "@lib/dto/core/evaluation"
import { useMyLectureEvaluationsContainer } from "./__containers__/useMyLectureEvaluationsContainer"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
} from "@mui/material"
import { deleteEvaluation, postReportEvaluation } from "@lib/api/apis"
import { useMutation, useQueryClient } from "react-query"
import { EmptyReviewPlaceholder } from "@lib/components/Miscellaneous/EmptyReviewPlaceholder"
import { RatingTooltip } from "@lib/components/Tooltip"
import { SearchResultLoading } from "@lib/components/Miscellaneous/Loading"

export const DetailImpl = () => {
  const router = useRouter()
  const { id } = router.query

  const { summaryData } = useEvaluationSummaryContainer(Number(id))
  const { searchResult, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useLectureEvaluationsContainer(Number(id))
  const { myReviewResult } = useMyLectureEvaluationsContainer(Number(id))
  const { loaderRef } = useScrollLoader(fetchNextPage)

  const queryClient = useQueryClient()

  const [moreSheetItem, setMoreSheetItem] = useState<EvaluationDTO | undefined>(
    undefined,
  )

  const deleteMutation = useMutation(deleteEvaluation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["evaluationSummary", Number(id)])
      queryClient.invalidateQueries(["myLectureEvaluation", Number(id)])
      queryClient.invalidateQueries(["lectureEvaluation", Number(id)])
    },
    onError: () => {
      console.error("????????? ????????? ?????????????????????.")
    },
  })
  const [deleteTargetId, setDeleteTargetId] = useState<number | undefined>(
    undefined,
  )
  const handleDeleteEvaluation = () => {
    setDeleteTargetId(moreSheetItem?.id)
    setMoreSheetItem(undefined)
  }
  const handleDeleteEvaluationConfirm = async () => {
    const target = deleteTargetId
    setDeleteTargetId(undefined)
    if (target !== undefined) {
      deleteMutation.mutate(target)
    }
  }

  const reportMutation = useMutation(
    ({ id, content }: { id: number; content: string }) =>
      postReportEvaluation(id, { content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("evaluationSummary")
        queryClient.invalidateQueries("lectureEvaluation")
      },
      onError: () => {
        console.error("????????? ????????? ?????????????????????.")
      },
    },
  )
  const [reportReason, setReportReason] = useState<string>("")
  const [reportTargetId, setReportTargetId] = useState<number | undefined>(
    undefined,
  )
  const handleReportEvaluation = () => {
    setReportTargetId(moreSheetItem?.id)
    setMoreSheetItem(undefined)
  }
  const handleReportEvaluationConfirm = async () => {
    const target = reportTargetId
    setReportTargetId(undefined)
    if (target !== undefined) {
      reportMutation.mutate({ id: target, content: reportReason ?? "" })
    }
  }

  const count = searchResult?.pages[searchResult?.pages.length - 1].total_count
  const isEmpty = count === 0 && myReviewResult?.evaluations.length === 0

  const goBack = () => {
    if (((router as Router).components["/detail"] as any).initial) {
      router.replace("/main")
    } else {
      router.back()
    }
  }

  const appBar = (
    <AppBar
      LeftImage={() => (
        <BackButton onClick={goBack}>
          <SvgArrowBack width={30} height={30} />
        </BackButton>
      )}
    >
      <AppBarContent>
        <Title01 style={{ marginLeft: 12 }}>?????????</Title01>
        <WriteButton onClick={() => router.push(`/create?id=${id}`)}>
          <SvgWrite height={30} width={30} />
        </WriteButton>
      </AppBarContent>
    </AppBar>
  )

  if (searchResult === undefined || myReviewResult === undefined) {
    return (
      <>
        <Wrapper>{appBar}</Wrapper>
      </>
    )
  }

  return (
    <>
      <Wrapper>
        <Dialog
          open={deleteTargetId !== undefined}
          onClose={() => {
            setDeleteTargetId(undefined)
          }}
        >
          <DialogTitle>??? ???????????? ?????????????????????????</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                setDeleteTargetId(undefined)
              }}
            >
              ??????
            </Button>
            <Button
              onClick={() => {
                handleDeleteEvaluationConfirm()
              }}
            >
              ??????
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={reportTargetId !== undefined}
          onClose={() => {
            setReportTargetId(undefined)
          }}
        >
          <DialogTitle>????????? ??????</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ????????? ?????? ????????? ???????????????.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setReportReason(e.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setReportTargetId(undefined)
              }}
            >
              ??????
            </Button>
            <Button
              onClick={() => {
                handleReportEvaluationConfirm()
              }}
            >
              ??????
            </Button>
          </DialogActions>
        </Dialog>
        {appBar}

        <Content>
          <ReviewSummary>
            <ReviewSummaryLeft>
              <Title01>{summaryData?.title}</Title01>
              <InstructorName>
                {summaryData?.instructor} / {summaryData?.credit}?????? (
                {summaryData?.classification})
              </InstructorName>
            </ReviewSummaryLeft>
            <ReviewSummaryRight>
              <ReviewScore>
                {isEmpty ? (
                  <SvgStarSmallEmpty height={19} width={19} />
                ) : (
                  <SvgStarSmallFilled height={19} width={19} />
                )}
                <Title01 style={{ marginLeft: 6, marginTop: 0 }}>
                  {summaryData?.evaluation?.avg_rating?.toFixed(1)}
                </Title01>
              </ReviewScore>
              <ReviewCount>{count}?????? ?????????</ReviewCount>
            </ReviewSummaryRight>
          </ReviewSummary>

          {isEmpty ? (
            <EmptyReviewPlaceholder />
          ) : (
            <EvaluationDetail>
              <PositionedRatingToolTip>
                <RatingTooltip />
              </PositionedRatingToolTip>
              <ReviewDiagram>
                <DiagramTop>
                  <AxisLabel style={{ marginBottom: 10 }}>
                    ?????? ?????????
                  </AxisLabel>
                </DiagramTop>
                <DiagramMiddle>
                  <YAxisLabel>?????????</YAxisLabel>
                  <GraphWrapper>
                    <RatingGraph
                      gradeSatisfaction={
                        summaryData?.evaluation?.avg_grade_satisfaction ?? 0
                      }
                      lifeBalance={
                        summaryData?.evaluation?.avg_life_balance ?? 0
                      }
                      gains={summaryData?.evaluation?.avg_gains ?? 0}
                      teachingSkill={
                        summaryData?.evaluation?.avg_teaching_skill ?? 0
                      }
                      height={280}
                      width={280}
                    />
                  </GraphWrapper>
                  <YAxisLabel>?????????</YAxisLabel>
                </DiagramMiddle>
                <DiagramBottom>
                  <AxisLabel>???????????? ???</AxisLabel>
                </DiagramBottom>
              </ReviewDiagram>

              <ReviewList>
                {myReviewResult?.evaluations.map((content, index) => (
                  <LectureReviewCard
                    review={content}
                    key={content.id}
                    onMoreClick={() => {
                      setMoreSheetItem(content)
                    }}
                    isMyReview
                  />
                ))}
                <React.Fragment>
                  {searchResult?.pages
                    ?.flatMap((page) => page.content)
                    .map((it) => (
                      <LectureReviewCard
                        review={it}
                        key={it.id}
                        onMoreClick={() => {
                          setMoreSheetItem(it)
                        }}
                      />
                    ))}
                  {hasNextPage && !isFetchingNextPage && (
                    <div ref={loaderRef} />
                  )}
                  {isFetchingNextPage && <SearchResultLoading />}
                </React.Fragment>
              </ReviewList>
            </EvaluationDetail>
          )}
        </Content>
      </Wrapper>
      <EvaluationModifySheet
        isOpened={moreSheetItem !== undefined}
        onClose={() => {
          setMoreSheetItem(undefined)
        }}
        onReportClicked={handleReportEvaluation}
        onDeleteClicked={handleDeleteEvaluation}
        isModifiable={moreSheetItem?.is_modifiable ?? false}
        isReportable={moreSheetItem?.is_reportable ?? false}
      />
    </>
  )
}

const Wrapper = styled.div``

const BackButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  padding: 0;
`

const WriteButton = styled.button`
  width: 30px;
  height: 30px;
  z-index: 9999;
  background: transparent;
  border: none;
  padding: 0;
`

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
  height: 100%;
`

const EvaluationDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: relative;
`

const ReviewSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 10px 0 10px 0;
  border-bottom: solid 1px rgb(232, 232, 232);
`

const ReviewSummaryLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
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
  white-space: nowrap;
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
  margin-bottom: 10px;

  position: relative;
  z-index: -10;
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

const PositionedRatingToolTip = styled.div`
  top: 10px;
  right: 0;
  position: absolute;
`
