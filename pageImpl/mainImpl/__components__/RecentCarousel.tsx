import styled from "@emotion/styled"
import { Subheading02, Title02 } from "@lib/components/Text"
import { RecentLectureDTO } from "@lib/dto/recentLecture"
import { FakeSearchbar } from "./FakeSearchbar"
import { LectureCard } from "./LectureCard"
import { COLORS } from "@lib/styles/colors"

interface Props {
  lectureList: RecentLectureDTO[]
}

export const RecentCarousel = ({ lectureList }: Props) => {
  return (
    <Wrapper>
      <FakeSearchbar />
      <CarouselHeader>
        <Title02>지난 학기 강의평을 남겨주세요</Title02>
        <Subheading02>강의 목록 &gt;</Subheading02>
      </CarouselHeader>
      <SubjectCardCarousel>
        {lectureList.map((lecture) => (
          <LectureCard key={lecture.id} lecture={lecture} />
        ))}
      </SubjectCardCarousel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-bottom: 1px solid ${COLORS.gray};
  padding-bottom: 20px;
  margin: 0px 20px 0px 20px;
`

const CarouselHeader = styled.div`
  /* padding: 0px 20px; */
  margin-bottom: 10px;
  margin-top: 11px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SubjectCardCarousel = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  width: 100vw;
  position: relative;
  left: calc(-50vw + 50%);
`