// components/PokemonTable.tsx
import Image from 'next/image';
import Link from 'next/link'; // Importe o componente Link
import styles from './styles.module.css';

interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };

}

type PokemonTableProps = {
    pokemons: Pokemon[];
};

function PokemonTable({ pokemons }: PokemonTableProps) {
    if (pokemons.length === 0) {
        return (
            <div style={{ textAlign: 'center', fontSize: '1.25rem', marginTop: '2.5rem' }}>
                Nenhum Pokémon encontrado. Tente outra pesquisa!
            </div>
        );
    }

    const pokemonsToDisplay = pokemons.slice(0, 15);

    return (
        <div className={styles.gridContainer}>

            {pokemonsToDisplay.map((pokemon) => (
                <Link href={`/pokemon/${pokemon.name}`} key={pokemon.id}>
                    <div className={styles.pokemonCard}>
                        <Image
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            width={150}
                            height={150}
                        />
                        <h2 className={styles.pokemonName}>{pokemon.name}</h2>
                        <p className={styles.pokemonId}>#{pokemon.id}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default PokemonTable;