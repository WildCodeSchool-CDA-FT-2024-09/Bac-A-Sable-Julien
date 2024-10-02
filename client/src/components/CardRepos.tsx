import React from "react";

export interface Language {
    id: number; // ou string selon ton modèle de données
    label: string;
}

export interface Repo {
    id: number;
    name: string;
    languages: Language[];
    url: string; // Assurez-vous que le type est bien défini
}

interface CardReposProps {
    repos: Repo[]; // Utiliser Repo[] pour indiquer un tableau de dépôts
}

const CardRepos: React.FC<CardReposProps> = ({ repos }) => {
    return (
        <section className="section-card-repos">
            {repos.map((e) => (
                <article key={e.id}>
                    <p>nom : {e.name}</p>
                    <section>
                      <ul>
                                                {e.languages.map((lang) => (
                          <li key={lang.id}>{lang.label}</li>
                        ))}
                      </ul>

                        <a className="section-card-lien" key={e.url} href={e.url} target="_blank">accédez au repo</a>
                    </section>
                </article>
            ))}
        </section>
    );
};

export default CardRepos;
