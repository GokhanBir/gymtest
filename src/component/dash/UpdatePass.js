import React, { useState, useEffect } from 'react';
import "../../css/dstyle.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PswValid from '../PswValid';

const UpdatePass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [errors, setErrors] = useState(false)
  const [errorMsg, setErrormsg] = useState("");
  const [errorNum, setErrorNum] = useState(0);

  const [pswReq, setPswReq] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [passCheck, setPassCheck] = useState({
    capLetterCheck: false,
    numberCheck: false,
    pswLengthCheck: false,
    specialCharCheck: false

  })

  const navigate = useNavigate();

  const errorList = {
    "1": "Hatalı kullanıcı adı",
    "2": "Hatalı şifre",
    "3": "Lütfen şifre giriniz"
  }

  const updateSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      name, newpassword, oldpassword
    };
    const resp = await axios.post("http://stargymtest.infinityfreeapp.com/api/update_pass", loginData);
    const errorName = resp.data.error;
    if (isCheck) {
      setErrors(!errors);
      setErrorNum(errorName);

      switch (resp.data.error) {

        case 1:
          setErrormsg(errorList[errorName]);
          break;
        case 2:
          setErrormsg(errorList[errorName]);
          break;
        case 3:
          setErrormsg(errorList[errorName]);
          break;
      }
      if (resp.data.status === 200) {
        setIsLoading(true);
        setPswReq(false);
        setErrormsg(resp.data.msg);
        setTimeout(() => {
          navigate('/dashboard')
        }, 3000)
      }

    }
  }
    const handlelOnFocus = () => {
      setPswReq(true);
    }

    const handlelOnKeyUp = (e) => {
      const { value } = e.target;

      const capLetterCheck = /[A-Z]/.test(value);
      const numberCheck = /[0-9]/.test(value);
      const pswLengthCheck = value.length >= 8;
      const specialCharCheck = /[!@#$%^&*-/+]/.test(value);

      setPassCheck({
        capLetterCheck,
        numberCheck,
        pswLengthCheck,
        specialCharCheck
      })

    }

    useEffect(() => {
      setErrors(!errors);
    }, [errorNum])

    useEffect(() => {
      if (passCheck.capLetterCheck && passCheck.numberCheck && passCheck.pswLengthCheck && passCheck.specialCharCheck) {
        setIsCheck(true);
      }
    })

    return (
      <div className="update-pass">
        <span className="updateTitle">Şifre Güncelleme</span>
        <form className="updateForm" action="">
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            name="name"
            className="updateInput"
            placeholder="Enter your username..."
            onChange={(e) => setName(e.target.value)}
          />{errors ? (errorNum === 1 ? <span style={{ "color": "red", "paddingTop": "10px" }}>{errorMsg}</span> : "") : ""}
          <label>Eski Şifre</label>
          <input
            type="password"
            name='old_password'
            className="updateInput"
            placeholder="Enter your old password..."
            onChange={(e) => setOldpassword(e.target.value)}
          />{errors ? (errorNum === 2 ? <span style={{ "color": "red", "paddingTop": "10px" }}>{errorMsg}</span> : "") : ""}
          <label>Yeni Şifre</label>
          <input
            type="password"
            name='new_password'
            className="updateInput"
            value={newpassword}
            placeholder="Enter your new password..."
            onChange={(e) => setNewpassword(e.target.value)}
            onFocus={handlelOnFocus}
            //onBlur={handlelOnBlur}
            onKeyUp={handlelOnKeyUp}
            required
          />{errors ? (errorNum === 3 ? <span style={{ "color": "red", "paddingTop": "5px" }}>{errorMsg}</span> : null) : null}
          {pswReq ? <PswValid
            capLetterCase={passCheck.capLetterCheck ? "valid" : "invalid"}
            numberCase={passCheck.numberCheck ? "valid" : "invalid"}
            pswLengthCase={passCheck.pswLengthCheck ? "valid" : "invalid"}
            specialCharCase={passCheck.specialCharCheck ? "valid" : "invalid"}
          /> : null}
          {isLoading?<span style={{ "color": "green", "paddingTop": "12px" }}>{errorMsg}</span>:null}
          <button className="updateButton" type="submit" onClick={updateSubmit}>
            Güncelle
          </button>
        </form>

      </div>
    );
  }

  export default UpdatePass;
