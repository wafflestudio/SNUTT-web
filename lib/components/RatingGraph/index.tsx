interface Props {
  gradeSatisfaction: number // int 1~5
  lifeBalance: number // int 1~5
  gains: number // int 1~5
  teachingSkill: number // int 1~5
  height: number
  width: number
}

export const RatingGraph = ({
  gradeSatisfaction,
  lifeBalance,
  gains,
  teachingSkill,
  height,
  width,
}: Props) => {
  const xMid = width / 2
  const yMid = height / 2

  const gradeSatisfactionY = yMid - gradeSatisfaction * (yMid / 5)
  const lifeBalanceX = xMid + lifeBalance * (xMid / 5)
  const gainsY = yMid + gains * (yMid / 5)
  const teachingSkillX = xMid - teachingSkill * (xMid / 5)

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${height} ${width}`}
      fill="none"
    >
      <path d={`M 0 ${yMid} L ${width} ${yMid}`} stroke="rgb(194, 194, 194)" />
      <path d={`M ${xMid} 0 L ${xMid} ${height}`} stroke="rgb(194, 194, 194)" />
      <path
        d={`M ${teachingSkillX} ${yMid} L ${xMid} ${gradeSatisfactionY} L ${lifeBalanceX} ${yMid} L ${xMid} ${gainsY} L ${teachingSkillX} ${yMid} Z`}
        fill="#1BD0C8"
        fillOpacity="0.4"
        stroke="#1BD0C8"
      />
      <path
        d={`M 0 ${yMid} L ${xMid} ${height} L ${width} ${yMid} L ${xMid} ${0} L 0 ${yMid} Z`}
        stroke="rgba(194, 194, 194, 0.5)"
      />
      <path
        d={`M ${width * 0.1} ${yMid} L ${xMid} ${height * 0.1} L ${
          width * 0.9
        } ${yMid} L ${xMid} ${height * 0.9} L ${width * 0.1} ${yMid} Z`}
        stroke="rgba(194, 194, 194, 0.5)"
      />
      <path
        d={`M ${width * 0.2} ${yMid} L ${xMid} ${height * 0.2} L ${
          width * 0.8
        } ${yMid} L ${xMid} ${height * 0.8} L ${width * 0.2} ${yMid} Z`}
        stroke="rgba(194, 194, 194, 0.5)"
      />
      <path
        d={`M ${width * 0.3} ${yMid} L ${xMid} ${height * 0.3} L ${
          width * 0.7
        } ${yMid} L ${xMid} ${height * 0.7} L ${width * 0.3} ${yMid} Z`}
        stroke="rgba(194, 194, 194, 0.5)"
      />
      <path
        d={`M ${width * 0.4} ${yMid} L ${xMid} ${height * 0.4} L ${
          width * 0.6
        } ${yMid} L ${xMid} ${height * 0.6} L ${width * 0.4} ${yMid} Z`}
        stroke="rgba(194, 194, 194, 0.5)"
      />
    </svg>
  )
}
