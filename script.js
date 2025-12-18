/*************************************************
 *  AU CHARGEMENT DE LA PAGE
 *************************************************/
window.onload = function () {

    // Enregistrement du Service Worker pour PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker enregistré:', registration);
            })
            .catch(error => {
                console.log('Erreur Service Worker:', error);
            });
    }

    // Charger anciens index
    const oldC1 = localStorage.getItem("c1_old");
    const oldC1p = localStorage.getItem("c1p_old");

    if (oldC1 !== null) {
        document.getElementById("c1_old").value = oldC1;
    }

    if (oldC1p !== null) {
        document.getElementById("c1p_old").value = oldC1p;
    }

    // Charger l'historique
    chargerHistorique();
};


/*************************************************
 *  SAUVEGARDE MANUELLE DES ANCIENS INDEX
 *************************************************/
function sauvegarderAnciensIndex() {
    const c1_old = document.getElementById("c1_old").value;
    const c1p_old = document.getElementById("c1p_old").value;

    if (!c1_old || !c1p_old) {
        alert("Veuillez remplir les deux index anciens.");
        return;
    }

    localStorage.setItem("c1_old", c1_old);
    localStorage.setItem("c1p_old", c1p_old);

    alert("Index anciens sauvegardés avec succès !");
}


/*************************************************
 *  CALCUL PRINCIPAL
 *************************************************/
function calculer() {

    // Récupération des valeurs
    const c1_old = Number(document.getElementById("c1_old").value);
    const c1_new = Number(document.getElementById("c1_new").value);

    const c1p_old = Number(document.getElementById("c1p_old").value);
    const c1p_new = Number(document.getElementById("c1p_new").value);

    const facture = Number(document.getElementById("facture").value);

    // Vérification des champs
    if (
        isNaN(c1_old) || isNaN(c1_new) ||
        isNaN(c1p_old) || isNaN(c1p_new) ||
        isNaN(facture)
    ) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Vérifications logiques
    if (c1_new < c1_old || c1p_new < c1p_old) {
        alert("Erreur : index actuel inférieur à l'index précédent.");
        return;
    }

    // Calcul des consommations
    const consoC1 = c1_new - c1_old;
    const consoC1p = c1p_new - c1p_old;

    if (consoC1 <= 0) {
        alert("La consommation totale doit être supérieure à zéro.");
        return;
    }

    if (consoC1p > consoC1) {
        alert("Erreur : le sous-compteur dépasse le compteur général.");
        return;
    }

    // Calcul C2
    const consoC2 = consoC1 - consoC1p;

    // Pourcentages
    const pctC1p = (consoC1p / consoC1) * 100;
    const pctC2 = (consoC2 / consoC1) * 100;

    // Montants
    const montantC1p = (pctC1p / 100) * facture;
    const montantC2 = (pctC2 / 100) * facture;

    // Sauvegarde des index pour le prochain mois
    localStorage.setItem("c1_old", c1_new);
    localStorage.setItem("c1p_old", c1p_new);

    // Enregistrement dans l'historique
    const historique = JSON.parse(localStorage.getItem("historique")) || [];

    const date = new Date().toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric"
    });

    historique.push({
        date: date,
        consoC1p: consoC1p,
        consoC2: consoC2,
        montantC1p: montantC1p.toFixed(0),
        montantC2: montantC2.toFixed(0)
    });

    localStorage.setItem("historique", JSON.stringify(historique));

    // Affichage du résultat
    document.getElementById("resultat").innerHTML = `
        <h3>Résultat du calcul</h3>

        <p><strong>Maison C1'</strong></p>
        <p>Consommation : ${consoC1p} kWh</p>
        <p>Part : ${pctC1p.toFixed(2)} %</p>
        <p>Montant : ${montantC1p.toFixed(0)} Ar</p>

        <hr>

        <p><strong>Maison C2</strong></p>
        <p>Consommation : ${consoC2} kWh</p>
        <p>Part : ${pctC2.toFixed(2)} %</p>
        <p>Montant : ${montantC2.toFixed(0)} Ar</p>
    `;

    // Mise à jour de l'historique affiché
    afficherHistorique(historique);
}


/*************************************************
 *  HISTORIQUE
 *************************************************/
function chargerHistorique() {
    const historique = JSON.parse(localStorage.getItem("historique")) || [];
    afficherHistorique(historique);
}

function afficherHistorique(historique) {

    const zone = document.getElementById("historique");

    if (!zone) return;

    if (historique.length === 0) {
        zone.innerHTML = "<p>Aucun relevé enregistré.</p>";
        return;
    }

    let html = `
        <h3>Historique des relevés</h3>
        <table border="1" cellpadding="5">
            <tr>
                <th>Mois</th>
                <th>Maison C1'</th>
                <th>Maison C2</th>
                <th>Action</th>
            </tr>
    `;

    historique.forEach((r, index) => {
        html += `
            <tr>
                <td>${r.date}</td>
                <td>${r.montantC1p} Ar</td>
                <td>${r.montantC2} Ar</td>
                <td><button type="button" class="btn-supprimer" onclick="supprimerHistorique(${index}); return false;">🗑️</button></td>
            </tr>
        `;
    });

    html += "</table>";

    zone.innerHTML = html;
}


/*************************************************
 *  SUPPRESSION D'UN RELEVÉ DE L'HISTORIQUE
 *************************************************/
function supprimerHistorique(index) {
    
    if (!confirm("Voulez-vous vraiment supprimer ce relevé ?")) {
        return;
    }

    // Charger l'historique
    const historique = JSON.parse(localStorage.getItem("historique")) || [];

    // Supprimer l'élément à l'index donné
    historique.splice(index, 1);

    // Sauvegarder l'historique mis à jour
    localStorage.setItem("historique", JSON.stringify(historique));

    // Rafraîchir l'affichage
    afficherHistorique(historique);

    alert("Relevé supprimé avec succès !");
}


/*************************************************
 *  RÉINITIALISATION (sans toucher à l'historique)
 *************************************************/
function reinitialiser() {

    document.getElementById("c1_new").value = "";
    document.getElementById("c1p_new").value = "";
    document.getElementById("facture").value = "";

    document.getElementById("resultat").innerHTML = "";
}
