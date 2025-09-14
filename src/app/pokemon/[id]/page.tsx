import Image from 'next/image';
import { fetchPokemonByIdOrName } from '@/services/pokeapi';
import Link from 'next/link';
import styles from './styles.module.css';

interface PokemonDetail {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        slot: number;
        type: {
            name: string;
        };
    }[];
    height: number;
    weight: number;
    abilities: {
        ability: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

interface PokemonPageProps {
    params: {
        id: string;
    };
}

async function PokemonPage({ params }: PokemonPageProps) {
    const { id } = params;
    const pokemon: PokemonDetail = await fetchPokemonByIdOrName(id);

    if (!pokemon) {
        return (
            <div className={styles.notFoundContainer}>
                <h1 className={styles.notFoundHeading}>Pokémon não encontrado!</h1>
                <p className={styles.notFoundText}>
                    O Pokémon com o ID ou nome `{id}` não existe.
                </p>
                <Link href="/">
                    <button className={styles.backButton}>
                        Voltar para a Pokédex
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Link href="/" className={styles.backLink}>
                    &larr; Voltar
                </Link>
                <h1 className={styles.pokemonName}>
                    {pokemon.name} <span className={styles.pokemonId}>#{pokemon.id}</span>
                </h1>
                <Image
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    width={250}
                    height={250}
                    priority
                />
                <div className={styles.typesContainer}>
                    {pokemon.types.map(typeInfo => (
                        <span key={typeInfo.type.name} className={styles.typeTag}>
                            {typeInfo.type.name}
                        </span>
                    ))}
                </div>
                <div className={styles.infoContainer}>
                    <p>
                        <strong> **Altura:** {pokemon.height / 10} m </strong>
                    </p>
                    <p>
                        <strong> **Peso:** {pokemon.weight / 10} kg </strong>
                    </p>
                </div>
                <div className={styles.statsContainer}>
                    <h2 className={styles.statsHeading}>Estatísticas</h2>
                    <ul className={styles.statsList}>
                        {pokemon.stats.map(stat => (
                            <li key={stat.stat.name} className={styles.statItem}>
                                <span className={styles.statName}>{stat.stat.name}</span>
                                <span className={styles.statValue}>{stat.base_stat}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PokemonPage;