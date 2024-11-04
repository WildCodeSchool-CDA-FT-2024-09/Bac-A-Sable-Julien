import { useEffect, useState } from "react";
interface CommentProps {
    setCommentOpen: (open: boolean) => void;
    commentOpen: boolean;
    statusComment: () => void;
    repoId: number;
}

export interface Repo {
    id: number;
    name: string;
    // languages: Language[];
    url: string;
    status: {
        label: string;
    };
}

const Comment: React.FC<CommentProps> = ({ statusComment, repoId }) => {
    const [repo, setRepo] = useState<Repo[]>([]);
    console.log("%c⧭", "color: #733d00", repo);

    useEffect(() => {
        fetch(`http://localhost:3000/api/repos/${repoId}`)
            .then((response) => response.json())
            .then((data: Repo[]) => {
                return setRepo(data);
            })
            .catch((error) =>
                console.error(
                    "Erreur lors de la récupération des langages :",
                    error
                )
            );
    }, []);

    console.log("%c⧭", "color: #aa00ff", repoId);
    return (
        <p
            className="commentaire"
            onClick={statusComment}
        >
            ici bientôt les commentaire du repo {repo.name}
        </p>
    );
};

export default Comment;
