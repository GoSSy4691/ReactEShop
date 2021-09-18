import s from "./login.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  authByPhone,
  authPhoneCode,
  authByToken,
} from "../../files/API/api.js";
import vkIco from "../../files/img/token/vk.png";
import yandexIco from "../../files/img/token/ya.png";
import googleIco from "../../files/img/token/gog.png";
import InputPhone from "./InputPhone.jsx";
import InputCode from "./InputCode.jsx";

export default function ByPhone(props) {
  const [phone, setPhone] = useState("8(___)___-__-__");
  const [code, setCode] = useState("____");
  const [isPhoneWrong, setPhoneWrong] = useState(false);
  const [isCodeWrong, setCodeWrong] = useState(false);
  const [inputType, setInputType] = useState("Phone");
  const dispatch = useDispatch();

  function sendPhoneNumber() {
    if (phone.indexOf("_") !== -1) {
      setPhoneWrong(true);
      dispatch({ type: "ERROR_MESSAGE", payload: "Wrong phone number" });
      return null;
    }
    let preparedPhone = phone.split("").filter((e) => !isNaN(Number(e)));
    preparedPhone = "+7" + preparedPhone.join("").slice(1);
    authByPhone(preparedPhone)
      .then((data) => {
        setInputType("Code");
        dispatch({ type: "LOGIN_CONFIRM", payload: data });
        dispatch({ type: "SUCCESS_MESSAGE", payload: "Code sent" });
      })
      .catch((error) => {
        let answer = error.response.status + " " + error.response.statusText;
        dispatch({ type: "ERROR_MESSAGE", payload: answer });
      });
  }

  function sendCode() {
    if (code.indexOf("_") !== -1) {
      setCodeWrong(true);
      dispatch({ type: "ERROR_MESSAGE", payload: "Wrong code" });
      return null;
    }
    let preparedPhone = phone.split("").filter((e) => !isNaN(Number(e)));
    preparedPhone = "+7" + preparedPhone.join("").slice(1);
    authPhoneCode(preparedPhone, code)
      .then((data) => {
        dispatch({ type: "LOGIN_CONFIRM", payload: data });
        dispatch({ type: "SUCCESS_MESSAGE", payload: "code confirmed" });
      })
      .catch((error) => {
        let answer = error.response.status + " " + error.response.statusText;
        setCodeWrong(true);
        dispatch({ type: "ERROR_MESSAGE", payload: answer });
      });
  }

  function getAnswerToken(method) {
    dispatch({ type: "SET_METHOD_TOKEN", payload: method });
    authByToken(method);
    props.setLoginForm("Wait");
  }

  return (
    <div className={s.afterName}>
      <div className={s.flexbox}>
        <div className={s.numberOrCodeBox}>
          {inputType === "Phone" ? (
            <InputPhone
              phone={phone}
              setPhone={setPhone}
              isPhoneWrong={isPhoneWrong}
              setPhoneWrong={setPhoneWrong}
              sendPhoneNumber={sendPhoneNumber}
            />
          ) : (
            <InputCode
              code={code}
              setCode={setCode}
              isCodeWrong={isCodeWrong}
              setCodeWrong={setCodeWrong}
              sendCode={sendCode}
            />
          )}
        </div>
        <button
          className={s.loginBtn}
          onClick={inputType === "Phone" ? sendPhoneNumber : sendCode}
        >
          Next
        </button>
      </div>
      <button
        className={s.loginByPassLink}
        onClick={() => props.setLoginForm("byPass")}
      >
        Sign in by password
      </button>
      <div className={s.loginByToken}>Sign in with:</div>
      <div className={s.tokenImg}>
        <div>
          <img src={vkIco} alt={"Vk"} onClick={() => getAnswerToken("vk")} />
        </div>
        <div>
          <img
            src={yandexIco}
            alt={"Yandex"}
            onClick={() => getAnswerToken("yandex")}
          />
        </div>
        <div>
          <img
            src={googleIco}
            alt={"Google"}
            onClick={() => getAnswerToken("google")}
          />
        </div>
      </div>
    </div>
  );
}
