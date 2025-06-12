/* eslint-disable react/prop-types */
import "./updateUser.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import UserService from "../../../services/userService";

const UpdateUser = ({ isOpen, onClose, userData, onUserUpdated }) => {
  const { updateUser } = UserService();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    description: "",
    photo: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstname: userData?.firstname || "",
        lastname: userData?.lastname || "",
        email: userData?.email || "",
        password: "",
        description: userData?.description || "",
        photo: userData?.photo || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateFields = {};
    for (const key in formData) {
      if (key === "password") {
        if (formData.password.trim() !== "") {
          updateFields.password = formData.password;
        }
      } else {
        updateFields[key] = formData[key];
      }
    }
    try {
      const response = await updateUser(userData.userId, updateFields);
      if (response && response.data) {
        onUserUpdated(response.data);
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    // <React.Fragment>
    //   <FontAwesomeIcon icon={faPenToSquare} onClick={handleClickOpen} />
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Modifier mes informations personnelles</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            name="firstname"
            label="Prénom"
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastname"
            name="lastname"
            label="Nom"
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="photo"
            name="photo"
            label="Photo de profil"
            value={formData.photo}
            onChange={handleChange}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button type="submit">Enregistrer</Button>
        </DialogActions>
      </form>
    </Dialog>
    //</React.Fragment>
  );
};

export default UpdateUser;
