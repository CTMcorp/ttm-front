import { _get, _delete, _put } from "../config/axiosConfig.js";

const SecteursTypesService = () => {
  const addSecteurToUser = (userId, secteurId) => {
    return _put(`/ttm/${userId}/secteur/${secteurId}`);
  };

  const deleteSecteurFromUser = (userId, secteurId) => {
    return _delete(`/ttm/${userId}/secteur/${secteurId}`);
  };

  const getUserSecteurs = (userId) => {
    return _get(`/ttm/${userId}/secteurs`);
  };

  const getAllSecteurs = () => {
    return _get("/ttm/allSecteurs");
  };

  const addTypeToUser = (userId, typeId) => {
    return _put(`/ttm/${userId}/type/${typeId}`);
  };

  const deleteTypeFromUser = (userId, typeId) => {
    return _delete(`/ttm/${userId}/type/${typeId}`);
  };

  const getUserTypes = (userId) => {
    return _get(`/ttm/${userId}/types`);
  };

  const getAllTypes = () => {
    return _get("/ttm/allTypes");
  };

  return {
    addSecteurToUser,
    deleteSecteurFromUser,
    getUserSecteurs,
    getAllSecteurs,
    addTypeToUser,
    deleteTypeFromUser,
    getUserTypes,
    getAllTypes,
  };
};

export default SecteursTypesService;
