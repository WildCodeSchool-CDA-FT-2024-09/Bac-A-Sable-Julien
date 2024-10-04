import React from "react";

export interface Language {
    id: number; // ou string selon ton modèle de données
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

interface CardReposProps {
    repos: Repo[];
    setCommentOpen: (open: boolean) => void; // Ajout des props manquantes
    commentOpen: boolean; // Ajout des props manquantes
    statusComment: () => void; // Ajout des props manquantes
}

const CardRepos: React.FC<CardReposProps> = ({ repos, statusComment, setId }) => {
    
    return (
        <section className="section-card-repos">
            {repos.map((e) => (
                <article
                    key={e.id}
                    onClick={() => {
                        statusComment();  // Appel de la première fonction
                        setId(e.id);   // Appel de la deuxième fonction
                    }}
                >
                    <p>{e.name}</p>
                    <section>
                        <p>langage utilisé :</p>
                        <ul>
                            {e.languages.map((lang) => (
                                <li key={lang.id}>{lang.label}</li>
                            ))}
                        </ul>
                        <a
                            className={`section-card-lien ${
                                e.status.label === "Privé" ? "desableLink" : ""
                            }`}
                            href={e.url}
                            target="_blank"
                        >
                            accédez au repo
                        </a>
                    </section>
                </article>
            ))}
        </section>
    );
};

export default CardRepos;
