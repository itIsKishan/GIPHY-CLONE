import React, { useState, useEffect } from 'react'
import axios from 'axios'

const GiphyComponent = () =>{

    const [ data, setData ] = useState([])
    const [ search, setSearch ] = useState('')

    // handle input change
    const handleSearchChange = (e) =>{
        setSearch(e.target.value)
    }

    // filter data
    const filterData = data.filter((gif) =>{
        return gif.title.toLowerCase().includes(search)
    })

    // fetch data
    const fetchData = async() =>{
        let gif
        try {

            gif = await axios.get('http://api.giphy.com/v1/gifs/trending', {
                params : {
                    api_key : process.env.REACT_APP_API_KEY
                }
            })

            console.log('response data', gif.data.data)
            setData(gif.data.data)

        } catch (err) {
            console.log('error',err)
        }
    }

    useEffect(() =>{
        fetchData()
    },[])

    return(
        <div>
            <input type = 'search' value = { search } placeholder='Search GIF' onChange={ handleSearchChange } />
            
            <div>
                {
                    filterData.length === 0?(
                        <div>
                            <h1>CAN'T FIND THE { search } GIF....</h1>
                        </div>
                    ):(
                        filterData.map((gif) =>{
                        return(
                            <img key={gif.id} src= {gif.images.original.url} alt='gifs'/>
                        )
                    })
                    )
                }
            </div>
        </div>
    )
}

export default GiphyComponent