const admin = require("firebase-admin");
const readline = require("readline");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

async function setAdmin() {
  try {
    const email = await ask("Introdu emailul contului admin: ");

    if (!email) {
      console.log("Nu ai introdus niciun email.");
      return;
    }

    const user = await admin.auth().getUserByEmail(email);

    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    });

    console.log(`Gata. Contul ${email} are privilegii de admin.`);
    console.log("Deloghează-te și loghează-te iar pe site ca tokenul să se actualizeze.");
  } catch (err) {
    console.error("Eroare:", err.message);
  } finally {
    rl.close();
  }
}

setAdmin();