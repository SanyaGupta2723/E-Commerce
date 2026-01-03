import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const ScrollToTop = () => {
  const { state } = useAppContext();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [state.currentPage]); // page change detect

  return null;
};

export default ScrollToTop;
