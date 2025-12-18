Guide d'installation - Répartition Électricité  (PWA)
📁 Fichiers du projet

Votre application nécessite maintenant ces fichiers :

    index.html - Page principale
    style.css - Styles
    script.js - Logique JavaScript
    manifest.json - Configuration PWA
    service-worker.js - Cache pour fonctionnement hors ligne
    icon-192.png - Icône 192x192 pixels
    icon-512.png - Icône 512x512 pixels

🎨 Créer les icônes

Vous devez créer deux icônes PNG :
Option 1 : Création simple

    Utilisez un outil en ligne comme favicon.io ou realfavicongenerator.net
    Créez une icône avec un éclair ⚡ ou une maison 🏠
    Téléchargez en 192x192 et 512x512 pixels
    Nommez-les icon-192.png et icon-512.png

Option 2 : Icône simple par défaut

Créez un carré bleu (#2c7be5) avec du texte blanc "RE" (Répartition Électricité)
🚀 Installation sur serveur web
Avec un serveur local (pour tester)
bash

# Installez Python si ce n'est pas déjà fait
# Puis dans le dossier du projet :
python -m http.server 8000

# Ouvrez : http://localhost:8000

Avec hébergement gratuit

    GitHub Pages (gratuit)
        Créez un compte sur github.com
        Créez un nouveau repository
        Upload tous les fichiers
        Activez GitHub Pages dans les paramètres
    Netlify (gratuit)
        Créez un compte sur netlify.com
        Glissez-déposez votre dossier
        Votre site est en ligne !
    Vercel (gratuit)
        Similaire à Netlify
        vercel.com

📱 Installation sur téléphone Android

    Ouvrez l'application avec Chrome sur Android
    Attendez que l'icône "Installer" apparaisse dans la barre d'adresse
    Cliquez sur "Installer"
    L'application apparaît sur votre écran d'accueil comme une vraie app !

💻 Installation sur PC
Windows / Mac / Linux

    Ouvrez l'application avec Chrome ou Edge
    Cliquez sur l'icône ⊕ ou les trois points dans la barre d'adresse
    Sélectionnez "Installer Répartition..."
    L'application s'installe comme un logiciel normal !

✨ Fonctionnalités PWA

✅ Fonctionne hors ligne (après première visite)
✅ S'installe comme une vraie application
✅ Données sauvegardées localement
✅ Pas besoin du Play Store ou App Store
✅ Mises à jour automatiques
✅ Fonctionne sur PC, Android, iOS
🔧 Serveur HTTPS requis

Important : Pour que la PWA fonctionne sur téléphone, vous devez avoir un serveur HTTPS (pas HTTP).

Les solutions gratuites mentionnées (GitHub Pages, Netlify, Vercel) fournissent automatiquement HTTPS.
📝 Test local

Pour tester en local :

    Placez tous les fichiers dans le même dossier
    Lancez un serveur local (Python, Node.js, etc.)
    Ouvrez dans Chrome
    Ouvrez les DevTools (F12) > Application > Service Workers
    Vérifiez que le Service Worker est actif

🎯 Prochaines étapes

    Créez vos icônes (icon-192.png et icon-512.png)
    Hébergez l'application sur un service gratuit
    Installez-la sur vos appareils
    Profitez !

Besoin d'aide ? Contactez-moi pour plus de détails sur l'installation.
