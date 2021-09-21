import React, {useState} from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const [searchTerm, setSearchTerm] = useState({
    search: ""
  });
  const thoughts = data?.thoughts || [];
  const handleChange = (event) => {
    const {name, value} = event.target
    setSearchTerm({
      ...searchTerm,[name]: value
    })
  }
  const onClickMe = async () => {
    console.log(searchTerm.search)

    try {
      const response = await fetch("https://icanhazdadjoke.com/search?term=" + searchTerm.search   , {
        headers: {
          Accept: "Application/Json"
        }
      })
      console.log(response)
      const data = await response.json()
      console.log(data) 
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            // <ThoughtList
            //   thoughts={thoughts}
            //   title="Some Feed for Thought(s)..."
            // />
            <div>
            <input name= "search" onChange= {handleChange} value= {searchTerm.search}/>
            <button onClick={onClickMe}> Click Me! </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
