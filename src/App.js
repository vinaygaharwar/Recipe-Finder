import './App.css';
import {useEffect,useState,useRef} from 'react'
function App() {
  const API_ID='34c5e73e';
  const API_KEY='624ff3dbb2f2ed9ce1c71c0e79aefe1d';
  const [ingredientList,updateIngredientList]=useState([]);
  const [loading,setLoading]=useState(false);
  const inputRef=useRef(null);
  const search=()=>{
    console.log("input ref",inputRef)
    searchForRecipe(inputRef.current.value);
    inputRef.current.value="";
  }
  const searchForRecipe=query=>{
    setLoading(true);
    let url=`search?q=${query}
    &app_id=${API_ID}&app_key=${API_KEY}`
   
    fetch(url,{mode:"no-cors"})
    .then(response=>{
      return response.json()
    })
    .then(res=>
      {console.log(res.hits);
      updateIngredientList(res.hits)
    setLoading(false)
  }
      )
    .catch(er=>{console.log("error",er)
      setLoading(false)
    })
  }
  useEffect(()=>{
    searchForRecipe()
  },[]);
  
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='InputWrapper'>
          <input ref={inputRef} placeholder='Search For Recipe'/>
          <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        <div className='Wrapper'>
          {ingredientList.map(item=>
            {
              return(
                <div key={item.recipe.label} className='Ingredient'>
                  <span>{item.recipe.label}</span>
                  <img src={item.recipe.image} alt="recipe"/>
                  <div className='Steps'>
                  {item.recipe.ingredientLines.map((step,index)=>
                    {
                      return <p key={index}>{step}</p>
                    })}
                    </div>
                </div>
              )
            })}
        </div>
      </header>
    </div>
  );
}

export default App;
