import axios from 'axios';
// import { API_KEY } from './key';

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (query, currentPage) => {
  const { data } = await axios.get(
    `/?q=${query}&page=${currentPage}&key=29380342-a1a1f7eb1da321bb3ab834cbc&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data;
};

export default fetchImages;
