import { requestSearch } from "@lib/api/apis"
import { useQuery } from "react-query"

export function useSearchContainer() {
  const querySearch = useQuery("search", requestSearch) //TODO

  const { data, error } = querySearch

  return {
    data,
    error,
  }
}
