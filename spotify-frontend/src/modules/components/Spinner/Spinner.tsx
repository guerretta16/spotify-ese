import Lottie from 'lottie-react'
import spinnerAnimation from '../../../assets/lottie/spinner.json'

const Spinner = () => {

    const style = {
        width: '200px'
    }

  return (
    <div className='flex justify-center items-center h-100'>
        <Lottie animationData={spinnerAnimation} loop style={style}/>
    </div>
  )
}

export default Spinner