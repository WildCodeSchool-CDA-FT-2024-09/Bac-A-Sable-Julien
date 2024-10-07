import type { Repo } from "../@type/interface";

interface CardReposProps {
    repo: Repo;
}

const CardRepos: React.FC<CardReposProps> = ({ repo }) => {

    return (
        <article>
            <p>{repo.name}</p>
            <section>
                <p>langage utilisé :</p>
                <ul>
                    {repo.languages.map((lang) => (
                        <li key={lang.id}>{lang.label}</li>
                    ))}
                </ul>
                <a
                    className={`section-card-lien ${
                        repo.status && repo.status.label === "Privé"
                            ? "desableLink"
                            : ""
                    }`}
                    href={repo.url}
                    target="_blank"
                >
                    Accédez au repo
                </a>
            </section>
        </article>
    );
};

export default CardRepos;
