import { _post, _get, _delete } from "../config/axiosConfig.js";

const SecteursTypesService = () => {
  const updateSecteurs = () => {
    return _post("/ttm/me/secteurs/{secteurId}");
  };

  const allTypes = () => {
    return _get("/ttm/allTypes");
  };
};

export default SecteursTypesService();
