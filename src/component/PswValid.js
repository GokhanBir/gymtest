import React from 'react'
import "../css/dstyle.scss";

const PswValid = ({capLetterCase,numberCase,pswLengthCase,specialCharCase}) => {
  return (
    <div className="psw-valid">
        <p className={capLetterCase}>Büyük karakter</p>
        <p className={numberCase}>Rakam</p>
        <p className={specialCharCase}>Özel karakter</p>
        <p className={pswLengthCase}>Uzunluk</p>
    </div>
  )
}

export default PswValid;
