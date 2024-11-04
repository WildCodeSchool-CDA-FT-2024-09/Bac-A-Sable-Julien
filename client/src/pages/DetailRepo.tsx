import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_REPOS_ID = gql`
    query LightrepoById($lightrepoByIdId: ID!) {
        lightrepoById(id: $lightrepoByIdId) {
            id
            isFavorite
            name
            url
        }
    }
`;

export default function DetailRepo() {
    const { id } = useParams();
    const { loading, error, data, refetch } = useQuery(GET_REPOS_ID, {
        variables: { lightrepoByIdId: id },
    });

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error.message}</p>;

    return (
        <>
            <h1>{data.lightrepoById.name}</h1>
            <p>URL: {data.lightrepoById.url}</p>
            <p>Favori: {data.lightrepoById.isFavorite ? "Oui" : "Non"}</p>
            <button onClick={refetch}>Recharge le dépôt</button>
        </>
    );
}
