# 📧 Template Simple pour EmailJS

## Template Minimal qui Fonctionne

Si vous avez modifié un template prédéfini et que ça ne fonctionne pas, voici un template **ultra-simple** qui fonctionne à coup sûr :

---

## Configuration du Template

### 1. Dans EmailJS, créez un NOUVEAU template

**Nom :** `Portfolio Contact Simple`

### 2. Sujet (Subject) :
```
{{subject}}
```

### 3. Contenu (Content) - Version SIMPLE :
```
{{message}}
```

C'est tout ! Le plus simple possible.

### 4. Settings (Paramètres) :

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

### 5. Sauvegardez et notez le Template ID

---

## Alternative : Template avec Formatage

Si vous voulez un peu plus de formatage :

**Contenu :**
```
Message reçu :

{{message}}

---
Expéditeur : {{from_name}}
Email : {{from_email}}
```

---

## ⚠️ IMPORTANT

1. **Créez un NOUVEAU template**, ne modifiez pas un template prédéfini
2. Utilisez exactement les variables : `{{message}}`, `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{to_email}}`
3. Dans "To Email", mettez bien `{{to_email}}` (pas votre adresse directement)
4. Sauvegardez et mettez à jour le Template ID dans `script.js`

---

## 🔍 Vérification

Après avoir créé le nouveau template :

1. Ouvrez la console du navigateur (F12)
2. Envoyez un message de test
3. Regardez les logs dans la console
4. Vous devriez voir :
   - "=== DÉBUT ENVOI EMAIL ==="
   - "Paramètres envoyés: ..."
   - "Envoi EmailJS avec: ..."
   - "=== EMAIL ENVOYÉ AVEC SUCCÈS ==="

Si vous voyez des erreurs, copiez-les et je vous aiderai à les corriger.

