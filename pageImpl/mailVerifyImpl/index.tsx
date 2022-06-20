import styled from "@emotion/styled"
import React, { useState, ChangeEvent } from "react"
import { AppBar } from "@lib/components/Appbar"
import {
  Title01,
  Subheading01,
  Subheading02,
  Detail,
} from "@lib/components/Text"
import CountDown, { CountdownRenderProps, zeroPad } from "react-countdown"
import { COLORS } from "@lib/styles/colors"
import SvgTimetableOn from "@lib/components/Icons/SvgTimetableOn"
import { postEmailVerificationCode } from "@lib/api/apis"
import { postEmailVerification } from "@lib/api/apis"
import { AxiosError } from "axios"
import { ApiError } from "@lib/dto/core/error"

interface Props {
  setVerification: (
    newValue: string,
    options?: Cookies.CookieAttributes | undefined,
  ) => void
}

export const MailVerifyImpl = ({ setVerification }: Props) => {
  const [email, setEmail] = useState("")

  const isRequestVerificationButtonDiasbled = email === ""

  const [verificationNumber, setVerificationNumber] = useState(0)

  const [isVerificationNumberRequested, setIsVerificationNumberRequested] =
    useState(false)

  const [timeoutDeadline, setTimeoutDeadline] = useState(0)

  enum VerificationState {
    TOO_MANY_REQUEST,
    TIMEOUT,
    INVALID_NUMBER,
    ALREADY_VERIFIED,
    VERFIED_FROM_OTHER_MAIL,
    NONE,
    READY,
  }

  const [verificationState, setVerificationState] = useState<VerificationState>(
    VerificationState.NONE,
  )

  const isCompleteButtonDisabled = verificationState !== VerificationState.READY

  const WARINING: {
    [key in Exclude<VerificationState, VerificationState.READY>]: string
  } = {
    [VerificationState.TIMEOUT]: "인증요청에 실패했습니다. 다시 시도해주세요",
    [VerificationState.INVALID_NUMBER]:
      "인증번호가 틀렸습니다. 다시 시도해주세요",
    [VerificationState.ALREADY_VERIFIED]: "이미 인증된 계정입니다",
    [VerificationState.VERFIED_FROM_OTHER_MAIL]: "이미 사용된 메일입니다",
    [VerificationState.TOO_MANY_REQUEST]:
      "인증요청에 실패했습니다. 3분 후에 다시 시도해주세요",
    [VerificationState.NONE]: "",
  }

  const countDownRenderer = ({
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      setVerificationState(VerificationState.TIMEOUT)
      return <Subheading01 style={{ color: COLORS.red }}>00:00</Subheading01>
    } else {
      verificationState === VerificationState.TIMEOUT &&
        setVerificationState(VerificationState.READY)
      return (
        <Subheading01 style={{ color: COLORS.red }}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </Subheading01>
      )
    }
  }

  const requestVerificationNumberHandler = async () => {
    try {
      await postEmailVerification({ email: email + "@snu.ac.kr" })
        .then(() => {
          setVerificationState(VerificationState.READY)
          setIsVerificationNumberRequested(true)
          setTimeoutDeadline(Date.now() + 179000)
        })
        .catch((e: AxiosError<ApiError>) => {
          const errcode = e.response?.data.errcode

          if (errcode === 36864) {
            setVerificationState(VerificationState.ALREADY_VERIFIED)
            return
          }

          if (errcode === 36865) {
            setVerificationState(VerificationState.VERFIED_FROM_OTHER_MAIL)
            return
          }

          if (errcode === 40960) {
            setVerificationState(VerificationState.TOO_MANY_REQUEST)
            return
          }

          return
        })
    } catch (e) {
      console.error(e)
      setVerificationState(VerificationState.TIMEOUT)
    }
  }

  const verifyHandler = async () => {
    try {
      const res = await postEmailVerificationCode({
        code: verificationNumber,
      })

      if (res.is_email_verified) {
        setVerification("true")
      }
    } catch (e) {
      console.error(e)
      setVerificationState(VerificationState.INVALID_NUMBER)
    }
  }

  return (
    <Wrapper>
      <AppBar LeftImage={() => <SvgTimetableOn height={30} width={30} />}>
        <Title01 style={{ marginLeft: 12 }}>이메일 인증</Title01>
      </AppBar>
      <Content>
        <DescriptionTextWrapper>
          <DescriptionText>
            <Title01>강의평 서비스 이용을 위해</Title01>
            <Title01>이메일 인증이 필요합니다.</Title01>
          </DescriptionText>
        </DescriptionTextWrapper>

        <EmailInputWrapper>
          <Subheading01>이메일</Subheading01>
          <EmailInputBar>
            <EmailInput
              placeholder={"이메일을 입력하세요"}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <MailAddress>
              <>
                <Subheading02>@snu.ac.kr</Subheading02>
              </>
            </MailAddress>
            <RequestVerificationButton
              onClick={requestVerificationNumberHandler}
              disabled={isRequestVerificationButtonDiasbled}
            >
              {isVerificationNumberRequested ? "다시 요청" : "인증요청"}
            </RequestVerificationButton>
          </EmailInputBar>
        </EmailInputWrapper>

        <VerificationNumberInputWrapper>
          <Subheading01>인증번호</Subheading01>
          <VerificationNumberInputBar>
            <VerificationNumberInput
              type="number"
              placeholder={"인증번호 6자리를 입력하세요"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (verificationState === VerificationState.INVALID_NUMBER) {
                  setVerificationState(VerificationState.READY)
                }
                setVerificationNumber(parseInt(e.target.value))
              }}
            />
            {isVerificationNumberRequested && (
              <CountDownWrapper>
                <CountDown
                  date={timeoutDeadline}
                  renderer={countDownRenderer}
                />
              </CountDownWrapper>
            )}
          </VerificationNumberInputBar>
          {verificationState !== VerificationState.READY && (
            <WarningText>
              <Detail style={{ color: COLORS.red }}>
                {WARINING[verificationState]}
              </Detail>
            </WarningText>
          )}
        </VerificationNumberInputWrapper>

        <CompleteButton
          onClick={verifyHandler}
          disabled={isCompleteButtonDisabled}
        >
          <Title01 style={{ color: "white" }}>완료</Title01>
        </CompleteButton>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Content = styled.div`
  padding: 22px 20px 0 20px;
`

const DescriptionTextWrapper = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const DescriptionText = styled.div``

const EmailInputWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`

const EmailInputBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  height: 34px;
  width: 100%;
  border-bottom: solid 1px #c4c4c4;
`

const VerificationNumberInputWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  position: relative;
`

const VerificationNumberInputBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 34px;
  width: 100%;
  border-bottom: solid 1px #c4c4c4;
`

const MailAddress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2px 0 2px;
`

const RequestVerificationButton = styled.button`
  width: 85px;
  height: 100%;
  background-color: white;
  border: none;

  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #1bd0c8;

  &:disabled {
    color: #b3b3b3;
  }
`

const CountDownWrapper = styled.div`
  width: 56px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const CompleteButton = styled.button`
  height: 60px;
  width: 100%;
  margin-top: 40px;
  background-color: ${COLORS.blue};
  border: none;

  &:disabled {
    background-color: #c4c4c4;
  }
`

const TransparentInput = styled.input`
  border: none;
  flex-grow: 1;
  line-height: 15px;
  padding-left: 0;

  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;

  ::placeholder {
    color: #c4c4c4;
  }
`

const EmailInput = styled(TransparentInput)``

const VerificationNumberInput = styled(TransparentInput)``

const WarningText = styled.div`
  height: 15px;
  position: absolute;
  bottom: -17px; // line height + 2px gap
`
