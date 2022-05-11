import { Alert, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import styles from "./contactForm.module.scss";
import { AvatarContainer } from "../AvatarContainer/avatarContainer";

interface IContactForm {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
  phoneNumberIsWhatsapp: boolean;
  userId: string;
}

export function ContactForm() {
  const [anErrorHasOccurred, setAnErrorHasOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contactForm, setContactForm] = useState({} as IContactForm);
  const [loggedUserName, setLoggedUserName] = useState("Alerrandro Tomé");
  const [isEdit, setIsEdit] = useState(false);

  function save() {
    console.log(contactForm);
  }

  useEffect(() => {
    if (contactForm.phoneNumberIsWhatsapp) {
      setContactForm({
        ...contactForm,
        whatsappNumber: contactForm.phoneNumber,
      });
    }
  }, [contactForm.phoneNumberIsWhatsapp]);

  return (
    <>
      <AvatarContainer loggedUserName={loggedUserName} />
      <div className={styles.container}>
        {anErrorHasOccurred ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : null}
        <div className={styles.top}>
          <PersonAddIcon className={styles.contact_icon} />
          <h1>{isEdit ? "Edit" : "Create"}</h1>
        </div>
        <div className={styles.form_group}>
          <TextField
            label="Name"
            value={contactForm.name}
            onChange={(input) =>
              setContactForm({ ...contactForm, name: input.target.value })
            }
            className={styles.input_text}
            error={anErrorHasOccurred}
            variant="standard"
            name="name"
            id="name"
          />
        </div>
        <div className={styles.form_group}>
          <TextField
            label="Email"
            value={contactForm.email}
            onChange={(input) =>
              setContactForm({ ...contactForm, email: input.target.value })
            }
            className={styles.input_text}
            error={anErrorHasOccurred}
            variant="standard"
            name="email"
            id="email"
          />
        </div>
        <div className={styles.form_group}>
          <TextField
            label="Phone Number"
            value={contactForm.phoneNumber}
            onChange={(input) =>
              setContactForm({
                ...contactForm,
                phoneNumber: input.target.value,
              })
            }
            className={styles.input_text}
            error={anErrorHasOccurred}
            inputProps={{
              type: "number",
            }}
            variant="standard"
            name="phoneNumber"
            id="phoneNumber"
          />
        </div>
        <div className={styles.form_group}>
          <FormControlLabel
            control={
              <Switch
                value={contactForm.phoneNumberIsWhatsapp}
                onChange={(input) =>
                  setContactForm({
                    ...contactForm,
                    phoneNumberIsWhatsapp: input.target.checked,
                  })
                }
              />
            }
            label="Phone Number is Whatsapp?"
          />
        </div>
        <div className={styles.form_group}>
          <TextField
            label="Whatsapp Number"
            value={contactForm.whatsappNumber}
            disabled={contactForm.phoneNumberIsWhatsapp}
            onChange={(input) =>
              setContactForm({
                ...contactForm,
                whatsappNumber: input.target.value,
              })
            }
            className={styles.input_text}
            error={anErrorHasOccurred}
            inputProps={{
              type: "number",
            }}
            variant="standard"
            name="whatsappNumber"
            id="whatsappNumber"
          />
        </div>
        <button type="button" className={styles.primary_button} onClick={save}>
          Save
        </button>
      </div>
    </>
  );
}
