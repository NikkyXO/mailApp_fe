import React, { useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce';

const Search = () => {
      const fruits = [
    'Banana',
    'Apple',
    'Apricot',
    'Avocado',
    'Grapefruit',
    'Lemon',
    'Lime',
    'Orange', 
    'Strawberry',
    'mango',
    'Grape',
    'pineapple',
    'blueberry',
    'kiwi',
    'watermelon'
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fruitsData, setFruitsData ] = useState(fruits);
  const [searchTerm, setSearchTerm] = useState('');
  const { debouncedValue } = useDebounce(searchTerm, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);

  }
  const fiteredFruits = fruitsData.filter((fruit) => fruit.toLowerCase().startsWith(searchTerm.toLowerCase()));
    return (
    <div>
    <input type='text' placeholder='search here...' onChange={handleInputChange}/>
    <p>{debouncedValue}</p>
    {fiteredFruits.map((fruit) => (
      <div key={fruit}>{fruit}</div>
    ))}
    </div>
  )
}

export default Search


