import { useState, useRef, useEffect } from 'react';

// Soal Nomor 4
// Buatlah sebuah website yang menampilkan daftar pokemon yang di load dengan infinite scroll

const BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemon = async (offset: number, limit: number) => {
  // fungsi untuk fetch data pokemon
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Failed to fetch Pokémon:', error);
    return [];
  }
};

const Soal4 = () => {
  const [pokemonList, setPokemonList] = useState<
    { name: string; url: string }[]
  >([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  //  Tambahkan state yang dibutuhkan
  // ...

  const theRef = useRef<HTMLDivElement | null>(null);

  // Fungsi untuk infinite scroll
  // ...
  const loadMorePokemon = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const newPokemon = await fetchPokemon(offset, 20); // Memuat 20 pokemon setiap kali
      if (newPokemon.length > 0) {
        setPokemonList((prevList) => [...prevList, ...newPokemon]);
        setOffset((prevOffset) => prevOffset + 20);
      }
      setIsLoading(false);
    }, 1000); // Delay selama 1 detik
  };

  const handleScroll = () => {
    if (theRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = theRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
        loadMorePokemon();
      }
    }
  };

  useEffect(() => {
    loadMorePokemon(); // Memuat pokemon pertama kali saat komponen dimount
  }, []);

  useEffect(() => {
    if (theRef.current) {
      theRef.current.addEventListener('scroll', handleScroll);
      return () => theRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading]);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <div
        ref={theRef}
        style={{
          flexGrow: 1,
          color: 'white',
          fontSize: '1.5em',
          textAlign: 'center',
          fontFamily: 'sans-serif',
          overflowY: 'auto',
          maxHeight: '100vh',
        }}
      >
        <h1
          style={{
            fontWeight: 'bolder',
          }}
        >
          Pokémon Infinite Scroll
        </h1>
        {/* list pokemon beserta loading */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pokemonList.map((pokemon, index) => (
            <li key={index} style={{ margin: '10px 0', fontSize: '1.2em' }}>
              {pokemon.name}
            </li>
          ))}
        </ul>
        {/* Loading pertama kali render */}
        {isLoading && pokemonList.length === 0 && <p>Loading...</p>}
        {/* Loading saat scroll untuk memuat lebih banyak data */}
        {isLoading && pokemonList.length > 0 && <p>Loading more Pokémon...</p>}
      </div>
    </div>
  );
};

export default Soal4;
