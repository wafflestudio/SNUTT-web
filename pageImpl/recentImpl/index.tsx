import styled from "@emotion/styled/"
import { AppBar } from "@lib/components/Appbar"
import SvgArrowBack from "@lib/components/Icons/SvgArrowBack"
import { Title01, Title02 } from "@lib/components/Text"
import { useRouter } from "next/router"
import { RecentLectureItem } from "./__components__/RecentResultItem"
import { useMainLatestLectureContainer } from "@pageImpl/mainImpl/__containers__"

export const RecentImpl = () => {
  const router = useRouter()

  const { recentLectureData } = useMainLatestLectureContainer()

  return (
    <Wrapper>
      <AppBar
        LeftImage={() => (
          <SvgArrowBack width={30} height={30} onClick={() => router.back()} />
        )}
      >
        <Title01 style={{ marginLeft: 12 }}>최근 강의 목록</Title01>
      </AppBar>

      <RecentLectureList>
        {recentLectureData ? (
          recentLectureData.map((it) => (
            <RecentLectureItem content={it} key={it.id} />
          ))
        ) : (
          <Title02>최근 학기에 수강한 강의가 없습니다</Title02>
        )}
      </RecentLectureList>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const RecentLectureList = styled.div`
  padding: 0 20px 0 20px;
`
