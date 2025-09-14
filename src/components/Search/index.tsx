import { useState } from 'react';
import styles from './styles.module.css';

type SearchBarProps = {
    onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
    const [pokemonQuery, setPokemonQuery] = useState('');

    const handleSearch = () => {
        if (pokemonQuery.trim() !== '') {
            onSearch(pokemonQuery.trim());
        }
    };

    return (
        <div className={styles.searchContainer}>

            <input
                type="text"
                value={pokemonQuery}
                onChange={(e) => setPokemonQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
                placeholder="Pesquisar por nome ou ID (ex: 1 ou pikachu)"
                className={styles.searchInput}
            />
            <button
                onClick={handleSearch}
                className={styles.searchButton}
            >
                Poké Pesquisar
            </button>
        </div>
    );
}
export default SearchBar;