import { useEffect, useState } from "react";
import CardRepos from "../components/CardRepos";

interface SectionReposProps {
  repos: Repo[];
  setLang: (lang: string) => void;
  lang: string;
  repoByLang: Repo[];
  setCommentOpen: (open: boolean) => void; 
  commentOpen: boolean;
  statusComment: ()=> void;
  setId: ()=> void;
  
}

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

export default function SectionRepos({
    repos,
    setLang,
    repoByLang,
    setCommentOpen,
    commentOpen,
    statusComment,
    setId
}: SectionReposProps) {



    const [langData, setLangData] = useState<Language[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/langs")
            .then((response) => response.json())
            .then((data: Language[]) => {
                setLangData(data);
            })
            .catch((error) =>
                console.error(
                    "Erreur lors de la récupération des langages :",
                    error
                )
            );
    }, []);

    const langSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("%c⧭", "color: #00a3cc", e.target.value);
        setLang(e.target.value);
    };

    return (
        <>
            <select
                name=""
                id=""
                onChange={langSelect}
                className="home-page-select"
            >
                <option value="">--selectionnez un langage--</option>
                {langData.map((langs) => {
                    return <option key={langs.id}>{langs.label}</option>;
                })}
            </select>
            <CardRepos
                repos={repoByLang.length === 0 ? repos : repoByLang}
                commentOpen={commentOpen}
                setCommentOpen={setCommentOpen}
                statusComment={statusComment}
                setId={setId}
            />
        </>
    );
}
