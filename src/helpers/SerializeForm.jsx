import React from "react";

export const SerializeForm = (form) => {
  const formData = new FormData(form);

  const completeObj = {};

  /* Dos formas de recorrer */

  /*  for (let [name, value] of formData) {
        console.log(name, value)
    } */
  formData.forEach((value, name) => {
    completeObj[name] = value;
  });

  return completeObj;
};
