###Déployer sur VPS ou PC.
- Vous devez installer git, ffmpeg, curl, nodejs, yarn avec m2.
  
1. Installer git, ffmpeg et curl
   ```
   sudo apt -y update && sudo apt -y upgrade
   sudo apt -y install git ffmpeg curl
   ```

2. Installer Node.js
   ```
   sudo apt -y remove nodejs
   curl -fsSl https://deb.nodesource.com/setup_lts.x | sudo bash - && sudo apt -y install nodejs
   ```

3. Installer Yarn
   ```
   curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - 
   echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
   sudo apt -y update && sudo apt -y install yarn
   ```

4. Installer pm2
   ```
   sudo yarn global add pm2
   ```

5. Cloner le repo et installer les dépendances nécessaires
   ```
   git clone https://github.com/KangJinhuyk/JINHUYK-MD_V2
   cd JINHUYK-MD-V2
   yarn install --network-concurrency 1
   ```

6. Créer un fichier `.env` pour les variables d'environnement
   ```
   touch config.env
   nano config.env
   ```
   Copiez et collez les lignes suivantes dans le fichier :

   ```
   OWNER_NUMBER="+242067274660"
   MONGODB_URI="mongodb+srv://rahul:rahul@cluster0.ik98tiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   SESSION_ID="ID-here"
   THUMB_IMAGE="https://i.imgur.com/1YWlaIx.jpeg"
   port=5000
   email="deathsgun2.0@gmail.com"
   global_url="https://www.instagram.com/sasaki.242?igsh=YzljYTk1ODg3Zg=="
   OWNER_NAME="𝐊𝐚𝐧𝐠 𝐣𝐢𝐧𝐡𝐮𝐲𝐤"
   READ_MESSAGE=false
   PREFIX="."
   WARN_COUNT=3
   DISABLE_PM=false
   ANTI_BAD_WORD="fuck"
   LEVEL_UP_MESSAGE=true
   WELCOME_MESSAGE="*Hi,* @user \n*Welcome in* @gname \n*Member count* : @count th"
   THEME="JINHUYK-MD-V2"
   WORKTYPE="public"
   PACK_NAME="Jinhuyk-MD-V2"
   ANTILINK_VALUES="chat.whatsapp.com"
   ```

   Ensuite, appuyez sur `Ctrl + O` pour enregistrer et `Ctrl + X` pour quitter.

7. Démarrer et arrêter le bot

   Pour démarrer le bot :
   ```
   npm start
   ```

   Pour arrêter le bot :
   ```
   npm stop
   ```