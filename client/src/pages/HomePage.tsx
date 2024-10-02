import CardRepos from "../components/CardRepos";
import { useLoaderData } from "react-router-dom";

export interface Repo {
  id: number;
  name: string;
  languages: Language[];
  url: string; // Assurez-vous que le type est bien défini
}

export interface Language {
  id: number;
  label: string;
}

export default function HomePage() {

  const repos = useLoaderData() as Repo[];
  console.log('%c⧭', 'color: #ff0000',repos );

    return (
        <main>
            <h1>Les {repos.length} projets de Julien </h1>
            <CardRepos repos={repos}/>
        </main>
    );
}
