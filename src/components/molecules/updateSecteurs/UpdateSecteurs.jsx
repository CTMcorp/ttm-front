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
          setSelectedSecteurs(userData.secteursActivites);
        } else {
          setSelectedSecteurs([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (isOpen) {
      fetchAllSecteurs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, userData]);

  const handleToggle = (secteur) => {
    setSelectedSecteurs((prev) => {
      if (prev === null) {
        [secteur];
      } else {
        [...prev, secteur];
      }
    });
  };

  const handleSubmit = async () => {
    const secteursActuels = userData?.secteursActivites || [];

    const addSecteurs = selectedSecteurs.filter(
      (secteur) => !secteursActuels.includes(secteur)
    );

    const deleteSecteurs = secteursActuels.filter(
      (secteur) => !selectedSecteurs.includes(secteur)
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
        secteursActivites: selectedSecteurs,
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
                  checked={Array.isArray(selectedSecteurs)}
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
