import { AnimatedBackground } from "animated-backgrounds";
import { useQuery, gql } from "@apollo/client";
import { Repo } from "../@type/interface";
import SelectLang from "../components/SelectLang";
import CardRepos from "../components/CardRepos";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectLang, setSelectLang] = useState<string | undefined>("");

        // Mettre à jour l'URL lorsque la langue sélectionnée change
        useEffect(() => {
            if (selectLang) {
                setSearchParams({ filter: selectLang });
            }
        }, [selectLang, setSearchParams]);
    
        // Lire la langue depuis les paramètres de l'URL au chargement
        useEffect(() => {
            const filter = searchParams.get("filter");
            if (filter) {
                setSelectLang(filter);
            }
        }, [searchParams]);

    const { loading, error, data, refetch } = useQuery(GET_REPOS, {
        variables: { filter: selectLang },
    });

    if (loading) return <h1>loading ...</h1>;
    if (error) return <p>Erreur: {error.message}</p>;

    return (
        <main>
            <AnimatedBackground animationName="rainbowWaves" />
            <h1>Les projets de Julien</h1>
            <SelectLang
                lang={data.GetAllLang}
                setSelectLang={setSelectLang}
            />
            <button
                onClick={() => {
                    refetch()
                        .then(({ data }) => {
                            console.log("%c⧭", "color: #ffcc00", data);
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
