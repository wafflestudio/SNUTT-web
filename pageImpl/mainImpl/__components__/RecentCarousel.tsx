import styled from "@emotion/styled"
import { Subheading02, Title01 } from "@lib/components/Text"
import { LectureCard } from "./LectureCard"
import { useRouter } from "next/router"
import { LatestLectureDTO } from "@lib/dto/core/latestLecture"

interface Props {
  lectureList: LatestLectureDTO[]
}

export const RecentCarousel = ({ lectureList }: Props) => {
  const router = useRouter()

  return (
    <Wrapper>
      {/* <FakeSearchbar /> */}
      <CarouselHeader>
        <Title01>지난 학기 강의평을 남겨주세요</Title01>
        <Subheading02
          onClick={() => {
            router.push("/recent")
          }}
        >
          더보기 &gt;
        </Subheading02>
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
  border-bottom: 12px solid rgb(0, 0, 0, 0.03);
  padding: 0 20px 20px 20px;
`

const CarouselHeader = styled.div`
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
  width: calc(100% + 40px);
  margin-left: -20px;
  ::-webkit-scrollbar {
    display: none;
  }
`
