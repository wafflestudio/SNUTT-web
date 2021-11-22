import { ReviewDetailDTO, ReviewDTO } from "@lib/dto/review"
import { SearchResultDTO } from "@lib/dto/searchResult"
import { GetTagInfos } from "../dto/tagInfos"

export function fetchRecentReviews(): Promise<ReviewDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: "an", name: "최근 리뷰다 a", point: 1 },
          { id: "bn", name: "최근 리뷰다 b", point: 2 },
          { id: "cn", name: "최근 리뷰다 c", point: 3 },
        ]),
      3000,
    )
  })
}

export function fetchMyReviews(): Promise<ReviewDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: "am", name: "내 리뷰다 a", point: 1 },
          { id: "bm", name: "내 리뷰다 b", point: 2 },
          { id: "cm", name: "내 리뷰다 c", point: 3 },
        ]),
      3000,
    )
  })
}

export function requestSearch(): Promise<SearchResultDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        // dummy data
        resolve([
          {
            id: "aa",
            subject: "소프트웨어 개발의 원리와 실습",
            department: "컴퓨터공학부",
            grade: "3학년",
            lecturer: "최한결",
            rating: 3.8,
          },
          {
            id: "bb",
            subject: "편집디자인",
            department: "디자인학부(디자인전공)",
            grade: "3학년",
            lecturer: "서정민",
            rating: 2.8,
          },
          {
            id: "cc",
            subject: "데이터사이언티스트를 위한 금융공학",
            department: "데이터사이언스대학원",
            grade: "석사",
            lecturer: "서정록",
            rating: 1.8,
          },
        ]),
      1000,
    )
  })
}

export function fetchMainReviews(): Promise<ReviewDetailDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: "1",
            name: "편집디자인",
            point: 1,
            semester: "2021-1",
            contents: "짧은 리뷰",
          },
          {
            id: "2",
            name: "편집디자인",
            point: 1,
            semester: "2021-1",
            contents:
              "긴 리뷰. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요.강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요.강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. ",
          },
          {
            id: "3",
            name: "편집디자인",
            point: 1,
            semester: "2021-1",
            contents:
              "중간 리뷰. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요 ",
          },
        ]),
      1000,
    )
  })
}

export function fetchTagInfos(): Promise<GetTagInfos> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          results: [
            {
              tags: [
                { name: "태그A1", id: 101 },
                { name: "태그A2", id: 102 },
              ],
              tagGroup: { name: "태그그룹A", id: 1 },
            },
            {
              tags: [
                { name: "태그B1", id: 201 },
                { name: "태그B2", id: 202 },
              ],
              tagGroup: { name: "태그그룹B", id: 2 },
            },
            {
              tags: [
                { name: "태그C1", id: 301 },
                { name: "태그C2", id: 302 },
              ],
              tagGroup: { name: "태그그룹C", id: 3 },
            },
          ],
        }),
      1000,
    )
  })
}
