import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="error-page">
        <button className="error-page__button" onClick={goBack}>
          Go back
        </button>
      </div>
    </>
  );
}
export default ErrorPage;