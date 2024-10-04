import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AnimatedBackground } from "animated-backgrounds";

import Comment from "../components/Comment";
import SectionRepos from "../components/SectionRepos";
import axios from "axios";

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

export default function HomePage() {
    const [repos, setRepos] = useState<Repo>([]);
    const [lang, setLang] = useState<string>("");
    const [commentOpen, setCommentOpen] = useState<boolean>(false);
    const [id, setId] = useState<Repo | null>(null);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/repos", {
                params: {
                    language: lang, // Le langage que tu souhaites filtrer
                },
            })
            .then((response) => {
                setRepos(response.data); // Affecter les dépôts filtrés
                console.log("%c⧭", "color: #ffa640", response.data);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des dépôts :",
                    error
                );
            });
    }, [lang]);

    // Filtrer les repos en fonction de la langue sélectionnée
    const repoByLang = repos.filter((repo) =>
        repo.languages.some(
            (language) => language.label.toLowerCase() === lang.toLowerCase()
        )
    );

    // Fonction pour afficher les commentaires
    const statusComment = () => {
        setCommentOpen(!commentOpen);
    };

    return (
        <main>
            <AnimatedBackground animationName="rainbowWaves" />
            <h1>Les {repos.length} projets de Julien </h1>
            {!commentOpen ? (
                <SectionRepos
                    repos={repos}
                    lang={lang}
                    setLang={setLang}
                    repoByLang={repoByLang}
                    commentOpen={commentOpen}
                    setCommentOpen={setCommentOpen}
                    statusComment={statusComment}
                    setId={setId}
                />
            ) : (
                <Comment
                    commentOpen={commentOpen}
                    setCommentOpen={setCommentOpen}
                    statusComment={statusComment}
                    repoId={id}
                />
            )}
        </main>
    );
}
