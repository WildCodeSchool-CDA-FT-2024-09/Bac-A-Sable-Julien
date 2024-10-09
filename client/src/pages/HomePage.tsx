import { AnimatedBackground } from "animated-backgrounds";
import { useQuery, gql } from "@apollo/client";
import { Repo } from "../@type/interface";
import SelectLang from "../components/SelectLang";
import CardRepos from "../components/CardRepos";

const GET_REPOS = gql`
    query GetRepoLang {
        GetAllRepo {
            id
            idGit
            url
            status {
                id
                label
            }
            name
        }
        GetAllLang {
            id
            label
        }
    }
`;

export default function HomePage() {
    const { loading, error, data, refetch } = useQuery(GET_REPOS);
    console.log("%c⧭", "color: #e57373", data);

    if (loading) return <h1>loading ...</h1>;
    if (error) return <p>Erreur: {error.message}</p>;

    return (
        <main>
            <AnimatedBackground animationName="rainbowWaves" />
            <h1>Les projets de Julien</h1>
            <SelectLang lang={data.GetAllLang} />
            <button onClick={refetch}>Recharger les dépôts</button>
            <section className="section-card-repos">
                {data.GetAllRepo.map((repo: Repo) => (
                    <CardRepos
                        key={repo.id}
                        repo={repo}
                    />
                ))}
            </section>
        </main>
    );
}
