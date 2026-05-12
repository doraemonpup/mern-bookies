import axios from 'axios'

export const toggleFavorite = async id => {
  const res = await axios.patch(
    `http://localhost:4000/books/${id}/favorite`
  )
  return res.data
}
