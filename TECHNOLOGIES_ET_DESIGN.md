# Technologies et Design du Portfolio

## 📚 Technologies Utilisées

### Langages de Base
- **HTML5** - Structure et sémantique du site
- **CSS3** - Styles personnalisés et animations
- **JavaScript (ES6+)** - Interactivité et fonctionnalités dynamiques

### Frameworks & Bibliothèques
- **Tailwind CSS** (via CDN) - Framework CSS utilitaire pour le design responsive
  - Configuration du mode sombre avec `darkMode: 'class'`
- **Font Awesome 6.4.0** (via CDN) - Bibliothèque d'icônes
- **EmailJS Browser SDK v4** - Service d'envoi d'emails depuis le frontend
  - Intégration pour le formulaire de contact
  - Configuration avec Service ID, Template ID et Public Key

### Polices
- **Inter** (Google Fonts) - Police principale pour le texte
  - Poids disponibles : 300, 400, 500, 600, 700
- **JetBrains Mono** (Google Fonts) - Police monospace pour le code
  - Poids disponibles : 400, 500

### Médias
- **Vidéo MP4** - `hero-background.mp4` utilisée comme arrière-plan animé
- **Images** - Format JPG/PNG pour les projets, certifications, expériences
- **PDF** - Documents téléchargeables (plans d'étude, rapports)

### Fonctionnalités JavaScript
- **Dark Mode Toggle** - Système de basculement entre mode clair/sombre
  - Sauvegarde de la préférence dans `localStorage`
  - Détection automatique de la préférence système
- **Smooth Scrolling** - Navigation fluide entre les sections
- **Modales** - Affichage de détails pour les compétences et réalisations
- **Formulaires** - Validation et envoi via EmailJS
- **Animations** - Transitions et effets au survol

### Structure du Projet
```
portfolio/
├── index.html          # Page principale
├── rgpd.html          # Page de politique de confidentialité
├── assets/
│   ├── css/
│   │   └── style.css  # Styles personnalisés
│   ├── js/
│   │   └── script.js  # JavaScript principal
│   ├── images/        # Images (projets, certifications, etc.)
│   ├── videos/        # Vidéos d'arrière-plan
│   └── files/        # PDFs téléchargeables
```

---

## 🎨 Palette de Couleurs

### Mode Clair (Light Mode)

#### Arrière-plans
- **Principal** : `#F6F8FC` (gris très clair, presque blanc)
- **Surface 1** : `#FFFFFF` (blanc pur)
- **Surface 2** : `#FFFFFF` (blanc pur)
- **Bordures** : `#D7DBE8` (gris clair)

#### Texte
- **Primaire** : `#0D111C` (noir profond)
- **Secondaire** : `#3A4266` (bleu-gris foncé)
- **Muté** : `#7B82A6` (gris-bleu moyen)

#### Accents Principaux (Cyan Cyber)
- **Accent primaire** : `#00C9FF` (cyan électrique)
- **Accent doux** : `#4DD6FF` (cyan clair)
- **Accent atténué** : `#0086A3` (cyan foncé)

#### Accents Secondaires
- **Or primaire** : `#D4AF37` (or classique)
- **Or doux** : `#E6C65C` (or clair)
- **Or atténué** : `#9F872B` (or foncé)

### Mode Sombre (Dark Mode)

#### Arrière-plans
- **Principal** : `#0D111C` (noir bleuté profond)
- **Surface 1** : `#141A2E` (bleu-gris très foncé)
- **Surface 2** : `#141A2E` (bleu-gris très foncé)
- **Bordures** : `#1E2747` (bleu-gris foncé)

#### Texte
- **Primaire** : `#E8EBF2` (blanc cassé)
- **Secondaire** : `#AAB1C7` (gris-bleu clair)
- **Muté** : `#6C7391` (gris-bleu moyen)

#### Accents (Identiques au mode clair)
- **Cyan électrique** : `#00C9FF`
- **Cyan doux** : `#4DD6FF`
- **Cyan atténué** : `#0086A3`

### Couleurs de Gradient
Les gradients utilisent principalement :
- **Rose → Violet → Cyan** : `from-pink-600 via-purple-600 to-cyan-500`
- **Cyan → Bleu** : `from-cyan-500 to-blue-600`
- **Rose → Rose foncé** : `from-pink-400 to-rose-500`

### Couleurs d'État
- **Succès** : `#00FF9C` (vert cyber)
- **Avertissement** : `#FFC857` (jaune)
- **Erreur** : `#FF3B3B` (rouge)
- **Critique** : `#FF005C` (rouge vif)

---

## 🎭 Ton et Style

### Identité Visuelle
- **Style** : Cyber/Technologique moderne
- **Ambiance** : Professionnel, futuriste, élégant
- **Esthétique** : Minimaliste avec des accents néon

### Caractéristiques du Design
1. **Gradients Animés**
   - Transitions fluides entre les couleurs
   - Effets de dégradé sur les boutons et éléments interactifs
   - Animations de fond avec vidéo

2. **Mode Sombre/Clair**
   - Basculement automatique selon la préférence système
   - Sauvegarde de la préférence utilisateur
   - Transitions douces entre les modes

3. **Typographie**
   - Hiérarchie claire avec Inter
   - Espacement généreux pour la lisibilité
   - JetBrains Mono pour les éléments techniques

4. **Interactivité**
   - Effets de survol sur tous les éléments cliquables
   - Animations de transition fluides
   - Feedback visuel immédiat

5. **Responsive Design**
   - Adaptation à tous les écrans (mobile, tablette, desktop)
   - Grilles flexibles avec Tailwind CSS
   - Navigation mobile optimisée

### Éléments Visuels Distinctifs
- **Vidéo d'arrière-plan** : Animation continue pour créer une ambiance dynamique
- **Cartes avec ombres** : Profondeur visuelle avec effets de survol
- **Icônes Font Awesome** : Représentation visuelle des compétences et projets
- **Bordures colorées** : Accents de couleur sur les cartes importantes
- **Scrollbar personnalisée** : Gradient cyan/rose sur la barre de défilement

### Expérience Utilisateur
- **Navigation fluide** : Scroll smooth entre les sections
- **Chargement rapide** : Optimisation des ressources
- **Accessibilité** : Labels ARIA et structure sémantique
- **Performance** : CDN pour les bibliothèques externes

---

## 🔧 Configuration Technique

### Tailwind CSS
```javascript
tailwind.config = {
    darkMode: 'class',  // Mode sombre basé sur les classes
}
```

### EmailJS
- **Service** : Gmail
- **Version SDK** : Browser v4
- **Configuration** : Service ID, Template ID, Public Key

### LocalStorage
- Sauvegarde de la préférence de thème (dark/light)
- Persistance entre les sessions

### Compatibilité Navigateurs
- Support des navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Utilisation de propriétés CSS modernes avec fallbacks
- JavaScript ES6+ avec compatibilité

---

## 📝 Notes de Design

### Philosophie
Le portfolio combine **élégance professionnelle** et **esthétique cyberpunk moderne**, reflétant l'expertise en cybersécurité tout en restant accessible et professionnel.

### Cohérence
- Palette de couleurs unifiée entre les modes clair et sombre
- Système de design cohérent avec Tailwind CSS
- Animations et transitions harmonisées
- Typographie hiérarchisée et lisible

### Innovation
- Intégration vidéo en arrière-plan pour un effet immersif
- Toggle dark mode élégant avec labels "LIGHT/DARK"
- Modales interactives pour les détails
- Formulaire de contact intégré avec EmailJS
