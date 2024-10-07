export interface Language {
  id: number;
  label: string;
}

export interface Repo {
  id: number;
  name: string;
  languages: Language[];
  url: string;
  status: {
      label: string;
  };
}

export interface CardReposProps {
  repos: Repo[];
  setCommentOpen: (open: boolean) => void;
  commentOpen: boolean;
  statusComment: () => void;
}