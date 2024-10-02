import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AnimatedBackground } from "animated-backgrounds";

import Comment from "../components/Comment";
import SectionRepos from "../components/SectionRepos";

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
    const repos = useLoaderData() as Repo[];
    const [lang, setLang] = useState<string>("");
    const [commentOpen, setCommentOpen] = useState<boolean>(false);

    console.log('%c⧭', 'color: #00bf00', commentOpen);

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
            {
              !commentOpen ?
              <SectionRepos 
                  repos={repos} 
                  lang={lang} 
                  setLang={setLang} 
                  repoByLang={repoByLang} 
                  commentOpen={commentOpen} 
                  setCommentOpen={setCommentOpen} 
                  statusComment={statusComment}
              />
              :
              <Comment commentOpen={commentOpen} setCommentOpen={setCommentOpen} statusComment={statusComment} />
            }
        </main>
    );
}
