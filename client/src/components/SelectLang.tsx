import type { Language } from "../@type/interface";

interface SelectLangProps {
    setSelectLang: React.Dispatch<React.SetStateAction<string | undefined>>; // Ou le type que tu souhaites
    lang: Language[];
}

const SelectLang: React.FC<SelectLangProps> = ({ lang, setSelectLang }) => {
    return (
        <>
            <select
                onChange={(e) => setSelectLang(e.target.value)}
                className="home-page-select"
            >
                <option value="">-- Sélectionnez un langage --</option>
                {lang.map((language) => (
                    <option
                        key={language.id}
                        value={language.label}
                    >
                        {language.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default SelectLang;
