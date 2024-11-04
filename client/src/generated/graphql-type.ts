import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Language = {
  __typename?: 'Language';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  repos?: Maybe<Array<Repo>>;
};

export type LanguageInput = {
  label: Scalars['String']['input'];
};

export type LightRepo = {
  __typename?: 'LightRepo';
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewLanguage: Language;
  createNewRepo: Repo;
};


export type MutationCreateNewLanguageArgs = {
  data: LanguageInput;
};


export type MutationCreateNewRepoArgs = {
  data: RepoInput;
};

export type Query = {
  __typename?: 'Query';
  GetAllLang: Array<Language>;
  GetAllRepo: Array<Repo>;
  getAllReposFilter: Array<Repo>;
  lightrepoById?: Maybe<LightRepo>;
  lightrepos: Array<LightRepo>;
  reposWithLanguages: Array<Repo>;
};


export type QueryGetAllReposFilterArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLightrepoByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['Float']['output'];
  idGit: Scalars['String']['output'];
  isFavorite: Scalars['Boolean']['output'];
  languages?: Maybe<Array<Language>>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type RepoInput = {
  id: Scalars['Float']['input'];
  idGit: Scalars['String']['input'];
  isPrivate: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type GetAllReposFilterQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllReposFilterQuery = { __typename?: 'Query', getAllReposFilter: Array<{ __typename?: 'Repo', id: number, idGit: string, isFavorite: boolean, name: string, url: string, status: { __typename?: 'Status', label: string }, languages?: Array<{ __typename?: 'Language', label: string }> | null }>, GetAllLang: Array<{ __typename?: 'Language', id: number, label: string }> };


export const GetAllReposFilterDocument = gql`
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

/**
 * __useGetAllReposFilterQuery__
 *
 * To run a query within a React component, call `useGetAllReposFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllReposFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllReposFilterQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllReposFilterQuery(baseOptions?: Apollo.QueryHookOptions<GetAllReposFilterQuery, GetAllReposFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllReposFilterQuery, GetAllReposFilterQueryVariables>(GetAllReposFilterDocument, options);
      }
export function useGetAllReposFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllReposFilterQuery, GetAllReposFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllReposFilterQuery, GetAllReposFilterQueryVariables>(GetAllReposFilterDocument, options);
        }
export function useGetAllReposFilterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllReposFilterQuery, GetAllReposFilterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllReposFilterQuery, GetAllReposFilterQueryVariables>(GetAllReposFilterDocument, options);
        }
export type GetAllReposFilterQueryHookResult = ReturnType<typeof useGetAllReposFilterQuery>;
export type GetAllReposFilterLazyQueryHookResult = ReturnType<typeof useGetAllReposFilterLazyQuery>;
export type GetAllReposFilterSuspenseQueryHookResult = ReturnType<typeof useGetAllReposFilterSuspenseQuery>;
export type GetAllReposFilterQueryResult = Apollo.QueryResult<GetAllReposFilterQuery, GetAllReposFilterQueryVariables>;