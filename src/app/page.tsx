'use client'

import { useState, useEffect } from 'react';
import {
  fetchPokemonList,
  fetchPokemonByIdOrName,
} from '../services/pokeapi';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/Search';
import Footer from '@/components/Footer';
import PokemonTable from '@/components/Poketable';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [loading, setLoading] = useState(true);

  const [isSearching, setIsSearching] = useState(false);


  useEffect(() => {
    const getInitialPokemons = async () => {
      setLoading(true);
      try {
        const data = await fetchPokemonList(151);
        setPokemons(data);

      } catch (error) {
        console.error('Erro ao buscar a lista inicial:', error);

      } finally {
        setLoading(false);
      }
    };
    getInitialPokemons();
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const data = await fetchPokemonByIdOrName(query.toLowerCase());
      if (data) {

        setPokemons([data]);
        setIsSearching(true);

      } else {
        setPokemons([]);
        setIsSearching(true);

      }
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = async () => {
    setIsSearching(false);
    setLoading(true);
    try {
      const data = await fetchPokemonList(151);
      setPokemons(data);
    } catch (error) {
      console.error('Erro ao buscar a lista inicial:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#394a69ff' }}>
      <Navbar />
      <main className="container" style={{ flexGrow: 1 }}>
        <SearchBar onSearch={handleSearch} />
        {isSearching && (
          <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1.5rem' }}>
            <button
              onClick={handleBack}
              style={{
                padding: '1rem 1.5rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              &larr; Voltar
            </button>
          </div>
        )}
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '1.25rem', marginTop: '2.5rem' }}>Carregando Pokémons...</p>
        ) : (
          <PokemonTable pokemons={pokemons} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;