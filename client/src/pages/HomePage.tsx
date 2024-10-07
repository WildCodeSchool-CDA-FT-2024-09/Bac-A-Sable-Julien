// import { useState } from "react";
import { AnimatedBackground } from "animated-backgrounds";
import axios from "axios";
import CardRepos from "../components/CardRepos";
import SelectLang from "../components/SelectLang";
import type { Language } from "../@type/interface";

import { useLoaderData } from "react-router-dom";
import { useState, useEffect, Key } from "react";

export default function HomePage() {
    const [repos, setRepos] = useState<Repo>([]);
    const lang = useLoaderData() as Language[];
    const [selectedLang, setSelectedLang] = useState<number>();
    console.log("%c⧭", "color: #807160", selectedLang);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/repos", {
                    params: {
                        languages: selectedLang, // Le langage que tu souhaites filtrer
                    },
                });
    
                setRepos(response.data); // Affecter les dépôts récupérés
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des dépôts :",
                    error
                );
            }
        };
    
        fetchData(); // Exécute la fonction fetchData
    }, [selectedLang]); // Dépendance sur selectedLang


    return (
        <main>
            <AnimatedBackground animationName="rainbowWaves" />
            <h1>Les projets de Julien </h1>
            <SelectLang
                lang={lang}
                setSelectedLang={setSelectedLang}
            />
            <section className="section-card-repos">
                {repos.map((repo) => (
                    <CardRepos
                        selectedLang={selectedLang}
                        key={repo.id}
                        repo={repo}
                    />
                ))}
            </section>
        </main>
    );
}
