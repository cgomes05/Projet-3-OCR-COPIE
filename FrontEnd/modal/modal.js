// Déclaration de la variable modale
let modal = null;

// Fonction pour ouvrir la modale
const openModal = function (e) {
    e.preventDefault();
    // Récupération de la modale ciblée
    const target = document.querySelector(e.target.getAttribute("href"));
    // Affichage de la modale
    target.style.display = null;
    // Suppression de l'attribut aria-hidden
    target.removeAttribute("aria-hidden");
    // Ajout de l'attribut aria-modal
    target.setAttribute("aria-modal", "true");
    // Affectation de la variable modale
    modal = target;
    // Ajout de l'écouteur d'événement click pour fermer la modale
    modal.addEventListener("click", closeModal);
    // Ajout de l'écouteur d'événement click pour fermer la modale
    modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
    // Ajout de l'écouteur d'événement click pour empêcher la propagation du clic sur la modale
    modal
        .querySelector(".js-stop-modal")
        .addEventListener("click", stopPropagation);
};

// Fonction pour fermer la modale
const closeModal = function (e) {
    // Vérification de l'affichage de la modale
    if (modal === null) return;
    e.preventDefault();
    // Masquage de la modale
    modal.style.display = "none";
    // Ajout de l'attribut aria-hidden
    modal.setAttribute("aria-hidden", "true");
    // Suppression de l'attribut aria-modal
    modal.removeAttribute("aria-modal");
    // Remise a zéro de la variable modale
    modal = null;
    // Suppression de l'écouteur d'événement click pour fermer la modale
    modal.removeEventListener("click", closeModal);
    // Suppression de l'écouteur d'événement click pour fermer la modale
    modal
        .querySelector(".js-close-modal")
        .removeEventListener("click", closeModal);
    // Suppression de l'écouteur d'événement click pour empêcher la propagation du clic sur la modale
    modal
        .querySelector(".js-stop-modal")
        .removeEventListener("click", stopPropagation);
};

// Fonction pour empêcher la propagation du clic sur la modale
const stopPropagation = function (e) {
    e.stopPropagation();
};

// Suppression de la galerie
const deleteGallery = document.querySelector("#btn-modal2");
deleteGallery.addEventListener("click", function () {
    const sectionGalleryModal = document.querySelector("#gallery-modal");
    sectionGalleryModal.innerHTML = "";

    const sectionGalleryPage = document.querySelector(".gallery");
    sectionGalleryPage.innerHTML = "";
});

// Ajout de l'écouteur d'événement click pour ouvrir la modale
document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
});

// Récupération des éléments HTML nécessaires
const modal1 = document.getElementById("modal1");
const title = modal1.querySelector("#title-modal");
const gallery = modal1.querySelector("#gallery-modal");
const modif = modal1.querySelector(".modif");

// Récupération du bouton "Ajouter une photo"
const btnModal1 = modal1.querySelector("#btn-modal1");

// Récupération du bouton "Supprimer la galerie"
const btnModal2 = modal1.querySelector("#btn-modal2");

// Création de la variable séléction pour sélectionner une catégorie
let selection;

// Ajout de l'écouteur d'événement click sur le bouton "Ajouter une photo" , pour que l'utilisateur puisse ajouter une photo depuis son pc
btnModal1.addEventListener("click", function () {
    // Modification du titre de la modal
    title.textContent = "Ajout photo";
    title.classList.add("title-modal-loadpicture");

    // Masquage de la galerie
    gallery.style.display = "none";

    // Masquage des boutons "Ajouter une photo" et "Supprimer la galerie"
    btnModal1.style.display = "none";
    btnModal2.style.display = "none";
    // Récupération de la div qui contient le forumlaire d'envoi 
    const divForm = document.getElementById("divModalForm")
    // Changement de style pour faire apparaitre la div dans la modal
    divForm.style.display = "block";

    // Attribution des numéro d'id pour chaque catégorie dans la select
    const categories = {
        appart: 1,
        objets: 2,
        hotelresto: 3
    };

    // Récupération de l'élément en question afin de lui attribué la fonction 
    // qui permettra de changer l'option en chiffre 
    selection = document.getElementById('select-categorie-style');

    selection.addEventListener('change', function () {
        const selectionIndex = selection.selectedIndex;
        const selectionOption = selection.options[selectionIndex];
        const selectionCategorie = selectionOption.value;
        const categorieId = categories[selectionCategorie]
        console.log(categorieId);
    });

    // Ajout de la flèche retour avec la balise <i> de fontawesome
    const flecheRetour = document.createElement("i");
    flecheRetour.classList.add("fa-sharp", "fa-solid", "fa-arrow-left");
    flecheRetour.classList.add("fleche-modal-style");
    flecheRetour.style.cursor = "pointer";

    // Ajout des éléments HTML créés à la modal
    title.appendChild(flecheRetour);
    // Ajout de l'écouteur d'événement click sur la flèche retour
    flecheRetour.addEventListener("click", function () {
        // Affichage de la galerie
        gallery.style.display = "";
        // Affichage des boutons "Ajouter une photo" et "Supprimer la galerie"
        btnModal1.style.display = "";
        btnModal2.style.display = "";
        divForm.style.display = "none";
        title.textContent = "Gallerie photo";

    });
});


//Création de la fonctionnalité qui permet de charger une photo dans la modal

//Récupération des élements
const boutonAjoutInput = document.getElementById('bouton-ajout');
const boutonAjoutStyle = document.querySelector('.style-bouton-ajout');
const imgI = document.querySelector('.imgI-style');
const imgPreview = document.getElementById('image-form');
const spanSousTitre = document.getElementById('sous-titre-btnmodal');
const titreTravaux = document.getElementById('input-titre-style');
const boutonValider = document.getElementById('btn-valider-style');
const formulaire = document.getElementById('divModalForm')


// Mise en place de l'évènnement change au bouton Ajout
boutonAjoutInput.addEventListener('change', (e) => {
    const fichierImage = e.target.files[0];
    if (!fichierImage) {
        return;
    }

    const lecteurFichier = new FileReader();
    lecteurFichier.readAsDataURL(fichierImage);
    lecteurFichier.onload = () => {
        imgPreview.src = lecteurFichier.result;
        imgPreview.style.display = "block";
        imgPreview.style.height = "193px";
        imgPreview.style.width = "129px";
        imgPreview.style.position = "relative";
        imgPreview.style.left = "250px";
        imgPreview.style.bottom = "50px";
        boutonAjoutStyle.style.display = 'none';
        imgI.style.display = "none";
        spanSousTitre.style.color = "white";
        spanSousTitre.style.bottom = "25px";
    };

});


// Mise en place de l'évènnement submit au bouton Valider
formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    const fichier = boutonAjoutInput.files[0];
    if (!fichier) {
        return;
    }
    // Création de l'objet FormData
    const formData = new FormData();
    formData.append("image", fichier);
    formData.append("title", titreTravaux.value);
    formData.append("category", selection.value);

    const url = 'http://localhost:5678/api/works';
    const token = sessionStorage.getItem('token');
    // Envoie une requête a l'url via la méthod 'POST'
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',

        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Effectuer une nouvelle requête pour récupérer tous les projets mis à jour
            fetch('http://localhost:5678/api/works')
                .then(response => response.json())
                .then(data => {
                    // Mettre à jour la galerie de la modal avec les projets mis à jour
                    const sectionGallery = document.querySelector("#gallery-modal");
                    sectionGallery.innerHTML = ""; // Effacer les anciens projets
                    genererworksmodal(data);
                    genererworks(data);
                })
                .catch(error => console.error("Error:", error));
        })
        .catch(error => console.error("Error:", error));

})










