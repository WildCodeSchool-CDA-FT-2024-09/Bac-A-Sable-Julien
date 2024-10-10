import { useState } from "react";
import { Link } from "react-router-dom";
import type { Repo } from "../@type/interface";

interface CardReposProps {
    repo: Repo;
}

const CardRepos: React.FC<CardReposProps> = ({
    repo,
}) => {
    const [isFavorite, setIsfavorite] = useState<boolean>(false);

    return (
        <section
            
            className="card"
        >
            <p>{repo.name}</p>
            <section>
                <p>langage utilisé :</p>
                <ul>
                    <li>bientôt disponible</li>
                </ul>
                <section className="link-img-like">
                    <Link
                        className={`section-card-lien ${
                            repo.status && repo.status.label === "Privé"
                                ? "desableLink"
                                : ""
                        }`}
                        to={`/detail/${repo.id}`}
                    >
                        détail du repo
                    </Link>
                    <img onClick={()=>setIsfavorite(!isFavorite)} src={isFavorite ? "/heart_like.png":"/heart_dislike.png"} alt="" className="favorite" />
                </section>
            </section>
        </section>
    );
};

export default CardRepos;
