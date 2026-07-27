// Firestore security rules tests (deny-by-default contract).
// Run locally:  npx firebase-tools emulators:exec --only firestore --project demo-rules-test "node --test rules-tests/"
import { readFileSync } from "node:fs";
import test, { before, after } from "node:test";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

let env;

before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-rules-test",
    firestore: {
      rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8"),
    },
  });
});

after(async () => {
  await env?.cleanup();
});

test("unauthenticated clients are denied everywhere", async () => {
  const db = env.unauthenticatedContext().firestore();
  await assertFails(getDoc(doc(db, "users/alice")));
  await assertFails(setDoc(doc(db, "users/alice"), { name: "x" }));
  await assertFails(setDoc(doc(db, "randomCollection/someDoc"), { a: 1 }));
});

test("signed-in users cannot touch other users' docs or unmatched collections", async () => {
  const db = env.authenticatedContext("mallory").firestore();
  await assertFails(getDoc(doc(db, "users/alice")));
  await assertFails(setDoc(doc(db, "users/alice"), { name: "hacked" }));
  await assertFails(setDoc(doc(db, "randomCollection/someDoc"), { a: 1 }));
});

test("owners manage their own profile", async () => {
  const db = env.authenticatedContext("alice").firestore();
  await assertSucceeds(setDoc(doc(db, "users/alice"), { name: "Alice" }));
  await assertSucceeds(updateDoc(doc(db, "users/alice"), { name: "Alice B" }));
  await assertSucceeds(getDoc(doc(db, "users/alice")));
});

test("owners cannot grant themselves protected fields", async () => {
  const db = env.authenticatedContext("alice").firestore();
  await assertFails(setDoc(doc(db, "users/alice"), { name: "Alice", role: "admin" }));
  await assertFails(setDoc(doc(db, "users/alice"), { isAdmin: true }, { merge: true }));
  await assertFails(setDoc(doc(db, "users/alice"), { subscription: "pro" }, { merge: true }));
});

test("admin claim grants read access to any profile", async () => {
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), "users/bob"), { name: "Bob" });
  });
  const admin = env.authenticatedContext("root", { admin: true }).firestore();
  await assertSucceeds(getDoc(doc(admin, "users/bob")));
});
