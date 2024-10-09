import { AnimatedBackground } from "animated-backgrounds";
import { useQuery, gql } from "@apollo/client";
import { Repo } from "../@type/interface";
import SelectLang from "../components/SelectLang";
import CardRepos from "../components/CardRepos";
import { useState } from "react";

const GET_REPOS = gql`
    query GetAllReposFilter($filter: String) {
        getAllReposFilter(filter: $filter) {
            id
            idGit
            isFavorite
            name
            url
            status {
                label
            }
            languages {
                label
            }
        }
        GetAllLang {
            id
            label
        }
    }
`;

export default function HomePage() {

    const[selectLang, setSelectLang] = useState<string | undefined>('');
    console.log('%c⧭', 'color: #99adcc', selectLang);

    const { loading, error, data, refetch } = useQuery(GET_REPOS, {
        variables: { filter: selectLang }, 
    });
    console.log("%c⧭", "color: #e57373", data);

    if (loading) return <h1>loading ...</h1>;
    if (error) return <p>Erreur: {error.message}</p>;

    return (
        <main>
            <AnimatedBackground animationName="rainbowWaves" />
            <h1>Les projets de Julien</h1>
            <SelectLang lang={data.GetAllLang} setSelectLang={setSelectLang} />
            <button
                onClick={() => {
                    refetch()
                        .then(({ data }) => {
                            console.log("%c⧭", "color: #ffcc00", data); // Faites attention à ce que vous affichez ici
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }}
            >
                Recharger les dépôts
            </button>{" "}
            <section className="section-card-repos">
                {data.getAllReposFilter.map((repo: Repo) => (
                    <CardRepos
                        key={repo.id}
                        repo={repo}
                    />
                ))}
            </section>
        </main>
    );
}
