import styled from "@emotion/styled"
import React from "react"
import Image from "next/image"

import tab_search_off_icon from "@public/icons/search_off.svg"
import { useRouter } from "next/router"

export const FakeSearchbar = () => {
  const router = useRouter()

  return (
    <Wrapper>
      <InputBar
        onClick={() => {
          router.push("/search")
        }}
      >
        <SearchButton>
          <Image
            src={tab_search_off_icon}
            alt={"search_icon"}
            height={43}
            width={43}
            stroke-witdh={1}
          />
        </SearchButton>
        <Input
          placeholder="강의명, 교수명으로 검색해주세요"
          disabled={true}
          onClick={() => {
            router.push("/search")
          }}
        />
      </InputBar>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`

const InputBar = styled.div`
  height: 36px;
  width: 100%;
  background: #f2f2f2;
  border-radius: 6px;
  border-width: 0px;
  margin-top: 8px;
  margin-bottom: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Input = styled.input`
  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 18px;

  background: #f2f2f2;
  border: 0px;
  height: 100%;
  width: 100%;

  margin-left: 8px;
  margin-right: 8px;

  padding: 0 0 0 0;
`

const SearchButton = styled.button`
  background: #f2f2f2;
  border-radius: 6px 0px 0px 6px;
  margin-left: 6px;
  padding: 0 0 0 0;
  border: 0;

  display: flex;
  align-items: center;
`
