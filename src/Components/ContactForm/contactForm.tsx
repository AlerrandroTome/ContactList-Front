import { Alert, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import styles from "./contactForm.module.scss";
import { AvatarContainer } from "../AvatarContainer/avatarContainer";
import { api } from "../../apiSettings";
import { useNavigate, useParams } from "react-router-dom";
import { AuthService } from "../../Services/authService";

interface IContactForm {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
  phoneNumberIsWhatsapp: boolean;
  userId: string;
}

interface IUser {
  name: string;
  id: string;
}

export function ContactForm() {
  const { id } = useParams();
  const [anErrorHasOccurred, setAnErrorHasOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contactForm, setContactForm] = useState<IContactForm>({
    email: "",
    id: "",
    name: "",
    phoneNumber: "",
    whatsappNumber: "",
    userId: "",
  } as IContactForm);
  const [loggedUser, setLoggedUser] = useState({} as IUser);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  async function Save() {
    setAnErrorHasOccurred(false);
    setErrorMessage("");

    if (isEdit) {
      let put = JSON.stringify(contactForm);

      await api
        .put("/manageContact", put)
        .then(({ data }) => {
          navigate("/");
        })
        .catch((error) => {
          setAnErrorHasOccurred(true);
          setErrorMessage(error.response.data.errorMessage);
        });
    } else {
      var post = JSON.stringify({
        ...contactForm,
        userId: authService.getCurrentUser().id,
      });

      await api
        .post("/manageContact", post)
        .then(({ data }) => {
          navigate("/");
        })
        .catch((error) => {
          setAnErrorHasOccurred(true);
          setErrorMessage(error.response.data.errorMessage);
        });
    }
  }

  async function getContact(id: string) {
    debugger;
    await api
      .get(`/manageContact?$filter=Id eq ${id}`)
      .then(({ data }) => {
        setContactForm(data[0]);
      })
      .catch((error) => {
        setAnErrorHasOccurred(true);
        setErrorMessage("Contact was not found");
      });
  }

  useEffect(() => {
    if (!authService.isUserLogged()) {
      navigate("/login");
    } else {
      let user = authService.getCurrentUser();
      let isEditTemp = id ? true : false;
      setLoggedUser({ id: user.id, name: user.name });
      setIsEdit(isEditTemp);
      if (isEditTemp) {
        getContact(id as string);
      }
    }
  }, []);

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
      <AvatarContainer loggedUserName={loggedUser.name} />
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
            required
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
                checked={contactForm.phoneNumberIsWhatsapp}
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
        <button type="button" className={styles.primary_button} onClick={Save}>
          Save
        </button>
        <button
          type="button"
          className={styles.secondary_button}
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
