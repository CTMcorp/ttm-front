import React from "react";
import { useNavigate } from "react-router";
import "./dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Bienvenue sur votre espace administrateur</h1>
      <div className="dashboard">
        <div className="gestion-users">
          <header>
            <h2>Gestion des utilisateurs</h2>
          </header>
          <button className="admin-btn" onClick={() => navigate("/auth/register")}>
            Créer un utilisateur
          </button>
          <button className="admin-btn">Supprimer un utilisateur</button>
          <button className="admin-btn">Voir tous les utilisateurs</button>
        </div>
        <div className="import-doc">
          <header>
            <h2>Importer des documents</h2>
          </header>
          <button className="admin-btn">Importer documents</button>
          <button className="admin-btn">Supprimer documents</button>
        </div>
        <div className="meetings">
          <header>
            <h2>Voir les rendez-vous</h2></header>
            <button className="admin-btn">Rendez-vous à venir</button>
            <button className="admin-btn">Rendez-vous passés</button>
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
