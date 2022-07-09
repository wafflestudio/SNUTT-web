export interface EvaluationDTO {
  id: number
  lecture_id: number
  user_id: string
  content: string
  grade_satisfaction: number
  teaching_skill: number | null
  gains: number | null
  life_balance: number | null
  rating: number
  like_count: number
  dislike_count: number
  is_hidden: boolean
  is_reportable: boolean
  year: number
  semester: number
  is_modifiable: boolean
  from_snuev: boolean
}
