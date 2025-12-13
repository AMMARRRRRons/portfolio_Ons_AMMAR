# 🔍 Vérifier et Corriger le Template ID

## ❌ Problème :
Dans l'historique EmailJS, vous voyez :
```
Template: --
```

Cela signifie que le template n'est pas associé ou que le Template ID est incorrect.

---

## ✅ Solution : Vérifier le Template ID

### 1. Vérifier dans EmailJS

1. Allez sur https://www.emailjs.com/
2. Connectez-vous
3. Cliquez sur **"Email Templates"** (menu de gauche)
4. Trouvez votre template (celui que vous avez créé)
5. **Cliquez sur le template** pour l'ouvrir
6. Regardez l'URL dans votre navigateur ou le Template ID affiché
   - Il devrait ressembler à : `template_xxxxxxxxx`
7. **Copiez le Template ID exact**

### 2. Vérifier que le template existe

- Le template doit être visible dans la liste
- Il doit avoir un nom (ex: "Portfolio Contact")
- Si vous ne le voyez pas, créez-en un nouveau

### 3. Vérifier la configuration du template

Le template doit avoir :
- **Sujet** : `{{subject}}`
- **Contenu** : `{{message}}` (ou votre format)
- **To Email** : `{{to_email}}`
- **From Name** : `{{from_name}}`
- **From Email** : `{{from_email}}`

---

## 🔧 Si le Template ID est différent

Si le Template ID dans EmailJS est différent de `template_9rkyugg` :

1. Ouvrez `assets/js/script.js`
2. Trouvez la ligne 56 :
   ```javascript
   const EMAILJS_TEMPLATE_ID = 'template_9rkyugg';
   ```
3. Remplacez par votre vrai Template ID :
   ```javascript
   const EMAILJS_TEMPLATE_ID = 'template_VOTRE_VRAI_ID';
   ```
4. Sauvegardez

---

## 🆕 Si le template n'existe pas

Si vous ne trouvez pas le template `template_9rkyugg` :

1. Créez un nouveau template (voir `CREER_TEMPLATE_DE_ZERO.md`)
2. Notez le nouveau Template ID
3. Mettez à jour `script.js` avec le nouveau Template ID

---

## ✅ Test

Après avoir corrigé le Template ID :

1. Testez le formulaire
2. Vérifiez l'historique EmailJS
3. Vous devriez voir :
   ```
   Template: template_9rkyugg (ou votre ID)
   ```
   Au lieu de `--`

---

## 📝 Template ID actuel dans le code

Le code utilise actuellement : `template_9rkyugg`

Vérifiez que ce Template ID existe bien dans EmailJS et qu'il correspond au template que vous avez créé.

