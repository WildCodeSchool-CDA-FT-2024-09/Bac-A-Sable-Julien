import { Link } from "react-router-dom";
import type { Repo } from "../@type/interface";

interface CardReposProps {
    repo: Repo;
}
// name={repo.name}
// url={repo.url}
// id={repo.id}
// isFavorite={repo.isFavorite}

const CardRepos: React.FC<CardReposProps> = ({ repo }) => {
    return (
        <Link to={`/detail/${repo.id}`} className ="card">
            <p>{repo.name}</p>
            <section>
                <p>langage utilisé :</p>
                <ul>
                    <li>bientôt disponible</li>
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
        </Link>
    );
};

export default CardRepos;
