/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SecteursTypesService from "../../../services/secteursTypesService";
import "./updateSecteurs.scss";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const UpdateSecteurs = ({ isOpen, onClose, userData, onUserUpdated }) => {
  const { addSecteurToUser, deleteSecteurFromUser, getAllSecteurs } =
    SecteursTypesService();

  const [allSecteurs, setAllSecteurs] = useState([]);
  const [selectedSecteurs, setSelectedSecteurs] = useState([]);

  useEffect(() => {
    const fetchAllSecteurs = async () => {
      try {
        const response = await getAllSecteurs();
        if (response?.data) {
          setAllSecteurs(response.data);
        }

        if (userData?.secteursActivites) {
          setSelectedSecteurs(userData.secteursActivites.map((s) => s.name));
        } else {
          setSelectedSecteurs([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des secteurs :", error);
      }
    };

    if (isOpen) {
      fetchAllSecteurs();
    }
  }, [isOpen, userData]);

  const handleToggle = (secteurName) => {
    setSelectedSecteurs(
      (prev) =>
        prev.includes(secteurName)
          ? prev.filter((s) => s !== secteurName) // décocher
          : [...prev, secteurName] // cocher
    );
  };

  const handleSubmit = async () => {
    const currentSecteurs =
      userData?.secteursActivites.map((s) => s.name) || [];

    const addSecteurs = selectedSecteurs.filter(
      (s) => !currentSecteurs.includes(s)
    );
    const deleteSecteurs = currentSecteurs.filter(
      (s) => !selectedSecteurs.includes(s)
    );

    try {
      for (const secteur of addSecteurs) {
        await addSecteurToUser(userData.userId, secteur);
      }

      for (const secteur of deleteSecteurs) {
        await deleteSecteurFromUser(userData.userId, secteur);
      }

      const updatedUser = {
        ...userData,
        secteursActivites: selectedSecteurs.map((name) => ({ name })),
      };

      onUserUpdated(updatedUser);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour des secteurs :", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Modifier vos secteurs d&apos;activités</DialogTitle>
      <DialogContent>
        <FormGroup>
          {allSecteurs.map((secteur) => (
            <FormControlLabel
              key={secteur}
              control={
                <Checkbox
                  checked={selectedSecteurs.includes(secteur)}
                  onChange={() => handleToggle(secteur)}
                />
              }
              label={secteur.toLowerCase().replaceAll("_", " ")}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateSecteurs;
