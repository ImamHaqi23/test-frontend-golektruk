import { useEffect, useState } from 'react';

interface DataPhoto {
  id: number;
  title: string;
}

export default function Soal3() {
  /**
   * ? 1. hilangkan semua error dan deskripsikan apa penyebab error.
   * ? 2. tampilkan data yang di panggil dari api tersebut...
   */

  return <SeachComponent />;
}

function SeachComponent() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<DataPhoto[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${search}`
      );

      const data: DataPhoto = await response.json();
      setResults([data]);
    }

    if (search) fetchData();
  }, [search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((result) => (
          <li style={{ color: 'white' }} key={result.id}>
            {result.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
