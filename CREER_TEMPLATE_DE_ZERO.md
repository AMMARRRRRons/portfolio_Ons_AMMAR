# 🆕 Créer un Template EmailJS de Zéro

## Problème avec les templates prédéfinis
Les templates prédéfinis peuvent avoir des variables ou configurations qui ne correspondent pas à votre besoin. Il vaut mieux créer un template personnalisé.

---

## 📝 Étapes pour créer un nouveau template

### 1. Accéder aux templates
- Allez sur https://www.emailjs.com/
- Connectez-vous
- Dans le menu de gauche, cliquez sur **"Email Templates"**

### 2. Créer un nouveau template
- **IMPORTANT** : Ne cliquez PAS sur les templates prédéfinis (Contact Us, Auto-Reply, etc.)
- Cherchez le bouton **"Create New Template"** ou **"New Template"** (généralement en haut à droite)
- Si vous ne le voyez pas, cherchez un bouton **"+"** ou **"Add"**

### 3. Configuration du template

**Nom du template :**
```
Portfolio Contact
```

**Sujet (Subject) :**
```
{{subject}}
```

**Contenu (Content) :**
Cliquez sur "Edit Content" ou dans la zone de texte, et remplacez TOUT par :

```
{{message}}

---
De: {{from_name}}
Email: {{from_email}}
```

**OU si vous voulez un format plus simple :**

```
{{message}}
```

### 4. Configuration des champs (Settings)

Dans la section "Settings" ou "Email Settings" à droite :

**To Email :**
```
{{to_email}}
```

**From Name :**
```
{{from_name}}
```

**From Email :**
```
{{from_email}}
```

**Reply To :** (optionnel)
```
{{from_email}}
```

### 5. Sauvegarder
- Cliquez sur **"Save"** (en haut à droite)
- **IMPORTANT** : Notez le nouveau **Template ID** qui apparaît
  - Il ressemble à : `template_xxxxxxxxx`
  - **Copiez-le !**

---

## 🔄 Mettre à jour le code

Une fois le nouveau template créé :

1. Ouvrez `assets/js/script.js`
2. Trouvez la ligne avec `EMAILJS_TEMPLATE_ID`
3. Remplacez par votre nouveau Template ID :

```javascript
const EMAILJS_TEMPLATE_ID = 'template_VOTRE_NOUVEAU_ID';
```

---

## ✅ Test

1. Testez le formulaire
2. Vérifiez la console (F12) pour voir les logs
3. Vérifiez votre boîte mail

---

## 🐛 Si vous ne trouvez pas "Create New Template"

Parfois l'interface change. Essayez :
- Cherchez un bouton **"+"** en haut
- Cherchez **"Add Template"**
- Cherchez **"New"** dans un menu
- Si vraiment vous ne trouvez pas, utilisez le template "Contact Us" mais modifiez-le complètement

