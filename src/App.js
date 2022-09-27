import React from "react";
import "./App.css";

function App() {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = React.useState({
    email: false,
    password: false,
  });
  const domainName = values.email.split(".")[1];
  const passwordSchema = [
    values.email.includes("@"),
    domainName ? values.email.split(".")[1].length > 1 : false,
    values.password.length > 5,
  ];
  const errorMessages = [
    "E-mail must contain @",
    "E-mail must contain a domain (.com etc)",
    "Password must have a length of minimum 6 characters",
  ];
  React.useEffect(() => {
    if (values.email.split(".")[1]) {
      setIsValid({
        ...isValid,
        email:
          values.email.includes("@") && values.email.split(".")[1].length > 1,
      });
    }
  }, [values.email]);
  React.useEffect(() => {
    setIsValid({
      ...isValid,
      password: values.password.length >= 6,
    });
  }, [values.password]);
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <span style={{ marginRight: "10px" }}>e-mail</span>
        <input
          onChange={(event) =>
            setValues({
              ...values,
              email: event.target.value,
            })
          }
        />
      </div>
      <div style={{ display: "flex" }}>
        <span style={{ marginRight: "10px" }}>password</span>
        <input
          type={"password"}
          onChange={(event) =>
            setValues({
              ...values,
              password: event.target.value,
            })
          }
        />
      </div>
      <button disabled={!(isValid.email && isValid.password)}>Submit</button>
      {errorMessages.map((errorMessage, index) => {
        console.log(index, errorMessage);
        return (
          <div>
            {" "}
            <span
              style={{
                color: passwordSchema[index] ? "green" : "red",
              }}
            >
              {errorMessage}
            </span>
          </div>
        );
      })}
    </div>
  );
}
export default App;
