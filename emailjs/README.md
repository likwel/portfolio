# Modèle d'e-mail du formulaire de contact (EmailJS)

Le modèle est stocké côté EmailJS : ce dossier en garde la source.

## Mise en place

1. Sur [dashboard.emailjs.com](https://dashboard.emailjs.com), ouvrir **Email Templates** puis le modèle utilisé par le site (`VITE_EMAILJS_TEMPLATE_ID`).
2. Onglet **Content** → **Edit Content** → **Code Editor**, remplacer tout le contenu par [`contact-template.html`](contact-template.html).
3. Réglages du modèle (colonne de droite) :

   | Champ       | Valeur                                   |
   |-------------|------------------------------------------|
   | Subject     | `[Portfolio] {{requestType}} · {{subject}}` |
   | To Email    | `{{to_email}}`                           |
   | From Name   | `{{senderName}} via Portfolio`           |
   | Reply To    | `{{reply_to}}`                           |

   **Reply To** permet de répondre directement au visiteur depuis la boîte mail.
4. **Save**, puis **Test It** pour vérifier le rendu.

## Variables envoyées par le site

Envoyées par `src/components/Modal.jsx` :

| Variable            | Contenu                                                    |
|---------------------|------------------------------------------------------------|
| `senderName`        | Nom du visiteur                                            |
| `senderInitial`     | Initiale du nom (pastille)                                 |
| `senderEmail`       | E-mail du visiteur                                         |
| `reply_to`          | Identique à `senderEmail` (champ Reply To)                 |
| `subject`           | Sujet saisi                                                |
| `senderMsg`         | Message (les retours à la ligne sont conservés)            |
| `requestType`       | Mission freelance, Offre d'emploi, Collaboration, Autre ou Non précisé |
| `sentAt`            | Date et heure d'envoi, heure de Madagascar                 |
| `visitorLanguage`   | Langue du site au moment de l'envoi                        |
| `pageUrl`           | Page d'où le message a été envoyé                          |
| `replySubject`      | « Re: sujet », encodé pour le bouton Répondre              |
| `to_email`          | Adresse de réception                                       |

Les anciennes variables (`senderName`, `senderEmail`, `subject`, `senderMsg`, `to_email`) sont conservées : l'ancien modèle continue de fonctionner tant que le nouveau n'est pas collé.
