export interface Language {
    id?: number;
    label: string | undefined;
}

export interface Repo {
    idGit: string;
    id: number;
    name: string;
    languages?: Language[] | null; // Accepter undefined ou null
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
