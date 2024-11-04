import { gql } from "@apollo/client";

export const GET_REPOS = gql`
    query GetAllReposFilter($filter: String) {
        getAllReposFilter(filter: $filter) {
            id
            idGit
            isFavorite
            name
            url
            status {
                label
            }
            languages {
                label
            }
        }
        GetAllLang {
            id
            label
        }
    }
`;