import React from 'react'
// import CSSModules from 'react-css-modules';
import './NotFoundBlock.scss'
export const NotFoundBlock: React.FC = () => {
  return (
	 <div className="notfound" >
		<h1 className='notfound__title'>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
		<p className="notfound__description">
        К сожалени данная страница отсутствует в нашем интернет-магазине
      </p>
	 </div>
  )
}
