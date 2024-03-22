import { useLoadUserQuery } from '../redux/features/api/apiSlice'
import React,{FC} from 'react'
import Loader from './components/Loader/Loader'


type Props = {}

const Custom:React.FC<{children: React.ReactNode}> = ({children})=>{
    const {isLoading} = useLoadUserQuery({})
    return (
      <>
      {
        isLoading ? <Loader /> : <>{children} </>
      }
      </>
    )
  }

export default Custom