document.addEventListener('DOMContentLoaded', function () {
    // Définir les dates par défaut
    const dateArrivee = document.getElementById('date-arrivee');
    const dateDepart = document.getElementById('date-depart');

    dateArrivee.value = '2025-07-24';
    dateDepart.value = '2025-08-22';

    // gestion des entrés de l'utilisazteur
    const groupesEntree = document.querySelectorAll('.input-group');
    groupesEntree.forEach(conteneur => {
        const entree = conteneur.querySelector('input[type="number"]');
        const btnDiminuer = conteneur.querySelector('.diminuer');
        const btnAugmenter = conteneur.querySelector('.augmenter');

        if (entree && btnDiminuer && btnAugmenter) {
            btnDiminuer.addEventListener('click', () => {
                const valeurActuelle = parseInt(entree.value);
                if (valeurActuelle > parseInt(entree.min)) {
                    entree.value = valeurActuelle - 1;
                    mettreAJourConfirmation();
                }
            });

            btnAugmenter.addEventListener('click', () => {
                const valeurActuelle = parseInt(entree.value);
                entree.value = valeurActuelle + 1;
                mettreAJourConfirmation();
            });

            entree.addEventListener('change', mettreAJourConfirmation);
        }
    });

    // gestion checkox
    const caseVoyageAffaires = document.getElementById('voyage-affaires');
    caseVoyageAffaires.addEventListener('change', mettreAJourConfirmation);

    // bouton rechercher
    const btnRechercher = document.getElementById('btn-confirmer');
    btnRechercher.addEventListener('click', () => {
        // Valider les dates
        const arrivee = new Date(dateArrivee.value);
        const depart = new Date(dateDepart.value);

        if (arrivee >= depart) {
            afficherAlerte('La date de départ doit être postérieure à la date d\'arrivée', 'danger');
            return;
        }

        // Valider le nombre de chambres
        const adultes = parseInt(document.getElementById('adultes').value);
        const enfants = parseInt(document.getElementById('enfants').value);
        const chambres = parseInt(document.getElementById('chambres').value);

        if (chambres === 0 && (adultes > 0 || enfants > 0)) {
            afficherAlerte('Veuillez sélectionner au moins une chambre', 'warning');
            return;
        }

        afficherAlerte('Confirmation en cours...', 'info');
    });

    // bouton effacer
    const btnEffacer = document.getElementById('btn-effacer');
    btnEffacer.addEventListener('click', () => {
        document.getElementById('adultes').value = '0';
        document.getElementById('enfants').value = '0';
        document.getElementById('chambres').value = '0';
        document.getElementById('voyage-affaires').checked = false;
        document.getElementById('age1').value = '';
        document.getElementById('age2').value = '';
        mettreAJourConfirmation();
        afficherAlerte('Formulaire réinitialisé', 'success');
    });

    // mettre à jour le panneau de confirmation
    function mettreAJourConfirmation() {
        document.getElementById('conf-adultes').textContent = document.getElementById('adultes').value;
        document.getElementById('conf-enfants').textContent = document.getElementById('enfants').value;
        document.getElementById('conf-chambres').textContent = document.getElementById('chambres').value;
        document.getElementById('conf-affaires').textContent = document.getElementById('voyage-affaires').checked ? 'Oui' : 'Non';
    }

    // afficher une alerte bootstrap
    function afficherAlerte(message, type) {
        const divAlerte = document.createElement('div');
        divAlerte.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
        divAlerte.style.zIndex = '1050';
        divAlerte.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        document.body.appendChild(divAlerte);

        
    }

    // mise à jour initiale de la confirmation
    mettreAJourConfirmation();
}); 