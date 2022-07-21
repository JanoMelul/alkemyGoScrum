import {useEffect, useState} from 'react'

const useResize = () => {

  const [isPhone, setIsPhone] = useState(window.innerWidth < 900 ? true : false);

  const handleResize = () => {
    if(window.innerWidth < 900){
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  return { isPhone }
}

export default useResize;